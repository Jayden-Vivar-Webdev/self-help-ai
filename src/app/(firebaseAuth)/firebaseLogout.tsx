import { getAuth, signOut } from "firebase/auth";
import app from './firebaseConfig';

const auth = getAuth(app);

export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
