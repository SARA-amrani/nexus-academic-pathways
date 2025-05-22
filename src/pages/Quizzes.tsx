
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { QuizInterface } from '@/components/quiz/QuizInterface';

const Quizzes = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Active Quiz</h2>
          <p className="text-muted-foreground">
            Complete this assessment to test your understanding of the material.
          </p>
        </div>

        <QuizInterface />
      </div>
    </AppLayout>
  );
};

export default Quizzes;
