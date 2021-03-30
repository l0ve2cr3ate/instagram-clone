import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export type User = {
  fullName: string;
  username: string;
  emailAddress: string;
  userId: string;
  following: string[];
  followers: string[];
  docId: string;
};

export default function useUser(userId: string): { user: User } {
  const [activeUser, setActiveUser] = useState({} as User);

  useEffect(() => {
    async function getUserObjByUserId(userId: string) {
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || ({} as User));
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser };
}
