// Custom type declarations for modules that TypeScript has trouble finding

declare module 'ai/react' {
  export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
  }

  export function useChat(options: {
    api?: string;
    id?: string;
    initialMessages?: Message[];
    body?: Record<string, any>;
    headers?: Record<string, string>;
    onResponse?: (response: Response) => void | Promise<void>;
    onFinish?: (message: Message) => void | Promise<void>;
    onError?: (error: Error) => void | Promise<void>;
  }): {
    messages: Message[];
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  };
}

declare module 'react-markdown' {
  import { ReactNode } from 'react';

  interface ReactMarkdownProps {
    children: string;
    className?: string;
    components?: Record<string, React.ComponentType<any>>;
  }

  export default function ReactMarkdown(props: ReactMarkdownProps): ReactNode;
}

// Declare any components that TypeScript is having trouble resolving
declare module '@/components/JobChatButton' {
  import { FC } from 'react';
  import { Job } from '@/lib/types';
  
  export interface JobChatButtonProps {
    job: Job;
  }
  
  export const JobChatButton: FC<JobChatButtonProps>;
} 