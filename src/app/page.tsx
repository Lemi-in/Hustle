import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job or Hire Top Talent
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with the best opportunities and candidates in the tech industry.
            Whether you're looking for your next role or building your team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button size="lg">Find Jobs</Button>
            </Link>
            <Link href="/company/register">
              <Button variant="outline" size="lg">Post a Job</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Card Placeholder */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Senior Frontend Developer</h3>
                    <p className="text-gray-600">Tech Company Inc.</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Remote
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">$120k - $150k • Full-time</p>
                  <p className="text-gray-600">React, TypeScript, Next.js</p>
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/jobs">
              <Button variant="ghost">View All Jobs →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Hustle?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Smart Job Matching',
                description: 'Our AI-powered system matches you with the perfect opportunities based on your skills and preferences.',
                icon: '🎯',
              },
              {
                title: 'Real-time Updates',
                description: 'Get instant notifications about new job postings and application status updates.',
                icon: '⚡',
              },
              {
                title: 'Secure Platform',
                description: 'Your data is protected with enterprise-grade security and privacy features.',
                icon: '🔒',
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}