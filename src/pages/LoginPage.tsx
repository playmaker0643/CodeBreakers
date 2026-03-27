import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Code2, Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store';
import { toast } from 'sonner';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = await login(email, password, activeTab);
    
    if (success) {
      toast.success(`Welcome back!`);
      navigate(activeTab === 'admin' ? '/admin' : '/student');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border border-neon/20 rotate-45" />
        <div className="absolute bottom-40 right-20 w-16 h-16 border border-neon/10 rotate-12" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-neon/15 rotate-45" />
      </div>

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center space-x-2 text-gray-400 hover:text-neon transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Home</span>
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="relative">
              <Code2 className="h-10 w-10 text-neon transition-transform group-hover:scale-110" />
              <Shield className="h-5 w-5 text-neon absolute -bottom-1 -right-1" />
            </div>
            <span className="font-display text-3xl font-bold text-white tracking-wide">
              Code<span className="text-neon">Breakers</span>
            </span>
          </Link>
        </div>

        <div className="bg-dark-light border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="font-display text-3xl font-bold text-white text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Sign in to continue your learning journey
          </p>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as 'student' | 'admin')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-dark mb-6">
              <TabsTrigger
                value="student"
                className="data-[state=active]:bg-neon data-[state=active]:text-dark"
              >
                Student
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-neon data-[state=active]:text-dark"
              >
                Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="student-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-neon"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 text-gray-400">
                    <input type="checkbox" className="rounded border-gray-700 bg-dark text-neon focus:ring-neon" />
                    <span>Remember me</span>
                  </label>
                  <Link to="#" className="text-neon hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-neon text-dark hover:bg-neon-dark font-semibold py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Sign In as Student'
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@codebreakers.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-neon"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-neon text-dark hover:bg-neon-dark font-semibold py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Sign In as Admin'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-neon hover:underline font-medium">
                Get Started
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Demo: Use any email and password to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
