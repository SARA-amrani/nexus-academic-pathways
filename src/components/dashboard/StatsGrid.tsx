
import React from 'react';
import { StatCard } from './StatCard';
import { mockStatCards } from '@/data/mockData';

export function StatsGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 animate-fade-in">
      {mockStatCards.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </section>
  );
}
