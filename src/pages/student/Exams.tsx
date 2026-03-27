import { useState } from 'react';
// import { Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Trophy,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const StudentExams = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const upcomingExams = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      course: 'Frontend Mastery',
      questions: 25,
      duration: 60,
      dueDate: 'Mar 30, 2024',
      status: 'pending',
    },
    {
      id: '2',
      title: 'React Components Quiz',
      course: 'Frontend Mastery',
      questions: 15,
      duration: 30,
      dueDate: 'Apr 5, 2024',
      status: 'pending',
    },
  ];

  const completedExams = [
    {
      id: '3',
      title: 'HTML & CSS Basics',
      course: 'Frontend Mastery',
      questions: 20,
      score: 85,
      maxScore: 100,
      completedDate: 'Mar 15, 2024',
      status: 'passed',
    },
    {
      id: '4',
      title: 'Git & Version Control',
      course: 'Frontend Mastery',
      questions: 10,
      score: 90,
      maxScore: 100,
      completedDate: 'Mar 10, 2024',
      status: 'passed',
    },
  ];

  const handleStartExam = (_examId: string) => {
    toast.info('Starting exam... Good luck!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Exams</h1>
        <p className="text-gray-400">Take exams and track your performance</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Exams</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-400">8</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">4</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg. Score</p>
                <p className="text-2xl font-bold text-neon">82%</p>
              </div>
              <Trophy className="h-8 w-8 text-neon/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2">
        {(['upcoming', 'completed'] as const).map((tab) => (
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
            {tab}
          </Button>
        ))}
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {activeTab === 'upcoming' ? (
          upcomingExams.map((exam) => (
            <Card key={exam.id} className="bg-dark-light border-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-neon/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-neon" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {exam.title}
                      </h3>
                      <p className="text-gray-400">{exam.course}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{exam.questions} questions</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{exam.duration} minutes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {exam.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-neon text-dark hover:bg-neon-dark">
                        <Play className="h-4 w-4 mr-2" />
                        Start Exam
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-dark-light border-gray-800 text-white">
                      <DialogHeader>
                        <DialogTitle className="font-display text-2xl">
                          Start Exam
                        </DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-gray-400 mb-4">
                          You are about to start <strong>{exam.title}</strong>.
                        </p>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-400">
                            <span className="text-white">Duration:</span> {exam.duration} minutes
                          </p>
                          <p className="text-gray-400">
                            <span className="text-white">Questions:</span> {exam.questions}
                          </p>
                          <p className="text-gray-400">
                            <span className="text-white">Passing Score:</span> 70%
                          </p>
                        </div>
                        <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                          <p className="text-yellow-400 text-sm">
                            <AlertCircle className="h-4 w-4 inline mr-2" />
                            Once started, the timer cannot be paused.
                          </p>
                        </div>
                        <Button
                          className="w-full mt-6 bg-neon text-dark hover:bg-neon-dark"
                          onClick={() => handleStartExam(exam.id)}
                        >
                          Confirm & Start
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          completedExams.map((exam) => (
            <Card key={exam.id} className="bg-dark-light border-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        exam.status === 'passed'
                          ? 'bg-green-400/20'
                          : 'bg-red-400/20'
                      }`}
                    >
                      <CheckCircle
                        className={`h-6 w-6 ${
                          exam.status === 'passed'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {exam.title}
                      </h3>
                      <p className="text-gray-400">{exam.course}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{exam.questions} questions</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{exam.completedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Score</p>
                      <p
                        className={`text-2xl font-bold ${
                          exam.status === 'passed'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {exam.score}%
                      </p>
                    </div>
                    <Progress
                      value={exam.score}
                      className={`w-24 h-3 ${
                        exam.status === 'passed'
                          ? '[&>div]:bg-green-400'
                          : '[&>div]:bg-red-400'
                      }`}
                    />
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:text-neon"
                    >
                      Review
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentExams;
