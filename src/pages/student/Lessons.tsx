import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Play,
  CheckCircle,
  Lock,
  Clock,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useCourseStore } from '@/store';
import { toast } from 'sonner';

const StudentLessons = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses } = useCourseStore();
  const [activeLesson, setActiveLesson] = useState(0);

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Course not found</p>
        <Link to="/student/courses">
          <Button className="mt-4 bg-neon text-dark">Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const currentLesson = course.lessons[activeLesson];

  const handleCompleteLesson = () => {
    toast.success('Lesson completed!');
    if (activeLesson < course.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-gray-400 mb-2">
            <Link to="/student/courses" className="hover:text-neon">
              My Courses
            </Link>
            <span>/</span>
            <span className="text-neon">{course.title}</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            {currentLesson.title}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-gray-400 text-sm">Progress</p>
            <p className="text-neon font-medium">
              {activeLesson + 1} / {course.lessons.length} lessons
            </p>
          </div>
          <Progress
            value={((activeLesson + 1) / course.lessons.length) * 100}
            className="w-32 h-3"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-dark-light border-gray-800 overflow-hidden">
            <div className="aspect-video bg-dark flex items-center justify-center relative">
              <div className="text-center">
                <div className="h-20 w-20 bg-neon/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-neon/30 transition-colors">
                  <Play className="h-10 w-10 text-neon" />
                </div>
                <p className="text-gray-400">Click to play lesson video</p>
              </div>
              {/* Video Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button size="sm" variant="ghost" className="text-white">
                      <Play className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-400">0:00 / {currentLesson.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="text-white">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Progress value={0} className="h-1 mt-2" />
              </div>
            </div>
          </Card>

          {/* Lesson Content */}
          <Card className="bg-dark-light border-gray-800">
            <CardContent className="p-6">
              <h2 className="font-display text-xl font-bold text-white mb-4">
                About This Lesson
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                {currentLesson.description}
              </p>

              <h3 className="font-display text-lg font-bold text-white mb-3">
                What You'll Learn
              </h3>
              <ul className="space-y-2 mb-6">
                {[
                  'Understanding core concepts and fundamentals',
                  'Practical implementation techniques',
                  'Best practices and common pitfalls',
                  'Real-world application examples',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-neon flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-display text-lg font-bold text-white mb-3">
                Resources
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Lesson Slides.pdf', size: '2.4 MB' },
                  { name: 'Source Code.zip', size: '1.1 MB' },
                  { name: 'Exercise Files.zip', size: '856 KB' },
                ].map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-dark rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-neon" />
                      <div>
                        <p className="text-white text-sm">{resource.name}</p>
                        <p className="text-gray-500 text-xs">{resource.size}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-neon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
              disabled={activeLesson === 0}
              className="border-gray-700 text-gray-300 hover:text-neon disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Lesson
            </Button>
            <Button
              onClick={handleCompleteLesson}
              className="bg-neon text-dark hover:bg-neon-dark"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete & Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Lesson List */}
        <div className="space-y-4">
          <Card className="bg-dark-light border-gray-800">
            <CardContent className="p-4">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-neon" />
                Course Content
              </h3>
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(index)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      index === activeLesson
                        ? 'bg-neon/10 border border-neon/30'
                        : 'bg-dark hover:bg-dark-light'
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        index < activeLesson
                          ? 'bg-green-400/20'
                          : index === activeLesson
                          ? 'bg-neon/20'
                          : 'bg-gray-800'
                      }`}
                    >
                      {index < activeLesson ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : index === activeLesson ? (
                        <Play className="h-4 w-4 text-neon" />
                      ) : lesson.isLocked ? (
                        <Lock className="h-4 w-4 text-gray-600" />
                      ) : (
                        <span className="text-gray-500 text-xs">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p
                        className={`text-sm font-medium ${
                          index === activeLesson ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-600">{lesson.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentLessons;
