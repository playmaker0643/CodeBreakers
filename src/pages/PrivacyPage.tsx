import { Shield, Lock, Eye, Database, Cookie, Mail } from 'lucide-react';

const PrivacyPage = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal information (name, email, phone number) when you register',
        'Payment information for course purchases',
        'Learning progress and course completion data',
        'Technical data (IP address, browser type, device information)',
        'Communication records with our support team',
      ],
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our educational services',
        'To process your transactions and send related information',
        'To track your learning progress and provide certificates',
        'To communicate with you about courses, updates, and promotions',
        'To improve our platform and develop new features',
        'To detect and prevent fraud and abuse',
      ],
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We use industry-standard encryption (SSL/TLS) for data transmission',
        'Your password is hashed and never stored in plain text',
        'Regular security audits and penetration testing',
        'Access controls and authentication mechanisms',
        'Data backup and disaster recovery procedures',
      ],
    },
    {
      icon: Cookie,
      title: 'Cookies and Tracking',
      content: [
        'Essential cookies for platform functionality',
        'Analytics cookies to understand user behavior',
        'Preference cookies to remember your settings',
        'You can control cookies through your browser settings',
        'Third-party services may also use cookies',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-dark pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full mb-6">
            <Shield className="h-4 w-4 text-neon" />
            <span className="text-neon text-sm font-medium">Privacy Policy</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            Privacy <span className="text-neon">Policy</span>
          </h1>
          <p className="text-gray-400">
            Last updated: March 27, 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-dark-light border border-gray-800 rounded-2xl p-8 mb-8">
          <p className="text-gray-400 leading-relaxed mb-4">
            At CodeBreakers, we take your privacy seriously. This Privacy Policy explains how we 
            collect, use, disclose, and safeguard your information when you use our platform. 
            Please read this privacy policy carefully. If you do not agree with the terms of this 
            privacy policy, please do not access the site.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We reserve the right to make changes to this Privacy Policy at any time and for any 
            reason. We will alert you about any changes by updating the "Last updated" date of 
            this Privacy Policy.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-dark-light border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-neon/20 rounded-lg flex items-center justify-center">
                  <section.icon className="h-5 w-5 text-neon" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="text-neon mt-1">•</span>
                    <span className="text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Your Rights */}
        <div className="bg-dark-light border border-gray-800 rounded-2xl p-8 mt-8">
          <h2 className="font-display text-2xl font-bold text-white mb-6">
            Your Rights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Access your personal data',
              'Correct inaccurate information',
              'Request deletion of your data',
              'Object to data processing',
              'Data portability',
              'Withdraw consent',
            ].map((right, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Lock className="h-4 w-4 text-neon flex-shrink-0" />
                <span className="text-gray-400">{right}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-neon/10 border border-neon/30 rounded-2xl p-8 mt-8">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="h-6 w-6 text-neon" />
            <h2 className="font-display text-2xl font-bold text-white">
              Contact Us
            </h2>
          </div>
          <p className="text-gray-400 mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="text-neon">Email:</span> privacy@codebreakers.com
            </p>
            <p className="text-gray-300">
              <span className="text-neon">Address:</span> 123 Tech Street, Silicon Valley, CA 94025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
