import PropTypes from 'prop-types';
import { ListItem, ListItemText, Typography } from '@mui/material';

const BotMessagesListItem = ({ message }) => {
  return (
    <ListItem
      sx={{
        padding: 1,
        marginBottom: 1,
      }}
    >
      <ListItemText
        primary={
          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
            Real Time Chat Bot
          </Typography>
        }
        secondary={message}
      />
    </ListItem>
  );
};

BotMessagesListItem.propTypes = {
  message: PropTypes.string.isRequired,
};
export default BotMessagesListItem;
