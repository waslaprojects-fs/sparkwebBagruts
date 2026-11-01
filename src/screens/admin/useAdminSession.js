import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";

const AUTH_MESSAGES = {
  "auth/invalid-email": "البريد الإلكتروني غير صالح.",
  "auth/invalid-credential": "بيانات الدخول غير صحيحة.",
  "auth/wrong-password": "بيانات الدخول غير صحيحة.",
  "auth/user-not-found": "بيانات الدخول غير صحيحة.",
  "auth/too-many-requests": "محاولات كثيرة. انتظر قليلًا ثم أعد المحاولة.",
  "auth/network-request-failed": "تعذّر الاتصال بـ Firebase.",
};

export function useAdminSession() {
  const [user, setUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, async (nextUser) => {
      if (!nextUser) {
        setUser(null);
        setIsAdmin(false);
        return;
      }
      try {
        const token = await nextUser.getIdTokenResult(true);
        setUser(nextUser);
        setIsAdmin(token.claims.admin === true);
      } catch (error) {
        setUser(nextUser);
        setIsAdmin(false);
        setAuthError(error?.message || "تعذّر التحقق من صلاحية المدير.");
      }
    });
  }, []);

  async function signIn(email, password) {
    setAuthError("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      const message = AUTH_MESSAGES[error?.code] || "تعذّر تسجيل الدخول.";
      setAuthError(message);
      throw error;
    }
  }

  async function signOutAdmin() {
    await signOut(auth);
  }

  return {
    user,
    isAdmin,
    authError,
    ready: user !== undefined,
    signIn,
    signOutAdmin,
  };
}
