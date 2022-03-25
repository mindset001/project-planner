import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDxRgpTtR562DofRSGC-ywJZij8j93JrpI",
    authDomain: "project-planner-c8692.firebaseapp.com",
    projectId: "project-planner-c8692",
    storageBucket: "project-planner-c8692.appspot.com",
    messagingSenderId: "425646986205",
    appId: "1:425646986205:web:5d5b3aed9fb1f5f5871c34"
  };

  const app = initializeApp(config)
  const db = getFirestore(app)


  export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc }
