
import React from 'react';
import { ModuleCard } from './ModuleCard';
import { mockModules } from '@/data/mockData';

export function RoadmapTimeline() {
  return (
    <div className="relative py-8 animate-fade-in">
      {/* Timeline vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2 z-0" />
      
      <div className="relative z-10">
        {mockModules.map((module, index) => (
          <div key={module.id} className="mb-8 relative">
            {/* Week indicator */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 bg-background px-3 py-1 z-20">
              <span className="text-sm font-medium text-muted-foreground">Week {module.week}</span>
            </div>
            
            {/* Timeline node */}
            <div className={`absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1 w-6 h-6 rounded-full z-20 border-2 border-white dark:border-gray-800
              ${module.status === 'completed' ? 'bg-edu-green-500' : ''}
              ${module.status === 'in_progress' ? 'bg-edu-blue-500' : ''}
              ${module.status === 'available' ? 'bg-edu-amber-500' : ''}
              ${module.status === 'locked' ? 'bg-gray-300 dark:bg-gray-600' : ''}
            `} />
            
            {/* Module card - alternating sides */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
              index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'
            }`}>
              <div className={`${
                index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'
              }`}>
                <ModuleCard module={module} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
