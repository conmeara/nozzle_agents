import { fetchAgents } from "@/lib/api"
import { MainLayoutClient } from "@/components/main-layout-client"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const agents = await fetchAgents()

  return <MainLayoutClient agents={agents}>{children}</MainLayoutClient>
} 