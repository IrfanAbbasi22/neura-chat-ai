'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, isLoading = false, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Character limit validation
    if (value.length <= 2000) {
      setMessage(value);
      
      // Auto-resize textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
      }
    }
  };

  const getInputBorderColor = () => {
    if (message.length > 1800) return 'border-red-400/50';
    if (message.length > 1500) return 'border-yellow-400/50';
    return 'border-adaptive';
  };

  return (
    <div className="p-3 sm:p-4">
      <div className={`glass-input rounded-3xl ${getInputBorderColor()} shadow-2xl transition-all duration-200`}>
        <div className="flex items-center gap-3 p-3 sm:p-4">
          {/* Text input */}
          <div className="flex-1 relative min-h-[20px] flex items-center">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={isLoading ? "AI is responding..." : "Type your message..."}
              disabled={isLoading || disabled}
              rows={1}
              className="w-full bg-transparent border-none outline-none resize-none placeholder:text-foreground/40 text-adaptive text-sm sm:text-base leading-relaxed max-h-[120px] overflow-y-auto focus:placeholder:text-foreground/30 transition-all duration-200 py-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            />
          </div>

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={!message.trim() || isLoading || disabled || message.length > 2000}
            className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ios-bounce ${
              message.trim() && !isLoading && !disabled && message.length <= 2000
                ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 hover:from-blue-400 hover:to-purple-500 animate-pulse-glow cursor-pointer'
                : 'glass opacity-50 cursor-not-allowed hover:opacity-60'
            }`}
          >
            <Send 
              size={18} 
              className="sm:w-5 sm:h-5 transition-transform duration-200" 
            />
          </button>
        </div>
      </div>
      
      {/* Input hints and character counter */}
      <div className="mt-2 px-3 sm:px-4 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-xs text-adaptive opacity-50">
            Press Enter to send, Shift+Enter for new line
          </p>
          <p className={`text-xs font-medium transition-colors duration-200 ${
            message.length > 1800 
              ? 'text-red-400' 
              : message.length > 1500 
              ? 'text-yellow-400' 
              : 'text-adaptive opacity-50'
          }`}>
            {message.length}/2000
          </p>
        </div>
        
        {/* Character limit progress bar - only show when approaching limit */}
        {message.length > 1500 && (
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${
                message.length > 1800 
                  ? 'bg-gradient-to-r from-red-400 to-red-500' 
                  : 'bg-gradient-to-r from-yellow-400 to-orange-400'
              }`}
              style={{ width: `${Math.min((message.length / 2000) * 100, 100)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
