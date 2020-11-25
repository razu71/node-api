const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

router.get('/', user.get_all_user);
router.post('/sign-up', user.sign_up);
router.post('/sign-in', user.sign_in);

module.exports = router;