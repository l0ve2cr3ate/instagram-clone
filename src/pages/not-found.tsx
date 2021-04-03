import { FC, useEffect } from 'react';
import Header from '../components/header';

const NotFound: FC = () => {
  useEffect(() => {
    document.title = 'Not Found - Instagram';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
};

export default NotFound;
