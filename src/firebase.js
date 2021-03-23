// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA5eZZH45m5o5E-bsWQrmrXMi8SIvNUzVw",
	authDomain: "netflix-clone-2edae.firebaseapp.com",
	projectId: "netflix-clone-2edae",
	storageBucket: "netflix-clone-2edae.appspot.com",
	messagingSenderId: "806466386585",
	appId: "1:806466386585:web:c15ea8c88915ce91721608",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth };
export default db;
