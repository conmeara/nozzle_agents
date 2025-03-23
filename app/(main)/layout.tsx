import { Navbar } from "@/components/navbar"
import { MainSidebar } from "@/components/main-sidebar"
import { fetchAgents } from "@/lib/api"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const agents = await fetchAgents()

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