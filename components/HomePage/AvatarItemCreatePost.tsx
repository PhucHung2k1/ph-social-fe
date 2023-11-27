/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react';
import Image from 'next/image';

// eslint-disable-next-line react/display-name
const AvatarItemCreatePost = ({ img, index, deleteImages }: any) => {
  const imageShow = (src: any) => {
    return <img src={src} alt="images" className="img-thumbnail" />;
  };
  const videoShow = (src: any) => {
    return <video controls src={src} className="img-thumbnail" />;
  };

  return (
    <div key={index} id="file_img">
      {/* {img.type !== 'video/mp4' ? (
        <>
          <Image
            src={imageUrl}
            alt="images"
            className="img-thumbnail"
            width={200}
            height={200}
            objectFit="contain"
          />
          <span onClick={() => deleteImages(index)}>&times;</span>
        </>
      ) : (
        <>
          <video controls width="400" height="400">
            <source src={imageUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <span onClick={() => deleteImages(index)}>&times;</span>
        </>
      )} */}
      {img?.camera ? (
        imageShow(img?.carmera)
      ) : img.url ? (
        <>
          {img?.url?.match(/video/i) ? videoShow(img.url) : imageShow(img.url)}
        </>
      ) : (
        <>
          {img?.type?.match(/video/i)
            ? videoShow(URL.createObjectURL(img))
            : imageShow(URL.createObjectURL(img))}
        </>
      )}
      <span onClick={() => deleteImages(index)}>&times;</span>
    </div>
  );
};

export default React.memo(AvatarItemCreatePost);
