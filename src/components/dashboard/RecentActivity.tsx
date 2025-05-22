
import React from 'react';
import { 
  CheckCircle,
  ClipboardCheck, 
  MessageCircle, 
  Video
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockActivities } from '@/data/mockData';
import { ActivityItem } from '@/types';

const IconMap = {
  'check-circle': CheckCircle,
  'clipboard-check': ClipboardCheck,
  'message-circle': MessageCircle,
  'video': Video,
};

interface ActivityItemProps {
  activity: ActivityItem;
}

function ActivityListItem({ activity }: ActivityItemProps) {
  const Icon = IconMap[activity.icon as keyof typeof IconMap] || MessageCircle;
  const timestamp = new Date(activity.timestamp);
  
  // Format the time stamp as "Today at 2:30 PM" or "Yesterday at 2:30 PM" or "May 20 at 2:30 PM"
  const formatTimeStamp = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };
  
  return (
    <div className="flex items-start space-x-4 py-4 hover:bg-muted/30 px-2 -mx-2 rounded-md transition-colors">
      <div className={`p-2 rounded-full text-white flex-shrink-0
        ${activity.type === 'module_completion' ? 'bg-edu-green-500' : ''}
        ${activity.type === 'quiz_attempt' ? 'bg-edu-blue-500' : ''}
        ${activity.type === 'resource_view' ? 'bg-edu-amber-500' : ''}
        ${activity.type === 'ai_interaction' ? 'bg-purple-500' : ''}
      `}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="space-y-1 flex-1">
        <p className="text-sm font-medium leading-none">{activity.title}</p>
        <p className="text-xs text-muted-foreground">{activity.details}</p>
        <p className="text-xs text-muted-foreground/70">{formatTimeStamp(timestamp)}</p>
      </div>
    </div>
  );
}

export function RecentActivity() {
  return (
    <Card className="col-span-full lg:col-span-2 animate-fade-in">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto edu-scroll">
        <div className="space-y-0 divide-y">
          {mockActivities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
