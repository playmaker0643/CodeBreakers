// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
  avatar?: string;
  createdAt: Date;
}

export interface Student extends User {
  role: 'student';
  registrationNumber: string;
  enrolledCourses: string[];
  progress: CourseProgress[];
  attendance: AttendanceRecord[];
  grades: Grade[];
  messages: Message[];
  notifications: Notification[];
}

export interface Admin extends User {
  role: 'admin';
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'security';
  image: string;
  lessons: Lesson[];
  exams: Exam[];
  assignments: Assignment[];
  enrolledStudents: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: string;
  order: number;
  isLocked: boolean;
  resources: Resource[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'code' | 'link';
  url: string;
}

// Progress Types
export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  totalLessons: number;
  percentage: number;
  lastAccessed: Date;
}

// Exam Types
export interface Exam {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: Question[];
  duration: number;
  passingScore: number;
  isPublished: boolean;
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'code' | 'text';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface ExamSubmission {
  examId: string;
  studentId: string;
  answers: Answer[];
  score: number;
  submittedAt: Date;
}

export interface Answer {
  questionId: string;
  answer: string;
}

// Assignment Types
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
  maxPoints: number;
  submissions: AssignmentSubmission[];
}

export interface AssignmentSubmission {
  assignmentId: string;
  studentId: string;
  content: string;
  attachments: string[];
  score?: number;
  feedback?: string;
  submittedAt: Date;
}

// Grade Types
export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  type: 'exam' | 'assignment' | 'project';
  title: string;
  score: number;
  maxScore: number;
  gradedAt: Date;
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  courseId?: string;
}

// Communication Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'lesson' | 'exam' | 'assignment' | 'message' | 'system';
  isRead: boolean;
  createdAt: Date;
}

// Coding Sandbox Types
export interface SandboxProject {
  id: string;
  studentId: string;
  name: string;
  language: 'html' | 'javascript' | 'python' | 'nodejs';
  code: string;
  files: CodeFile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

export interface CodeExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
}

// Security Training Types
export interface SecurityModule {
  id: string;
  title: string;
  description: string;
  category: 'authentication' | 'data-protection' | 'api-security' | 'penetration-testing';
  content: SecurityContent[];
  vulnerabilities: Vulnerability[];
}

export interface SecurityContent {
  id: string;
  title: string;
  content: string;
  codeExamples?: CodeExample[];
}

export interface CodeExample {
  title: string;
  vulnerable: string;
  secure: string;
  explanation: string;
}

export interface Vulnerability {
  id: string;
  name: string;
  cwe: string;
  description: string;
  impact: string;
  mitigation: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalLessons: number;
  averageProgress: number;
  recentEnrollments: number;
  completionRate: number;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

// Blog Post
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: Date;
  tags: string[];
}
