import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, Student, Course, 
  Message, Notification, SandboxProject, SecurityModule, 
  DashboardStats, AttendanceRecord
} from '@/types';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: 'admin' | 'student') => Promise<boolean>;
  logout: () => void;
  register: (data: Partial<Student>) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email, _password, role) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: role === 'admin' ? 'Admin User' : 'Student User',
          role,
          createdAt: new Date(),
        };
        
        if (role === 'student') {
          (mockUser as Student).registrationNumber = `CB${Date.now().toString(36).toUpperCase()}`;
          (mockUser as Student).enrolledCourses = [];
          (mockUser as Student).progress = [];
          (mockUser as Student).attendance = [];
          (mockUser as Student).grades = [];
          (mockUser as Student).messages = [];
          (mockUser as Student).notifications = [];
        }
        
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      register: async (data) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockStudent: Student = {
          id: Math.random().toString(36).substr(2, 9),
          email: data.email || '',
          name: data.name || '',
          role: 'student',
          registrationNumber: `CB${Date.now().toString(36).toUpperCase()}`,
          enrolledCourses: [],
          progress: [],
          attendance: [],
          grades: [],
          messages: [],
          notifications: [],
          createdAt: new Date(),
        };
        
        set({ user: mockStudent, isAuthenticated: true, isLoading: false });
        return true;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Course Store
interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  enrolledCourses: string[];
  fetchCourses: () => void;
  enrollInCourse: (courseId: string) => void;
  setCurrentCourse: (course: Course | null) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Frontend Mastery',
    description: 'Master modern frontend development with HTML, CSS, JavaScript, and React. Build responsive, interactive web applications from scratch.',
    category: 'frontend',
    image: '/course-frontend.jpg',
    lessons: [
      { id: 'l1', courseId: '1', title: 'HTML5 Fundamentals', description: 'Learn semantic HTML', duration: '45 min', order: 1, isLocked: false, resources: [] },
      { id: 'l2', courseId: '1', title: 'CSS3 & Flexbox', description: 'Master modern CSS', duration: '60 min', order: 2, isLocked: true, resources: [] },
      { id: 'l3', courseId: '1', title: 'JavaScript ES6+', description: 'Modern JavaScript', duration: '90 min', order: 3, isLocked: true, resources: [] },
      { id: 'l4', courseId: '1', title: 'React Basics', description: 'Component-based UI', duration: '75 min', order: 4, isLocked: true, resources: [] },
    ],
    exams: [],
    assignments: [],
    enrolledStudents: 1250,
    duration: '12 weeks',
    level: 'beginner',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Backend Architecture',
    description: 'Build scalable backend systems with Node.js, Python, and modern database technologies. Learn API design and microservices.',
    category: 'backend',
    image: '/course-backend.jpg',
    lessons: [
      { id: 'l5', courseId: '2', title: 'Node.js Fundamentals', description: 'Server-side JavaScript', duration: '60 min', order: 1, isLocked: false, resources: [] },
      { id: 'l6', courseId: '2', title: 'Express.js & APIs', description: 'RESTful API design', duration: '75 min', order: 2, isLocked: true, resources: [] },
      { id: 'l7', courseId: '2', title: 'Database Design', description: 'SQL & NoSQL', duration: '90 min', order: 3, isLocked: true, resources: [] },
      { id: 'l8', courseId: '2', title: 'Python & Django', description: 'Python web framework', duration: '80 min', order: 4, isLocked: true, resources: [] },
    ],
    exams: [],
    assignments: [],
    enrolledStudents: 890,
    duration: '16 weeks',
    level: 'intermediate',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn ethical hacking, penetration testing, and security best practices. Protect applications from common vulnerabilities.',
    category: 'security',
    image: '/course-security.jpg',
    lessons: [
      { id: 'l9', courseId: '3', title: 'Security Basics', description: 'CIA Triad & principles', duration: '50 min', order: 1, isLocked: false, resources: [] },
      { id: 'l10', courseId: '3', title: 'Network Security', description: 'Protocols & encryption', duration: '70 min', order: 2, isLocked: true, resources: [] },
      { id: 'l11', courseId: '3', title: 'Web App Security', description: 'OWASP Top 10', duration: '85 min', order: 3, isLocked: true, resources: [] },
      { id: 'l12', courseId: '3', title: 'Penetration Testing', description: 'Tools & techniques', duration: '100 min', order: 4, isLocked: true, resources: [] },
    ],
    exams: [],
    assignments: [],
    enrolledStudents: 650,
    duration: '14 weeks',
    level: 'advanced',
    createdAt: new Date(),
  },
];

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: mockCourses,
      currentCourse: null,
      enrolledCourses: [],
      fetchCourses: () => {
        set({ courses: mockCourses });
      },
      enrollInCourse: (courseId) => {
        const { enrolledCourses } = get();
        if (!enrolledCourses.includes(courseId)) {
          set({ enrolledCourses: [...enrolledCourses, courseId] });
        }
      },
      setCurrentCourse: (course) => {
        set({ currentCourse: course });
      },
      completeLesson: (courseId, lessonId) => {
        // Update lesson completion logic
        const { courses } = get();
        const updatedCourses = courses.map(course => {
          if (course.id === courseId) {
            const updatedLessons = course.lessons.map((lesson, index) => {
              if (lesson.id === lessonId) {
                // Unlock next lesson
                const nextLesson = course.lessons[index + 1];
                if (nextLesson) {
                  nextLesson.isLocked = false;
                }
              }
              return lesson;
            });
            return { ...course, lessons: updatedLessons };
          }
          return course;
        });
        set({ courses: updatedCourses });
      },
    }),
    {
      name: 'course-storage',
    }
  )
);

