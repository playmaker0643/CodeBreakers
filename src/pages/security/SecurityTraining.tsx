import { useState } from 'react';
import {
  Shield,
  Lock,
  Key,
  Server,
  Search,
  Bug,
  CheckCircle,
  BookOpen,
  Play,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const SecurityTraining = () => {
  const [, setActiveModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'auth',
      title: 'Authentication & Authorization',
      description: 'Learn secure authentication patterns and authorization best practices.',
      icon: Key,
      progress: 75,
      lessons: 8,
      completed: 6,
      color: 'from-blue-500/20 to-cyan-500/20',
      topics: [
        'Password Security & Hashing',
        'JWT Tokens & Session Management',
        'OAuth 2.0 & Social Login',
        'Multi-Factor Authentication',
        'Role-Based Access Control',
      ],
    },
    {
      id: 'data',
      title: 'Data Protection',
      description: 'Protect sensitive data with encryption and secure storage practices.',
      icon: Lock,
      progress: 45,
      lessons: 6,
      completed: 3,
      color: 'from-green-500/20 to-emerald-500/20',
      topics: [
        'Encryption at Rest',
        'Encryption in Transit (TLS/SSL)',
        'Key Management',
        'Data Masking & Tokenization',
        'Secure File Storage',
      ],
    },
    {
      id: 'api',
      title: 'API Security',
      description: 'Secure your APIs against common attacks and vulnerabilities.',
      icon: Server,
      progress: 30,
      lessons: 7,
      completed: 2,
      color: 'from-purple-500/20 to-pink-500/20',
      topics: [
        'Rate Limiting & Throttling',
        'Input Validation & Sanitization',
        'API Authentication',
        'CORS Configuration',
        'API Gateway Security',
      ],
    },
    {
      id: 'pentest',
      title: 'Penetration Testing',
      description: 'Introduction to ethical hacking and vulnerability assessment.',
      icon: Search,
      progress: 10,
      lessons: 10,
      completed: 1,
      color: 'from-red-500/20 to-orange-500/20',
      topics: [
        'Reconnaissance Techniques',
        'Network Scanning',
        'Vulnerability Assessment',
        'Exploitation Basics',
        'Reporting & Remediation',
      ],
    },
  ];

  const vulnerabilities = [
    {
      id: 'sql-injection',
      name: 'SQL Injection',
      severity: 'Critical',
      cwe: 'CWE-89',
      description: 'Attackers can inject malicious SQL code through user inputs.',
      vulnerable: `const query = "SELECT * FROM users WHERE id = " + userId;`,
      secure: `const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);`,
    },
    {
      id: 'xss',
      name: 'Cross-Site Scripting (XSS)',
      severity: 'High',
      cwe: 'CWE-79',
      description: 'Attackers inject malicious scripts into web pages.',
      vulnerable: `element.innerHTML = userInput;`,
      secure: `element.textContent = userInput;
// Or use a sanitization library
const clean = DOMPurify.sanitize(userInput);
element.innerHTML = clean;`,
    },
    {
      id: 'csrf',
      name: 'CSRF',
      severity: 'Medium',
      cwe: 'CWE-352',
      description: 'Attackers trick users into performing unwanted actions.',
      vulnerable: `// No CSRF protection
app.post('/transfer', (req, res) => {
  transferFunds(req.body.amount);
});`,
      secure: `// With CSRF token
app.post('/transfer', csrfProtection, (req, res) => {
  transferFunds(req.body.amount);
});`,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-white flex items-center">
          <Shield className="h-8 w-8 mr-3 text-neon" />
          Security Training
        </h1>
        <p className="text-gray-400">Learn to build secure applications and protect against cyber threats</p>
      </div>

      {/* Progress Overview */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">Modules Started</p>
            <p className="text-2xl font-bold text-white">4/4</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">Lessons Completed</p>
            <p className="text-2xl font-bold text-neon">12/31</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">Vulnerabilities Learned</p>
            <p className="text-2xl font-bold text-green-400">15</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-light border-gray-800">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm">Overall Progress</p>
            <p className="text-2xl font-bold text-blue-400">40%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="bg-dark-light border border-gray-800">
          <TabsTrigger
            value="modules"
            className="data-[state=active]:bg-neon data-[state=active]:text-dark"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Learning Modules
          </TabsTrigger>
          <TabsTrigger
            value="vulnerabilities"
            className="data-[state=active]:bg-neon data-[state=active]:text-dark"
          >
            <Bug className="h-4 w-4 mr-2" />
            Vulnerabilities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <Card
                key={module.id}
                className="bg-dark-light border-gray-800 overflow-hidden group hover:border-neon/50 transition-all"
              >
                <div className={`h-2 bg-gradient-to-r ${module.color}`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-neon/20 rounded-xl flex items-center justify-center">
                      <module.icon className="h-6 w-6 text-neon" />
                    </div>
                    <span className="text-gray-500 text-sm">
                      {module.completed}/{module.lessons} lessons
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {module.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{module.description}</p>

                  <Progress value={module.progress} className="h-2 mb-4" />

                  <div className="space-y-2 mb-4">
                    {module.topics.slice(0, 3).map((topic, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-gray-600" />
                        <span className="text-gray-500">{topic}</span>
                      </div>
                    ))}
                    {module.topics.length > 3 && (
                      <p className="text-gray-600 text-sm">
                        +{module.topics.length - 3} more topics
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full bg-neon text-dark hover:bg-neon-dark"
                    onClick={() => {
                      setActiveModule(module.id);
                      toast.info(`Starting ${module.title}`);
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {module.progress > 0 ? 'Continue' : 'Start'} Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-6">
          <div className="grid gap-6">
            {vulnerabilities.map((vuln) => (
              <Card key={vuln.id} className="bg-dark-light border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">
                          {vuln.name}
                        </h3>
                        <p className="text-gray-500 text-sm">{vuln.cwe}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
                        vuln.severity
                      )}`}
                    >
                      {vuln.severity}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-6">{vuln.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-red-400 text-sm font-medium mb-2 flex items-center">
                        <Bug className="h-4 w-4 mr-2" />
                        Vulnerable Code
                      </p>
                      <pre className="bg-dark p-4 rounded-lg text-red-400/80 text-sm font-mono overflow-x-auto">
                        {vuln.vulnerable}
                      </pre>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm font-medium mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Secure Code
                      </p>
                      <pre className="bg-dark p-4 rounded-lg text-green-400/80 text-sm font-mono overflow-x-auto">
                        {vuln.secure}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityTraining;
