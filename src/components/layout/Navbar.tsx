"use client";

import Link from 'next/link';
import { Button } from '../ui/Button';
import { UserRole } from '@/types';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role as UserRole;

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Hustle
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
              Find Jobs
            </Link>
            {status === "authenticated" ? (
              <>
                {userRole === 'company' && (
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                )}
                <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                  Profile
                </Link>
                <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}