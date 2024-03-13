import { Typography, Box } from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material/';

const NoMessages = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <ChatBubbleOutline
        sx={{
          fontSize: 48,
          marginBottom: (theme) => theme.spacing(2),
          color: 'primary.main',
        }}
      />
      <Typography variant='h6' align='center'>
        There are no messages. Send a message to start the chat.
      </Typography>
    </Box>
  );
};

export default NoMessages;
