const models = require('../models');
const userSchema = 'user';

const createNewUser = async (userDetailsObj) => {
  try {
    await models[userSchema].create(userDetailsObj);
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (mail) => {
  try {
    const user = await models[userSchema].findOne({
      where: {
        email: mail,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userDetailsObj) => {
  try {
    const user = await models[userSchema].update(userDetailsObj, {
      where: { email: userDetailsObj.email },
    });
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const users = await models[userSchema].findAll({
      attributes: ['id', 'firstName', 'lastName', 'email'],
    });

    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const user = await models[userSchema].findOne(
      {
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
      {
        where: {
          id: userId,
        },
      }
    );

    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    await models[userSchema].destroy({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewUser,
  getUserByEmail,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
