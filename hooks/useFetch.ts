import { useEffect, useState } from 'react';

const useFefch = (url: any) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);
  return [data];
};
export default useFefch;