// Sandbox Store
interface SandboxState {
  projects: SandboxProject[];
  currentProject: SandboxProject | null;
  output: string;
  createProject: (name: string, language: string) => void;
  saveProject: (project: SandboxProject) => void;
  setCurrentProject: (project: SandboxProject | null) => void;
  executeCode: (code: string, language: string) => Promise<string>;
}

export const useSandboxStore = create<SandboxState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProject: null,
      output: '',
      createProject: (name, language) => {
        const newProject: SandboxProject = {
          id: Math.random().toString(36).substr(2, 9),
          studentId: '',
          name,
          language: language as any,
          code: '',
          files: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set({ projects: [...get().projects, newProject], currentProject: newProject });
      },
      saveProject: (project) => {
        const { projects } = get();
        const updatedProjects = projects.map(p => p.id === project.id ? project : p);
        set({ projects: updatedProjects });
      },
      setCurrentProject: (project) => {
        set({ currentProject: project });
      },
      executeCode: async (_code, language) => {
        // Simulate code execution
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let output = '';
        if (language === 'html') {
          output = 'HTML rendered successfully';
        } else if (language === 'javascript') {
          try {
            // Safe evaluation for demo
            output = 'JavaScript executed successfully\n> Console output would appear here';
          } catch (e) {
            output = `Error: ${e}`;
          }
        } else if (language === 'python') {
          output = 'Python code executed\n> Output would appear here';
        } else {
          output = 'Code executed successfully';
        }
        
        set({ output });
        return output;
      },
    }),
    {
      name: 'sandbox-storage',
    }
  )
);

// Communication Store
interface CommunicationState {
  messages: Message[];
  notifications: Notification[];
  unreadCount: number;
  sendMessage: (receiverId: string, content: string) => void;
  markMessageAsRead: (messageId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
}

export const useCommunicationStore = create<CommunicationState>()(
  persist(
    (set, get) => ({
      messages: [],
      notifications: [],
      unreadCount: 0,
      sendMessage: (receiverId, content) => {
        const newMessage: Message = {
          id: Math.random().toString(36).substr(2, 9),
          senderId: '',
          receiverId,
          content,
          timestamp: new Date(),
          isRead: false,
        };
        set({ messages: [...get().messages, newMessage] });
      },
      markMessageAsRead: (messageId) => {
        const { messages } = get();
        const updatedMessages = messages.map(m => 
          m.id === messageId ? { ...m, isRead: true } : m
        );
        set({ messages: updatedMessages });
      },
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        };
        set({ 
          notifications: [newNotification, ...get().notifications],
          unreadCount: get().unreadCount + 1
        });
      },
      markNotificationAsRead: (notificationId) => {
        const { notifications } = get();
        const updatedNotifications = notifications.map(n => 
          n.id === notificationId ? { ...n, isRead: true } : n
        );
        set({ 
          notifications: updatedNotifications,
          unreadCount: Math.max(0, get().unreadCount - 1)
        });
      },
      clearAllNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      },
    }),
    {
      name: 'communication-storage',
    }
  )
);

