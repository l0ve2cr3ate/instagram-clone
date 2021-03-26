import { FC, useState, useEffect, Dispatch, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { State } from '.';
import UserContext from '../../context/user';
import useUser, { User } from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

export type HeaderProps = {
  photosCount: number;
  profile: User | Record<string, never> | null;
  followerCount: number;
  setFollowerCount: Dispatch<State>;
};

const Header: FC<HeaderProps> = ({ photosCount, profile, followerCount, setFollowerCount }) => {
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid) as { user: User };

  const profileUserId = profile?.userId as string;
  const profileDocId = profile?.docId as string;
  const fullName = profile?.fullName;
  const profileUsername = profile?.username;
  const following = profile?.following || [];
  const followers = profile?.followers || [];

  const activeButtonFollow = user?.username && user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    } as State);

    await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      setIsFollowingProfile(!!isFollowing);
    };

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername ? (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${fullName} profile`}
            src={`/images/avatars/${profileUsername}.jpg`}
          />
        ) : (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={"Karl Hadwen's profile placeholder"}
            src="/images/avatars/karl.jpg"
          />
        )}
      </div>

      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeButtonFollow && (
            <button
              type="button"
              className="bg-blue-medium font-bold text-sm text-white w-20 h-8"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount} photos</span>
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {followerCount === 1 ? ` followers` : ` follower`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length} following</span>
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
