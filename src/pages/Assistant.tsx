
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { EnhancedAIChatInterface } from '@/components/assistant/EnhancedAIChatInterface';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ClipboardCheck } from 'lucide-react';
import { mockCourses, mockModules } from '@/data/mockData';

const Assistant = () => {
  // Current context - in a real app, this would come from your global state
  const currentCourse = mockCourses[0];
  const currentModule = mockModules.find(m => m.status === 'in_progress') || mockModules[0];

  // Quick action suggestions based on current context
  const quickActionSuggestions = [
    "Explain the concept of binary search trees",
    "Help me understand recursion better",
    "What's the difference between BFS and DFS?",
    "Can you check my quiz progress?",
    "Summarize my current module"
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Learning Assistant</h2>
          <p className="text-muted-foreground">
            Ask questions, get explanations, and receive personalized guidance for your courses.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 order-2 lg:order-1">
            <EnhancedAIChatInterface 
              quickActionSuggestions={quickActionSuggestions} 
            />
          </div>

          <div className="w-full lg:w-64 order-1 lg:order-2 space-y-6">
            {/* Context sidebar */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <h3 className="font-medium text-lg mb-4">Current Context</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Course</p>
                  <div className="flex items-center gap-2 mt-1">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <p className="font-medium">{currentCourse.title}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Current Module</p>
                  <div className="flex items-center gap-2 mt-1">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                    <p className="font-medium">{currentModule.title}</p>
                    <Badge variant="outline" className="ml-auto">
                      {currentModule.progress}% Complete
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">The assistant has access to:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Your current course materials</li>
                  <li>• Your quiz history and progress</li>
                  <li>• Your personalized roadmap</li>
                </ul>
              </div>
            </div>
            
            {/* Help tips */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <h3 className="font-medium mb-2">Tips for Better Results</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>• Be specific in your questions</li>
                <li>• Mention which module or concept you're asking about</li>
                <li>• Upload screenshots if you have visual questions</li>
                <li>• Ask for examples if explanations aren't clear</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Assistant;
