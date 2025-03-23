import Image from "next/image"
import Link from "next/link"
import { MessageSquare, Phone, Mic, Share2, Grid3X3, Link2, Settings, MonitorSmartphone, Search, Wrench } from "lucide-react"
import { fetchAgents, fetchRecentActivities } from "@/lib/api"
import { Activity, Agent } from "@/lib/types"

export default async function NozzleVirtualOffice() {
  // Fetch data from Supabase
  const agents = await fetchAgents();
  const activities = await fetchRecentActivities(4);
  
  // Calculate the total number of jobs
  const totalJobs = agents.reduce((sum, agent) => sum + agent.total_jobs, 0);
  
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
        {/* Left sidebar */}
        <div className="w-48 p-4 space-y-4">
          <Link href="/" className="block">
            <div className="flex items-center bg-black/20 px-1 py-0.5 rounded-sm">
              <div className="w-2 h-2 bg-lime-400 rounded-full mr-1"></div>
              <span className="w-8 text-lime-400">00</span>
              <span className="text-lime-400">Home</span>
            </div>
          </Link>
          {agents.map((agent, index) => (
            <Link key={agent.id} href={`/${agent.type}`} className="block">
              <div className="flex items-center px-1 py-0.5 rounded-sm">
                <span className="w-8 text-gray-400">{`0${index + 1}`}</span>
                <span className="text-gray-300">{agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}</span>
                <span className="ml-2 px-1.5 bg-gray-700 rounded text-xs">{agent.total_jobs}</span>
              </div>
            </Link>
          ))}
          <div className="flex items-center mt-4">
            <span className="px-1.5 bg-gray-700 rounded text-xs mr-2">{totalJobs}</span>
            <span className="text-gray-300">Jobs Total</span>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col p-6">
          <h1 className="text-2xl font-semibold mb-6">Agent Dashboard</h1>
          
          {/* Main grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Agent Cards */}
            {agents.map((agent) => (
              <Link 
                key={agent.id} 
                href={`/${agent.type}`} 
                className="bg-purple-950/80 rounded-lg p-4 relative hover:bg-purple-900/90 transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-lg font-medium">{agent.name}</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">{agent.description}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-purple-800 rounded-full text-xs">{agent.total_jobs} jobs</span>
                  <span className="px-2 py-1 bg-green-800 rounded-full text-xs">{agent.active_jobs} active</span>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Recent Activity Section */}
          <div className="mt-8">
            <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
            <div className="bg-purple-950/80 rounded-lg p-4">
              <ul className="space-y-3">
                {activities.map((activity) => {
                  // Determine status color
                  const statusColor = activity.status === 'success' ? 'bg-green-400' : 
                                     activity.status === 'warning' ? 'bg-yellow-400' : 'bg-blue-400';
                  
                  // Format timestamp
                  const timestamp = new Date(activity.created_at);
                  const now = new Date();
                  const diffMs = now.getTime() - timestamp.getTime();
                  const diffMins = Math.round(diffMs / 60000);
                  const diffHours = Math.round(diffMs / 3600000);
                  
                  let timeAgo = '';
                  if (diffMins < 60) {
                    timeAgo = `${diffMins} mins ago`;
                  } else {
                    timeAgo = `${diffHours} hours ago`;
                  }
                  
                  return (
                    <li key={activity.id} className="flex items-center gap-3 p-2 hover:bg-purple-900/50 rounded-md">
                      <div className={`w-2 h-2 ${statusColor} rounded-full`}></div>
                      <span className="text-sm">{activity.description}</span>
                      <span className="text-xs text-gray-400 ml-auto">{timeAgo}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

