import { FC, useReducer, useEffect } from 'react';
import { User } from '../../hooks/use-user';
import { Photo, getUserPhotosByUsername } from '../../services/firebase';
import Header from './header';
import Photos from './photos';

export type UserProfileProps = {
  user: User | null;
};

export type State = {
  profile: User | Record<string, never> | null;
  photosCollection: Photo[];
  followerCount: number;
};

const reducer = (state: State, newState: State) => ({ ...state, ...newState });

const initialState: State = {
  profile: {},
  photosCollection: [],
  followerCount: 0
};

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user?.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user?.followers.length || 0
      });
    }

    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
};

export default UserProfile;
