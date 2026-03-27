import { useState } from 'react';
import { Search, Bell, MessageSquare, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore, useCommunicationStore, useUIStore } from '@/store';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useAuthStore();
  const { notifications, unreadCount, messages } = useCommunicationStore();
  const { toggleSidebar } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');

  const recentNotifications = notifications.slice(0, 5);
  const unreadMessages = messages.filter(m => !m.isRead).length;

  return (
    <header className="h-16 bg-dark border-b border-gray-800 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-neon hover:bg-neon/10"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64 bg-dark-light border-gray-700 text-white placeholder:text-gray-500 focus:border-neon focus:ring-neon"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Messages */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-400 hover:text-neon hover:bg-neon/10"
            >
              <MessageSquare className="h-5 w-5" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-neon text-dark text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-dark-light border-gray-700">
            <DropdownMenuLabel className="text-white">Messages</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            {messages.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No messages yet
              </div>
            ) : (
              messages.slice(0, 3).map((message) => (
                <DropdownMenuItem
                  key={message.id}
                  className="text-gray-300 hover:bg-gray-800 cursor-pointer"
                >
                  <div className="flex items-start space-x-3 py-2">
                    <div className="h-8 w-8 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-neon" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {message.senderId}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem asChild>
              <Link
                to={user?.role === 'admin' ? '/admin/messages' : '/student/messages'}
                className="text-neon text-center cursor-pointer"
              >
                View All Messages
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-400 hover:text-neon hover:bg-neon/10"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-neon text-dark text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-dark-light border-gray-700">
            <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            {recentNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No notifications
              </div>
            ) : (
              recentNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`text-gray-300 hover:bg-gray-800 cursor-pointer ${
                    !notification.isRead ? 'bg-neon/5' : ''
                  }`}
                >
                  <div className="py-2">
                    <p className="text-sm font-medium text-white">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {notification.message}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem asChild>
              <Link
                to={user?.role === 'admin' ? '/admin/notifications' : '/student/notifications'}
                className="text-neon text-center cursor-pointer"
              >
                View All Notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <div className="h-8 w-8 rounded-full bg-neon/20 flex items-center justify-center">
                <User className="h-4 w-4 text-neon" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-dark-light border-gray-700">
            <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-red-400 hover:bg-red-400/10 cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
