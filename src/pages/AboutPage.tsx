import { Code2, Shield, Target, Users, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Our mission is to democratize tech education and make quality learning accessible to everyone.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of community learning and peer support for growth.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from curriculum to support.',
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'Technology evolves, and so do we. Our content is always up-to-date.',
    },
  ];

  const team = [
    {
      name: 'Abdussalam Nasir',
      role: 'Co-Founder & Lead Instructor',
      title: 'Codebreaker',
      bio: 'A seasoned software engineer with over 10 years of experience in full-stack development. Passionate about teaching and mentoring the next generation of developers.',
      expertise: ['Full-Stack Development', 'System Architecture', 'Technical Leadership'],
    },
    {
      name: 'Abdulhafiz Nasir',
      role: 'Co-Founder & Security Lead',
      title: 'Playmaker',
      bio: 'A senior cybersecurity specialist with expertise in ethical hacking and penetration testing. Dedicated to making the digital world safer through education.',
      expertise: ['Cybersecurity', 'Penetration Testing', 'Risk Assessment'],
    },
  ];

  return (
    <div className="min-h-screen bg-dark pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full mb-6">
              <span className="text-neon text-sm font-medium">About Us</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6">
              Breaking Codes, <span className="text-neon">Building Futures</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              CodeBreakers is more than just an e-learning platform. We're a community of 
              passionate educators and learners dedicated to transforming the tech industry 
              one student at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-white mb-6">
                Our <span className="text-neon">Story</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  CodeBreakers was born from a simple observation: the tech industry needed 
                  more skilled professionals, and traditional education wasn't keeping up 
                  with the pace of innovation.
                </p>
                <p>
                  Founded by two brothers - one a software engineer and the other a cybersecurity 
                  specialist - we set out to create a learning platform that combines theoretical 
                  knowledge with practical, hands-on experience.
                </p>
                <p>
                  Today, CodeBreakers has helped thousands of students launch successful careers 
                  in tech, from junior developers to senior security engineers. Our alumni work 
                  at top companies around the world.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-gray-800">
                <img
                  src="/about-image.jpg"
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-neon text-dark rounded-xl p-6">
                <p className="font-display text-4xl font-bold">10K+</p>
                <p className="text-sm font-medium">Students Trained</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Our <span className="text-neon">Values</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at CodeBreakers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-dark border border-gray-800 rounded-xl hover:border-neon/50 transition-all duration-300 group"
              >
                <div className="h-12 w-12 bg-neon/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neon/30 transition-colors">
                  <value.icon className="h-6 w-6 text-neon" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Meet the <span className="text-neon">Founders</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The visionaries behind CodeBreakers, bringing together expertise in 
              software engineering and cybersecurity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-dark-light border border-gray-800 rounded-2xl p-8 hover:border-neon/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="h-16 w-16 bg-neon/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    {index === 0 ? (
                      <Code2 className="h-8 w-8 text-neon" />
                    ) : (
                      <Shield className="h-8 w-8 text-neon" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-neon text-sm font-medium">{member.title}</p>
                    <p className="text-gray-500 text-sm">{member.role}</p>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">{member.bio}</p>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-neon/10 border border-neon/30 rounded-full text-neon text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neon/10 border border-neon/30 rounded-2xl p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join thousands of students who have transformed their careers with CodeBreakers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button className="bg-neon text-dark hover:bg-neon-dark font-semibold px-8 py-6">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:border-neon hover:text-neon px-8 py-6"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
