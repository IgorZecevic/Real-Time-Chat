import { useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Box } from '@mui/material';

import MessagesListItem from './MessagesListItem';
import BotMessagesListItem from './BotMessagesListItem';
import NoChatSelected from './NoChatSelected';
import NoMessages from './NoMessages';
import { useScrollToBottom } from '../../../../customHooks/useScrollToBottom';

const MessagesList = ({ messages }) => {
  const user = useSelector((state) => state.auth.user);
  const chat = useSelector((state) => state.chat);

  const messagesContainerRef = useRef(null);

  // Scroll to the bottom of the message list immediately after messages are loaded
  useScrollToBottom(messagesContainerRef, messages);

  if (chat.selectedChatId === null) {
    return <NoChatSelected />;
  }

  if (chat.isPrivate && chat.messages.length === 0) {
    return <NoMessages />;
  }

  return (
    <Box
      sx={{ overflowY: 'auto', flexGrow: 1, p: 2 }}
      ref={messagesContainerRef}
    >
      <List>
        {messages.map((message, index) =>
          message.senderId === -1 ? (
            <BotMessagesListItem key={index} message={message.message} />
          ) : (
            <MessagesListItem
              key={message._id}
              message={message}
              isCurrentUser={user._id === message.senderId?._id}
            />
          )
        )}
      </List>
    </Box>
  );
};

MessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
};
export default MessagesList;
