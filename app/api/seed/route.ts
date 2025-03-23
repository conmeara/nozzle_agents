import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { Agent, Job, Activity, AgentType } from '@/lib/types';

// Sample data for agents
const agents: Omit<Agent, 'id' | 'created_at'>[] = [
  {
    name: 'Sales Agent',
    description: 'Manage leads, qualify prospects, and schedule demos with the sales agent.',
    type: 'sales',
    total_jobs: 7,
    active_jobs: 3,
  },
  {
    name: 'Support Agent',
    description: 'Answer tickets, provide technical help, and follow up with customers.',
    type: 'support',
    total_jobs: 12,
    active_jobs: 5,
  },
  {
    name: 'Marketing Agent',
    description: 'Create content, manage social media, and run email campaigns.',
    type: 'marketing',
    total_jobs: 48,
    active_jobs: 12,
  },
  {
    name: 'Research Agent',
    description: 'Analyze competitors, track market trends, and collect valuable data.',
    type: 'research',
    total_jobs: 5,
    active_jobs: 2,
  },
];

// Sample data for Sales jobs
const salesJobs = [
  { name: 'LinkedIn Outreach', status: 'active' as const },
  { name: 'Cold Email', status: 'active' as const },
  { name: 'Lead Qualification', status: 'active' as const },
  { name: 'Demo Calls', status: 'active' as const },
  { name: 'Proposal Generation', status: 'active' as const },
  { name: 'Check-ins', status: 'completed' as const },
  { name: 'Upsell Opportunities', status: 'paused' as const },
];

// Sample data for Support jobs
const supportJobs = [
  { name: 'Ticket Response', status: 'active' as const },
  { name: 'Customer Onboarding', status: 'active' as const },
  { name: 'Technical Support', status: 'active' as const },
  { name: 'Follow-up Emails', status: 'active' as const },
  { name: 'Knowledge Base Updates', status: 'active' as const },
  { name: 'Bug Reports', status: 'completed' as const },
  { name: 'Feature Requests', status: 'paused' as const },
  { name: 'Help Documentation', status: 'completed' as const },
  { name: 'User Training', status: 'completed' as const },
  { name: 'Satisfaction Survey', status: 'completed' as const },
  { name: 'Account Review', status: 'paused' as const },
  { name: 'Support Metrics Analysis', status: 'paused' as const },
];

// Sample data for Marketing jobs
const marketingJobs = [
  { name: 'Social Media Posts', status: 'active' as const },
  { name: 'Email Campaign', status: 'active' as const },
  { name: 'Content Writing', status: 'active' as const },
  { name: 'SEO Optimization', status: 'active' as const },
  { name: 'Ad Campaign Management', status: 'active' as const },
  { name: 'Analytics Reporting', status: 'active' as const },
  { name: 'Competitor Analysis', status: 'active' as const },
  { name: 'Landing Page Creation', status: 'active' as const },
  { name: 'Blog Posts', status: 'active' as const },
  { name: 'Webinar Planning', status: 'active' as const },
  { name: 'Video Scripts', status: 'active' as const },
  { name: 'Case Studies', status: 'active' as const },
  // More jobs to reach 48 total
  // Adding a mix of statuses for the remaining ones
  ...Array(36).fill(0).map((_, i) => ({
    name: `Marketing Task ${i + 13}`,
    status: ['active', 'completed', 'paused'][i % 3] as 'active' | 'completed' | 'paused'
  }))
];

// Sample data for Research jobs
const researchJobs = [
  { name: 'Market Analysis', status: 'active' as const },
  { name: 'Competitor Research', status: 'active' as const },
  { name: 'Trend Tracking', status: 'completed' as const },
  { name: 'Customer Insights', status: 'completed' as const },
  { name: 'Product Research', status: 'paused' as const },
];

// Sample activities
const activities: Omit<Activity, 'id' | 'created_at' | 'agent_id' | 'job_id'>[] = [
  {
    description: 'Sales Agent completed 3 prospect calls',
    status: 'success',
  },
  {
    description: 'Support Agent resolved customer ticket #1242',
    status: 'success',
  },
  {
    description: 'Marketing Agent scheduled 5 social media posts',
    status: 'success',
  },
  {
    description: 'Research Agent completed competitor analysis report',
    status: 'warning',
  },
];

