import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { jobId, message, agentType } = await req.json();

    // Fetch chat history for context
    const { data: historyData, error: historyError } = await supabaseAdmin
      .from('chat_messages')
      .select('role, content')
      .eq('job_id', jobId)
      .order('created_at', { ascending: true });

    if (historyError) {
      console.error('Error fetching chat history:', historyError);
      return new Response('Error fetching chat history', { status: 500 });
    }

    // Format messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are a ${agentType} agent. Be helpful and professional in your responses.`
      },
      ...(historyData || []).map(msg => ({
        role: msg.role,
        content: msg.content[0]?.text || ''
      })),
      { role: 'user', content: message }
    ];

    // Create chat completion with streaming
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      stream: true,
    });

    // Create a stream from the response
    const stream = OpenAIStream(response, {
      async onCompletion(completion: string) {
        // Save the completed message to the database
        await supabaseAdmin.from('chat_messages').insert({
          job_id: jobId,
          role: 'assistant',
          content: [{ type: 'text', text: completion }],
          created_at: new Date().toISOString(),
        });
      },
    });

    // Return the stream response
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Error processing chat request', { status: 500 });
  }
} 