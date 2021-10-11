import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDVa-DVFGVYCuGY7Rmbt9UMJN3uldubzbA',
  authDomain: 'instagram-cc205.firebaseapp.com',
  projectId: 'instagram-cc205',
  storageBucket: 'instagram-cc205.appspot.com',
  messagingSenderId: '762317919356',
  appId: '1:762317919356:web:0a7e5d1966fc5a4f6925f9',
  measurementId: 'G-KX7CTRTBW5',
})

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const storage = getStorage(firebaseApp)

export { db }
