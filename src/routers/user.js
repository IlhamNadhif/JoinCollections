const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/users', userController.findAllUsers)
router.post('/user', userController.createUser)
router.post('/user/:id', userController.findOneUserAndUpdate)
// router.delete('/user/:id', userController.deleteUser)

module.exports = router