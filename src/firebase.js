import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDVa-DVFGVYCuGY7Rmbt9UMJN3uldubzbA',
  authDomain: 'instagram-cc205.firebaseapp.com',
  projectId: 'instagram-cc205',
  storageBucket: 'instagram-cc205.appspot.com',
  messagingSenderId: '762317919356',
  appId: '1:762317919356:web:0a7e5d1966fc5a4f6925f9',
  measurementId: 'G-KX7CTRTBW5',
})

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export { db, auth, storage }
