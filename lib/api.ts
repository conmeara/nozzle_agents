import { Agent, Job, Activity } from './types';

// Use relative URLs by default, only use environment variable if explicitly set
// This ensures API calls work in both development and production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Mock data for Vercel deployment
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sales Agent',
    type: 'sales',
    description: 'Handles sales inquiries and demos',
    total_jobs: 24,
    active_jobs: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Support Agent',
    type: 'support',
    description: 'Provides customer support',
    total_jobs: 56,
    active_jobs: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Marketing Agent',
    type: 'marketing',
    description: 'Manages marketing campaigns',
    total_jobs: 18,
    active_jobs: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Research Agent',
    type: 'research',
    description: 'Conducts market research',
    total_jobs: 15,
    active_jobs: 1,
    created_at: new Date().toISOString(),
  },
];

const mockActivities: Activity[] = [
  {
    id: '1',
    agent_id: '1',
    job_id: '101',
    description: 'Completed sales call with Acme Inc',
    status: 'success',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    agent_id: '2',
    job_id: '102',
    description: 'Resolved support ticket #45892',
    status: 'success',
    created_at: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: '3',
    agent_id: '3',
    job_id: '103',
    description: 'Started new email campaign',
    status: 'warning',
    created_at: new Date(Date.now() - 120 * 60000).toISOString(),
  },
  {
    id: '4',
    agent_id: '4',
    job_id: '104',
    description: 'Analyzing competitor data',
    status: 'warning',
    created_at: new Date(Date.now() - 240 * 60000).toISOString(),
  },
];

export async function fetchAgents(): Promise<Agent[]> {
  if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
    return mockAgents;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/agents`, { next: { revalidate: 60 } });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch agents: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching agents:', error);
    return mockAgents;
  }
}

export async function fetchJobsByAgentType(type: string): Promise<Job[]> {
  // Return empty array for now
  return [];
  
  // In production deployment, use mock data or actual API call if available
  /* 
  try {
    const response = await fetch(`${API_BASE_URL}/api/agents/${type}/jobs`, { next: { revalidate: 60 } });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching jobs for agent type ${type}:`, error);
    return [];
  }
  */
}

export async function fetchRecentActivities(limit = 10): Promise<Activity[]> {
  if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
    return mockActivities.slice(0, limit);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/activities?limit=${limit}`, { next: { revalidate: 60 } });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching activities:', error);
    return mockActivities.slice(0, limit);
  }
} 