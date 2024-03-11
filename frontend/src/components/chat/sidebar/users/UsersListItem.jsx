import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
} from '@mui/material';

import { getFirstCharUppercase } from '../../../../utils/stringHelpers';
import { useSocketContext } from '../../../../customHooks/useSocketContext';

const UsersListItem = React.memo(({ user }) => {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const handleUserClick = (userId) => {
    console.log('User clicked', userId);
  };

  return (
    <ListItemButton onClick={() => handleUserClick(user._id)}>
      <ListItemAvatar>
        <Badge
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
          color={isOnline ? 'success' : 'default'}
          sx={{
            '.MuiBadge-dot': {
              backgroundColor: isOnline ? 'green' : 'lightgray',
              width: 12,
              height: 12,
              borderRadius: '50%',
            },
          }}
        >
          <Avatar>{getFirstCharUppercase(user.username)}</Avatar>
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        secondary={isOnline ? 'Online' : ''}
      />
    </ListItemButton>
  );
});

UsersListItem.displayName = 'UserListItem';

UsersListItem.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default UsersListItem;
