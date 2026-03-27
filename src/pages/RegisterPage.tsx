import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Code2, Shield, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [step, setStep] = useState(1);
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!formData.name || !formData.email) {
        toast.error('Please fill in all fields');
        return;
      }
      setStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const success = await register({
      name: formData.name,
      email: formData.email,
    });

    if (success) {
      toast.success('Account created successfully!');
      navigate('/student');
    } else {
      toast.error('Failed to create account');
    }
  };

  const features = [
    'Access to all courses',
    'Interactive coding sandbox',
    'Security training modules',
    'Community support',
    'Certificate upon completion',
  ];

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center space-x-2 text-gray-400 hover:text-neon transition-colors z-10"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Info */}
        <div className="hidden lg:block space-y-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="relative">
              <Code2 className="h-10 w-10 text-neon transition-transform group-hover:scale-110" />
              <Shield className="h-5 w-5 text-neon absolute -bottom-1 -right-1" />
            </div>
            <span className="font-display text-3xl font-bold text-white tracking-wide">
              Code<span className="text-neon">Breakers</span>
            </span>
          </Link>

          <div>
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Start Your Tech Journey Today
            </h2>
            <p className="text-gray-400 text-lg">
              Join thousands of students learning to code and secure the digital world.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-neon flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-dark-light border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <Link to="/" className="inline-flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-neon" />
              <span className="font-display text-2xl font-bold text-white">
                Code<span className="text-neon">Breakers</span>
              </span>
            </Link>
          </div>

          <h1 className="font-display text-3xl font-bold text-white text-center mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Step {step} of 2
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-dark rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-neon transition-all duration-300"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon"
                  />
                </div>
              </>
            )}

            <div className="flex gap-4">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-gray-600 text-white hover:border-neon hover:text-neon"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 bg-neon text-dark hover:bg-neon-dark font-semibold py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : step === 1 ? (
                  'Continue'
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-neon hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            By signing up, you agree to our{' '}
            <Link to="/privacy" className="text-neon hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
