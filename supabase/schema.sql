-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  total_jobs INTEGER DEFAULT 0,
  active_jobs INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

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

CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id),
  job_id UUID REFERENCES jobs(id),
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- New table for chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS jobs_agent_id_idx ON jobs(agent_id);
CREATE INDEX IF NOT EXISTS jobs_agent_type_idx ON jobs(agent_type);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON jobs(status);
CREATE INDEX IF NOT EXISTS activities_agent_id_idx ON activities(agent_id);
CREATE INDEX IF NOT EXISTS activities_job_id_idx ON activities(job_id);
CREATE INDEX IF NOT EXISTS chat_messages_job_id_idx ON chat_messages(job_id);
CREATE INDEX IF NOT EXISTS chat_messages_created_at_idx ON chat_messages(created_at);

-- RLS Policies
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies that allow authenticated users to read all data
CREATE POLICY "Allow public read access to agents" ON agents FOR SELECT USING (true);
CREATE POLICY "Allow public read access to jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Allow public read access to activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Allow public read access to chat_messages" ON chat_messages FOR SELECT USING (true);

-- Create policies that allow authenticated users to insert data
CREATE POLICY "Allow public insert to agents" ON agents FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to jobs" ON jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to activities" ON activities FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to chat_messages" ON chat_messages FOR INSERT WITH CHECK (true);

-- Create policies that allow authenticated users to update data
CREATE POLICY "Allow public update to agents" ON agents FOR UPDATE USING (true);
CREATE POLICY "Allow public update to jobs" ON jobs FOR UPDATE USING (true);
CREATE POLICY "Allow public update to activities" ON activities FOR UPDATE USING (true);
CREATE POLICY "Allow public update to chat_messages" ON chat_messages FOR UPDATE USING (true);

-- Create policies that allow authenticated users to delete data
CREATE POLICY "Allow public delete from agents" ON agents FOR DELETE USING (true);
CREATE POLICY "Allow public delete from jobs" ON jobs FOR DELETE USING (true);
CREATE POLICY "Allow public delete from activities" ON activities FOR DELETE USING (true);
CREATE POLICY "Allow public delete from chat_messages" ON chat_messages FOR DELETE USING (true);

-- Create policies for service role to have full access
CREATE POLICY "Allow service role full access to agents" ON agents
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Allow service role full access to jobs" ON jobs
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Allow service role full access to activities" ON activities
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Allow service role full access to chat_messages" ON chat_messages
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role'); 