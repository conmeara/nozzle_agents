import { Agent, Job, Activity } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function fetchAgents(): Promise<Agent[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/agents`, { next: { revalidate: 60 } });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch agents: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
}

export async function fetchJobsByAgentType(type: string): Promise<Job[]> {
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
}

export async function fetchRecentActivities(limit = 10): Promise<Activity[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/activities?limit=${limit}`, { next: { revalidate: 60 } });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
} 