import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebaseConfig';

const auth = getAuth(app);

export const handleSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed in:", user);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Sign-in error:", error.message);
      throw error;
    }
  }
};
