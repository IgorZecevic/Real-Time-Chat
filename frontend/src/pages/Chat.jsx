import { useSelector } from 'react-redux';
import { Box, Grid, Divider } from '@mui/material';

import ResponsiveSidebar from '../components/chat/sidebar/ResponsiveSidebar';
import ChatHeader from '../components/chat/chatArea/ChatHeader';
import MessagesList from '../components/chat/chatArea/messages/MessagesList';
import ChatInput from '../components/chat/chatArea/ChatInput';

const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const rooms = useSelector((state) => state.room.rooms);
  const { messages, isPrivate, selectedChatId } = useSelector(
    (state) => state.chat
  );

  let chatInfo = null;

  if (selectedChatId && !isPrivate) {
    if (rooms.length > 0) {
      const selectedRoom = rooms.find((room) => room._id === selectedChatId);
      chatInfo = {
        name: selectedRoom.name,
      };
    }
  }

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
        <ResponsiveSidebar currentUser={user} />

        {/* Chat Section */}
        <Grid
          item
          xs={12}
          md={8}
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
