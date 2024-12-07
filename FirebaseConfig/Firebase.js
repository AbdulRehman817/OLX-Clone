// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider, // hogaya jazakallah ok..
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAb3V_Ug8ROQhdDr3ldUZBKDNw8ujhtPts",
  authDomain: "smit-18238.firebaseapp.com",
  projectId: "smit-18238",
  storageBucket: "smit-18238.appspot.com",
  messagingSenderId: "350641707638",
  appId: "1:350641707638:web:618744f2290c58fdaa5d57",
  measurementId: "G-6QHQQ3NMZJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  db,
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  uploadBytesResumable,
  updateDoc,
  deleteDoc, //check karo
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
};
