// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWW6nu9CB7pCupAWxuJEu__wSx5_E6ow4",
  authDomain: "contenxtnomultiplayer.firebaseapp.com",
  projectId: "contenxtnomultiplayer",
  storageBucket: "contenxtnomultiplayer.appspot.com",
  messagingSenderId: "18764154332",
  appId: "1:18764154332:web:61d2db159b4afa9ce73b19",
  measurementId: "G-9SDJ8KD2TT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const analytics = getAnalytics(app);
