import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  try {
    // Create the agents table
    const { error: agentsTableError } = await supabaseAdmin.from('_sql').select('*', { count: 'exact', head: true }).eq('name', 'agents');
    
    // If table doesn't exist error, create it
    if (agentsTableError) {
      console.log('Creating the agents table...');
      const { error: createAgentsError } = await supabaseAdmin.rpc('_exec', {
        query: `
          CREATE TABLE IF NOT EXISTS agents (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            description TEXT,
            type TEXT NOT NULL,
            total_jobs INTEGER DEFAULT 0,
            active_jobs INTEGER DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
        `
      });
      
      if (createAgentsError) {
        console.error('Error creating agents table:', createAgentsError);
        return NextResponse.json({ error: 'Failed to create agents table' }, { status: 500 });
      }
    }
    
    // Create the jobs table
    const { error: jobsTableError } = await supabaseAdmin.from('_sql').select('*', { count: 'exact', head: true }).eq('name', 'jobs');
    
    // If table doesn't exist error, create it
    if (jobsTableError) {
      console.log('Creating the jobs table...');
      const { error: createJobsError } = await supabaseAdmin.rpc('_exec', {
        query: `
          CREATE TABLE IF NOT EXISTS jobs (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            agent_id UUID REFERENCES agents(id),
            agent_type TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            completed_at TIMESTAMP WITH TIME ZONE,
            last_run_at TIMESTAMP WITH TIME ZONE
          );
        `
      });
      
      if (createJobsError) {
        console.error('Error creating jobs table:', createJobsError);
        return NextResponse.json({ error: 'Failed to create jobs table' }, { status: 500 });
      }
    }
    
    // Create the activities table
    const { error: activitiesTableError } = await supabaseAdmin.from('_sql').select('*', { count: 'exact', head: true }).eq('name', 'activities');
    
    // If table doesn't exist error, create it
    if (activitiesTableError) {
      console.log('Creating the activities table...');
      const { error: createActivitiesError } = await supabaseAdmin.rpc('_exec', {
        query: `
          CREATE TABLE IF NOT EXISTS activities (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            agent_id UUID REFERENCES agents(id),
            job_id UUID REFERENCES jobs(id),
            description TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
        `
      });
      
      if (createActivitiesError) {
        console.error('Error creating activities table:', createActivitiesError);
        return NextResponse.json({ error: 'Failed to create activities table' }, { status: 500 });
      }
    }
    
    return NextResponse.json({ 
      message: 'Tables created or already exist',
      tablesCreated: {
        agents: agentsTableError ? true : false,
        jobs: jobsTableError ? true : false,
        activities: activitiesTableError ? true : false
      }
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 