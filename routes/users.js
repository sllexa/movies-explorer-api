const router = require('express').Router();
const { getMe, updateUser } = require('../controllers/users');
const { validateUser } = require('../middlewares/validations');

router.get('/me', getMe);
router.patch('/me', validateUser, updateUser);

module.exports = router;
