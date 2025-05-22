
import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  ChevronDown,
  ChevronUp,
  Flame,
  Target
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { StatCard as StatCardType } from '@/types';

const IconMap = {
  'chart': BarChart3,
  'calendar': Calendar,
  'flame': Flame,
  'target': Target,
};

export function StatCard({ stat }: { stat: StatCardType }) {
  const Icon = IconMap[stat.icon as keyof typeof IconMap] || BarChart3;
  
  return (
    <Card className="hover-lift transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
          
          <div className={cn(
            "p-2 rounded-full",
            stat.color === 'edu-blue' && "bg-edu-blue-100 text-edu-blue-600 dark:bg-edu-blue-900/30 dark:text-edu-blue-400",
            stat.color === 'edu-green' && "bg-edu-green-100 text-edu-green-600 dark:bg-edu-green-900/30 dark:text-edu-green-400",
            stat.color === 'edu-amber' && "bg-edu-amber-100 text-edu-amber-600 dark:bg-edu-amber-900/30 dark:text-edu-amber-400"
          )}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        
        {stat.change !== undefined && (
          <div className="mt-4 flex items-center">
            <div className={cn(
              "text-xs font-medium flex items-center",
              stat.trend === 'up' && "text-edu-green-600 dark:text-edu-green-400",
              stat.trend === 'down' && "text-red-600 dark:text-red-400",
              stat.trend === 'neutral' && "text-gray-500"
            )}>
              {stat.trend === 'up' && <ChevronUp className="h-3 w-3 mr-1" />}
              {stat.trend === 'down' && <ChevronDown className="h-3 w-3 mr-1" />}
              {stat.trend === 'up' && `+${stat.change}%`}
              {stat.trend === 'down' && `${stat.change}%`}
              {stat.trend === 'neutral' && `${stat.change}%`}
            </div>
            <span className="text-xs text-muted-foreground ml-2">since last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
