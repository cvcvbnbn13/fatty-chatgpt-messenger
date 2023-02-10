import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAjUqWXtfatKhz56QKDMQKREaOlci116gc',
  authDomain: 'fatty-chatgpt-messenger.firebaseapp.com',
  projectId: 'fatty-chatgpt-messenger',
  storageBucket: 'fatty-chatgpt-messenger.appspot.com',
  messagingSenderId: '608235253741',
  appId: '1:608235253741:web:ba0c01ba30953431c5c1e4',
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
