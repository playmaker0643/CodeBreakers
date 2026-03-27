import {
  Trophy,
  Target,
  TrendingUp,
  Clock,
  BookOpen,
  CheckCircle,
  Award,
  Star,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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

const StudentProgress = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3.5 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 5 },
    { day: 'Sun', hours: 3 },
  ];

  const courseProgress = [
    { name: 'Frontend', progress: 75 },
    { name: 'Backend', progress: 45 },
    { name: 'Security', progress: 20 },
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first lesson', unlocked: true, date: 'Mar 1, 2024' },
    { id: 2, title: 'Code Warrior', description: 'Complete 10 coding exercises', unlocked: true, date: 'Mar 5, 2024' },
    { id: 3, title: 'Fast Learner', description: 'Complete 5 lessons in one day', unlocked: true, date: 'Mar 10, 2024' },
    { id: 4, title: 'Perfect Score', description: 'Get 100% on an exam', unlocked: false },
    { id: 5, title: 'Security Expert', description: 'Finish Security Fundamentals', unlocked: false },
    { id: 6, title: 'Full Stack', description: 'Complete both Frontend and Backend', unlocked: false },
  ];

  const stats = {
    totalHours: 127,
    lessonsCompleted: 24,
    exercisesCompleted: 156,
    examsPassed: 8,
    currentStreak: 12,
    longestStreak: 21,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-white">My Progress</h1>
        <p className="text-gray-400">Track your learning journey and achievements</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-neon" />
              <div>
                <p className="text-gray-400 text-xs">Total Hours</p>
                <p className="text-xl font-bold text-white">{stats.totalHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-gray-400 text-xs">Lessons</p>
                <p className="text-xl font-bold text-white">{stats.lessonsCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-xs">Exercises</p>
                <p className="text-xl font-bold text-white">{stats.exercisesCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-gray-400 text-xs">Exams Passed</p>
                <p className="text-xl font-bold text-white">{stats.examsPassed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-orange-400" />
              <div>
                <p className="text-gray-400 text-xs">Current Streak</p>
                <p className="text-xl font-bold text-white">{stats.currentStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-xs">Best Streak</p>
                <p className="text-xl font-bold text-white">{stats.longestStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card className="bg-dark-light border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-neon" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
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

        {/* Course Progress */}
        <Card className="bg-dark-light border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2 text-neon" />
              Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseProgress} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" stroke="#666" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke="#666" width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1b1b1b',
                      border: '1px solid #333',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="progress" fill="#d5ff3f" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Details */}
      <Card className="bg-dark-light border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Course Progress Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { name: 'Frontend Mastery', progress: 75, lessons: '18/24', hours: '45h' },
              { name: 'Backend Architecture', progress: 45, lessons: '9/20', hours: '22h' },
              { name: 'Cybersecurity Fundamentals', progress: 20, lessons: '4/20', hours: '8h' },
            ].map((course, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white font-medium">{course.name}</p>
                    <p className="text-gray-500 text-sm">
                      {course.lessons} lessons • {course.hours} spent
                    </p>
                  </div>
                  <span className="text-neon font-bold">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border ${
                  achievement.unlocked
                    ? 'bg-neon/5 border-neon/30'
                    : 'bg-dark border-gray-800 opacity-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      achievement.unlocked ? 'bg-neon/20' : 'bg-gray-800'
                    }`}
                  >
                    <Star
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
                    <p className="text-gray-500 text-sm">{achievement.description}</p>
                    {achievement.unlocked && achievement.date && (
                      <p className="text-neon text-xs mt-1">Unlocked {achievement.date}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProgress;
