import { Wrench, Settings } from "lucide-react"
import Link from "next/link"

export default function ResearchPage() {
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
            <div className="flex items-center px-1 py-0.5 rounded-sm">
              <span className="w-8 text-gray-400">03</span>
              <span className="text-gray-300">Marketing</span>
              <span className="ml-2 px-1.5 bg-gray-700 rounded text-xs">48</span>
            </div>
          </Link>
          <Link href="/research" className="block">
            <div className="flex items-center bg-black/20 px-1 py-0.5 rounded-sm">
              <div className="w-2 h-2 bg-lime-400 rounded-full mr-1"></div>
              <span className="w-8 text-lime-400">04</span>
              <span className="text-lime-400">Research</span>
              <span className="ml-2 px-1.5 bg-lime-900 text-lime-400 rounded text-xs">5</span>
            </div>
          </Link>
          <div className="flex items-center mt-4">
            <span className="px-1.5 bg-gray-700 rounded text-xs mr-2">130</span>
            <span className="text-gray-300">Jobs Total</span>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6">Research Agents</h1>
          
          {/* Grid layout for agents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Globe Theater - mimicking the screenshot's element */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative col-span-1 md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Globe Theater 🌐</span>
                <span className="px-2 py-1 bg-blue-800/50 rounded-full text-xs">1 active</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">Virtual environment for presentations and demonstrations of research findings.</p>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Product Demos" />
                  <span className="text-xs text-gray-300">Product Demos</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Market Presentations" />
                  <span className="text-xs text-gray-300">Market Presentations</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>
            
            {/* Philip - similar to the screenshot's "Philip" box */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Philip 👨‍💼</span>
                <span className="px-2 py-1 bg-yellow-800/50 rounded-full text-xs">2 active</span>
              </div>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Competitor Tracking" />
                  <span className="text-xs text-gray-300">Competitor Tracking</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Product Analysis" />
                  <span className="text-xs text-gray-300">Product Analysis</span>
                </div>
                <div className="flex flex-col items-center mt-3">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>
            
            {/* Competitive Analysis Agent */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative md:row-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Competitive Analysis 📊</span>
                <span className="px-2 py-1 bg-green-800/50 rounded-full text-xs">2 active</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">Specialized in monitoring competitors and analyzing their products and strategies.</p>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Pricing Analysis" />
                  <span className="text-xs text-gray-300">Pricing Analysis</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Feature Comparison" />
                  <span className="text-xs text-gray-300">Feature Comparison</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Market Position" />
                  <span className="text-xs text-gray-300">Market Position</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>
            
            {/* Market Intelligence Agent */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Market Intelligence</span>
                <span className="px-2 py-1 bg-purple-800/50 rounded-full text-xs">2 active</span>
              </div>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Market Trends" />
                  <span className="text-xs text-gray-300">Market Trends</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Industry News" />
                  <span className="text-xs text-gray-300">Industry News</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer mb-2" title="Add more" />
                  <span className="text-xs text-gray-400">Add more</span>
                </div>
              </div>
            </div>

            {/* Customer Research Agent - spans 2 columns */}
            <div className="bg-purple-950/80 rounded-lg p-4 relative col-span-1 md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Customer Research Agent 🔍</span>
                <span className="px-2 py-1 bg-red-800/50 rounded-full text-xs">1 active</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">Specialized in gathering and analyzing customer data, feedback, and behavioral insights.</p>
              <div className="flex flex-wrap gap-5 justify-start">
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Surveys" />
                  <span className="text-xs text-gray-300">Surveys</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="User Interviews" />
                  <span className="text-xs text-gray-300">User Interviews</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Feedback Analysis" />
                  <span className="text-xs text-gray-300">Feedback Analysis</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2" title="Persona Creation" />
                  <span className="text-xs text-gray-300">Persona Creation</span>
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