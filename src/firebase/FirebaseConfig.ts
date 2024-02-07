import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA-j_oyJp36FtdQYYoUmozA9RniG8OatFo",
  authDomain: "pentia-chatapp-8f740.firebaseapp.com",
  projectId: "pentia-chatapp-8f740",
  storageBucket: "pentia-chatapp-8f740.appspot.com",
  messagingSenderId: "830333589171",
  appId: "1:830333589171:web:d5bad1a69a178d473782c6",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase auth with persistence using React Native AsyncStorage
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
export const database = getFirestore(firebaseApp);

export const userProfileRef = collection(database, "userprofile");
export const chatroomRef = collection(database, "chatroom");
