import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Hustle</h3>
            <p className="text-gray-600">
              Find your dream job or hire the best talent for your company.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link href="/jobs/saved" className="text-gray-600 hover:text-gray-900">
                  Saved Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Companies</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/company/register" className="text-gray-600 hover:text-gray-900">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/company/dashboard" className="text-gray-600 hover:text-gray-900">
                  Company Dashboard
                </Link>
              </li>
              <li>
                <Link href="/company/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Hustle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}