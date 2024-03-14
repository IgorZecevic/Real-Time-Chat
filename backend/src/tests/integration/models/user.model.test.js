const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../../models/user.model');

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

describe('User Model', () => {
  it('creates a user with a unique username and password', async () => {
    const userData = { username: 'user', password: '123456' };
    const user = new User(userData);
    await user.save();

    const foundUser = await User.findOne({
      username: userData.username,
    }).exec();

    expect(foundUser).toBeTruthy();
    expect(foundUser.username).toBe(userData.username);
  });

  it('does not allow the creation of a user with a duplicate username', async () => {
    const userData = { username: 'user', password: '123456' };
    await new User(userData).save();

    const duplicateUser = new User(userData);
    await expect(duplicateUser.save()).rejects.toThrow();
  });

  it('trims the username', async () => {
    const userData = { username: '  user  ', password: '123456' };
    const user = new User(userData);
    await user.save();

    expect(user.username).toBe('user');
  });

  it('requires a username and password', async () => {
    const userWithoutUsername = new User({ password: '123456' });
    await expect(userWithoutUsername.save()).rejects.toThrow();

    const userWithoutPassword = new User({ username: 'user' });
    await expect(userWithoutPassword.save()).rejects.toThrow();
  });
});