// Admin Store
interface AdminState {
  stats: DashboardStats;
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  fetchStats: () => void;
  fetchStudents: () => void;
  updateStudent: (student: Student) => void;
  addAttendance: (record: AttendanceRecord) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      stats: {
        totalStudents: 2847,
        totalCourses: 12,
        totalLessons: 156,
        averageProgress: 68,
        recentEnrollments: 145,
        completionRate: 82,
      },
      students: [],
      attendanceRecords: [],
      fetchStats: () => {
        // Mock stats
        set({
          stats: {
            totalStudents: 2847,
            totalCourses: 12,
            totalLessons: 156,
            averageProgress: 68,
            recentEnrollments: 145,
            completionRate: 82,
          }
        });
      },
      fetchStudents: () => {
        // Mock students would be fetched here
      },
      updateStudent: (student) => {
        const { students } = get();
        const updatedStudents = students.map(s => s.id === student.id ? student : s);
        set({ students: updatedStudents });
      },
      addAttendance: (record) => {
        set({ attendanceRecords: [...get().attendanceRecords, record] });
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);

// Security Training Store
interface SecurityState {
  modules: SecurityModule[];
  currentModule: SecurityModule | null;
  completedModules: string[];
  fetchModules: () => void;
  setCurrentModule: (module: SecurityModule | null) => void;
  completeModule: (moduleId: string) => void;
}

const mockSecurityModules: SecurityModule[] = [
  {
    id: 'sec1',
    title: 'Authentication & Authorization',
    description: 'Learn secure authentication patterns and authorization best practices.',
    category: 'authentication',
    content: [
      { id: 'c1', title: 'Password Security', content: 'Strong password policies and hashing techniques.' },
      { id: 'c2', title: 'JWT Tokens', content: 'JSON Web Tokens for stateless authentication.' },
      { id: 'c3', title: 'OAuth 2.0', content: 'Third-party authentication flows.' },
    ],
    vulnerabilities: [
      { id: 'v1', name: 'Weak Password Policy', cwe: 'CWE-521', description: 'Allowing weak passwords', impact: 'Account takeover', mitigation: 'Enforce strong password requirements' },
    ],
  },
  {
    id: 'sec2',
    title: 'Data Protection',
    description: 'Protect sensitive data with encryption and secure storage practices.',
    category: 'data-protection',
    content: [
      { id: 'c4', title: 'Encryption at Rest', content: 'Database and file encryption techniques.' },
      { id: 'c5', title: 'Encryption in Transit', content: 'TLS/SSL implementation.' },
    ],
    vulnerabilities: [],
  },
  {
    id: 'sec3',
    title: 'API Security',
    description: 'Secure your APIs against common attacks and vulnerabilities.',
    category: 'api-security',
    content: [
      { id: 'c6', title: 'Rate Limiting', content: 'Prevent abuse with request throttling.' },
      { id: 'c7', title: 'Input Validation', content: 'Sanitize and validate all inputs.' },
    ],
    vulnerabilities: [],
  },
  {
    id: 'sec4',
    title: 'Penetration Testing Basics',
    description: 'Introduction to ethical hacking and vulnerability assessment.',
    category: 'penetration-testing',
    content: [
      { id: 'c8', title: 'Reconnaissance', content: 'Information gathering techniques.' },
      { id: 'c9', title: 'Scanning', content: 'Network and vulnerability scanning.' },
    ],
    vulnerabilities: [],
  },
];

export const useSecurityStore = create<SecurityState>()(
  persist(
    (set, get) => ({
      modules: mockSecurityModules,
      currentModule: null,
      completedModules: [],
      fetchModules: () => {
        set({ modules: mockSecurityModules });
      },
      setCurrentModule: (module) => {
        set({ currentModule: module });
      },
      completeModule: (moduleId) => {
        const { completedModules } = get();
        if (!completedModules.includes(moduleId)) {
          set({ completedModules: [...completedModules, moduleId] });
        }
      },
    }),
    {
      name: 'security-storage',
    }
  )
);

// UI Store
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'dark',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
