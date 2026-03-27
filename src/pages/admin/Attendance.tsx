import { useState } from 'react';
import {
  Calendar,
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
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
// Toast import reserved for future use

const AdminAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock attendance data
  const attendanceData = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      registrationNumber: 'CB8X2K9M1',
      status: 'present',
      checkIn: '09:15 AM',
      checkOut: '05:30 PM',
      duration: '8h 15m',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      registrationNumber: 'CB7P4L2N8',
      status: 'present',
      checkIn: '09:30 AM',
      checkOut: '-',
      duration: '-',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      registrationNumber: 'CB9Q5R3T7',
      status: 'late',
      checkIn: '10:45 AM',
      checkOut: '-',
      duration: '-',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      registrationNumber: 'CB1S6U4V2',
      status: 'absent',
      checkIn: '-',
      checkOut: '-',
      duration: '-',
    },
    {
      id: '5',
      name: 'Tom Brown',
      email: 'tom@example.com',
      registrationNumber: 'CB3W8X5Y9',
      status: 'present',
      checkIn: '08:45 AM',
      checkOut: '04:30 PM',
      duration: '7h 45m',
    },
  ];

  const filteredData = attendanceData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    present: attendanceData.filter((s) => s.status === 'present').length,
    absent: attendanceData.filter((s) => s.status === 'absent').length,
    late: attendanceData.filter((s) => s.status === 'late').length,
    total: attendanceData.length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-400/20 text-green-400';
      case 'absent':
        return 'bg-red-400/20 text-red-400';
      case 'late':
        return 'bg-yellow-400/20 text-yellow-400';
      default:
        return 'bg-gray-400/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Attendance</h1>
          <p className="text-gray-400">Track student attendance and activity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Present</p>
                <p className="text-2xl font-bold text-green-400">{stats.present}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Absent</p>
                <p className="text-2xl font-bold text-red-400">{stats.absent}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Late</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.late}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Attendance Rate</p>
                <p className="text-2xl font-bold text-neon">
                  {Math.round(((stats.present + stats.late) / stats.total) * 100)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-neon/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-2 bg-dark-light border border-gray-800 rounded-lg px-4 py-2">
          <Calendar className="h-5 w-5 text-neon" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-white outline-none"
          />
        </div>
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
      </div>

      {/* Attendance Table */}
      <Card className="bg-dark-light border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Student</TableHead>
                <TableHead className="text-gray-400">Reg. Number</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Check In</TableHead>
                <TableHead className="text-gray-400">Check Out</TableHead>
                <TableHead className="text-gray-400">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((student) => (
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
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(
                        student.status
                      )}`}
                    >
                      {getStatusIcon(student.status)}
                      <span className="capitalize">{student.status}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-400">{student.checkIn}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-400">{student.checkOut}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-400">{student.duration}</span>
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

export default AdminAttendance;
