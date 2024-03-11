import { useState } from 'react';
import { Box, Grid, Divider, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';

import CurrentUser from './CurrentUser';
import RoomsList from './rooms/RoomsList';
import UsersList from './users/UsersList';

const Sidebar = ({ currentUser }) => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid
      item
      xs={12}
      md={3}
      sx={{
        borderRight: 1,
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CurrentUser currentUser={currentUser} />
      <Divider />
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label='Rooms' />
        <Tab label='Users' />
      </Tabs>
      <Divider />
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {tabValue === 0 ? <RoomsList /> : <UsersList />}
      </Box>
    </Grid>
  );
};

Sidebar.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Sidebar;
