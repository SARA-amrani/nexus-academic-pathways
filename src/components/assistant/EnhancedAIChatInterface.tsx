import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip as PaperclipIcon, 
  Mic, 
  FileText, 
  Image, 
  X,
  Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Message } from '@/types';
import { mockModules } from '@/data/mockData';

interface EnhancedAIChatInterfaceProps {
  quickActionSuggestions?: string[];
}

export function EnhancedAIChatInterface({ 
  quickActionSuggestions = [] 
}: EnhancedAIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: "Hello! I'm your AI Learning Assistant. How can I help you with your studies today?",
      timestamp: new Date().toISOString(),
      relatedModules: []
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState<{name: string, type: string}[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() && attachments.length === 0) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
      attachments: attachments.length > 0 ? attachments : undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setAttachments([]);
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Find related modules based on content (simplified)
    const relatedModuleIds = mockModules
      .filter(m => m.title.toLowerCase().includes(inputMessage.toLowerCase()))
      .slice(0, 2)
      .map(m => m.id);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toISOString(),
        relatedModules: relatedModuleIds
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newAttachments = Array.from(files).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'document'
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (name: string) => {
    setAttachments(prev => prev.filter(a => a.name !== name));
  };

  const handleQuickAction = (suggestion: string) => {
    setInputMessage(suggestion);
    // Optional: Auto-send the quick action
    // setInputMessage(suggestion);
    // setTimeout(() => handleSendMessage(), 100);
  };

  const toggleRecording = () => {
    // In a real app, this would use the Web Speech API
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate recording and transcription
      setTimeout(() => {
        setInputMessage(prev => prev + " What's the best way to study for the upcoming quiz?");
        setIsRecording(false);
      }, 2000);
    }
  };

  // Simple AI response generator (would be replaced with actual AI API)
  const generateAIResponse = (question: string): string => {
    if (question.toLowerCase().includes('quiz') || question.toLowerCase().includes('test')) {
      return "Based on your current progress, I recommend focusing on the data structures section for your upcoming quiz. Your previous quiz results showed some challenges with binary trees and graph algorithms.";
    } else if (question.toLowerCase().includes('concept') || question.toLowerCase().includes('explain')) {
      return "This concept relates to your current module on algorithm efficiency. Here's a simple explanation: Time complexity measures how an algorithm's performance scales with input size, while space complexity measures the memory used. Big O notation gives us a standardized way to express these measurements.";
    } else {
      return "I've analyzed your question in the context of your current module on Advanced Algorithms. Would you like me to provide more specific examples related to the concepts you're currently learning?";
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-lg border bg-background">
      {/* Chat header */}
      <div className="border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="font-medium">AI Assistant</span>
        </div>
        <Button variant="ghost" size="sm">
          Clear Chat
        </Button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`rounded-xl px-4 py-2 max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((attachment) => (
                    <div 
                      key={attachment.name} 
                      className="flex items-center gap-2 p-2 rounded bg-background/60"
                    >
                      {attachment.type === 'image' ? <Image size={16} /> : <FileText size={16} />}
                      <span className="text-xs truncate">{attachment.name}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {message.relatedModules && message.relatedModules.length > 0 && (
                <div className="mt-2 pt-2 border-t border-border/50">
                  <p className="text-xs mb-1">Related modules:</p>
                  <div className="flex flex-wrap gap-1">
                    {message.relatedModules.map(moduleId => {
                      const module = mockModules.find(m => m.id === moduleId);
                      return module ? (
                        <Badge key={moduleId} variant="outline" className="text-xs">
                          {module.title}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* AI typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
            </div>
            <span className="text-xs">AI Assistant is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick action suggestions */}
      {quickActionSuggestions.length > 0 && (
        <div className="px-4 py-2 overflow-x-auto flex gap-2 border-t">
          {quickActionSuggestions.map((suggestion, index) => (
            <Button 
              key={index} 
              variant="outline" 
              size="sm" 
              className="whitespace-nowrap text-xs"
              onClick={() => handleQuickAction(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
      
      {/* Attachment preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t flex flex-wrap gap-2">
          {attachments.map((file) => (
            <div key={file.name} className="flex items-center gap-1 bg-muted rounded-full pl-2 pr-1 py-1">
              {file.type === 'image' ? <Image size={12} /> : <FileText size={12} />}
              <span className="text-xs max-w-[100px] truncate">{file.name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 rounded-full"
                onClick={() => removeAttachment(file.name)}
              >
                <X size={10} />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {/* Chat input */}
      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="resize-none pr-12 min-h-[80px]"
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <Button 
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full opacity-70 hover:opacity-100"
                onClick={() => fileInputRef.current?.click()}
              >
                <PaperclipIcon className="h-4 w-4" />
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  multiple 
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                />
              </Button>
              <Button 
                type="button"
                variant="ghost"
                size="icon"
                className={`h-6 w-6 rounded-full ${isRecording ? 'text-red-500 bg-red-100 dark:bg-red-900/30' : 'opacity-70 hover:opacity-100'}`}
                onClick={toggleRecording}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button 
            type="button" 
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={handleSendMessage}
            disabled={isTyping || (!inputMessage.trim() && attachments.length === 0)}
          >
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
