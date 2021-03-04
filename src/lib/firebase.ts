/* eslint-disable import/no-duplicates */
import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Use this import to seed the database (only once)
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyCkbcwVhAJdJcFeoUbnzeE7TilwttzA43U',
  authDomain: 'instagram-clone-7637b.firebaseapp.com',
  projectId: 'instagram-clone-7637b',
  storageBucket: 'instagram-clone-7637b.appspot.com',
  messagingSenderId: '231853793627',
  appId: '1:231853793627:web:166e77ba5d203503cd3a7e'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// Only want to seed the data once
// seedDatabase(firebase);

export { firebase, FieldValue };
