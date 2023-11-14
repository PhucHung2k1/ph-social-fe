/* eslint-disable @next/next/no-img-element */

const Avatar = ({ src, size }: any) => {
  return <img src={src} alt="avatar" className={size} />;
};

export default Avatar;
