
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fieldtofork-e4f97.firebaseapp.com",
  projectId: "fieldtofork-e4f97",
  storageBucket: "fieldtofork-e4f97.appspot.com",
  messagingSenderId: "1018561259102",
  appId: "1:1018561259102:web:caf7be433beeadba3676cf",
  measurementId: "G-S8MC5H6B0N"
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);