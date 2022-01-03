//Importing express
const express = require('express')
const userController = require('../controllers/user')

//Assigning the router
const router = express.Router()

//Read users => GET => /
router.get('/', userController.getUsers)

//Create user => POST => /user
router.post('/user', userController.createUser)

//Get an user => GET => /get/:userId
router.get('/user/:userId', userController.getUser) 

//Update an user => UPDATE => /patch/:userId
router.patch('/user/:userId', userController.updateUser)

//Delete an user => DELETE => /delete/:userId
router.delete('/user/:userId', userController.deleteUser)

//Exporting the router
module.exports = router