import { useEffect, useRef } from 'react';
import { UserPlus, BookOpen, Code2, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Enroll',
      description: 'Sign up and choose your learning path. Get instant access to our comprehensive curriculum.',
      icon: UserPlus,
    },
    {
      number: '02',
      title: 'Learn',
      description: 'Interactive video lessons, hands-on labs, and real-world projects guided by industry experts.',
      icon: BookOpen,
    },
    {
      number: '03',
      title: 'Build',
      description: 'Apply your skills to real-world projects. Build a portfolio that impresses employers.',
      icon: Code2,
    },
    {
      number: '04',
      title: 'Master',
      description: 'Graduate with a verified certificate and join our network of successful alumni.',
      icon: Award,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line drawing animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      // Steps animation
      const stepElements = stepsRef.current?.querySelectorAll('.process-step');
      stepElements?.forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 bg-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full mb-6">
            <span className="text-neon text-sm font-medium">Your Journey</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            How It <span className="text-neon">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A structured path from enrollment to mastery. Follow our proven 
            methodology to achieve your tech career goals.
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Central Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 -translate-x-1/2">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-neon origin-top"
              style={{ height: '100%' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`process-step relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                  index !== steps.length - 1 ? 'lg:pb-24' : ''
                }`}
              >
                {/* Content - Alternating sides */}
                <div
                  className={`${
                    index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <div className="bg-dark-light border border-gray-800 rounded-2xl p-8 hover:border-neon/50 transition-all duration-300 group">
                    <div
                      className={`flex items-center space-x-4 mb-4 ${
                        index % 2 === 0 ? 'lg:flex-row-reverse lg:space-x-reverse' : ''
                      }`}
                    >
                      {/* Icon */}
                      <div className="h-14 w-14 bg-neon/20 rounded-xl flex items-center justify-center group-hover:bg-neon/30 transition-colors">
                        <step.icon className="h-7 w-7 text-neon" />
                      </div>
                      {/* Number */}
                      <span className="font-display text-5xl font-bold text-neon/30">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Node - Desktop */}
                <div
                  className={`hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 ${
                    index % 2 === 0 ? '' : ''
                  }`}
                >
                  <div className="relative">
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 bg-neon rounded-full animate-ping opacity-20" />
                    {/* Node */}
                    <div className="relative h-6 w-6 bg-neon rounded-full border-4 border-dark shadow-neon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
