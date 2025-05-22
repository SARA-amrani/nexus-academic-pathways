
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChartBig,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  Home,
  Layers,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockCourses } from '@/data/mockData';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', icon: Home, path: '/' },
  { title: 'My Roadmaps', icon: Layers, path: '/roadmaps' },
  { title: 'Active Quizzes', icon: ClipboardCheck, path: '/quizzes' },
  { title: 'Progress Analytics', icon: BarChartBig, path: '/progress' },
  { title: 'AI Assistant', icon: MessageSquare, path: '/assistant' },
  { title: 'Resources', icon: FileText, path: '/resources' },
  { title: 'Calendar', icon: Calendar, path: '/calendar' },
];

export function AppSidebar() {
  const [activePath, setActivePath] = useState('/');
  const currentCourse = mockCourses[0];

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-edu-blue-800 flex items-center justify-center">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl">EduNexus</span>
        </div>
        <div className="mt-4 px-2 py-2 rounded-md bg-edu-blue-50 dark:bg-sidebar-accent">
          <div className="text-sm font-medium">Current Course</div>
          <div className="text-base font-semibold truncate">{currentCourse.title}</div>
          <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-edu-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${currentCourse.progress}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{currentCourse.progress}% completed</div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'w-full flex items-center space-x-3 px-2 py-2 text-sm rounded-md',
                      activePath === item.path
                        ? 'bg-edu-blue-100 dark:bg-sidebar-accent text-edu-blue-800 dark:text-white font-medium'
                        : 'hover:bg-edu-blue-50 dark:hover:bg-sidebar-accent/50'
                    )}
                    onClick={() => setActivePath(item.path)}
                  >
                    <Link to={item.path} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-3 py-2 border-t">
        <Link to="/settings" className="flex items-center space-x-3 px-2 py-2 text-sm rounded-md hover:bg-edu-blue-50 dark:hover:bg-sidebar-accent/50">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
