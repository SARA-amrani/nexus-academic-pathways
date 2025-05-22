
import React from 'react';
import { ArrowRight, BookOpen, ClipboardList, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockModules } from '@/data/mockData';

export function RecommendedActions() {
  // Find the first in-progress module
  const currentModule = mockModules.find(m => m.status === 'in_progress');
  // Find the next available module
  const nextModule = mockModules.find(m => m.status === 'available');

  return (
    <Card className="col-span-full lg:col-span-2 animate-fade-in">
      <CardHeader>
        <CardTitle>Recommended Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {currentModule && (
          <div className="p-4 border rounded-lg hover-lift">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-edu-blue-100 dark:bg-edu-blue-900/30 text-edu-blue-600 dark:text-edu-blue-400 rounded-full">
                <BookOpen className="h-4 w-4" />
              </div>
              <h3 className="font-medium">Continue your current module</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              You're {currentModule.progress}% through "{currentModule.title}". 
              Keep up the momentum!
            </p>
            <Button size="sm" variant="outline" className="w-full sm:w-auto">
              Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
        
        {nextModule && (
          <div className="p-4 border rounded-lg hover-lift">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-edu-green-100 dark:bg-edu-green-900/30 text-edu-green-600 dark:text-edu-green-400 rounded-full">
                <ClipboardList className="h-4 w-4" />
              </div>
              <h3 className="font-medium">Start next module</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              "{nextModule.title}" is now available. Estimated time: {nextModule.estimatedHours} hours.
            </p>
            <Button size="sm" variant="outline" className="w-full sm:w-auto">
              Begin Module <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
        
        <div className="p-4 border rounded-lg hover-lift">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
              <MessageSquare className="h-4 w-4" />
            </div>
            <h3 className="font-medium">Ask the AI Assistant</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Have questions about course materials? The AI assistant can provide detailed explanations.
          </p>
          <Button size="sm" variant="outline" className="w-full sm:w-auto">
            Open Assistant <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
