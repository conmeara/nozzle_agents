import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  req: Request,
  { params }: { params: { type: string } }
) {
  try {
    const { type } = params;
    
    if (!type) {
      return NextResponse.json({ error: 'Agent type is required' }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('agent_type', type)
      .order('created_at', { ascending: false });
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching jobs for agent type ${params.type}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 