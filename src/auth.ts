import NextAuth from "next-auth";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth as firebaseAuth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { createUser, getUserByEmail } from "@/lib/firebase/firestoreUtils";
import { Timestamp } from "firebase/firestore";
import { UserRole } from "@/types";

// This is a temporary solution. In production, you should use a proper database
const users = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    role: "jobseeker" as UserRole,
  },
  {
    id: "2",
    email: "company@example.com",
    password: "password123",
    role: "company" as UserRole,
  },
];

declare module "next-auth" {
  interface User {
    role: UserRole;
  }
  
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          console.log('Attempting to sign in with Firebase Auth...');
          // Sign in with Firebase Auth
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth as Auth,
            credentials.email as string,
            credentials.password as string
          );

          console.log('Firebase Auth sign in successful, getting user data...');
          // Get user data from Firestore
          const user = await getUserByEmail(credentials.email as string);
          if (!user) {
            console.error('User not found in Firestore');
            throw new Error("User not found");
          }

          console.log('User data retrieved successfully:', { id: user.id, email: user.email, role: user.role });
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        } catch (error: any) {
          console.error("Auth error:", {
            message: error.message,
            code: error.code,
            stack: error.stack
          });
          
          if (error.code === 'auth/user-not-found') {
            throw new Error("User not found");
          }
          if (error.code === 'auth/wrong-password') {
            throw new Error("Invalid password");
          }
          if (error.code === 'auth/invalid-email') {
            throw new Error("Invalid email");
          }
          
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(authConfig);

// Helper function to register a new user with Firebase Auth and Firestore
export async function registerUser(email: string, password: string, role: UserRole) {
  try {
    console.log('Creating user in Firebase Auth...');
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth as Auth,
      email,
      password
    );

    console.log('User created in Firebase Auth, creating Firestore record...');
    // Create user in Firestore
    const newUser = {
      id: userCredential.user.uid,
      email,
      role,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await createUser(newUser);
    console.log('User created successfully in both Auth and Firestore');

    return newUser;
  } catch (error: any) {
    console.error("Registration error:", {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    if (error.code === 'auth/email-already-in-use') {
      throw new Error("Email already in use");
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error("Invalid email");
    }
    if (error.code === 'auth/weak-password') {
      throw new Error("Password is too weak");
    }
    
    throw new Error("Registration failed");
  }
} 