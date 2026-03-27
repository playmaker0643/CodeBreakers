// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  Code2,
  Shield,
  ArrowRight,
  Play,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuthStore, useCourseStore } from '@/store';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const { courses, enrolledCourses } = useCourseStore();

  const progressData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3.5 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 5 },
    { day: 'Sun', hours: 3 },
  ];

  const upcomingLessons = [
    { id: 1, title: 'CSS Grid & Flexbox', course: 'Frontend Mastery', duration: '45 min', completed: false },
    { id: 2, title: 'Async JavaScript', course: 'Frontend Mastery', duration: '60 min', completed: false },
    { id: 3, title: 'Express.js Routing', course: 'Backend Architecture', duration: '50 min', completed: true },
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first lesson', icon: CheckCircle, unlocked: true },
    { id: 2, title: 'Code Warrior', description: 'Complete 10 coding exercises', icon: Code2, unlocked: true },
    { id: 3, title: 'Security Expert', description: 'Finish Security Fundamentals', icon: Shield, unlocked: false },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Welcome back, <span className="text-neon">{user?.name?.split(' ')[0]}</span>!
          </h1>
          <p className="text-gray-400">Continue your learning journey today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-gray-400 text-sm">Registration Number</p>
            <p className="text-neon font-mono font-medium">
              {(user as any)?.registrationNumber || 'CB8X2K9M1'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-dark-light border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Courses Enrolled
            </CardTitle>
            <div className="h-8 w-8 bg-blue-400/10 rounded-lg flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{enrolledCourses.length || 3}</div>
            <p className="text-xs text-gray-500 mt-1">2 in progress</p>
          </CardContent>
        </Card>

        <Card className="bg-dark-light border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Lessons Completed
            </CardTitle>
            <div className="h-8 w-8 bg-green-400/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-gray-500 mt-1">+5 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-dark-light border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Overall Progress
            </CardTitle>
            <div className="h-8 w-8 bg-neon/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-neon" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">68%</div>
            <Progress value={68} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-dark-light border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Achievements
            </CardTitle>
            <div className="h-8 w-8 bg-purple-400/10 rounded-lg flex items-center justify-center">
              <Trophy className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-gray-500 mt-1">3 new this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Learning Progress Chart */}
        <Card className="bg-dark-light border-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Learning Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#666" />
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
                    dataKey="hours"
                    stroke="#d5ff3f"
                    strokeWidth={2}
                    dot={{ fill: '#d5ff3f', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Lessons */}
        <Card className="bg-dark-light border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-neon" />
              Up Next
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-start space-x-3 p-3 bg-dark rounded-lg"
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      lesson.completed ? 'bg-green-400/20' : 'bg-neon/20'
                    }`}
                  >
                    {lesson.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Play className="h-4 w-4 text-neon" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${lesson.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500">{lesson.course}</p>
                    <p className="text-xs text-gray-600">{lesson.duration}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/student/courses">
              <Button
                variant="ghost"
                className="w-full mt-4 text-neon hover:text-neon-dark hover:bg-neon/10"
              >
                View All Lessons
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning & Achievements */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <Card className="bg-dark-light border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="flex items-center space-x-4 p-4 bg-dark rounded-lg"
                >
                  <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{course.title}</h4>
                    <p className="text-gray-500 text-sm">{course.lessons.length} lessons</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex-1 bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-neon rounded-full h-2"
                          style={{ width: '45%' }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">45%</span>
                    </div>
                  </div>
                  <Link to={`/student/lessons/${course.id}`}>
                    <Button size="sm" className="bg-neon text-dark hover:bg-neon-dark">
                      Continue
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-dark-light border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-neon" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.unlocked ? 'bg-dark' : 'bg-dark/50'
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      achievement.unlocked ? 'bg-neon/20' : 'bg-gray-800'
                    }`}
                  >
                    <achievement.icon
                      className={`h-5 w-5 ${
                        achievement.unlocked ? 'text-neon' : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        achievement.unlocked ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <CheckCircle className="h-5 w-5 text-green-400 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
