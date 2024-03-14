const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../../models/user.model');
const { userRepository } = require('../../../repositories');

const mongodb = new MongoMemoryServer();

beforeAll(async () => {
  await mongodb.start();
  const uri = await mongodb.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongodb.stop();
});

describe('User Repository', () => {
  it('should create a new user', async () => {
    const userData = { username: 'user', password: '123456' };
    const user = await userRepository.createUser(userData);

    expect(user.username).toBe(userData.username);
    expect(user.password).toBe(userData.password); // Password should be hashed
  });

  it('should find a user by username', async () => {
    const userData = { username: 'user', password: '123456' };
    await new User(userData).save();

    const foundUser = await userRepository.findUserByUsername(
      userData.username.toUpperCase()
    );

    expect(foundUser).toBeTruthy();
    expect(foundUser.username).toBe(userData.username);
  });

  it('should find a user by ID', async () => {
    const userData = { username: 'user', password: '123456' };
    const user = await new User(userData).save();

    const foundUser = await userRepository.findUserById(user._id);

    expect(foundUser).toBeTruthy();
    expect(foundUser._id.toString()).toBe(user._id.toString());
  });

  it('should find all users and not include password', async () => {
    const userData = [
      { username: 'userOne', password: '123456' },
      { username: 'userTwo', password: '654321' },
    ];
    await User.insertMany(userData);

    const users = await userRepository.findUsers();

    expect(users.length).toBe(2);
    users.forEach((user) => {
      expect(user).toHaveProperty('username');
      expect(user.password).toBeUndefined();
    });
  });
});
