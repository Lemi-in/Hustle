import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

export async function POST() {
  try {
    console.log('Starting Firebase test setup...');
    console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);
    console.log('Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
    console.log('Private Key exists:', !!process.env.FIREBASE_PRIVATE_KEY);

    // First, try to get the database instance
    console.log('Getting Firestore instance...');
    const db = adminDb;
    
    // Try to list collections to verify access
    console.log('Verifying Firestore access...');
    const collections = await db.listCollections();
    console.log('Available collections:', collections.map(c => c.id));

    // Create test documents
    console.log('Creating test documents...');
    const adminDoc = await db.collection('test').doc('admin').set({
      message: 'Admin SDK is working',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      status: 'success',
      message: 'Firebase test setup completed',
      collections: collections.map(c => c.id)
    });
  } catch (error: any) {
    console.error('Firebase setup error:', {
      message: error.message,
      code: error.code,
      details: error.details || {},
      stack: error.stack
    });
    
    return NextResponse.json({
      status: 'error',
      message: error.message,
      code: error.code,
      details: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
        errorStack: error.stack
      }
    }, { status: 500 });
  }
} 