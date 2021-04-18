import Firebase from 'firebase/app';
import { FieldValue, firebase } from '../lib/firebase';
import { Comment } from '../components/post/comments';
import { User } from '../hooks/use-user';

export type Photo = {
  likes: string[];
  userId: string;
  imageSrc: string;
  docId: string;
  dateCreated: number;
  comments: Comment[];
  caption: string;
};

export type PhotoWithUserDetails = Photo & { username: string; userLikedPhoto: boolean };

export async function doesUsernameExist(username: string): Promise<boolean[]> {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username: string | undefined): Promise<User[]> {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => ({ ...user.data(), docId: user.id })) as User[];
}

export async function getUserByUserId(userId: string): Promise<User[]> {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user = result.docs.map((item) => ({ ...item.data(), docId: item.id }));

  return user as User[];
}

export async function getSuggestedProfiles(
  userId: string,
  following: string[]
): Promise<Firebase.firestore.DocumentData[]> {
  const result = await firebase.firestore().collection('users').limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id } as { userId: string; docId: string }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId: string,
  profileId: string,
  isFollowingProfile: boolean
): Promise<void> {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(
  profileDocId: string,
  userId: string,
  isFollowingProfile: boolean
): Promise<void> {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
    });
}

export async function getPhotos(
  userId: string,
  following: string[]
): Promise<PhotoWithUserDetails[]> {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  })) as Photo[];

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username: string | undefined): Promise<Photo[]> {
  const [user] = (await getUserByUsername(username)) as User[];
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

  return result.docs.map((photo) => ({ ...photo.data(), docId: photo.id })) as Photo[];
}

export async function isUserFollowingProfile(
  loggedInUserUsername: string,
  profileUserId: string | undefined
): Promise<string> {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response] = result.docs.map((user) => ({ ...user.data(), docId: user.id })) as User[];

  return response?.userId;
}

export async function toggleFollow(
  isFollowingProfile: boolean,
  activeUserDocId: string,
  profileDocId: string,
  profileUserId: string,
  followingUserId: string
): Promise<void> {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
