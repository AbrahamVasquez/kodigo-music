import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmhg2sT1Grz1sGctXMFvupVhvsrD1ObXk",
  authDomain: "kodigo-music-7fbb1.firebaseapp.com",
  projectId: "kodigo-music-7fbb1",
  storageBucket: "kodigo-music-7fbb1.appspot.com",
  messagingSenderId: "341713199332",
  appId: "1:341713199332:web:fb69a3c51dadc206c40cf1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);