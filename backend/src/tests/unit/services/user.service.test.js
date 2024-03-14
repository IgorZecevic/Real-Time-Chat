const { getUsers } = require('../../../services/user.service');
const { userRepository } = require('../../../repositories');
const handleError = require('../../../utils/handleError');

jest.mock('../../../repositories');

jest.mock('../../../utils/handleError', () =>
  jest.fn().mockImplementation((error) => {
    throw new Error('An error occurred');
  })
);

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return users when getUsers is called', async () => {
    const mockUsers = [
      { id: 1, name: 'userOne' },
      { id: 2, name: 'userTwo' },
    ];

    userRepository.findUsers.mockResolvedValue(mockUsers);

    const users = await getUsers();

    expect(users).toEqual(mockUsers);
    expect(userRepository.findUsers).toHaveBeenCalledTimes(1);
  });

  it('should handle error when getUsers is called and repository throws error', async () => {
    const mockError = new Error('Error fetching users');
    userRepository.findUsers.mockRejectedValue(mockError);

    await expect(getUsers()).rejects.toThrow('An error occurred');

    expect(handleError).toHaveBeenCalledWith(mockError);
  });
});
