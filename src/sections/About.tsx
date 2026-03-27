import { useEffect, useRef } from 'react';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats ticker animation
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, value: '10K+', label: 'Active Students' },
    { icon: BookOpen, value: '50+', label: 'Expert Courses' },
    { icon: Award, value: '98%', label: 'Success Rate' },
    { icon: TrendingUp, value: '95%', label: 'Job Placement' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 bg-dark overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/about-image.jpg"
                alt="About CodeBreakers"
                className="w-full h-auto object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neon/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-neon text-dark rounded-xl p-6 shadow-neon">
              <p className="font-display text-4xl font-bold">10+</p>
              <p className="text-sm font-medium">Years Experience</p>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full">
              <span className="text-neon text-sm font-medium">About Us</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Who We <span className="text-neon">Are</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              We are a collective of developers and security experts dedicated to 
              democratizing tech education. Our hands-on approach ensures you don't 
              just learn—you build.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Founded by <span className="text-neon font-medium">Abdussalam Nasir (Codebreaker)</span>, 
              a seasoned software engineer, and <span className="text-neon font-medium">Abdulhafiz Nasir (Playmaker)</span>, 
              a senior cybersecurity specialist, CodeBreakers represents the perfect 
              blend of development expertise and security knowledge.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-neon text-xs">✓</span>
                </div>
                <p className="text-gray-300">Project-based learning with real-world applications</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-neon text-xs">✓</span>
                </div>
                <p className="text-gray-300">Expert instructors from top tech companies</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-neon text-xs">✓</span>
                </div>
                <p className="text-gray-300">Lifetime access to course materials and updates</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-neon text-xs">✓</span>
                </div>
                <p className="text-gray-300">Industry-recognized certificates upon completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Ticker */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group p-6 bg-dark-light border border-gray-800 rounded-xl hover:border-neon/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-neon/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <stat.icon className="h-8 w-8 text-neon mb-4" />
                <p className="font-display text-3xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
