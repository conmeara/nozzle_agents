export type AgentType = 'sales' | 'support' | 'marketing' | 'research';

export interface Agent {
  id: string;
  name: string;
  description: string;
  type: AgentType;
  total_jobs: number;
  active_jobs: number;
  created_at: string;
}

export interface Job {
  id: string;
  name: string;
  agent_id: string;
  agent_type: AgentType;
  status: 'active' | 'completed' | 'paused' | 'failed';
  created_at: string;
  completed_at?: string;
  last_run_at?: string;
}

export interface Activity {
  id: string;
  agent_id: string;
  job_id?: string;
  description: string;
  status: 'success' | 'warning' | 'error';
  created_at: string;
} 