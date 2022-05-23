import { getFirestore } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, signOut, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'

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

export const login = (email, password) =>
	signInWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)

const update = {
	photoURL: 'https://my-cdn.com/assets/user/123.png',
};

export const updatePhoto = () => updateProfile(auth.currentUser, update).then(() => console.log('УРААА!'));

export const getListUsers = () => db

export const db = getFirestore()
