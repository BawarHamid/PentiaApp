// import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA-j_oyJp36FtdQYYoUmozA9RniG8OatFo",
  authDomain: "pentia-chatapp-8f740.firebaseapp.com",
  projectId: "pentia-chatapp-8f740",
  storageBucket: "pentia-chatapp-8f740.appspot.com",
  messagingSenderId: "830333589171",
  appId: "1:830333589171:web:d5bad1a69a178d473782c6",
};
// initialize firebase
// const authStorage = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const database = getFirestore();

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase auth with persistence using React Native AsyncStorage
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
export const database = getFirestore(firebaseApp);

export const usersRef = collection(database, "users");
export const chatroomRef = collection(database, "chatroom");
