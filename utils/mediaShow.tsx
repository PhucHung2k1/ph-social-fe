/* eslint-disable @next/next/no-img-element */
export const imageShow = (src: any) => {
  return <img src={src} alt="images" className="img-thumbnail" />;
};

export const videoShow = (src: any) => {
  return <video controls src={src} className="img-thumbnail" />;
};
