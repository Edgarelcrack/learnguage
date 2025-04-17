// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuziuxY2-7UQHqbDqrIEyReuXoUBhB6XI",
  authDomain: "learnguage-1c8fe.firebaseapp.com",
  projectId: "learnguage-1c8fe",
  storageBucket: "learnguage-1c8fe.firebasestorage.app",
  messagingSenderId: "30814321178",
  appId: "1:30814321178:web:b467076708461259a76fa3",
  measurementId: "G-SZYY2KXF7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
