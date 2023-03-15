import firebase from "firebase/compat/app";
//유저 정보를 import
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCILkXC1LR-Td71PxfIm89LOC5AewXDCMI",
  authDomain: "react-community-30cbe.firebaseapp.com",
  projectId: "react-community-30cbe",
  storageBucket: "react-community-30cbe.appspot.com",
  messagingSenderId: "1063177623626",
  appId: "1:1063177623626:web:d847ecfe420e75abd72eb3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
