import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export type User = {
  fullName: string;
  username: string;
  userId: string;
  following: string[];
  docId: string;
};

export default function useUser(): { user: User } {
  const [activeUser, setActiveUser] = useState({} as User);

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response as User);
    }

    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
}
