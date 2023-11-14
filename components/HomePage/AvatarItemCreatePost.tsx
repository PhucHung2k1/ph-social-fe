import React, { useMemo } from 'react';
import Image from 'next/image';

// eslint-disable-next-line react/display-name
const AvatarItemCreatePost = ({ img, index, deleteImages }: any) => {
  let imageUrl = img.camera || img.url || '';

  if (!imageUrl && img) {
    imageUrl = URL?.createObjectURL?.(img);
  }

  return (
    <div key={index} id="file_img">
      {img.type !== 'video/mp4' ? (
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
      )}
    </div>
  );
};

export default React.memo(AvatarItemCreatePost);
