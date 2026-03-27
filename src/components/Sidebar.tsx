import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  Calendar,
  Code2,
  Shield,
  MessageSquare,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GraduationCap,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore, useUIStore } from '@/store';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const adminLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Students', href: '/admin/students', icon: Users },
    { name: 'Exams', href: '/admin/exams', icon: FileText },
    { name: 'Attendance', href: '/admin/attendance', icon: Calendar },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  ];

  const studentLinks = [
    { name: 'Dashboard', href: '/student', icon: LayoutDashboard },
    { name: 'My Courses', href: '/student/courses', icon: BookOpen },
    { name: 'Exams', href: '/student/exams', icon: FileText },
    { name: 'Progress', href: '/student/progress', icon: BarChart3 },
    { name: 'Coding Sandbox', href: '/student/sandbox', icon: Code2 },
    { name: 'Security Training', href: '/student/security', icon: Shield },
    { name: 'Messages', href: '/student/messages', icon: MessageSquare },
    { name: 'Notifications', href: '/student/notifications', icon: Bell },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  const isActive = (path: string) => {
    if (path === '/admin' || path === '/student') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-dark border-r border-gray-800 transition-all duration-300 z-40',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        <Link to={isAdmin ? '/admin' : '/student'} className="flex items-center space-x-2">
          <div className="relative flex-shrink-0">
            <Code2 className="h-8 w-8 text-neon" />
            <Shield className="h-4 w-4 text-neon absolute -bottom-1 -right-1" />
          </div>
          {sidebarOpen && (
            <span className="font-display text-xl font-bold text-white">
              Code<span className="text-neon">Breakers</span>
            </span>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-neon transition-colors"
        >
          {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
              isActive(link.href)
                ? 'bg-neon/10 text-neon border-l-2 border-neon'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            )}
          >
            <link.icon className={cn(
              'h-5 w-5 flex-shrink-0',
              isActive(link.href) ? 'text-neon' : 'group-hover:text-neon'
            )} />
            {sidebarOpen && (
              <span className="font-medium text-sm">{link.name}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        {/* User Info */}
        <div className={cn(
          'flex items-center mb-4',
          sidebarOpen ? 'space-x-3' : 'justify-center'
        )}>
          <div className="h-10 w-10 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-5 w-5 text-neon" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-white font-medium text-sm truncate">{user?.name}</p>
              <p className="text-gray-500 text-xs truncate capitalize">{user?.role}</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            'w-full text-gray-400 hover:text-red-400 hover:bg-red-400/10',
            !sidebarOpen && 'justify-center px-2'
          )}
        >
          <LogOut className="h-5 w-5" />
          {sidebarOpen && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
