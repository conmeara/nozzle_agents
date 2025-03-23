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

-- Create indexes
CREATE INDEX IF NOT EXISTS jobs_agent_id_idx ON jobs(agent_id);
CREATE INDEX IF NOT EXISTS jobs_agent_type_idx ON jobs(agent_type);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON jobs(status);
CREATE INDEX IF NOT EXISTS activities_agent_id_idx ON activities(agent_id);
CREATE INDEX IF NOT EXISTS activities_job_id_idx ON activities(job_id);

-- RLS Policies
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies that allow authenticated users to read all data
CREATE POLICY "Allow authenticated users to read agents" ON agents
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read jobs" ON jobs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read activities" ON activities
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies that allow anonymous users to read data
CREATE POLICY "Allow anonymous users to read agents" ON agents
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous users to read jobs" ON jobs
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous users to read activities" ON activities
  FOR SELECT USING (true);

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