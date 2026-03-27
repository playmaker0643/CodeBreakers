import { useEffect } from 'react';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Courses from '@/sections/Courses';
import Process from '@/sections/Process';
import Testimonials from '@/sections/Testimonials';
import Blog from '@/sections/Blog';
import CTA from '@/sections/CTA';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, []);

  return (
    <div className="bg-dark">
      <Hero />
      <About />
      <Courses />
      <Process />
      <Testimonials />
      <Blog />
      <CTA />
    </div>
  );
};

export default LandingPage;
