import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getDataAPI } from '@/utils/fetchData';
import React, { useState, useRef, useEffect } from 'react';
import UserCard from '../User/UserCard';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { useRouter } from 'next/router';
import { addUser, getConversations } from '@/store/message/messageAction';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { checkOnlineOfflineRedux } from '@/store/message/messageSlice';
import { useTranslation } from 'react-i18next';
const LeftSide = () => {
  const auth = useAppSelector((state: any) => state.authSlice.auth);
  const message = useAppSelector((state) => state.messageSlice);
  const online = useAppSelector((state) => state.onlineSlice.users);
  const dispatch = useAppDispatch();
  const pageEnd = useRef<any>();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const [searchUsers, setSearchUsers] = useState([]);
  const { t } = useTranslation();
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      // const res = await getDataAPI(`search?username=${search}`, auth.token);
      // setSearchUsers(res.data.users);
    } catch (err: any) {
      showToastMessage(dispatch, err, 'error');
    }
  };
  const router = useRouter();
  const { id } = router.query;
  const isActive = (user: any) => {
    if (id === user._id) return 'active';
    return '';
  };

  const handleAddUser = (user: any) => {
    setSearch('');
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    router.push(`/messages/${user._id}`);
    // dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}})
    // dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
    // return history.push(`/message/${user._id}`)
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataAPI(
          `search?username=${search}`,
          auth.token
        );

        setSearchUsers(
          result?.data?.users?.filter(
            (item: any) => item._id !== auth?.user?._id
          )
        );
      } catch (error) {
        console.error(error);
      }
    };
    if (search.length > 0) {
      const timeoutId = setTimeout(() => {
        fetchData();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [auth.token, search]);

  useEffect(() => {
    if (message.firstLoad) return;
    if (auth?.token) {
      dispatch(getConversations({ auth }));
    }
  }, [auth, dispatch, message.firstLoad]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  // check user onl off
  useEffect(() => {
    if (message.firstLoad) {
      dispatch(checkOnlineOfflineRedux(online));
    }
  }, [dispatch, message.firstLoad, online]);

  return (
    <>
      <form className="message_header" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder={t('search')}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-4"
        />

        <button type="submit" style={{ display: 'none' }}>
          Search
        </button>
      </form>
      <div className="message_chat_list">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user: any) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} link={false} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user: any) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} link={false} msg={true}>
                  {user.online ? (
                    <FiberManualRecordIcon
                      style={{ color: 'green', fontSize: '15px' }}
                    />
                  ) : (
                    auth.user.following.find(
                      (item: any) => item._id === user._id
                    ) && (
                      <FiberManualRecordIcon
                        style={{
                          color: 'gray',
                          fontSize: '15px',
                          opacity: 0.2,
                        }}
                      />
                    )
                  )}
                </UserCard>
              </div>
            ))}
          </>
        )}
        <div>
          <button style={{ opacity: 0 }} ref={pageEnd}>
            Load more
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
