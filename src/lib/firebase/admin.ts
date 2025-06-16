import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

if (!process.env.FIREBASE_PROJECT_ID) {
  throw new Error('FIREBASE_PROJECT_ID is not set');
}

if (!process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error('FIREBASE_CLIENT_EMAIL is not set');
}

if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error('FIREBASE_PRIVATE_KEY is not set');
}

console.log('Initializing Firebase Admin with project:', process.env.FIREBASE_PROJECT_ID);

const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
console.log('Private key format check:', {
  startsWith: privateKey.startsWith('-----BEGIN PRIVATE KEY-----'),
  endsWith: privateKey.endsWith('-----END PRIVATE KEY-----'),
  length: privateKey.length
});

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  })
};

let app;
let adminDb;
let adminAuth;

try {
  // Initialize Firebase Admin
  app = !getApps().length ? initializeApp(firebaseAdminConfig) : getApps()[0];
  adminDb = getFirestore(app);
  adminAuth = getAuth(app);

  console.log('Firebase Admin initialized successfully');
} catch (error: any) {
  console.error('Error initializing Firebase Admin:', {
    message: error.message,
    code: error.code,
    stack: error.stack,
    config: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY
    }
  });
  throw error;
}

export { app, adminDb, adminAuth }; 