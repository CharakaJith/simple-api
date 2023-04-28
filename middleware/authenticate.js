const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // validate current jwt
    const decode = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
    req.user = decode.tokenUser;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      success: false,
      message: 'authentication failed',
    });
  }
};

module.exports = {
  authenticate,
};
