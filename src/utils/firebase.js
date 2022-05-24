import { getFirestore } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import {LogBox} from "react-native";

const firebaseConfig = {
	apiKey: "AIzaSyDgmOCAlamwEsiysT_EjSrxaYubW5EwYJU",
	authDomain: "whatsappbd-62d30.firebaseapp.com",
	projectId: "whatsappbd-62d30",
	storageBucket: "whatsappbd-62d30.appspot.com",
	messagingSenderId: "534802445153",
	appId: "1:534802445153:web:2262b847253a86612d8b20",
	measurementId: "G-50GEDZ743M"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth()

LogBox.ignoreLogs([`Setting a timer for a long period`]);

export const login = (email, password) =>
	signInWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)

export const db = getFirestore()
