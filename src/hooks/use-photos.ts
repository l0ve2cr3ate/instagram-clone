import { useState, useEffect } from 'react';
import { getPhotos, PhotoWithUserDetails } from '../services/firebase';
import { User } from './use-user';

export default function usePhotos(user: User): { photos: PhotoWithUserDetails[] | null } {
  const [photos, setPhotos] = useState<PhotoWithUserDetails[] | null>(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);
        followedUserPhotos?.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId]);
  return { photos };
}
