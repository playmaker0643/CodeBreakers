import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const posts = [
    {
      id: 1,
      title: 'The Future of AI in Coding',
      excerpt: 'Explore how artificial intelligence is revolutionizing software development and what it means for developers.',
      image: '/blog-1.jpg',
      author: 'Abdussalam Nasir',
      date: 'Mar 15, 2024',
      readTime: '5 min read',
      featured: true,
    },
    {
      id: 2,
      title: '10 Security Tips for 2024',
      excerpt: 'Essential cybersecurity practices every developer should know to protect their applications.',
      image: '/blog-2.jpg',
      author: 'Abdulhafiz Nasir',
      date: 'Mar 10, 2024',
      readTime: '8 min read',
      featured: false,
    },
    {
      id: 3,
      title: 'Why React Still Rules',
      excerpt: 'An in-depth look at why React continues to dominate the frontend landscape in 2024.',
      image: '/blog-3.jpg',
      author: 'Abdussalam Nasir',
      date: 'Mar 5, 2024',
      readTime: '6 min read',
      featured: false,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.blog-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredPost = posts.find((p) => p.featured);
  const otherPosts = posts.filter((p) => !p.featured);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-24 bg-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full mb-6">
              <span className="text-neon text-sm font-medium">Latest Intel</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              From Our <span className="text-neon">Blog</span>
            </h2>
          </div>
          <Link to="#" className="mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-gray-600 text-white hover:border-neon hover:text-neon"
            >
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Blog Grid */}
        <div ref={gridRef} className="grid lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <div className="blog-card lg:row-span-2">
              <article className="group relative h-full bg-dark-light border border-gray-800 rounded-2xl overflow-hidden hover:border-neon/50 transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-light via-dark-light/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Meta */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-neon transition-colors">
                    {featuredPost.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 mb-6">{featuredPost.excerpt}</p>

                  {/* CTA */}
                  <Link
                    to="#"
                    className="inline-flex items-center text-neon font-medium group/link"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            </div>
          )}

          {/* Other Posts */}
          <div className="space-y-8">
            {otherPosts.map((post, index) => (
              <div
                key={post.id}
                className="blog-card"
                style={{ marginTop: index === 1 ? '2rem' : undefined }}
              >
                <article className="group bg-dark-light border border-gray-800 rounded-2xl overflow-hidden hover:border-neon/50 transition-all duration-300">
                  <div className="grid sm:grid-cols-[200px,1fr] gap-0">
                    {/* Image */}
                    <div className="relative h-48 sm:h-full overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-neon transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* CTA */}
                      <Link
                        to="#"
                        className="inline-flex items-center text-neon text-sm font-medium group/link"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
