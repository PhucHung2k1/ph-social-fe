// import { useSearchParams } from 'next/navigation';
// import React from 'react';
// import usePaginate from './usePaginate';
// import { tr } from 'date-fns/locale';

// const HomePaginate = () => {
//   const [searchParams] = useSearchParams();

//   const { data, page, limit, nextPage, prevPage } = usePaginate(
//     'https://dummyapi.io/data/v1/posts',
//     searchParams
//   );

//   return (
//     <div className="container">
//       <table>
//         <thead>
//           <tr>
//             <td>#</td>
//             <td>Author</td>
//             <td>Likes</td>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {data.map((item: any, index) => {
//             console.log('item', item);
//             const no = page * limit + index;

//             return (
//               <tr key={item.id}>
//                 <td>{no}</td>
//                 <td></td>
//                 <td></td>
//               </tr>
//             );
//           })} */}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default HomePaginate;
import React, { useState } from 'react';
import useFefch from './useFetch';
import useDebounce from './useDebouce';
import DeactivateAccountModal from '@/components/Common/DeactiveAccountModal';

const HomePaginate = () => {
  const [data] = useFefch('https://dummyjson.com/posts');

  const [value, setValue] = useState();
  const debounceValue = useDebounce(value, 1000);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div>
      {/* <input value={value} onChange={onChange} /> */}
      <DeactivateAccountModal />
    </div>
  );
};

export default HomePaginate;
