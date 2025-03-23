import { Wrench, Settings } from "lucide-react"
import Link from "next/link"

export default function MarketingPage() {
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
        {/* Left sidebar - will be a shared component later */}
        <div className="w-48 p-4 space-y-4">
          <Link href="/" className="block">
            <div className="flex items-center px-1 py-0.5 rounded-sm">
              <span className="w-8 text-gray-400">00</span>
              <span className="text-gray-300">Home</span>
            </div>
          </Link>
          <Link href="/sales" className="block">
            <div className="flex items-center px-1 py-0.5 rounded-sm">
              <span className="w-8 text-gray-400">01</span>
              <span className="text-gray-300">Sales</span>
              <span className="ml-2 px-1.5 bg-gray-700 rounded text-xs">7</span>
            </div>
          </Link>
          <Link href="/support" className="block">
            <div className="flex items-center px-1 py-0.5 rounded-sm">
              <span className="w-8 text-gray-400">02</span>
              <span className="text-gray-300">Support</span>
              <span className="ml-2 px-1.5 bg-gray-700 rounded text-xs">12</span>
            </div>
          </Link>
          <Link href="/marketing" className="block">
            <div className="flex items-center bg-black/20 px-1 py-0.5 rounded-sm">
              <div className="w-2 h-2 bg-lime-400 rounded-full mr-1"></div>
              <span className="w-8 text-lime-400">03</span>
              <span className="text-lime-400">Marketing</span>
              <span className="ml-2 px-1.5 bg-lime-900 text-lime-400 rounded text-xs">48</span>
            </div>
          </Link>
          <Link href="/research" className="block">
            <div className="flex items-center px-1 py-0.5 rounded-sm">
              <span className="w-8 text-gray-400">04</span>
              <span className="text-gray-300">Research</span>
              <span className="ml-2 px-1.5 bg-gray-700 rounded text-xs">5</span>
            </div>
          </Link>
          <div className="flex items-center mt-4">
            <span className="px-1.5 bg-gray-700 rounded text-xs mr-2">130</span>
            <span className="text-gray-300">Jobs Total</span>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6">Marketing Agents</h1>
          
          {/* Grid layout for agents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Content Team - similar to screenshot's "Content Team" */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Content Team 📝</span>
                <span className="px-2 py-1 bg-yellow-800/50 rounded-full text-xs">4 active</span>
              </div>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Blog Posts" />
                  <span className="text-xs text-gray-300">Blog Posts</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Social Copy" />
                  <span className="text-xs text-gray-300">Social Copy</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>
            
            {/* Content Creator Agent - spans 2 columns */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative col-span-1 md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Content Creator Agent 🎨</span>
                <span className="px-2 py-1 bg-blue-800/50 rounded-full text-xs">6 active jobs</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">Specialized in creating high-quality content for various marketing channels.</p>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Email Templates" />
                  <span className="text-xs text-gray-300">Email Templates</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Video Scripts" />
                  <span className="text-xs text-gray-300">Video Scripts</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Landing Pages" />
                  <span className="text-xs text-gray-300">Landing Pages</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Case Studies" />
                  <span className="text-xs text-gray-300">Case Studies</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>
            
            {/* Design Studio - similar to screenshot's "Design Studio" */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Design Studio 🎨</span>
                <span className="px-2 py-1 bg-purple-800/50 rounded-full text-xs">3 active</span>
              </div>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Social Graphics" />
                  <span className="text-xs text-gray-300">Social Graphics</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Web Banners" />
                  <span className="text-xs text-gray-300">Web Banners</span>
                </div>
                <div className="flex flex-col items-center mt-3">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>
            
            {/* Campaign Manager Agent */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative md:row-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Campaign Manager 🚀</span>
                <span className="px-2 py-1 bg-green-800/50 rounded-full text-xs">4 active</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">Specialized in planning, executing, and monitoring marketing campaigns.</p>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Email Campaigns" />
                  <span className="text-xs text-gray-300">Email Campaigns</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Social Campaigns" />
                  <span className="text-xs text-gray-300">Social Campaigns</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Ad Management" />
                  <span className="text-xs text-gray-300">Ad Management</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Campaign Calendar" />
                  <span className="text-xs text-gray-300">Campaign Calendar</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>

            {/* Analytics Agent */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Analytics 📊</span>
                <span className="px-2 py-1 bg-red-800/50 rounded-full text-xs">3 active</span>
              </div>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Performance Reports" />
                  <span className="text-xs text-gray-300">Performance Reports</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="SEO Optimization" />
                  <span className="text-xs text-gray-300">SEO Optimization</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>
            
            {/* MarOps Room - like the "MarOps Room" in the screenshot */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative col-span-1 md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">MarOps Room 🚀</span>
                <span className="px-2 py-1 bg-indigo-800/50 rounded-full text-xs">+5</span>
              </div>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="A/B Testing" />
                  <span className="text-xs text-gray-300">A/B Testing</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Conversion Analysis" />
                  <span className="text-xs text-gray-300">Conversion Analysis</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Marketing Automation" />
                  <span className="text-xs text-gray-300">Marketing Automation</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Data Integration" />
                  <span className="text-xs text-gray-300">Data Integration</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 