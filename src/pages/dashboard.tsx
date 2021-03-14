import { FC, useEffect } from 'react';
import Firebase from 'firebase/app';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';

export type DashboardProps = {
  user: Firebase.User;
};

const Dashboard: FC<DashboardProps> = ({ user: loggedInUser }) => {
  const { user } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
};

export default Dashboard;
