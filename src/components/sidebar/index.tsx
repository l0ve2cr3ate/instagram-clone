import { FC, useContext } from 'react';
import User from './user';
import Suggestions from './suggestions';
import LoggedInUserContext from '../../context/logged-in-user';

const Sidebar: FC = () => {
  const {
    user: { docId = '', fullName = '', username = '', userId = '', following = [] } = {}
  } = useContext(LoggedInUserContext);
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
};

export default Sidebar;
