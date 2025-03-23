import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { MessageItem } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const jobId = url.searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    // Fetch messages for the job
    const { data, error } = await supabaseAdmin
      .from('chat_messages')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching chat history:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Format messages to match the expected ChatItem format
    const formattedMessages = data.map((msg): MessageItem => ({
      id: msg.id,
      type: 'message',
      role: msg.role,
      content: msg.content,
      job_id: msg.job_id,
      created_at: msg.created_at
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error('Error in chat history API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 