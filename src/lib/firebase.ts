// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut as signOutFirebase } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);

export async function signIn(email: string, password: string) {
	try {
		const result = await signInWithEmailAndPassword(auth, email, password);
		return result;
	} catch {
		console.log('Error while signing in');
	}
}

export async function signOut() {
	try {
		const result = await signOutFirebase(auth);
		return result;
	} catch {
		console.log('Error while signing out');
	}
}
