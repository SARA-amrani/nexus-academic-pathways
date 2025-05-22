
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { RoadmapTimeline } from '@/components/roadmap/RoadmapTimeline';
import { mockCourses } from '@/data/mockData';

const Roadmaps = () => {
  const currentCourse = mockCourses[0];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">{currentCourse.title} Roadmap</h2>
          <p className="text-muted-foreground">
            Your personalized learning path is tailored to your progress and learning style.
          </p>
        </div>

        <RoadmapTimeline />
      </div>
    </AppLayout>
  );
};

export default Roadmaps;
