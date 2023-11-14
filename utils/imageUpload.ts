export const checkImage = (file: any) => {
  let err = '';
  if (!file) {
    return (err = 'File does not exists!');
  }
  if (file.size > 1024 * 1024) {
    err = 'The largest image size is 1mb';
  }
  if (
    file.type !== 'image/jpeg' &&
    file.type !== 'image/png' &&
    file.type !== 'image/svg'
  ) {
    err = 'Image format is incorrect!';
  }
  return err;
};
export const imageUpload = async (images: any) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append('file', item.camera);
    } else {
      formData.append('file', item);
    }

    formData.append('upload_preset', 'mg60nzxl');
    formData.append('cloud_name', 'luuphuchung2810');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/luuphuchung2810/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();

    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }

  return imgArr;
};
export const videoUpload = async (images: any) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append('file', item.camera);
    } else {
      formData.append('file', item);
    }

    formData.append('upload_preset', 'mg60nzxl');
    formData.append('cloud_name', 'luuphuchung2810');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/luuphuchung2810/video/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();

    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }

  return imgArr;
};
