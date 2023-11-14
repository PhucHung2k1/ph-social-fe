export const EditData = (data: any, id: any, post: any) => {
  const newData = data.map((item: any) => (item._id === id ? post : item));
  return newData;
};

export const DeleteData = (data: any, id: any) => {
  const newData = data.filter((item: any) => item._id !== id);
  return newData;
};
export const removeDuplicates = (arr: any, key: any) => {
  const uniqueMap = new Map();
  arr.forEach((item: any) => {
    if (!uniqueMap.has(item?.[key])) {
      uniqueMap.set(item?.[key], item);
    }
  });
  return Array.from(uniqueMap.values());
};
export const formatNumber = (number: any) => {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(2) + ' B';
  }
  if (number >= 1e6) {
    return (number / 1e6).toFixed(2) + ' M';
  }
  if (number >= 1e3) {
    return (number / 1e3).toFixed(2) + ' N';
  }
  return number?.toString();
};
export interface FeelingItem {
  avt: string;
  label: string;
  activity?: boolean;
}

export const arrFeelingItems: Array<FeelingItem> = [
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692419012/regret_ocoa5x.png',
    label: 'regret',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692419012/love_gwcsfs.png',
    label: 'love',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692419012/happy_fmdrtz.png',
    label: 'happy',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692419012/sad_xuz7fa.png',
    label: 'Sad',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692419012/cool_zigidt.png',
    label: 'cool',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692419011/fine_uje8gl.png',
    label: 'fine',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692419012/sorry_p0seh7.png',
    label: 'sorry',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692419012/hopeless_nix8pb.png',
    label: 'hopeless',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421515/cold_aqmdkl.png',
    label: 'cold',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421515/bored_bsopnm.png',
    label: 'bored',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421515/lonely_kpin89.png',
    label: 'lonely',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421516/funny_clfe2j.png',
    label: 'funny',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421515/evil_midlss.png',
    label: 'evil',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421516/confident_ujqjha.png',
    label: 'confident',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421516/sick_c4nngh.png',
    label: 'sick',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421516/ok_tw9xy5.png',
    label: 'ok',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421516/rich_rqacu9.png',
    label: 'rich',
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421753/healthy_jjlib9.png',
    label: 'healthy',
  },
];

export const arrActivityItem: Array<FeelingItem> = [
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692517662/reading_skspyj.png',
    label: 'reading',
    activity: true,
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692517663/lookingfor_r6posl.png',
    label: 'looking for',
    activity: true,
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692517663/lisstening_leid8e.png',
    label: 'listening',
    activity: true,
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692517663/thinking_zyldpo.png',
    label: 'thinking',
    activity: true,
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692517663/travelling_juf7s3.png',
    label: 'traveling',
    activity: true,
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692517663/playing_byygi6.png',
    label: 'playing',
    activity: true,
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692517663/drinking_ohmrtu.png',
    label: 'drinking',
    activity: true,
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692517663/eatong_ream7w.png',
    label: 'eating',
    activity: true,
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692517663/ceblerating_nbt12x.png',
    label: 'celebrating',
    activity: true,
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692517663/watching_es8f5p.png',
    label: 'watching',
    activity: true,
  },
  {
    avt: 'https://res.cloudinary.com/luuphuchung2810/image/upload/v1692421515/lonely_kpin89.png',
    label: 'lonely',
    activity: true,
  },
];
