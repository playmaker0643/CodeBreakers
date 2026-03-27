import { useState } from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Clock,
  Users,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const AdminExams = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock exams data
  const exams = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      course: 'Frontend Mastery',
      questions: 25,
      duration: 60,
      attempts: 145,
      avgScore: 78,
      status: 'published',
    },
    {
      id: '2',
      title: 'React Components Quiz',
      course: 'Frontend Mastery',
      questions: 15,
      duration: 30,
      attempts: 89,
      avgScore: 82,
      status: 'published',
    },
    {
      id: '3',
      title: 'Node.js Basics',
      course: 'Backend Architecture',
      questions: 20,
      duration: 45,
      attempts: 67,
      avgScore: 71,
      status: 'draft',
    },
    {
      id: '4',
      title: 'Database Design',
      course: 'Backend Architecture',
      questions: 30,
      duration: 90,
      attempts: 45,
      avgScore: 75,
      status: 'published',
    },
    {
      id: '5',
      title: 'OWASP Top 10',
      course: 'Cybersecurity Fundamentals',
      questions: 40,
      duration: 120,
      attempts: 32,
      avgScore: 68,
      status: 'published',
    },
  ];

  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (_examId: string) => {
    toast.success('Exam deleted successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Exams</h1>
          <p className="text-gray-400">Create and manage course exams</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-neon text-dark hover:bg-neon-dark">
              <Plus className="h-4 w-4 mr-2" />
              Create Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-light border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Create New Exam</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm text-gray-400">Exam Title</label>
                <Input
                  placeholder="Enter exam title"
                  className="bg-dark border-gray-700 text-white mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Course</label>
                <select className="w-full bg-dark border border-gray-700 rounded-lg px-3 py-2 text-white mt-1">
                  <option value="">Select course</option>
                  <option value="frontend">Frontend Mastery</option>
                  <option value="backend">Backend Architecture</option>
                  <option value="security">Cybersecurity Fundamentals</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Duration (minutes)</label>
                  <Input
                    type="number"
                    placeholder="60"
                    className="bg-dark border-gray-700 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Passing Score (%)</label>
                  <Input
                    type="number"
                    placeholder="70"
                    className="bg-dark border-gray-700 text-white mt-1"
                  />
                </div>
              </div>
              <Button
                className="w-full bg-neon text-dark hover:bg-neon-dark"
                onClick={() => {
                  toast.success('Exam created successfully');
                  setIsAddDialogOpen(false);
                }}
              >
                Create Exam
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">Total Exams</p>
            <p className="text-2xl font-bold text-white">24</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">Total Attempts</p>
            <p className="text-2xl font-bold text-neon">1,247</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">Avg. Score</p>
            <p className="text-2xl font-bold text-green-400">76%</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">Pass Rate</p>
            <p className="text-2xl font-bold text-blue-400">82%</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search exams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-dark-light border-gray-800 text-white placeholder:text-gray-600"
        />
      </div>

      {/* Exams Table */}
      <Card className="bg-dark-light border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Exam</TableHead>
                <TableHead className="text-gray-400">Course</TableHead>
                <TableHead className="text-gray-400">Questions</TableHead>
                <TableHead className="text-gray-400">Duration</TableHead>
                <TableHead className="text-gray-400">Attempts</TableHead>
                <TableHead className="text-gray-400">Avg. Score</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.map((exam) => (
                <TableRow key={exam.id} className="border-gray-800">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-neon/20 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-neon" />
                      </div>
                      <span className="text-white font-medium">{exam.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-400">{exam.course}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-white">{exam.questions}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{exam.duration} min</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{exam.attempts}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-800 rounded-full h-2">
                        <div
                          className={`rounded-full h-2 ${
                            exam.avgScore >= 80
                              ? 'bg-green-400'
                              : exam.avgScore >= 60
                              ? 'bg-yellow-400'
                              : 'bg-red-400'
                          }`}
                          style={{ width: `${exam.avgScore}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm">{exam.avgScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 w-fit ${
                        exam.status === 'published'
                          ? 'bg-green-400/20 text-green-400'
                          : 'bg-yellow-400/20 text-yellow-400'
                      }`}
                    >
                      <CheckCircle className="h-3 w-3" />
                      <span>{exam.status}</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-dark-light border-gray-700">
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-red-400/10 cursor-pointer"
                          onClick={() => handleDelete(exam.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default AdminExams;
