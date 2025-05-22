"use client";

import {
  GoogleAuthProvider,
  ParsedToken,
  signInWithPopup,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/client";
import { removeToken, setToken } from "./actions";
import { useRouter } from "next/navigation";

type AuthContextType = {
  currentUser: User | null;
  customClaims: ParsedToken | null;
  signOut: () => Promise<void>;
  handleLoginWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user ?? null);

      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const token = tokenResult.token;
        // const refreshToken = user.refreshToken;
        const claims = tokenResult.claims;

        setCustomClaims(claims ?? null);

        if (token) {
          await setToken({
            token,
            // refreshToken,
          });
        }
      } else {
        await removeToken();
      }
    });

    return () => unsubscribe();
  }, []);

  async function signOut() {
    try {
      await auth.signOut();

      router.push("/login");
    } catch (error) {
      console.error("Error signing out with Google", error);
    }
  }

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    if (user) {
      const tokenResult = await user.getIdTokenResult();
      const token = tokenResult.token;

      if (token) {
        await setToken({
          token,
          // refreshToken,
        });
      }

      router.push("/home");
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, customClaims, signOut, handleLoginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
