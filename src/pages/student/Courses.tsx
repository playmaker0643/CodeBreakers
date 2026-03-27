import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Play,
  CheckCircle,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useCourseStore } from '@/store';

const StudentCourses = () => {
  const { courses } = useCourseStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'in-progress') return matchesSearch; // && enrolledCourses.includes(course.id);
    if (activeTab === 'completed') return false; // Add completion logic

    return matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'bg-blue-400/20 text-blue-400';
      case 'backend':
        return 'bg-green-400/20 text-green-400';
      case 'security':
        return 'bg-red-400/20 text-red-400';
      default:
        return 'bg-gray-400/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-white">My Courses</h1>
        <p className="text-gray-400">Continue learning and track your progress</p>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex space-x-2">
          {(['all', 'in-progress', 'completed'] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab)}
              className={`capitalize ${
                activeTab === tab
                  ? 'bg-neon text-dark hover:bg-neon-dark'
                  : 'border-gray-700 text-gray-300 hover:text-neon'
              }`}
            >
              {tab.replace('-', ' ')}
            </Button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-light border-gray-800 text-white placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="bg-dark-light border-gray-800 overflow-hidden group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-light to-transparent" />
              <div className="absolute top-3 left-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                    course.category
                  )}`}
                >
                  {course.category}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{course.lessons.length} lessons</span>
                  <span className="text-gray-400">{course.duration}</span>
                </div>
                <Progress value={45} className="h-2 mt-2" />
              </div>
            </div>

            <CardContent className="p-5">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {course.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Play className="h-4 w-4" />
                    <span>12/24</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>45%</span>
                  </div>
                </div>
                <Link to={`/student/lessons/${course.id}`}>
                  <Button
                    size="sm"
                    className="bg-neon text-dark hover:bg-neon-dark"
                  >
                    Continue
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Courses */}
      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold text-white mb-6">
          Available Courses
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={`available-${course.id}`}
              className="bg-dark-light border-gray-800 overflow-hidden opacity-75"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark/60 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-gray-500" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{course.duration}</p>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-400 hover:text-neon hover:border-neon"
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
