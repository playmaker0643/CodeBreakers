import { useEffect } from 'react';
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/store';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const AdminDashboard = () => {
  const { stats, fetchStats } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses.toString(),
      change: '+3',
      trend: 'up',
      icon: BookOpen,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Total Lessons',
      value: stats.totalLessons.toString(),
      change: '+24',
      trend: 'up',
      icon: GraduationCap,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      title: 'Avg. Progress',
      value: `${stats.averageProgress}%`,
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-neon',
      bgColor: 'bg-neon/10',
    },
  ];

  const enrollmentData = [
    { month: 'Jan', students: 120 },
    { month: 'Feb', students: 150 },
    { month: 'Mar', students: 180 },
    { month: 'Apr', students: 220 },
    { month: 'May', students: 280 },
    { month: 'Jun', students: 350 },
  ];

  const courseCompletionData = [
    { name: 'Frontend', completed: 85, enrolled: 120 },
    { name: 'Backend', completed: 65, enrolled: 95 },
    { name: 'Security', completed: 45, enrolled: 70 },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'enrolled in', target: 'Frontend Mastery', time: '2 min ago' },
    { user: 'Jane Smith', action: 'completed', target: 'JavaScript Basics', time: '15 min ago' },
    { user: 'Mike Johnson', action: 'submitted', target: 'React Assignment', time: '1 hour ago' },
    { user: 'Sarah Williams', action: 'passed', target: 'Security Exam', time: '2 hours ago' },
    { user: 'Tom Brown', action: 'enrolled in', target: 'Backend Architecture', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-dark-light border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`h-8 w-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-400 mr-1" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <Card className="bg-dark-light border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Student Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1b1b1b',
                      border: '1px solid #333',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#d5ff3f"
                    strokeWidth={2}
                    dot={{ fill: '#d5ff3f', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Course Completion Chart */}
        <Card className="bg-dark-light border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1b1b1b',
                      border: '1px solid #333',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="enrolled" fill="#666" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="#d5ff3f" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="bg-dark-light border-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-neon" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-dark rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-neon/20 rounded-full flex items-center justify-center">
                      <span className="text-neon text-xs font-bold">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white">
                        <span className="font-medium">{activity.user}</span>{' '}
                        <span className="text-gray-400">{activity.action}</span>{' '}
                        <span className="text-neon">{activity.target}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-dark-light border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-neon" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-dark rounded-lg">
              <p className="text-gray-400 text-sm">New Enrollments</p>
              <p className="text-2xl font-bold text-white">{stats.recentEnrollments}</p>
              <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                <div
                  className="bg-neon rounded-full h-2"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
            <div className="p-4 bg-dark rounded-lg">
              <p className="text-gray-400 text-sm">Course Completion Rate</p>
              <p className="text-2xl font-bold text-white">{stats.completionRate}%</p>
              <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                <div
                  className="bg-green-400 rounded-full h-2"
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
            </div>
            <div className="p-4 bg-dark rounded-lg">
              <p className="text-gray-400 text-sm">Active Students</p>
              <p className="text-2xl font-bold text-white">2,847</p>
              <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-400 rounded-full h-2"
                  style={{ width: '85%' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
