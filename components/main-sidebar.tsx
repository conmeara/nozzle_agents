"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, UsersIcon, BriefcaseIcon, BarChartIcon, FileTextIcon, StickyNoteIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  count?: number
}

export function MainSidebar({ agents }: { agents?: any[] }) {
  const pathname = usePathname()
  
  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: <HomeIcon className="h-4 w-4" />,
    },
    {
      title: "Research",
      href: "/research",
      icon: <FileTextIcon className="h-4 w-4" />,
      count: agents?.find(a => a.type === 'research')?.total_jobs || 0
    },
    {
      title: "Marketing",
      href: "/marketing",
      icon: <BarChartIcon className="h-4 w-4" />,
      count: agents?.find(a => a.type === 'marketing')?.total_jobs || 0
    },
    {
      title: "Sales",
      href: "/sales",
      icon: <BriefcaseIcon className="h-4 w-4" />,
      count: agents?.find(a => a.type === 'sales')?.total_jobs || 0
    },
    {
      title: "Support",
      href: "/support",
      icon: <UsersIcon className="h-4 w-4" />,
      count: agents?.find(a => a.type === 'support')?.total_jobs || 0
    },
  ]

  // Calculate total jobs
  const totalJobs = agents?.reduce((sum, agent) => sum + agent.total_jobs, 0) || 0

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
            >
              <div className="flex w-6 items-center justify-center">
                <span className="w-5 text-gray-400 font-mono text-xs">{`0${index + 1}`}</span>
              </div>
              <span className="flex-1">{item.title}</span>
              {item.count !== undefined && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
            {totalJobs}
          </span>
          <span className="text-muted-foreground">Jobs Total</span>
        </div>
      </div>
    </div>
  )
} 