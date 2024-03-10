import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import { Formik, Form } from 'formik';

import { loginUser } from '../../redux/features/auth/auth.slice.js';
import FormikField from '../../components/form/FormikField.jsx';
import { loginValidationSchema } from '../../utils/authValidation.js';

const INTIAL_STATE = {
  username: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const actionResult = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(actionResult)) {
      navigate('/');
    }

    setSubmitting(false);
  };

  return (
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
          Login
        </Typography>
      </Box>
      <Formik
        initialValues={INTIAL_STATE}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
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
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link to='/register'>Don&apos;t have an account? Register</Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
