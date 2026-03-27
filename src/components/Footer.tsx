import { Link } from 'react-router-dom';
import { Code2, Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Courses', href: '/#courses' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    courses: [
      { name: 'Frontend Development', href: '/#courses' },
      { name: 'Backend Development', href: '/#courses' },
      { name: 'Cybersecurity', href: '/#courses' },
      { name: 'Coding Sandbox', href: '/#sandbox' },
    ],
    community: [
      { name: 'Student Portal', href: '/login' },
      { name: 'Instructor Login', href: '/login' },
      { name: 'Discord Community', href: '#' },
      { name: 'Blog', href: '/#blog' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@codebreakers.com', label: 'Email' },
  ];

  return (
    <footer className="bg-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <div className="relative">
                <Code2 className="h-8 w-8 text-neon transition-transform group-hover:scale-110" />
                <Shield className="h-4 w-4 text-neon absolute -bottom-1 -right-1" />
              </div>
              <span className="font-display text-2xl font-bold text-white tracking-wide">
                Code<span className="text-neon">Breakers</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Master the digital frontier. From zero to hero in web development 
              and cybersecurity. Join thousands of students breaking codes and building futures.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-neon transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-neon transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Courses
            </h3>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-neon transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Community
            </h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-neon transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            {currentYear} CodeBreakers. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Created by{' '}
            <span className="text-neon">Abdussalam Nasir</span> &{' '}
            <span className="text-neon">Abdulhafiz Nasir</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
