import { useAppSelector } from '@/store/hook';
import ExploreIcon from '@mui/icons-material/Explore';
import FeedIcon from '@mui/icons-material/Feed';
import ForumIcon from '@mui/icons-material/Forum';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Avatar, Button, Skeleton, Tooltip } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRouter as routerLink } from 'next/router';
import React from 'react';
interface NavProps {
  isClosedSlideBar: boolean;
  setIsClosedSlideBar: any;
}
const Nav: React.FC<NavProps> = ({ isClosedSlideBar, setIsClosedSlideBar }) => {
  const auth = useAppSelector((state) => state.authSlice.auth);

  const { data: session }: any = useSession();

  const router = useRouter();
  const routerMain = routerLink();

  const input = [
    {
      id: '1',
      name: 'A',
      gender: 'nu',
    },
    {
      id: '2',
      name: 'B',
      gender: 'nam',
    },
    {
      id: '3',
      name: 'C',
      gender: 'nam',
    },
    {
      id: '4',
      name: 'D',
      gender: 'nu',
    },
  ];
  // const output = input
  //   .map((item) => {
  //     if (item.gender === 'nam') {
  //       return { human: item.id + item.name, gender: item.gender };
  //     } else {
  //       return undefined;
  //     }
  //   })
  //   .filter((item) => item !== undefined);
  const output = input
    .filter((item) => item.gender === 'nam')
    .map((itemMap) => {
      return { human: `${itemMap.id}${itemMap.name}`, gender: itemMap.gender };
    });

  // console.log(output);

  const arrTest = [3, 4, 6, 1, 2];

  // const bubbleSort = (arr: Array<Number>) => {
  //   let length = arr.length;
  //   for (let i = 0; i < length - 1; i++) {
  //     for (let j = 0; j < length - i - 1; j++) {
  //       if (arr[j] > arr[j + 1]) {
  //         let temp = arr[j];
  //         arr[j] = arr[j + 1];
  //         arr[j + 1] = temp;
  //       }
  //     }
  //   }
  //   return arr;
  // };'
  const bubbleSort = (arr: any) => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - n; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };
  // console.log(bubbleSort(arrTest));

  const selectionSort = (arr: Array<Number>) => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      // mindex = 1 , i = 0
      if (minIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
    return arr;
  };

  const selectArr = [2, 4, 1, 3];

  const hung = input.reduce((acc: any, cur) => {
    if (cur.gender === 'nam') {
      const { id, name, gender } = cur;
      return [...acc, { human: `${id}${name}`, gender }];
    }
    return acc;
  }, []);

  const bubbleSort1 = (arr: Array<Number>) => {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };

  const selectionSort1 = (arr: Array<Number>) => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
    return arr;
  };

  const [listFeature, setListFeature] = React.useState([
    {
      id: 'newsfeed',
      name: 'Newsfeed',
      icon: <FeedIcon />,
      selected: routerMain.asPath.replace('/', '') === '',
      component: <></>,
      href: '/',
    },
    {
      id: 'discover',
      name: 'Discover',
      icon: <ExploreIcon />,
      selected: routerMain.asPath.replace('/', '') === 'discover',
      component: <></>,
      href: '/discover',
    },
    // {
    //   id: 'groups',
    //   name: 'Groups',
    //   icon: <GroupAddIcon />,
    //   selected: false,
    //   component: <></>,
    //   href: '/group',
    // },
    {
      id: 'messages',
      name: 'Saved Posts',
      icon: <BookmarkAddedIcon />,
      selected: false,
      component: <></>,
      href: '/savedposts',
    },
    // {
    //   id: 'shop',
    //   name: 'Shop',
    //   icon: <ShoppingBasketIcon />,
    //   selected: false,
    //   component: <></>,
    //   href: '/shop',
    // },
  ]);
  const handleSelectedListFeature = (value: any) => {
    setListFeature(
      listFeature.map((item) => {
        return {
          ...item,
          selected: item.id === value,
        };
      })
    );
  };

  return (
    <nav
      className={`fixed  top-[71px] left-0 h-full shadow
      } bg-white p-4 transition-all w-72`}
    >
      <Button
        variant="text"
        className="mb-6 flex h-[80px] w-full cursor-pointer rounded-[5px] !bg-white px-[10px] py-[15px] shadow-md"
      >
        {isClosedSlideBar && (
          <>
            {auth?.user?.avatar ? (
              <Avatar
                alt="Remy Sharp"
                src={auth?.user?.avatar}
                sx={{ width: 50, height: 50 }}
                className="mr-3"
              />
            ) : (
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                animation="wave"
              />
            )}

            <div className="my-auto mr-2 gap-1 flex flex-col  text-left text-[18px] normal-case font-extrabold  leading-[18px] text-mango-text-black-1">
              {auth?.user ? (
                <Tooltip title={auth?.user?.username}>
                  <p>
                    {auth?.user?.username?.length > 10
                      ? auth?.user?.username.slice(0, 10) + '...'
                      : auth?.user?.username || ''}
                  </p>
                </Tooltip>
              ) : (
                <Skeleton
                  variant="rounded"
                  width={147}
                  height={20}
                  animation="wave"
                  className="ml-2"
                />
              )}

              {auth?.user ? (
                <Tooltip title={auth?.user?.email}>
                  <p className="text-sm font-light">
                    {auth?.user?.email?.length > 20
                      ? auth?.user.email.slice(0, 20) + '...'
                      : auth?.user?.email || session?.user?.email}
                  </p>
                </Tooltip>
              ) : (
                <Skeleton
                  variant="rounded"
                  width={147}
                  height={20}
                  animation="wave"
                  className="ml-2"
                />
              )}
            </div>
          </>
        )}
      </Button>
      {!auth?.token
        ? Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={256}
              height={40}
              animation="wave"
              className="ml-0 mt-4"
            />
          ))
        : listFeature.map((item) => (
            <Button
              variant="text"
              onClick={() => {
                handleSelectedListFeature(item.id);
                router.push(item.href);
              }}
              sx={{
                mt: 2,
              }}
              className={`${
                item.selected
                  ? ' !bg-primary-main !bg-opacity-30 !text-primary-main hover:bg-primary-main hover:!text-primary-main hover:bg-opacity-30'
                  : ' text-mango-text-gray-2 hover:!bg-[#00BED630]'
              } ${
                isClosedSlideBar && ' !justify-start'
              } flex h-14 w-full cursor-pointer rounded-[5px] p-2`}
              key={item.id}
            >
              <div>{item.icon}</div>

              <span
                className={`ml-2 truncate text-[16px] font-bold capitalize ${
                  item.selected && 'text-mango-primary-blue'
                }`}
              >
                {item.name}
              </span>
            </Button>
          ))}
    </nav>
  );
};

export default React.memo(Nav);
