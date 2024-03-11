import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';

import { getFirstCharUppercase } from '../../../../utils/stringHelpers';

const RoomListItem = React.memo(({ room }) => {
  const handleRoomClick = (roomId) => {
    console.log('Room clicked:', roomId);
  };

  return (
    <ListItemButton onClick={() => handleRoomClick('room._id')}>
      <ListItemAvatar>
        <Avatar>{getFirstCharUppercase(room.name)}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={room.name} />
    </ListItemButton>
  );
});

RoomListItem.displayName = 'RoomListItem';

RoomListItem.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoomListItem;
