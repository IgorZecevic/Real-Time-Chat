import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import { Formik, Form } from 'formik';

import { registerUser } from '../../redux/features/auth/auth.slice.js';
import FormikField from '../../components/form/FormikField.jsx';
import { registerValidationSchema } from '../../utils/authValidation.js';

const INTIAL_STATE = {
  username: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const actionResult = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(actionResult)) {
      navigate('/');
    }

    setSubmitting(false);
  };

  return (
    <div className='auth-page'>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h4' mb={2}>
            Register
          </Typography>
        </Box>

        <Formik
          initialValues={INTIAL_STATE}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormikField
                    name='username'
                    label='Username'
                    autoComplete='username'
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikField
                    name='password'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikField
                    name='confirmPassword'
                    label='Password'
                    type='password'
                    autoComplete='confirm-password'
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link to='/login'>Already have an account? Log in</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Register;
