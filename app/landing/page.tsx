import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LandingHeader } from "@/components/landing-header"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-24">
        <div className="container flex flex-col items-center text-center gap-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              AI Agents for Your Business
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Powerful AI agents that handle sales, support, marketing, and research tasks 
              so you can focus on what matters most.
            </p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24 bg-muted/50">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Virtual Office for AI Agents
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI agents work together in a virtual office to handle your business tasks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-xl font-bold">Sales Agents</h3>
              <p>Generate leads, qualify prospects, and nurture relationships with automated follow-ups.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-xl font-bold">Support Agents</h3>
              <p>Provide 24/7 customer support, answer FAQs, and escalate issues when needed.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-xl font-bold">Marketing Agents</h3>
              <p>Create content, manage campaigns, and analyze performance with AI-powered insights.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-xl font-bold">Research Agents</h3>
              <p>Gather market intelligence, analyze competitors, and identify new opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that's right for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-8 rounded-lg border space-y-6">
              <div>
                <h3 className="text-xl font-bold">Starter</h3>
                <p className="text-3xl font-bold mt-2">$99<span className="text-muted-foreground text-lg font-normal">/month</span></p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>2 AI Agents</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>1,000 interactions/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Basic integrations</span>
                </li>
              </ul>
              <Button className="w-full" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
            <div className="bg-background p-8 rounded-lg border border-primary space-y-6 shadow-md relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div>
                <h3 className="text-xl font-bold">Professional</h3>
                <p className="text-3xl font-bold mt-2">$299<span className="text-muted-foreground text-lg font-normal">/month</span></p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>5 AI Agents</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>5,000 interactions/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Advanced integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
            <div className="bg-background p-8 rounded-lg border space-y-6">
              <div>
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="text-3xl font-bold mt-2">$999<span className="text-muted-foreground text-lg font-normal">/month</span></p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Unlimited AI Agents</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Unlimited interactions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-24 bg-muted/50">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">How do AI agents work?</h3>
              <p className="text-muted-foreground">Our AI agents use advanced language models to understand and respond to tasks just like a human would, but with increased efficiency and 24/7 availability.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Can I customize my agents?</h3>
              <p className="text-muted-foreground">Yes, you can customize your agents' personalities, knowledge base, and workflows to match your brand voice and business processes.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">What integrations do you support?</h3>
              <p className="text-muted-foreground">We integrate with popular CRM systems, email platforms, chat tools, and more. Contact us for specific integration needs.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Is my data secure?</h3>
              <p className="text-muted-foreground">Yes, we take data security seriously. All data is encrypted, and we follow industry best practices for data protection and privacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center space-y-6 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Ready to transform your business?
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Join thousands of businesses that are saving time and resources with our AI agents.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/signup">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4 max-w-xs">
            <h3 className="font-bold text-xl">Nozzle Agents</h3>
            <p className="text-muted-foreground">AI agents that manage sales, support, marketing, and research tasks for your business.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-medium">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Roadmap</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Nozzle Agents. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 