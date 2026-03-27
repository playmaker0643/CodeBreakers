import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BarChart3, Code2, Server, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Courses = () => {
  const [activeCourse, setActiveCourse] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const courses = [
    {
      id: 1,
      title: 'Frontend Mastery',
      description: 'Master modern frontend development with HTML, CSS, JavaScript, and React. Build responsive, interactive web applications from scratch.',
      image: '/course-frontend.jpg',
      icon: Code2,
      duration: '12 weeks',
      students: 1250,
      level: 'Beginner',
      topics: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'TypeScript', 'Tailwind CSS'],
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      id: 2,
      title: 'Backend Architecture',
      description: 'Build scalable backend systems with Node.js, Python, and modern database technologies. Learn API design and microservices architecture.',
      image: '/course-backend.jpg',
      icon: Server,
      duration: '16 weeks',
      students: 890,
      level: 'Intermediate',
      topics: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
      color: 'from-green-500/20 to-emerald-500/20',
    },
    {
      id: 3,
      title: 'Cybersecurity Fundamentals',
      description: 'Learn ethical hacking, penetration testing, and security best practices. Protect applications from common vulnerabilities.',
      image: '/course-security.jpg',
      icon: Shield,
      duration: '14 weeks',
      students: 650,
      level: 'Advanced',
      topics: ['Network Security', 'Web App Security', 'Penetration Testing', 'Cryptography', 'OWASP', 'Incident Response'],
      color: 'from-red-500/20 to-orange-500/20',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
      id="courses"
      className="relative py-24 bg-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full mb-6">
            <span className="text-neon text-sm font-medium">Our Curriculum</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-neon">Path</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Structured learning paths designed to take you from beginner to professional 
            in your chosen field.
          </p>
        </div>

        {/* Course Cards - Horizontal Accordion Style */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row gap-4"
        >
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`relative group rounded-2xl overflow-hidden border border-gray-800 transition-all duration-500 cursor-pointer ${
                activeCourse === index
                  ? 'lg:flex-[2] flex-1'
                  : 'lg:flex-1 flex-1'
              }`}
              onMouseEnter={() => setActiveCourse(index)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${course.color} via-dark/80 to-dark/95`} />
              </div>

              {/* Content */}
              <div className="relative h-full min-h-[400px] lg:min-h-[500px] p-6 flex flex-col justify-end">
                {/* Icon */}
                <div className="mb-4">
                  <div className="h-12 w-12 bg-neon/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <course.icon className="h-6 w-6 text-neon" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                  {course.title}
                </h3>

                {/* Description - Only show when active */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeCourse === index ? 'max-h-96 opacity-100' : 'max-h-0 lg:max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-300 mb-4">{course.description}</p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-neon/10 border border-neon/30 rounded-full text-neon text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BarChart3 className="h-4 w-4" />
                      <span>{course.level}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to="/register">
                    <Button className="bg-neon text-dark hover:bg-neon-dark font-semibold group/btn">
                      Enroll Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                {/* Collapsed View */}
                <div
                  className={`lg:block transition-opacity duration-300 ${
                    activeCourse === index ? 'lg:hidden' : 'block'
                  }`}
                >
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BarChart3 className="h-4 w-4" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/register">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-white hover:border-neon hover:text-neon"
            >
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Courses;
