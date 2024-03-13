import { Typography, Box } from '@mui/material';
import { Forum } from '@mui/icons-material/';

const NoChatSelected = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 3,
      }}
    >
      <Forum
        sx={{
          fontSize: 48,
          marginBottom: (theme) => theme.spacing(2),
          color: 'primary.main',
        }}
      />
      <Typography variant='h6' align='center'>
        Select a chat to start messaging.
      </Typography>
    </Box>
  );
};

export default NoChatSelected;
