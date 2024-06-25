const express = require('express');
const router = express.Router();
const { createUser, loginUser, getallUsers, getsingleUser, updateUser } = require('../Controllers/auth.controller');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/users', getallUsers);
router.get('/user/:id', getsingleUser);
router.put('/user-update/:id', updateUser)

module.exports = router;
