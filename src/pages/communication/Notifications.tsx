import { useState } from 'react';
import {
  Bell,
  BookOpen,
  FileText,
  MessageSquare,
  CheckCircle,
  Trash2,
  Check,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

const Notifications = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const notifications = [
    {
      id: '1',
      type: 'lesson',
      title: 'New Lesson Available',
      message: 'CSS Grid & Flexbox lesson is now available in Frontend Mastery',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'exam',
      title: 'Exam Reminder',
      message: 'JavaScript Fundamentals exam is due tomorrow',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'assignment',
      title: 'Assignment Graded',
      message: 'Your React Components assignment has been graded: 95/100',
      time: '3 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message',
      message: 'Abdussalam Nasir sent you a message',
      time: '5 hours ago',
      read: true,
    },
    {
      id: '5',
      type: 'lesson',
      title: 'Course Update',
      message: 'New content added to Backend Architecture course',
      time: 'Yesterday',
      read: true,
    },
    {
      id: '6',
      type: 'exam',
      title: 'Exam Results',
      message: 'Your HTML & CSS Basics exam results are available',
      time: '2 days ago',
      read: true,
    },
  ];

  const filteredNotifications = notifications.filter((n) =>
    filter === 'unread' ? !n.read : true
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="h-5 w-5 text-blue-400" />;
      case 'exam':
        return <FileText className="h-5 w-5 text-red-400" />;
      case 'assignment':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-purple-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson':
        return 'bg-blue-400/10 border-blue-400/30';
      case 'exam':
        return 'bg-red-400/10 border-red-400/30';
      case 'assignment':
        return 'bg-green-400/10 border-green-400/30';
      case 'message':
        return 'bg-purple-400/10 border-purple-400/30';
      default:
        return 'bg-gray-400/10 border-gray-400/30';
    }
  };

  const handleMarkAllRead = () => {
    toast.success('All notifications marked as read');
  };

  const handleClearAll = () => {
    toast.success('All notifications cleared');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white flex items-center">
            <Bell className="h-8 w-8 mr-3 text-neon" />
            Notifications
          </h1>
          <p className="text-gray-400">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleMarkAllRead}
            className="border-gray-700 text-gray-300 hover:text-neon"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button
            variant="outline"
            onClick={handleClearAll}
            className="border-gray-700 text-gray-300 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-gray-500" />
        {(['all', 'unread'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
            className={`capitalize ${
              filter === f
                ? 'bg-neon text-dark hover:bg-neon-dark'
                : 'border-gray-700 text-gray-300 hover:text-neon'
            }`}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <Card className="bg-dark-light border-gray-800">
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="p-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No notifications</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border transition-all ${
                    notification.read
                      ? 'bg-dark border-gray-800'
                      : `bg-neon/5 border-neon/30 ${getTypeColor(notification.type)}`
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        notification.read ? 'bg-gray-800' : 'bg-neon/20'
                      }`}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white font-medium">{notification.title}</p>
                          <p className="text-gray-400 text-sm mt-1">
                            {notification.message}
                          </p>
                        </div>
                        <span className="text-gray-500 text-xs">{notification.time}</span>
                      </div>
                    </div>
                    {!notification.read && (
                      <span className="h-2 w-2 bg-neon rounded-full flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Notifications;
