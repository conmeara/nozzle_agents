import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('Fetching agents...');
    
    // First check if the table exists
    const { data: tableCheck, error: tableCheckError } = await supabase
      .from('agents')
      .select('*', { count: 'exact', head: true });
    
    if (tableCheckError) {
      console.error('Error checking agents table:', tableCheckError);
      return NextResponse.json({ 
        error: tableCheckError.message,
        details: tableCheckError,
        message: 'Make sure tables are created in Supabase dashboard first.'
      }, { status: 500 });
    }
    
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('type');
    
    if (error) {
      console.error('Error fetching agents data:', error);
      return NextResponse.json({ 
        error: error.message,
        details: error
      }, { status: 500 });
    }
    
    console.log(`Successfully fetched ${data?.length || 0} agents`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error 
    }, { status: 500 });
  }
} 