import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Box, Typography } from '@mui/material';

const MessagesListItem = React.memo(({ message, isCurrentUser }) => {
  const bubbleColor = isCurrentUser ? '#1976d2' : '#F44336';
  return (
    <ListItem
      alignItems='flex-start'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
      }}
    >
      {/* Message Bubble */}
      <Box
        sx={{
          maxWidth: '75%',
          bgcolor: bubbleColor,
          borderRadius: '20px',
          padding: '6px 12px',
          display: 'inline-block',
          wordBreak: 'break-word',
          color: 'white',
        }}
      >
        <Typography variant='body1'>{message.message}</Typography>
      </Box>

      {/* User and Time */}
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
        }}
      >
        <Typography
          variant='caption'
          sx={{ color: 'text.secondary', mr: 1, fontWeight: 'bold' }}
        >
          {message.senderId.username}
        </Typography>
        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
          {new Date(message.createdAt).toLocaleTimeString()}
        </Typography>
      </Box>
    </ListItem>
  );
});

MessagesListItem.displayName = 'MessagesListItem';

MessagesListItem.propTypes = {
  message: PropTypes.shape({
    senderId: PropTypes.shape({
      username: PropTypes.string,
    }),
    message: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
};

export default MessagesListItem;
