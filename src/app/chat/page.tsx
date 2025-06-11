'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Simplified types for basic chat
interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  metadata?: any;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message
    setMessages([{
      id: '1',
      content: 'Welcome to DAHAO AI Assistant! I can help you analyze proposals, check ethics compatibility, and understand cross-domain impacts. Try asking me to analyze a proposal or check the current governance status.',
      role: 'assistant',
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (content: string, role: 'user' | 'assistant', metadata?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
      metadata
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setLoading(true);

    // Add user message
    addMessage(userMessage, 'user');

    try {
      // Simple response for now - all functionality commented out
      setTimeout(() => {
        addMessage(
          `Thanks for your message: "${userMessage}"\n\n` +
          `DAHAO AI Assistant is currently in development. Soon I'll be able to help with:\n\n` +
          `• Governance status checks\n` +
          `• Ethics compatibility analysis\n` +
          `• Proposal creation and review\n` +
          `• Cross-domain impact analysis\n\n` +
          `Stay tuned for these features!`,
          'assistant'
        );
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('Sorry, there was an error processing your request. Please try again.', 'assistant');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DAHAO AI Assistant</h1>
          <p className="text-gray-600">Chat with AI about governance, ethics, and proposals</p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about governance, create proposals, analyze ethics..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !inputValue.trim()}>
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}