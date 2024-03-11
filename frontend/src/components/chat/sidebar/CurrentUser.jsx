import { Box, Avatar, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../../redux/features/auth/auth.slice';
import { getFirstCharUppercase } from '../../../utils/stringHelpers';

const CurrentUser = ({ currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutUser = async () => {
    const actionResult = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(actionResult)) {
      navigate('/login');
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ bgcolor: 'primary.main' }}>
        {getFirstCharUppercase(currentUser.username)}
      </Avatar>
      <Typography variant='subtitle1' sx={{ ml: 1 }}>
        {currentUser.username}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />{' '}
      <Button
        onClick={handleLogoutUser}
        variant='outlined'
        startIcon={<LogoutIcon />}
      >
        Logout
      </Button>
    </Box>
  );
};

CurrentUser.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default CurrentUser;
