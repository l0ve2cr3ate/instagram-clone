import { createContext } from 'react';
import Firebase from 'firebase/app';

const UserContext = createContext({} as { user: Firebase.User });

export default UserContext;
