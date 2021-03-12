import { FC } from 'react';
import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';

const Sidebar: FC = () => {
  const {
    user: { fullName, username, userId, following, docId }
  } = useUser();
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
};

export default Sidebar;
