import { Button, Grid, Box } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { createRoom } from '../../../../redux/features/room/room.slice';
import FormikField from '../../../form/FormikField';

const INTIAL_STATE = {
  roomName: '',
};

const ROOM_VALIDATION_SCHEMA = Yup.object().shape({
  roomName: Yup.string().required('Room name is required'),
});

const AddRoomForm = () => {
  const dispatch = useDispatch();

  const handleCreateRoom = async (values, { resetForm }) => {
    await dispatch(createRoom(values));
    resetForm();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Formik
        initialValues={INTIAL_STATE}
        validationSchema={ROOM_VALIDATION_SCHEMA}
        onSubmit={handleCreateRoom}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2} display='flex' alignItems='flex-start'>
              <Grid item xs>
                <FormikField
                  size='small'
                  name='roomName'
                  label='New Room Name'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddRoomForm;
