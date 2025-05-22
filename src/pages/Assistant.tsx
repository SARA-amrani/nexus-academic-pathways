
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AIChatInterface } from '@/components/assistant/AIChatInterface';

const Assistant = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Learning Assistant</h2>
          <p className="text-muted-foreground">
            Ask questions, get explanations, and receive personalized guidance for your courses.
          </p>
        </div>

        <AIChatInterface />
      </div>
    </AppLayout>
  );
};

export default Assistant;
