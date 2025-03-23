import { Wrench, Settings } from "lucide-react"
import Link from "next/link"
import { fetchAgents, fetchJobsByAgentType } from "@/lib/api"

export default async function SalesPage() {
  // Fetch the sales agent and jobs data
  const agents = await fetchAgents();
  const salesAgent = agents.find(agent => agent.type === 'sales');
  const jobs = await fetchJobsByAgentType('sales');
  
  // Group jobs by category for organization
  const leadGenJobs = jobs.filter(job => 
    ['LinkedIn Outreach', 'Cold Email', 'Lead Qualification'].includes(job.name)
  );
  
  const dealClosingJobs = jobs.filter(job => 
    ['Demo Calls', 'Proposal Generation'].includes(job.name)
  );
  
  const accountManagementJobs = jobs.filter(job => 
    ['Check-ins', 'Upsell Opportunities'].includes(job.name)
  );
  
  // Get active jobs count
  const activeJobsCount = jobs.filter(job => job.status === 'active').length;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 text-white overflow-hidden">
      {/* Top navigation */}
      <header className="flex items-center p-4">
        <div className="flex items-center gap-2 w-48">
          <div className="h-5 w-5 rounded-full bg-lime-400"></div>
          <span className="text-xl font-light tracking-wide text-gray-300">nozzle</span>
        </div>

        <div className="flex-1">
          <div className="flex items-center rounded-full bg-black/20 px-4 py-2 max-w-lg">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="w-full bg-transparent border-none focus:outline-none text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button className="px-4 py-1 rounded-md bg-black/20 hover:bg-black/40 flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span>Tools</span>
          </button>
          <button className="px-4 py-1 rounded-md bg-black/20 hover:bg-black/40 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex">
        {/* Left sidebar - will be a shared component later */}
        <div className="w-48 p-4 space-y-4">
          <Link href="/" className="block">
            <div className="flex items-center px-1 py-0.5 rounded-sm">
              <span className="w-8 text-gray-400">00</span>
              <span className="text-gray-300">Home</span>
            </div>
          </Link>
          {agents.map((agent, index) => (
            <Link 
              key={agent.id} 
              href={`/${agent.type}`} 
              className="block"
            >
              <div className={`flex items-center ${agent.type === 'sales' ? 'bg-black/20' : ''} px-1 py-0.5 rounded-sm`}>
                {agent.type === 'sales' && <div className="w-2 h-2 bg-lime-400 rounded-full mr-1"></div>}
                <span className={`w-8 ${agent.type === 'sales' ? 'text-lime-400' : 'text-gray-400'}`}>{`0${index + 1}`}</span>
                <span className={agent.type === 'sales' ? 'text-lime-400' : 'text-gray-300'}>
                  {agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}
                </span>
                <span className={`ml-2 px-1.5 ${agent.type === 'sales' ? 'bg-lime-900 text-lime-400' : 'bg-gray-700'} rounded text-xs`}>
                  {agent.total_jobs}
                </span>
              </div>
            </Link>
          ))}
          <div className="flex items-center mt-4">
            <span className="px-1.5 bg-gray-700 rounded text-xs mr-2">
              {agents.reduce((sum, agent) => sum + agent.total_jobs, 0)}
            </span>
            <span className="text-gray-300">Jobs Total</span>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6">Sales Agents</h1>
          
          {/* Grid layout for agents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Lead Generation Agent - spans 2 columns */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative col-span-1 md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Lead Generation Agent ⚡</span>
                <span className="px-2 py-1 bg-blue-800/50 rounded-full text-xs">
                  {leadGenJobs.filter(job => job.status === 'active').length} active jobs
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {leadGenJobs.map(job => (
                  <div key={job.id} className="flex flex-col items-center">
                    <button 
                      className={`w-16 h-16 ${job.status === 'active' ? 'bg-white' : 'bg-white/30'} rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2`} 
                      title={job.name}
                    />
                    <span className="text-xs text-gray-300">{job.name}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>
            
            {/* Deal Closing Agent - standard size */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Deal Closing</span>
                <span className="px-2 py-1 bg-green-800/50 rounded-full text-xs">
                  {dealClosingJobs.filter(job => job.status === 'active').length} active
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {dealClosingJobs.map(job => (
                  <div key={job.id} className="flex flex-col items-center">
                    <button 
                      className={`w-16 h-16 ${job.status === 'active' ? 'bg-white' : 'bg-white/30'} rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2`} 
                      title={job.name}
                    />
                    <span className="text-xs text-gray-300">{job.name}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>

            {/* Account Management Agent */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative md:row-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Account Management</span>
                <span className="px-2 py-1 bg-purple-800/50 rounded-full text-xs">
                  {accountManagementJobs.filter(job => job.status === 'active').length} active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {accountManagementJobs.map(job => (
                  <div key={job.id} className="flex flex-col items-center">
                    <button 
                      className={`w-16 h-16 ${job.status === 'active' ? 'bg-white' : 'bg-white/30'} rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2`} 
                      title={job.name}
                    />
                    <span className="text-xs text-gray-300">{job.name}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 