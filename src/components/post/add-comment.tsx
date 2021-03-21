/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, FC, Dispatch, SetStateAction } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import { Comment } from './comments';

export type AddCommentProps = {
  docId: string;
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
  commentInput: React.RefObject<HTMLInputElement>;
};

const AddComment: FC<AddCommentProps> = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState('');

  const { firebase, FieldValue } = useContext(FirebaseContext);

  const { user } = useContext(UserContext);

  const { displayName } = user;

  const handleSubmitComment = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setComments([...comments, { displayName, comment }] as Comment[]);
    setComment('');

    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) => (comment.length >= 1 ? handleSubmitComment : event.preventDefault())}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          type="text"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
          type="submit"
          disabled={comment.length < 1}
          onClick={handleSubmitComment as any}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
