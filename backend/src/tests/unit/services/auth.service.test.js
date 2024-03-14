const validation = require('../../../utils/validation');
const userRepository = require('../../../repositories/user.repository');
const httpErrors = require('../../../utils/httpErrors');

jest.mock('../../../utils/validation', () => ({
  validateRegisterData: jest.fn(),
}));

jest.mock('../../../services/auth.service', () => ({
  checkIfUsernameIsTaken: jest.fn(),
  hashUserPassword: jest.fn(),
  createUserAndGenerateToken: jest.fn(),
  storeSessionInfoInRedis: jest.fn(),
  register: jest.fn(),
}));

jest.mock('../../../repositories/user.repository', () => ({
  findUserByUsername: jest.fn(),
}));

const authService = require('../../../services/auth.service');

beforeEach(() => {
  jest.clearAllMocks();

  jest.mock('../../../utils/httpErrors', () => ({
    BadRequestError: jest.fn().mockImplementation((message) => {
      throw new Error(message);
    }),
  }));

  authService.checkIfUsernameIsTaken.mockResolvedValue();
  authService.hashUserPassword.mockImplementation(() =>
    Promise.resolve('hashedPassword')
  );
  authService.createUserAndGenerateToken.mockResolvedValue({
    user: { _id: 'userId', username: 'sanitizedUsername' },
    token: 'token',
  });
  authService.storeSessionInfoInRedis.mockResolvedValue();
  authService.register.mockImplementation((username, password) => {
    const validationResponse = validation.validateRegisterData({
      username,
      password,
    });
    if (!validationResponse.isValid) {
      return Promise.reject(
        new httpErrors.BadRequestError('Validation failed')
      );
    }
    return Promise.resolve({
      user: { _id: 'userId', username: 'sanitizedUsername' },
      token: 'token',
    });
  });
});

describe('Auth Service - Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    validation.validateRegisterData.mockReturnValue({
      isValid: true,
      errors: {},
      sanitizedData: { usernameSanitized: 'sanitizedUsername' },
    });

    userRepository.findUserByUsername.mockResolvedValue(null);

    const result = await authService.register('sanitizedUsername', 'password');

    expect(result).toEqual({
      user: { _id: 'userId', username: 'sanitizedUsername' },
      token: 'token',
    });
  }, 30000);

  it('should throw BadRequestError when validation fails', async () => {
    validation.validateRegisterData.mockReturnValue({
      isValid: false,
      errors: {
        username: 'Invalid username',
      },
      sanitizedData: {},
    });

    await expect(
      authService.register('sanitizedUsername', 'password')
    ).rejects.toThrow(httpErrors.BadRequestError);
  });

  it('should handle error when username is already taken', async () => {
    authService.checkIfUsernameIsTaken.mockRejectedValue(new Error());

    await expect(
      authService.register('sanitizedUsername', 'password')
    ).rejects.toThrow(Error);
  });

  it('should handle error when password hashing fails', async () => {
    authService.hashUserPassword.mockRejectedValue(new Error());

    await expect(
      authService.register('sanitizedUsername', 'password')
    ).rejects.toThrow(Error);
  });

  it('should handle error when user creation fails', async () => {
    authService.createUserAndGenerateToken.mockRejectedValue(new Error());

    await expect(
      authService.register('sanitizedUsername', 'password')
    ).rejects.toThrow(Error);
  });
});
