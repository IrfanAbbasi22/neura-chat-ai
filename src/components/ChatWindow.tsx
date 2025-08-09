'use client';

import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function ChatWindow({ messages, isLoading = false }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-hidden">
      <div 
        ref={scrollRef}
        className="h-full overflow-y-auto px-4 py-6 space-y-4 scroll-smooth"
        style={{ scrollbarGutter: 'stable' }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="glass rounded-3xl p-8 max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full glass flex items-center justify-center bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-xl">
                  <span className="text-2xl">✨</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-foreground bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome to NeuraChat
              </h2>
              <p className="text-sm opacity-75 text-foreground leading-relaxed">
                Your intelligent AI assistant with beautiful glassmorphism design. 
                Start a conversation by typing a message below and experience the magic of AI.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6 text-xs opacity-50">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <div className="w-2 h-2 rounded-full bg-pink-400"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isAnimating={index === messages.length - 1}
              />
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center">
                  <span className="text-blue-500">🤖</span>
                </div>
                <div className="message-ai px-4 py-3 rounded-2xl rounded-bl-md border shadow-lg max-w-[75%] sm:max-w-[65%]">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-200"></div>
                    </div>
                    <span className="text-xs opacity-60 ml-2">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={lastMessageRef} />
          </>
        )}
      </div>
    </div>
  );
}
