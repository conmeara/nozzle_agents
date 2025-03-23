"use client"

import { notFound } from "next/navigation"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentPage() {
  const params = useParams()
  const agentType = params.agentType as string
  
  // Validate agent type
  const validAgentTypes = ["research", "marketing", "sales", "support"]
  if (!validAgentTypes.includes(agentType)) {
    notFound()
  }
  
  // Format agent type for display
  const formattedAgentType = agentType.charAt(0).toUpperCase() + agentType.slice(1)
  
  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{formattedAgentType} Agent</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{formattedAgentType} Dashboard</CardTitle>
            <CardDescription>Manage your {agentType} tasks and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Agent functionality coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 