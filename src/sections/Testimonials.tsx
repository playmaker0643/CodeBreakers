import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Frontend Developer at Google',
      image: '/testimonial-1.jpg',
      content: 'CodeBreakers transformed my career. The hands-on approach and real-world projects gave me the confidence to land my dream job at Google. The instructors are world-class!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Full Stack Developer at Meta',
      image: '/testimonial-2.jpg',
      content: 'The curriculum is incredibly well-structured. I went from knowing basic HTML to building full-stack applications in just 6 months. The community support is amazing.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Security Engineer at Microsoft',
      image: '/testimonial-3.jpg',
      content: 'The cybersecurity track is top-notch. The penetration testing labs and real-world scenarios prepared me perfectly for my role. Highly recommend for anyone serious about security.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        carouselRef.current,
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

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 bg-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Decorative Quote */}
      <div className="absolute top-20 left-10 opacity-5">
        <Quote className="h-64 w-64 text-neon" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full mb-6">
            <span className="text-neon text-sm font-medium">Testimonials</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Graduate <span className="text-neon">Stories</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hear from our alumni who have transformed their careers through CodeBreakers.
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative">
          {/* Main Testimonial */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-dark-light border border-gray-800 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-[200px,1fr] gap-8 items-center">
                {/* Image */}
                <div className="relative mx-auto md:mx-0">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-neon/30">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -right-4 h-10 w-10 bg-neon rounded-full flex items-center justify-center">
                    <Quote className="h-5 w-5 text-dark" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center md:text-left">
                  {/* Rating */}
                  <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-neon fill-neon" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    "{testimonials[activeIndex].content}"
                  </p>

                  {/* Author */}
                  <div>
                    <p className="font-display text-xl font-bold text-white">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-neon text-sm">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="border-gray-700 text-gray-400 hover:border-neon hover:text-neon"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Dots */}
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 bg-neon'
                        : 'w-2 bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="border-gray-700 text-gray-400 hover:border-neon hover:text-neon"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Side Previews - Desktop */}
          <div className="hidden lg:block">
            {/* Previous */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-64 opacity-30 scale-75"
              style={{
                transform: `translate(-50%, -50%) perspective(1000px) rotateY(25deg)`,
              }}
            >
              <div className="bg-dark-light border border-gray-800 rounded-2xl p-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden mb-4">
                  <img
                    src={testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length].image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-display text-lg font-bold text-white truncate">
                  {testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length].name}
                </p>
              </div>
            </div>

            {/* Next */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-64 opacity-30 scale-75"
              style={{
                transform: `translate(50%, -50%) perspective(1000px) rotateY(-25deg)`,
              }}
            >
              <div className="bg-dark-light border border-gray-800 rounded-2xl p-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden mb-4">
                  <img
                    src={testimonials[(activeIndex + 1) % testimonials.length].image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-display text-lg font-bold text-white truncate">
                  {testimonials[(activeIndex + 1) % testimonials.length].name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
