'use client';

import Header from '@/components/Header';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import { useChat } from '@/hooks/useChat';

export default function Home() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header 
        onClearChat={clearMessages}
        messageCount={messages.length}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full min-h-0">
        {/* Glass container for chat - adjusted for mobile */}
        <div className="flex-1 glass rounded-3xl m-2 sm:m-4 mb-0 border shadow-2xl overflow-hidden flex flex-col min-h-0 bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 dark:from-slate-800/10 dark:via-slate-700/5 dark:to-slate-800/10">
          <ChatWindow 
            messages={messages}
            isLoading={isLoading}
          />
        </div>

        {/* Input area - mobile optimized */}
        <div className="px-2 sm:px-4 pb-2 sm:pb-4 pt-2 safe-area-pb">
          <ChatInput 
            onSendMessage={sendMessage}
            isLoading={isLoading}
          />
        </div>

        {/* Error display */}
        {error && (
          <div className="mx-2 sm:mx-4 mb-2 sm:mb-4 p-3 glass border border-red-500/20 rounded-2xl animate-slide-up">
            <div className="flex items-center gap-2 text-red-400">
              <span className="text-sm">⚠️</span>
              <span className="text-sm">{error}</span>
              <button 
                onClick={() => window.location.reload()} 
                className="ml-auto text-xs underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
