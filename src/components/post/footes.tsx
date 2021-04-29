import { FC } from 'react';

export type FooterProps = {
  caption: string;
  username: string;
};

const Footer: FC<FooterProps> = ({ caption, username }) => (
  <div className="p-4 pt-2 pb-0">
    <span className="mr-1 font-bold">{username}</span>
    <span>{caption}</span>
  </div>
);

export default Footer;
