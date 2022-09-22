import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDhArqwAHj2gZLFmdf7OkuV84Wdn1Klvk8",
  authDomain: "coding-test---divya-preetha.firebaseapp.com",
  projectId: "coding-test---divya-preetha",
  storageBucket: "coding-test---divya-preetha.appspot.com",
  messagingSenderId: "590573770967",
  appId: "1:590573770967:web:37dbceceab230a9d7bb892",
  measurementId: "G-P9ZPY6W4TX"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
