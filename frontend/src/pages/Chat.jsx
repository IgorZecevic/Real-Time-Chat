import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import Sidebar from '../components/chat/sidebar/Sidebar';

const Chat = () => {
  const user = useSelector((state) => state.auth.user);

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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              bgcolor: 'background.paper',
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>N</Avatar>
            <Typography variant='subtitle1' sx={{ ml: 1 }}>
              NodeJS
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ height: '100%' }}></Box>
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
