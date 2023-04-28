const bcrypt = require('bcrypt');
const consts = require('../lib/constants');
const { validateFields } = require('../utils/validator');
const { generateAccessToekn } = require('../utils/jwtGenerator');
const {
  createNewUser,
  getUserByEmail,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('../services/user.service');

const addNewUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if fields are empty
    await validateFields.checkIfEmpty(firstName, 'first name');
    await validateFields.checkIfEmpty(lastName, 'last name');
    await validateFields.checkIfEmpty(email, 'email');
    await validateFields.checkIfEmpty(password, 'password');

    // validate fields
    await validateFields.checkIfString(firstName, 'first name');
    await validateFields.checkIfString(lastName, 'last name');
    await validateFields.checkEmailFormat(email, 'email');
    await validateFields.checkIfString(password, 'password');

    // check email
    const isuser = await getUserByEmail(email);
    if (isuser) {
      throw new Error('email already exists');
    }

    // hash password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // add user details
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
    };
    await createNewUser(user);

    res.status(200).json({
      success: true,
      message: 'user details saved',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if fields are empty
    await validateFields.checkIfEmpty(email, 'email');
    await validateFields.checkIfEmpty(password, 'password');

    // validate fields
    await validateFields.checkEmailFormat(email, 'email');

    // get user details
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error('email does not exists');
    }

    // validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('invalid password');
    }

    // generate access toke
    const accessToken = await generateAccessToekn(user);

    // set response header
    res.set({
      'Access-Token': accessToken,
    });
    res.status(200).json({
      success: true,
      message: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const requestUser = req.user;

    // check if fields are empty
    await validateFields.checkIfEmpty(firstName, 'first name');
    await validateFields.checkIfEmpty(lastName, 'last name');
    await validateFields.checkIfEmpty(email, 'email');
    await validateFields.checkIfEmpty(password, 'password');

    // validate fields
    await validateFields.checkIfString(firstName, 'first name');
    await validateFields.checkIfString(lastName, 'last name');
    await validateFields.checkEmailFormat(email, 'email');
    await validateFields.checkIfString(password, 'password');

    // get user details
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error('email does not exists');
    }

    // validate user
    if (email != requestUser.email) {
      throw new Error('permission denied!');
    }

    // hash password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // update user details
    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
    };
    await updateUser(userDetails);

    // get updated user details
    const updatedUser = await getUserByEmail(email);

    res.status(200).json({
      success: true,
      message: {
        userId: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // validate fields
    await validateFields.checkIfNumber(id, 'user id');

    let getUserResponse;
    if (id == 0) {
      // get all users
      getUserResponse = await getAllUsers();
    } else {
      // get user by id
      getUserResponse = await getUserById(id);
      if (!getUserResponse) {
        throw new Error('invalid id');
      }
    }

    res.status(200).json({
      success: true,
      message: getUserResponse,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const requestUser = req.user;

    // validate fields
    await validateFields.checkIfNumber(id, 'user id');

    // get user by id
    const user = await getUserById(id);
    if (!user) {
      throw new Error('invalid id');
    }

    // validate user
    if (id != requestUser.userId) {
      throw new Error('permission denied!');
    }

    // delete user
    await deleteUser(id);

    res.status(200).json({
      success: true,
      message: 'user details deleted',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  addNewUser,
  userLogin,
  updateUserDetails,
  getUserDetails,
  deleteUserDetails,
};
