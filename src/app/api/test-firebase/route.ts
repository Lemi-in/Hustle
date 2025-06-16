import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

export async function GET() {
  try {
    console.log('Testing Firebase Admin SDK...');
    
    // Test Admin SDK
    const adminTest = await adminDb.collection('test').doc('admin').get();
    console.log('Admin SDK test result:', adminTest.exists ? 'Document exists' : 'Document does not exist');
    
    return NextResponse.json({
      status: "success",
      message: "Firebase Admin SDK is working",
      admin: {
        exists: adminTest.exists,
        data: adminTest.data()
      }
    });
  } catch (error: any) {
    console.error("Firebase test error:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
      details: error.details || {}
    });
    
    return NextResponse.json({
      status: "error",
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