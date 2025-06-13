import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebaseConfig';

const auth = getAuth(app);

export const handleSignUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Set the user's display name
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });

    console.log("User signed up:", user);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error signing up:", error.message);
    } else {
      console.error("Unknown error occurred during sign up");
    }
  }
};
