// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNwkydtzcfBM4LVvHq4ApxqV-BbOEWLoI",
  authDomain: "amueso.firebaseapp.com",
  projectId: "amueso",
  storageBucket: "amueso.appspot.com",
  messagingSenderId: "682122578136",
  appId: "1:682122578136:web:20771bfb082fea853aafad",
  measurementId: "G-L5FNHVLMPT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export default storage;
