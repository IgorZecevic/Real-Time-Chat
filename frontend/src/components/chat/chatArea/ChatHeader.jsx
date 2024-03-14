import { Box, Avatar, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { getFirstCharUppercase } from '../../../utils/stringHelpers';
import { useSocketContext } from '../../../customHooks/useSocketContext';
import {
  SELECT_CHAT,
  CLEAR_MESSAGES,
} from '../../../redux/features/chat/chat.slice';

const ChatHeader = ({ chatInfo }) => {
  const dispatch = useDispatch();

  const { leaveRoom } = useSocketContext();

  const chat = useSelector((state) => state.chat);

  const handleLeaveRoom = async () => {
    if (chat.selectedChatId === null) return;

    leaveRoom(chat.selectedChatId);
    dispatch(SELECT_CHAT({ chatId: null }));
    dispatch(CLEAR_MESSAGES());
  };

  if (chatInfo === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant='subtitle1' fontWeight='bold'>
          Welcome to Real Time Chat App
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Avatar sx={{ bgcolor: 'primary.main' }}>
        {getFirstCharUppercase(chatInfo.name)}
      </Avatar>
      <Typography variant='subtitle1' sx={{ ml: 1 }}>
        {chatInfo.name}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Button
        onClick={handleLeaveRoom}
        variant='outlined'
        startIcon={<LogoutIcon />}
      >
        Leave room
      </Button>
    </Box>
  );
};

ChatHeader.propTypes = {
  chatInfo: PropTypes.shape({
    name: PropTypes.string,
  }),
};
export default ChatHeader;
