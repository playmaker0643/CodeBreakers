import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Code2, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - character decode effect
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );

      // CTA buttons animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.7 }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        { 
          opacity: 1, 
          scale: 1, 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2, 
          ease: 'power3.out', 
          delay: 0.4 
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-dark"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border border-neon/20 rotate-45 animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 border border-neon/10 rotate-12 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 border border-neon/15 rotate-45 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-neon/5 rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full">
              <Zap className="h-4 w-4 text-neon" />
              <span className="text-neon text-sm font-medium">
                Next-Gen Tech Education
              </span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              Master the{' '}
              <span className="text-neon glow-text">Digital</span>
              <br />
              Frontier
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-gray-400 max-w-lg leading-relaxed"
            >
              From zero to hero in web development and cybersecurity. 
              Join thousands of students breaking codes and building futures 
              with hands-on, project-based learning.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-neon text-dark hover:bg-neon-dark font-semibold text-lg px-8 py-6 group animate-pulse-glow"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-white hover:border-neon hover:text-neon text-lg px-8 py-6"
                >
                  <Play className="mr-2 h-5 w-5" />
                  View Curriculum
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-800">
              <div>
                <p className="font-display text-3xl font-bold text-neon">10K+</p>
                <p className="text-gray-500 text-sm">Students</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-neon">50+</p>
                <p className="text-gray-500 text-sm">Courses</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-neon">98%</p>
                <p className="text-gray-500 text-sm">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div
            ref={imageRef}
            className="relative lg:pl-8"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-800">
                <img
                  src="/hero-image.jpg"
                  alt="CodeBreakers Learning"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-8 top-1/4 bg-dark-light border border-gray-700 rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-neon/20 rounded-lg flex items-center justify-center">
                    <Code2 className="h-5 w-5 text-neon" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Frontend</p>
                    <p className="text-gray-500 text-xs">HTML, CSS, JS</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-dark-light border border-gray-700 rounded-xl p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-neon/20 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-neon" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Security</p>
                    <p className="text-gray-500 text-xs">Ethical Hacking</p>
                  </div>
                </div>
              </div>

              {/* Scan Line Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-neon/30 animate-[scan-line_3s_linear_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
};

export default Hero;
