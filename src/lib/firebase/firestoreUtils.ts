import { db } from './config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
} from 'firebase/firestore';
import type { User, Job, Company, Application } from '@/types/firebase';

// USERS
export async function createUser(user: User) {
  console.log('Creating user in Firestore:', user.id);
  await setDoc(doc(db, 'users', user.id), user);
  console.log('User created successfully in Firestore');
}

export async function getUserById(id: string) {
  console.log('Getting user by ID:', id);
  const docSnap = await getDoc(doc(db, 'users', id));
  const user = docSnap.exists() ? docSnap.data() as User : null;
  console.log('User found:', !!user);
  return user;
}

export async function getUserByEmail(email: string) {
  console.log('Getting user by email:', email);
  const q = query(collection(db, 'users'), where('email', '==', email));
  const snap = await getDocs(q);
  const user = snap.empty ? null : snap.docs[0].data() as User;
  console.log('User found:', !!user);
  return user;
}

export async function updateUser(id: string, data: Partial<User>) {
  console.log('Updating user:', id);
  await updateDoc(doc(db, 'users', id), data);
  console.log('User updated successfully');
}

export async function deleteUser(id: string) {
  console.log('Deleting user:', id);
  await deleteDoc(doc(db, 'users', id));
  console.log('User deleted successfully');
}

// JOBS
export async function createJob(job: Job) {
  await setDoc(doc(db, 'jobs', job.id), job);
}
export async function getJobById(id: string) {
  const docSnap = await getDoc(doc(db, 'jobs', id));
  return docSnap.exists() ? docSnap.data() as Job : null;
}
export async function getAllJobs() {
  const snap = await getDocs(collection(db, 'jobs'));
  return snap.docs.map(doc => doc.data() as Job);
}
export async function updateJob(id: string, data: Partial<Job>) {
  await updateDoc(doc(db, 'jobs', id), data);
}
export async function deleteJob(id: string) {
  await deleteDoc(doc(db, 'jobs', id));
}

// COMPANIES
export async function createCompany(company: Company) {
  await setDoc(doc(db, 'companies', company.id), company);
}
export async function getCompanyById(id: string) {
  const docSnap = await getDoc(doc(db, 'companies', id));
  return docSnap.exists() ? docSnap.data() as Company : null;
}
export async function getAllCompanies() {
  const snap = await getDocs(collection(db, 'companies'));
  return snap.docs.map(doc => doc.data() as Company);
}
export async function updateCompany(id: string, data: Partial<Company>) {
  await updateDoc(doc(db, 'companies', id), data);
}
export async function deleteCompany(id: string) {
  await deleteDoc(doc(db, 'companies', id));
}

// APPLICATIONS
export async function createApplication(application: Application) {
  await setDoc(doc(db, 'applications', application.id), application);
}
export async function getApplicationById(id: string) {
  const docSnap = await getDoc(doc(db, 'applications', id));
  return docSnap.exists() ? docSnap.data() as Application : null;
}
export async function getApplicationsByJob(jobId: string) {
  const q = query(collection(db, 'applications'), where('jobId', '==', jobId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as Application);
}
export async function getApplicationsByUser(userId: string) {
  const q = query(collection(db, 'applications'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as Application);
}
export async function updateApplication(id: string, data: Partial<Application>) {
  await updateDoc(doc(db, 'applications', id), data);
}
export async function deleteApplication(id: string) {
  await deleteDoc(doc(db, 'applications', id));
} 