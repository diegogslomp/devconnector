const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('User Route');
  }
);

module.exports = router;
