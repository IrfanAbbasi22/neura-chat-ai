'use client';

import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isAnimating?: boolean;
}

export default function ChatMessage({ message, isAnimating = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={`flex items-start gap-3 mb-4 px-2 ${
        isUser ? 'justify-end' : 'justify-start'
      } ${isAnimating ? 'animate-slide-up' : ''}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <Bot size={16} className="text-blue-500" />
        </div>
      )}
      
      <div
        className={`max-w-[80%] sm:max-w-[70%] md:max-w-[65%] px-4 py-3 rounded-2xl border shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
          isUser
            ? 'message-user text-foreground rounded-tr-md'
            : 'message-ai text-foreground rounded-tl-md'
        } ${isAnimating ? 'animate-bounce-in' : ''}`}
      >
        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <div className="mt-2 text-xs opacity-60 text-right">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
}
