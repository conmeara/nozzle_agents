"use client";

import React from 'react';
import { Job } from "@/lib/types";
import { ChatButton } from '@/components/ai-chat/chat-button';

interface JobChatButtonProps {
  job: Job;
}

function JobChatButton({ job }: JobChatButtonProps) {
  return (
    <ChatButton 
      job={job} 
      className="w-16 h-16"
    />
  );
}

export { JobChatButton }; 