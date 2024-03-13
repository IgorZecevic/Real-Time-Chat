import { useSelector } from 'react-redux';
import { Box, Grid, Divider } from '@mui/material';

import Sidebar from '../components/chat/sidebar/Sidebar';
import ChatHeader from '../components/chat/chatArea/ChatHeader';
import MessagesList from '../components/chat/chatArea/messages/MessagesList';
import ChatInput from '../components/chat/chatArea/ChatInput';

const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);

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
          <ChatInput />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