export async function GET() {
  try {
    console.log('Starting database seed process...');
    
    // First, check if tables exist
    const { data: tableCheck, error: tableError } = await supabaseAdmin
      .from('agents')
      .select('id')
      .limit(1);
    
    if (tableError) {
      console.error('Error checking tables:', tableError);
      return NextResponse.json({
        error: 'Table check failed. Make sure you created the tables in the Supabase dashboard.',
        details: tableError
      }, { status: 500 });
    }
    
    console.log('Tables exist, proceeding with seed...');
    
    // Clear existing data
    console.log('Clearing existing data...');
    await supabaseAdmin.from('activities').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseAdmin.from('jobs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseAdmin.from('agents').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Insert agents
    console.log('Inserting agents...');
    const { data: insertedAgents, error: agentError } = await supabaseAdmin
      .from('agents')
      .insert(agents)
      .select();
    
    if (agentError) {
      console.error('Error inserting agents:', agentError);
      return NextResponse.json({ 
        error: 'Error inserting agents',
        details: agentError
      }, { status: 500 });
    }

    console.log('Agents inserted successfully:', insertedAgents);

    // Insert jobs for each agent
    const agentMap: Record<string, Agent> = {};
    
    if (insertedAgents) {
      for (const agent of insertedAgents) {
        agentMap[agent.type] = agent;
      }
    }

    // Insert jobs based on agent type
    const salesAgent = agentMap['sales'];
    const supportAgent = agentMap['support'];
    const marketingAgent = agentMap['marketing'];
    const researchAgent = agentMap['research'];

    // Prepare job data
    const jobData: Omit<Job, 'id' | 'created_at'>[] = [
      ...salesJobs.map(job => ({
        name: job.name,
        agent_id: salesAgent?.id || '',
        agent_type: 'sales' as AgentType,
        status: job.status,
        last_run_at: job.status === 'active' ? new Date().toISOString() : undefined,
        completed_at: job.status === 'completed' ? new Date().toISOString() : undefined,
      })),
      ...supportJobs.map(job => ({
        name: job.name,
        agent_id: supportAgent?.id || '',
        agent_type: 'support' as AgentType,
        status: job.status,
        last_run_at: job.status === 'active' ? new Date().toISOString() : undefined,
        completed_at: job.status === 'completed' ? new Date().toISOString() : undefined,
      })),
      ...marketingJobs.map(job => ({
        name: job.name,
        agent_id: marketingAgent?.id || '',
        agent_type: 'marketing' as AgentType,
        status: job.status,
        last_run_at: job.status === 'active' ? new Date().toISOString() : undefined,
        completed_at: job.status === 'completed' ? new Date().toISOString() : undefined,
      })),
      ...researchJobs.map(job => ({
        name: job.name,
        agent_id: researchAgent?.id || '',
        agent_type: 'research' as AgentType,
        status: job.status,
        last_run_at: job.status === 'active' ? new Date().toISOString() : undefined,
        completed_at: job.status === 'completed' ? new Date().toISOString() : undefined,
      })),
    ];

    // Insert all jobs
    const { data: insertedJobs, error: jobError } = await supabaseAdmin
      .from('jobs')
      .insert(jobData)
      .select();

    if (jobError) {
      console.error('Error inserting jobs:', jobError);
      return NextResponse.json({ error: 'Error inserting jobs' }, { status: 500 });
    }

    // Create activities linked to agents and jobs
    const activityData = activities.map((activity, index) => {
      const agentType = ['sales', 'support', 'marketing', 'research'][index % 4] as AgentType;
      const agent = agentMap[agentType];
      const relevantJobs = insertedJobs?.filter(job => job.agent_id === agent?.id) || [];
      const jobId = relevantJobs.length > 0 ? relevantJobs[0].id : undefined;
      
      return {
        ...activity,
        agent_id: agent?.id || '',
        job_id: jobId,
      };
    });

    // Insert activities
    const { error: activityError } = await supabaseAdmin
      .from('activities')
      .insert(activityData);

    if (activityError) {
      console.error('Error inserting activities:', activityError);
      return NextResponse.json({ error: 'Error inserting activities' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
      agents: insertedAgents,
      jobCount: insertedJobs?.length || 0,
      activitiesCount: activityData.length,
    });
  } catch (error) {
    console.error('Error in seed route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 