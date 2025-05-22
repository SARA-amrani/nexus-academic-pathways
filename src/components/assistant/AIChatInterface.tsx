
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip, Send } from 'lucide-react';
import { mockMessages } from '@/data/mockData';
import { Message } from '@/types';
import { mockUser } from '@/data/mockData';

export function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: "I'm analyzing your question about " + newMessage.substring(0, 20) + "... This is a simulated response for the EduNexus AI assistant demo.",
        timestamp: new Date().toISOString(),
        relatedModules: ['2', '5'],
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Scroll to bottom
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 1500);
  };
  
  return (
    <Card className="flex flex-col h-[600px] animate-fade-in">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-edu-blue-600 text-white ml-auto'
                    : 'bg-muted dark:bg-muted/50 glass-effect'
                }`}
              >
                <div className="whitespace-pre-line text-sm">{message.content}</div>
                
                {message.relatedModules && (
                  <div className="mt-2 pt-2 border-t border-white/10 flex gap-1 flex-wrap">
                    {message.relatedModules.map(moduleId => (
                      <span key={moduleId} className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                        Module {moduleId}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-muted dark:bg-muted/50 glass-effect p-4 rounded-lg">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <CardFooter className="border-t p-3">
        <div className="flex w-full items-center space-x-2">
          <Button size="icon" variant="outline">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Ask a question..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
