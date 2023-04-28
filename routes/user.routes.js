const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const {
  addNewUser,
  userLogin,
  updateUserDetails,
  getUserDetails,
  deleteUserDetails,
} = require('../controllers/user.controllers');

router.get('/test', (req, res) => {
  try {
    // business logic and database calls

    res.status(200).json({
      success: true,
      message: 'ok',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post('/register', addNewUser);
router.post('/login', userLogin);
router.put('', authenticate, updateUserDetails);
router.get('/:id', authenticate, getUserDetails);
router.delete('/:id', authenticate, deleteUserDetails);

module.exports = router;
