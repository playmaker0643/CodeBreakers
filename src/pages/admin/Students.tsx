import { useState } from 'react';
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Mail,
  GraduationCap,
  Filter,
  Download,
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
import { toast } from 'sonner';

const AdminStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock students data
  const students = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      registrationNumber: 'CB8X2K9M1',
      enrolledCourses: 3,
      progress: 75,
      lastActive: '2 hours ago',
      status: 'active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      registrationNumber: 'CB7P4L2N8',
      enrolledCourses: 2,
      progress: 45,
      lastActive: '1 day ago',
      status: 'active',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      registrationNumber: 'CB9Q5R3T7',
      enrolledCourses: 4,
      progress: 90,
      lastActive: '5 min ago',
      status: 'active',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      registrationNumber: 'CB1S6U4V2',
      enrolledCourses: 1,
      progress: 20,
      lastActive: '3 days ago',
      status: 'inactive',
    },
    {
      id: '5',
      name: 'Tom Brown',
      email: 'tom@example.com',
      registrationNumber: 'CB3W8X5Y9',
      enrolledCourses: 2,
      progress: 60,
      lastActive: '1 hour ago',
      status: 'active',
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (_studentId: string) => {
    toast.success('Student removed successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Students</h1>
          <p className="text-gray-400">Manage student accounts and progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-neon">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-neon text-dark hover:bg-neon-dark">
            <GraduationCap className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">Total Students</p>
            <p className="text-2xl font-bold text-white">2,847</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">Active Today</p>
            <p className="text-2xl font-bold text-neon">486</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">New This Week</p>
            <p className="text-2xl font-bold text-green-400">+124</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-dark-light border-gray-800 text-white placeholder:text-gray-600"
          />
        </div>
        <Button variant="outline" className="border-gray-700 text-gray-300">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Students Table */}
      <Card className="bg-dark-light border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Student</TableHead>
                <TableHead className="text-gray-400">Reg. Number</TableHead>
                <TableHead className="text-gray-400">Courses</TableHead>
                <TableHead className="text-gray-400">Progress</TableHead>
                <TableHead className="text-gray-400">Last Active</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="border-gray-800">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-neon/20 rounded-full flex items-center justify-center">
                        <span className="text-neon font-medium">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{student.name}</p>
                        <p className="text-gray-500 text-sm">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-neon font-mono text-sm">
                      {student.registrationNumber}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-white">{student.enrolledCourses}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-neon rounded-full h-2"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-400">{student.lastActive}</span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        student.status === 'active'
                          ? 'bg-green-400/20 text-green-400'
                          : 'bg-gray-400/20 text-gray-400'
                      }`}
                    >
                      {student.status}
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
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-red-400/10 cursor-pointer"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
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

export default AdminStudents;
