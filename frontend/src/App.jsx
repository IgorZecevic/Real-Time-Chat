import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';

import './App.css';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Chat from './pages/Chat';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import { useAuthStatus } from './customHooks/useAuthStatus';
import theme from './themes/theme';

function App() {
  useAuthStatus();

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            <Route
              path='/register'
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
