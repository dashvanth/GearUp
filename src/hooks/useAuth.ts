// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "sonner";
import { UserRole, PlatformUser } from "@/types";

export interface AuthUser {
  id: string;
  email: string | null;
  role: UserRole;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: User | null) => {
        if (firebaseUser) {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as PlatformUser;
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              role: userData.role || "renter",
            });
          } else {
            // This can happen if a user is in Auth but their DB entry was deleted.
            // We'll treat them as a new user and create their document.
            const newUser: PlatformUser = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              role: "renter", // Default to renter if their doc is missing
            };
            await setDoc(userDocRef, newUser);
            setUser(newUser);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Signed out successfully.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error("Failed to sign out", { description: errorMessage });
    }
  };

  return {
    user,
    loading,
    signOut,
  };
};
