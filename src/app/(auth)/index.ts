export type UserRole = 'jobseeker' | 'company' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobSeeker extends User {
  role: 'jobseeker';
  skills: string[];
  experience: Experience[];
  education: Education[];
  savedJobs: string[];
  appliedJobs: string[];
}

export interface Company extends User {
  role: 'company';
  companyName: string;
  description: string;
  location: string;
  website?: string;
  logo?: string;
  postedJobs: string[];
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  company: Company;
  description: string;
  requirements: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  location: 'remote' | 'hybrid' | 'onsite';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  tags: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  createdAt: Date;
  updatedAt: Date;
  applications: string[];
  views: number;
  bookmarks: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: Date;
  updatedAt: Date;
  resume?: string;
  coverLetter?: string;
}