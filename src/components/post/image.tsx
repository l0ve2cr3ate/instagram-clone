import { FC } from 'react';

type ImageProps = {
  src: string;
  caption: string;
};

const Image: FC<ImageProps> = ({ src, caption }) => <img src={src} alt={caption} />;

export default Image;
