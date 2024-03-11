import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Box } from '@mui/material';

import { getUsers } from '../../../../redux/features/user/user.slice';
import UsersListItem from './UsersListItem';

const UsersList = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);

  let users = useSelector((state) => state.user.users);
  users = users.filter((user) => user._id !== currentUser._id);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Box sx={{ overflowY: 'auto', height: '100%', flexGrow: 1 }}>
      <List>
        {users.map((user, index) => {
          return <UsersListItem key={index} user={user} />;
        })}
      </List>
    </Box>
  );
};

export default UsersList;
