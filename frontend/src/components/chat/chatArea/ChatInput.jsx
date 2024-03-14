import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box, TextField, IconButton, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { useSocketContext } from '../../../customHooks/useSocketContext';

const ChatInput = () => {
  const { sendMessage } = useSocketContext();

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const user = useSelector((state) => state.auth.user);
  const chat = useSelector((state) => state.chat);

  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) return;
    if (!chat.selectedChatId) return;

    sendMessage({
      message: newMessage,
      senderId: user._id,
      roomId: chat.selectedChatId,
    });
    setNewMessage('');
  }, [newMessage, sendMessage, user._id, chat.selectedChatId]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        paddingBottom: isSmallScreen ? '5rem' : '1rem',
      }}
    >
      <TextField
        fullWidth
        size='small'
        placeholder='Type a message...'
        value={newMessage}
        onChange={handleMessageChange}
        onKeyDown={handleKeyPress}
        autoComplete='off'
      />
      <IconButton color='primary' onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
