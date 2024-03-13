import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, TextField, IconButton, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import Sidebar from '../components/chat/sidebar/Sidebar';
import ChatHeader from '../components/chat/chatArea/ChatHeader';
import MessagesList from '../components/chat/chatArea/messages/MessagesList';

const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);

  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = useCallback(() => {
    console.log('Sending message:', newMessage);
  }, [newMessage]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const chatInfo = {
    name: 'Test Chat Room',
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: 'white',
        overflow: 'hidden',
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        {/* Sidebar */}
        <Sidebar currentUser={user} />

        {/* Chat Section */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <ChatHeader chatInfo={chatInfo} />
          <Divider />
          <MessagesList messages={messages} />
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <TextField
              fullWidth
              size='small'
              placeholder='Type a message...'
              value={newMessage}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
              autoComplete='off'
            />
            <IconButton color='primary' onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
