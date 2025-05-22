
import React, { useState } from 'react';
import { Bell, ChevronDown, Menu, Moon, Search, Sun } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { mockUser, mockNotifications } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export function Header({ toggleTheme, isDarkMode }: HeaderProps) {
  const isMobile = useIsMobile();
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false);
  
  const unreadNotifications = mockNotifications.filter(n => !n.isRead).length;

  return (
    <header className="w-full bg-white dark:bg-card border-b sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          {isMobile && (
            <SidebarTrigger className="mr-2">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          )}
          
          {/* Search bar - hidden on mobile unless toggled */}
          {(!isMobile || showSearchOnMobile) && (
            <div className={cn("relative", isMobile && "absolute top-16 left-0 right-0 bg-white dark:bg-card p-3 border-b shadow-md z-50")}>
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className={cn("pl-9 w-60 md:w-80", isMobile && "w-full")}
                onBlur={() => isMobile && setShowSearchOnMobile(false)} 
                autoFocus={isMobile}
              />
            </div>
          )}
          
          {isMobile && !showSearchOnMobile && (
            <Button variant="ghost" size="icon" onClick={() => setShowSearchOnMobile(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-edu-amber-500 text-white text-[10px] flex items-center justify-center rounded-full pulse-badge">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockNotifications.length > 0 ? (
                mockNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-0">
                    <a
                      href={notification.link || '#'}
                      className={cn(
                        "w-full p-3 flex items-start space-x-3 text-left",
                        !notification.isRead && "bg-blue-50 dark:bg-blue-900/20"
                      )}
                    >
                      <div className={cn(
                        "w-2 h-2 mt-1.5 rounded-full flex-shrink-0",
                        notification.type === 'info' && "bg-edu-blue-500",
                        notification.type === 'success' && "bg-edu-green-500",
                        notification.type === 'warning' && "bg-edu-amber-500",
                        notification.type === 'error' && "bg-red-500",
                      )}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </a>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No notifications
                </div>
              )}
              {mockNotifications.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center font-medium">
                    View all notifications
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 pl-2 pr-0 md:pr-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex">{mockUser.name}</span>
                <ChevronDown className="h-4 w-4 ml-1 hidden md:inline-flex" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {mockUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Account settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
