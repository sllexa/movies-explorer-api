const router = require('express').Router();
const { getMe, updateUser } = require('../controllers/users');

router.get('/me', getMe);
router.patch('/me', updateUser);

module.exports = router;
