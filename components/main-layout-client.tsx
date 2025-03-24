'use client'

import { Navbar } from "./navbar"
import { MainSidebar } from "./main-sidebar"
import { Agent } from "@/lib/types"

function MainLayoutClient({
  children,
  agents,
}: {
  children: React.ReactNode
  agents: Agent[]
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <MainSidebar agents={agents} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

export { MainLayoutClient } 