const authorize = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { id } = req.params;
    const requestUser = req.user;

    if (id != requestUser.userId || email != requestUser.email) {
      throw new Error('permission denied!');
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(403).json({
      success: false,
      message: 'authentication failed',
    });
  }
};

module.exports = {
  authorize,
};
