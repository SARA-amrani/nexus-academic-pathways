
import React from 'react';
import { BookOpen, Check, Clock, Film, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Module } from '@/types';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  className?: string;
}

export function ModuleCard({ module, className }: ModuleCardProps) {
  // Determine card style based on module status
  const isClickable = module.status !== 'locked';
  
  // Status indicator configurations
  const statusConfig = {
    completed: {
      icon: Check,
      text: "Completed",
      color: "bg-edu-green-100 text-edu-green-600 dark:bg-edu-green-900/30 dark:text-edu-green-400",
    },
    in_progress: {
      icon: BookOpen,
      text: "In Progress",
      color: "bg-edu-blue-100 text-edu-blue-600 dark:bg-edu-blue-900/30 dark:text-edu-blue-400",
    },
    available: {
      icon: Clock,
      text: "Available",
      color: "bg-edu-amber-100 text-edu-amber-600 dark:bg-edu-amber-900/30 dark:text-edu-amber-400",
    },
    locked: {
      icon: Lock,
      text: "Locked",
      color: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    },
  };
  
  const status = statusConfig[module.status];
  const StatusIcon = status.icon;
  
  return (
    <Card className={cn(
      "transition-all duration-200 border",
      isClickable ? "hover-lift cursor-pointer" : "opacity-80 cursor-not-allowed",
      module.status === 'in_progress' && "ring-2 ring-edu-blue-500 ring-opacity-40",
      className
    )}>
      <CardContent className="p-5 relative">
        {/* Status badge */}
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className={cn("font-normal flex items-center gap-1", status.color)}>
            <StatusIcon className="h-3 w-3" />
            <span>{status.text}</span>
          </Badge>
          
          {module.status !== 'locked' && (
            <Badge variant="outline" className="font-normal">
              {module.adaptedDifficulty === 'easy' && "Easy"}
              {module.adaptedDifficulty === 'medium' && "Medium"}
              {module.adaptedDifficulty === 'hard' && "Advanced"}
            </Badge>
          )}
        </div>
        
        {/* Module content */}
        <h3 className="text-lg font-medium mb-2">{module.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          {module.description}
        </p>
        
        {/* Module metadata */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{module.estimatedHours}h</span>
            </div>
            <div className="flex items-center">
              <Film className="h-4 w-4 mr-1" />
              <span>{module.resourceCount}</span>
            </div>
          </div>
          
          {/* Progress bar for in-progress modules */}
          {module.status === 'in_progress' && (
            <span className="text-xs font-medium">{module.progress}% complete</span>
          )}
        </div>
        
        {/* Progress bar for in-progress modules */}
        {module.status === 'in_progress' && (
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-edu-blue-500 progress-bar"
              style={{ width: `${module.progress}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
