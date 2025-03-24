'use client'

import React, { useState } from 'react'
import { Job } from "@/lib/types"
import { ChatWindow } from './chat-window'
import { MessageCircleIcon } from 'lucide-react'

interface ChatButtonProps {
  job: Job
  className?: string
}

function ChatButton({ job, className = '' }: ChatButtonProps) {
  const [isWindowOpen, setIsWindowOpen] = useState(false)
  
  const handleOpenChat = () => {
    setIsWindowOpen(true)
  }
  
  return (
    <>
      <button 
        onClick={handleOpenChat}
        className={`flex items-center justify-center p-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all shadow-md ${className}`}
        title={`Chat with ${job.name}`}
      >
        <MessageCircleIcon className="h-5 w-5" />
        {job.status === 'active' && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
        )}
      </button>
      
      {isWindowOpen && (
        <ChatWindow 
          isOpen={isWindowOpen} 
          onClose={() => setIsWindowOpen(false)} 
          job={job}
        />
      )}
    </>
  )
}

export { ChatButton } 