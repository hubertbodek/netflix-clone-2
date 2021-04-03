// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "netflix-clone-2edae.firebaseapp.com",
	projectId: "netflix-clone-2edae",
	storageBucket: "netflix-clone-2edae.appspot.com",
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_ID,
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth };
export default db;
