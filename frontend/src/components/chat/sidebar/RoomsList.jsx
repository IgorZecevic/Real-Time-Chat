import { useEffect } from 'react';
import { List, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getRooms } from '../../../redux/features/room/room.slice';
import RoomsListItem from './RoomsListItem';
import AddRoomForm from './AddRoomForm';

const RoomList = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AddRoomForm />
      <Box sx={{ overflowY: 'auto', height: '100%', flexGrow: 1 }}>
        <List>
          {rooms.map((room, index) => (
            <RoomsListItem key={index} room={room} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default RoomList;
