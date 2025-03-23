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

export interface ContentItem {
  type: 'input_text' | 'output_text' | 'refusal' | 'output_audio';
  text?: string;
  annotations?: Annotation[];
}

export interface Annotation {
  type: 'citation' | 'file_path' | 'web_link';
  text: string;
  start_index: number;
  end_index: number;
  file_citation?: {
    file_id: string;
    quote: string;
  };
  file_path?: {
    file_id: string;
  };
  web_link?: {
    url: string;
  };
}

export interface ToolCallItem {
  type: 'tool_call';
  tool_type: 'file_search_call' | 'web_search_call' | 'function_call';
  status: 'in_progress' | 'completed' | 'failed' | 'searching';
  id: string;
  name?: string | null;
  call_id?: string;
  arguments?: string;
  parsedArguments?: any;
  output?: string | null;
}

export interface MessageItem {
  id?: string;
  type: 'message';
  role: 'user' | 'assistant' | 'system';
  content: ContentItem[];
  job_id?: string;
  created_at?: string;
}

export type ChatItem = MessageItem | ToolCallItem; 