// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByUFXC11vGg90d6xpXIVtmJg7NpDZCPSM",
  authDomain: "stunote5.firebaseapp.com",
  projectId: "stunote5",
  storageBucket: "stunote5.firebasestorage.app",
  messagingSenderId: "293300722893",
  appId: "1:293300722893:web:814f5cd88070284fa75d84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);