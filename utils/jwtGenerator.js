const jwt = require('jsonwebtoken');

const generateAccessToekn = async (user) => {
  try {
    const tokenUser = {
      userId: user.id,
      lastName: user.lastName,
      email: user.email,
    };

    // generate token
    const token = jwt.sign({ tokenUser }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateAccessToekn,
};
