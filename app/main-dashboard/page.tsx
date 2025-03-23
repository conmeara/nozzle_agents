import Link from "next/link"
import { fetchAgents, fetchRecentActivities } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Agent } from "@/lib/types"

export default async function HomePage() {
  // Fetch data from the API
  const agents = await fetchAgents()
  const activities = await fetchRecentActivities(4)
  
  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Agent Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <Link 
            key={agent.id} 
            href={`/${agent.type}`}
            className="block group"
          >
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                    {agent.total_jobs} jobs
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full text-xs">
                    {agent.active_jobs} active
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {activities.map((activity) => {
                // Determine status color
                const statusColor = activity.status === 'success' 
                  ? 'bg-green-500' 
                  : activity.status === 'warning' 
                    ? 'bg-yellow-500' 
                    : 'bg-blue-500'
                
                // Format timestamp
                const timestamp = new Date(activity.created_at)
                const now = new Date()
                const diffMs = now.getTime() - timestamp.getTime()
                const diffMins = Math.round(diffMs / 60000)
                const diffHours = Math.round(diffMs / 3600000)
                
                let timeAgo = ''
                if (diffMins < 60) {
                  timeAgo = `${diffMins} mins ago`
                } else {
                  timeAgo = `${diffHours} hours ago`
                }
                
                return (
                  <li key={activity.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md">
                    <div className={`w-2 h-2 ${statusColor} rounded-full`}></div>
                    <span className="text-sm">{activity.description}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{timeAgo}</span>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 