import { FC, useRef } from 'react';
import { PhotoWithUserDetails } from '../../services/firebase';
import Actions from './actions';
import Comments from './comments';
import Footer from './footes';
import Header from './header';
import Image from './image';

export type PostProps = {
  content: PhotoWithUserDetails;
};

const Post: FC<PostProps> = ({ content }) => {
  const commentInput = useRef<HTMLInputElement>(null);

  const handleFocus = () => commentInput.current?.focus();
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        commentInput={commentInput}
        posted={content.dateCreated}
        comments={content.comments}
      />
    </div>
  );
};

export default Post;
