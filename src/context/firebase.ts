import { createContext } from 'react';
import Firebase from 'firebase/app';

export type FirebaseContextType = {
  firebase: Firebase.app.App;
  FieldValue: typeof Firebase.firestore.FieldValue;
};

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export default FirebaseContext;
