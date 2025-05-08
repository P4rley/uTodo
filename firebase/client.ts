// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoTA9XW7yR2AIXWgOvGM9wAJysqSWf-kc",
  authDomain: "utodo-873f7.firebaseapp.com",
  projectId: "utodo-873f7",
  storageBucket: "utodo-873f7.firebasestorage.app",
  messagingSenderId: "460177002980",
  appId: "1:460177002980:web:17f168a77847e7c98a37f1",
  measurementId: "G-HX276XVC5S",
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
  storage = getStorage(app);
}

export { auth, storage };
