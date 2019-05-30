const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../model');

// @route  POST api/users
// @desc   Register User Route
// @access Public
router.post(
  '/',

  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must have 6 or more characteres').isLength({
      min: 6
    })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get info from post request
      const { name, email, password } = req.body;

      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get user gravatar
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      // User create and db save
      user = new User({
        name,
        email,
        avatar,
        password: encryptedPassword
      });
      await user.save();

      // Return jwt
      // TODO

      res.send('User Registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

module.exports = router;
