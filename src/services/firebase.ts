import Firebase from 'firebase/app';
import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username: string): Promise<boolean[]> {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}