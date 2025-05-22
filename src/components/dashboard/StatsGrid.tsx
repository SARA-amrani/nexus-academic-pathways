
import React from 'react';
import { StatCard } from './StatCard';
import { mockStatCards } from '@/data/mockData';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StatsGrid() {
  // Add an AI Assistant stat card
  const aiAssistantStat = {
    id: 'ai-assistant',
    title: 'AI Assistant',
    value: 'Available',
    icon: 'MessageSquare',
    color: 'bg-edu-blue-100 dark:bg-edu-blue-900/30',
    link: '/assistant'
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 animate-fade-in">
      {mockStatCards.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
      
      {/* AI Assistant stat card */}
      <Link to="/assistant" className="hover:scale-[1.02] transition-all">
        <div className="bg-card border rounded-lg p-4 h-full shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">AI Assistant</p>
              <h3 className="text-2xl font-bold mt-1">Available</h3>
              <p className="text-xs text-muted-foreground mt-2">
                Ask questions or get help with your courses
              </p>
            </div>
            <div className={`p-2 rounded-md bg-edu-blue-100 dark:bg-edu-blue-900/30`}>
              <MessageSquare className="h-5 w-5 text-edu-blue-600 dark:text-edu-blue-400" />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
