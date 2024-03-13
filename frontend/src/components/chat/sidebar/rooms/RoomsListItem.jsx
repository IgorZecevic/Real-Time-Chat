import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';

import { getFirstCharUppercase } from '../../../../utils/stringHelpers';
import { SELECT_CHAT } from '../../../../redux/features/chat/chat.slice';
import { useSocketContext } from '../../../../customHooks/useSocketContext';

const RoomListItem = React.memo(({ room }) => {
  const dispatch = useDispatch();

  const chat = useSelector((state) => state.chat);

  const { joinRoom, leaveRoom } = useSocketContext();

  const handleRoomClick = (roomId) => {
    if (roomId === chat.selectedChatId) return;

    if (chat.selectedChatId) {
      leaveRoom(chat.selectedChatId);
    }

    dispatch(SELECT_CHAT({ chatId: roomId }));
    joinRoom(roomId);
  };

  return (
    <ListItemButton
      onClick={() => handleRoomClick(room._id)}
      selected={room._id === chat.selectedChatId}
      sx={{
        '&.Mui-selected, &.Mui-selected:hover': {
          backgroundColor: 'primary.dark',
          color: 'white',
        },
      }}
    >
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
