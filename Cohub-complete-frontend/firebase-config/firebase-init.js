import {initializeApp} from 'firebase/app';

// console.log(process.env.REACT_APP_FIREBASE_API_SECRET);
// console.log(String(import.meta.env.FIREBASE_API_SECRET));
const firebaseConfig={
    apiKey:String(import.meta.env.VITE_APP_FIREBASE_API_SECRET),
    authDomain: "cohub-e6034.firebaseapp.com",
    projectId: "cohub-e6034",
    storageBucket: "cohub-e6034.appspot.com",
    messagingSenderId: "974845853993",
    appId: "1:974845853993:web:18865e68c82a094314f738",
    measurementId: "G-KXYHC078FK" 
}

const app=initializeApp(firebaseConfig);

export default app;