import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-j_oyJp36FtdQYYoUmozA9RniG8OatFo",
  authDomain: "pentia-chatapp-8f740.firebaseapp.com",
  projectId: "pentia-chatapp-8f740",
  storageBucket: "pentia-chatapp-8f740.appspot.com",
  messagingSenderId: "830333589171",
  appId: "1:830333589171:web:d5bad1a69a178d473782c6",
};

// Initialize Firebase app
// getting this error: No Firebase App ‘[DEFAULT]’ has been created — call Firebase App.initializeApp()
// const firebaseApp = initializeApp(firebaseConfig);

let firebaseApp;
if (firebase.apps.length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app();
}

console.log("Firebase app initialized:", firebaseApp);

export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const database = getFirestore(firebaseApp);
