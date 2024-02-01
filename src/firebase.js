// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-J28Th2l5iS94B8bfzoAwiuenrfeL528",
  authDomain: "podcast-app-react-430c3.firebaseapp.com",
  projectId: "podcast-app-react-430c3",
  storageBucket: "podcast-app-react-430c3.appspot.com",
  messagingSenderId: "249280227649",
  appId: "1:249280227649:web:eec35b82fea86c64a9d9c0",
  measurementId: "G-2YMDKHET5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db=getFirestore(app);
const storage=getStorage(app);
const auth= getAuth(app);

export {auth,db,storage};
