import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nozzle Agents - AI Agents for Your Business',
  description: 'Powerful AI agents that manage sales, support, marketing, and research tasks for your business.',
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 