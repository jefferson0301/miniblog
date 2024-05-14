// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBAzOhDFrx9SddfZ4A6tezVkfrDHJK5Hc",
  authDomain: "miniblog-76298.firebaseapp.com",
  projectId: "miniblog-76298",
  storageBucket: "miniblog-76298.appspot.com",
  messagingSenderId: "127747694107",
  appId: "1:127747694107:web:a4034c92a82069fb9722be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}