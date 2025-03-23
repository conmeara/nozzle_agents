"use client";

import React, { useState } from 'react';
import { Job } from "@/lib/types";
import { ChatDialog } from '@/components/ChatDialog';

interface JobChatButtonProps {
  job: Job;
}

export function JobChatButton({ job }: JobChatButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleOpenChat = () => {
    setIsDialogOpen(true);
  };
  
  return (
    <>
      <button 
        onClick={handleOpenChat}
        className={`w-16 h-16 ${job.status === 'active' ? 'bg-white' : 'bg-white/30'} 
          rounded-full hover:bg-gray-200 transition-colors cursor-pointer mb-2 relative
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50`} 
        title={`Chat with ${job.name}`}
      >
        {/* Notification dot for active chats - could be driven by unread messages */}
        {job.status === 'active' && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
        )}
      </button>
      
      {isDialogOpen && (
        <ChatDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
          job={job}
        />
      )}
    </>
  );
} 