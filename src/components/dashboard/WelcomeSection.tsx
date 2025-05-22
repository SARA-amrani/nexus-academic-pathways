
import React from 'react';
import { mockUser, mockCourses } from '@/data/mockData';

export function WelcomeSection() {
  const today = new Date();
  const hours = today.getHours();
  const currentCourse = mockCourses[0]; // Using the first course as current
  
  let greeting = 'Good morning';
  if (hours >= 12 && hours < 17) {
    greeting = 'Good afternoon';
  } else if (hours >= 17) {
    greeting = 'Good evening';
  }
  
  return (
    <section className="animate-fade-in">
      <div className="relative overflow-hidden rounded-xl p-6 glass-effect">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold">
            {greeting}, {mockUser.name}!
          </h1>
          
          <p className="mt-2 text-muted-foreground">
            You're making good progress in <span className="font-medium text-foreground">{currentCourse.title}</span>.
            Here's what you need to focus on today.
          </p>
          
          <div className="mt-4 flex items-center">
            <div className="w-full max-w-xs bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-edu-blue-600 to-edu-green-500 progress-bar"
                style={{ width: `${currentCourse.progress}%` }}
              />
            </div>
            <span className="ml-3 text-sm font-medium">{currentCourse.progress}% complete</span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-gradient-to-br from-edu-blue-500/20 to-edu-green-500/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-1/4 -mb-8 w-24 h-24 bg-gradient-to-tr from-edu-amber-500/20 to-edu-blue-500/20 rounded-full blur-xl" />
      </div>
    </section>
  );
}
