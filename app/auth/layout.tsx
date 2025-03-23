import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Authentication - Nozzle Agents',
    template: '%s - Nozzle Agents',
  },
  description: 'Authentication for Nozzle Agents',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
} 