import { useState, useEffect } from 'react';
const usePaginate = (url: string, query: any) => {
  const [data, setData] = useState({
    data: [],
    page: 0,
    nextPage: 0,
    prevPage: 0,
    limit: 0,
    total: 0,
  });
  useEffect(() => {
    fetch(`${url}?${query.toString()}`, {
      headers: {
        'app-id': '6230c1b3d82bc9fe731c7d8c',
      },
    })
      .then((res) => res.json())
      .then(({ posts: data, limit, total, page }) => {
        setData({
          data,
          limit,
          total,
          page,
          nextPage: page + 1,
          prevPage: page - 1,
        });
        console.log(data, limit, total, page);
      });
  }, [query]);

  return data;
};
export default usePaginate;
