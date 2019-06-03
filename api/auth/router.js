const express = require('express');
const auth = require('./middleware');
const router = express.Router();
const User = require('../user/model');

// @route  GET api/auth
// @desc   Test route
// @access Protected
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
