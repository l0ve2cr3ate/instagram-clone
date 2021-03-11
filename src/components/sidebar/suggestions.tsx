import { FC, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

type Profile = {
  docId: string;
  userId: string;
  username: string;
};

type SuggestionsProps = {
  loggedInUserDocId: string;
  userId: string;
  following: string[];
};

const Suggestions: FC<SuggestionsProps> = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response as Profile[]);
    }
    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  // eslint-disable-next-line no-nested-ternary
  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles?.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;
