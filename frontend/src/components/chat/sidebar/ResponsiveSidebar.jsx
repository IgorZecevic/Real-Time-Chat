import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Sidebar from './Sidebar';

const ResponsiveSidebar = ({ currentUser }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {isSmallScreen ? (
        <>
          <IconButton
            color='inherit'
            edge='start'
            onClick={() => setDrawerOpen(true)}
            sx={{
              paddingLeft: 3,
              '& .MuiSvgIcon-root': { fontSize: '3rem' },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={'left'}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box sx={{ minWidth: 300 }}>
              <Sidebar currentUser={currentUser} />
            </Box>
          </Drawer>
        </>
      ) : (
        <Sidebar currentUser={currentUser} />
      )}
    </>
  );
};

ResponsiveSidebar.propTypes = {
  currentUser: PropTypes.object.isRequired,
};
export default ResponsiveSidebar;
