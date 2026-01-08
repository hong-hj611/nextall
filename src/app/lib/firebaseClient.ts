// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'   // login
import { getFirestore } from 'firebase/firestore'   // database

const firebaseConfig = {
apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// apiKey: "AIzaSyDCp4QOW57odPfR62QIxUczM7gJuiZ4UNU",
authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
// Initialize Firebase (초기화)
const app = initializeApp(firebaseConfig); // firebase 기본제공
// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// app을 가지고 로그인 가능하도록
export const auth = getAuth(app);
// app을 가지고 데이터베이스 사용하도록
export const db = getFirestore(app);