import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDkb0lv3609V9CvApv01uvv-xj0KERkKzg",
  authDomain: "swd391-9e7ce.firebaseapp.com",
  projectId: "swd391-9e7ce",
  storageBucket: "swd391-9e7ce.firebasestorage.app",
  messagingSenderId: "376629147428",
  appId: "1:376629147428:web:84cfce24f0da99296725b1",
  measurementId: "G-LQ1XV5Y3MX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
export { provider, auth };
