import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background zoom effect
      gsap.fromTo(
        bgRef.current,
        { scale: 1 },
        {
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ transformOrigin: 'center center' }}
      >
        <img
          src="/cta-background.jpg"
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-neon" />
            <span className="text-neon text-sm font-medium">
              Start Your Journey Today
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Ready to Break
            <br />
            the <span className="text-neon glow-text">Code</span>?
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Join thousands of students who have transformed their careers with CodeBreakers. 
            Your future in tech starts here.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-neon text-dark hover:bg-neon-dark font-semibold text-lg px-10 py-6 animate-pulse-glow"
              >
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:border-neon hover:text-neon text-lg px-10 py-6"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-neon font-bold">✓</span>
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neon font-bold">✓</span>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neon font-bold">✓</span>
              <span>Lifetime access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
