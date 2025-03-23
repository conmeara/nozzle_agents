"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { ChatItem, Job } from '@/lib/types';
import { XIcon, SendIcon, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useChat } from 'ai/react';

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export function ChatDialog({ isOpen, onClose, job }: ChatDialogProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      jobId: job.id,
      agentType: job.agent_type,
    },
    initialMessages: [],
  });

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[750px] md:max-w-[850px] max-h-[90vh] h-[90vh] p-0 flex flex-col gap-0">
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b">
          <DialogTitle className="text-xl font-medium">{job?.name || 'Chat'}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XIcon className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              <p className="text-lg font-medium mb-2">No messages yet</p>
              <p className="text-sm">Start a conversation with the {job.agent_type} agent.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className="text-sm"
              >
                {message.role === 'user' ? (
                  <div className="flex justify-end">
                    <div className="ml-4 md:ml-24 rounded-[16px] px-4 py-2 bg-primary text-primary-foreground font-light max-w-[80%]">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="mr-4 md:mr-24 rounded-[16px] px-4 py-2 bg-muted text-foreground font-light max-w-[80%]">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start ml-4">
              <div className="bg-muted rounded-full p-2">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="p-4 px-6 border-t">
          <form onSubmit={handleSubmit} className="flex w-full items-end gap-2">
            <div className="flex w-full flex-col gap-1.5 rounded-[20px] p-2.5 pl-1.5 transition-colors bg-white border border-stone-200 shadow-sm">
              <div className="flex items-end gap-1.5 md:gap-2 pl-4">
                <div className="flex min-w-0 flex-1 flex-col">
                  <textarea
                    id="prompt-textarea"
                    tabIndex={0}
                    rows={1}
                    placeholder="Type a message..."
                    className="resize-none border-0 focus:outline-none text-sm bg-transparent px-0 py-2"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e as any);
                      }
                    }}
                    style={{ height: 'auto', minHeight: '24px', maxHeight: '200px' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex size-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 mb-2 mr-2"
                >
                  <SendIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
} 