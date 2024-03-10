const asyncHandler = require('express-async-handler');

const { authService } = require('../services/index.js');

const register = asyncHandler(async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  const { user, token } = await authService.register({
    username,
    password,
    confirmPassword,
  });

  setAuthCookie(res, token);

  res.status(201).json({
    isSuccess: true,
    message: 'You have successfully registered',
    data: { user },
  });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const { user, token } = await authService.login({ username, password });

  setAuthCookie(res, token);

  res.json({
    isSuccess: true,
    message: 'You have successfully logged in',
    data: { user },
  });
});

const logout = asyncHandler(async (req, res) => {
  let token;
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    await authService.logout(token);
  }

  removeAuthCookie(res);

  res.status(200).json({
    isSuccess: true,
    message: 'You have successfully logged out',
    data: null,
  });
});

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.json({
      isSuccess: true,
      message: '',
      data: { isLoggedIn: false, user: null },
    });
    return;
  }

  const loginStatusData = await authService.loginStatus(token);

  res.json({ isSuccess: true, message: '', data: loginStatusData });
});

const setAuthCookie = (res, token) => {
  res.cookie('jwt', token, {
    path: '/',
    httpOnly: true, // prevent XSS (cross-site scripting) attacks
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'strict', // prevent CSRF (cross-site request forgery) attacks
    secure: process.env.NODE_ENV === 'production',
  });
};

const removeAuthCookie = (res) => {
  res.cookie('jwt', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0), // expire cookie immediately
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};

module.exports = {
  register,
  login,
  logout,
  loginStatus,
};
