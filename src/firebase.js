import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjaAmC50fravoG8NOAlH6t13JSwwIkuc8",
  authDomain: "ampel2a.firebaseapp.com",
  databaseURL: "https://ampel2a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ampel2a",
  storageBucket: "ampel2a.appspot.com",
  messagingSenderId: "866134153595",
  appId: "1:866134153595:web:cbfe3e35c40b2a4e6a05de"
};



/*
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL"
};
*/

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const firestore = getFirestore(app);

export { database, firestore };

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjaAmC50fravoG8NOAlH6t13JSwwIkuc8",
  authDomain: "ampel2a.firebaseapp.com",
  databaseURL: "https://ampel2a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ampel2a",
  storageBucket: "ampel2a.appspot.com",
  messagingSenderId: "866134153595",
  appId: "1:866134153595:web:cbfe3e35c40b2a4e6a05de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/