
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { RecommendedActions } from '@/components/dashboard/RecommendedActions';

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <WelcomeSection />
        <StatsGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <RecommendedActions />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
