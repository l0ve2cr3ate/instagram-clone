import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase';

type SuggestedProfileProps = {
  userId: string;
  profileId: string;
  username: string;
  profileDocId: string;
  loggedInUserDocId: string;
};

const SuggestedProfile: FC<SuggestedProfileProps> = ({
  userId,
  profileId,
  profileDocId,
  loggedInUserDocId,
  username
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);

    // update following array of logged in user
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    // update followers array of user who has been followed
    await updateFollowedUserFollowers(profileDocId, userId, false);
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedProfile;
