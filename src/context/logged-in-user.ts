import { createContext } from 'react';
import { User } from '../hooks/use-user';

const LoggedInUserContext = createContext({} as { user: User });

export default LoggedInUserContext;
