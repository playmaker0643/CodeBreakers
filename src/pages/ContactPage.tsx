import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@codebreakers.com',
      href: 'mailto:contact@codebreakers.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Tech Street, Silicon Valley, CA 94025',
      href: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-dark pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full mb-6">
            <span className="text-neon text-sm font-medium">Contact Us</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            Get in <span className="text-neon">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll 
            respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-start space-x-4 p-6 bg-dark-light border border-gray-800 rounded-xl hover:border-neon/50 transition-all duration-300 group"
              >
                <div className="h-12 w-12 bg-neon/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-neon/30 transition-colors">
                  <item.icon className="h-6 w-6 text-neon" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="p-6 bg-dark-light border border-gray-800 rounded-xl">
              <h3 className="font-display text-lg font-bold text-white mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="h-10 w-10 bg-dark border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-neon hover:border-neon transition-all"
                  >
                    <span className="text-xs font-medium">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-dark-light border border-gray-800 rounded-2xl p-8"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="subject" className="text-gray-300">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon"
                />
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="message" className="text-gray-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-dark border-gray-700 text-white placeholder:text-gray-600 focus:border-neon focus:ring-neon resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-neon text-dark hover:bg-neon-dark font-semibold py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-8">
            Frequently Asked <span className="text-neon">Questions</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'How do I get started?',
                a: 'Simply create an account, choose your learning path, and start with our beginner-friendly courses.',
              },
              {
                q: 'Are the courses self-paced?',
                a: 'Yes! All our courses are self-paced, allowing you to learn at your own speed.',
              },
              {
                q: 'Do you offer certificates?',
                a: 'Yes, you\'ll receive a certificate upon completing each course.',
              },
              {
                q: 'Can I get a refund?',
                a: 'We offer a 7-day money-back guarantee if you\'re not satisfied.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-dark-light border border-gray-800 rounded-xl"
              >
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
