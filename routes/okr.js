const express = require('express')
const okrController = require('../controllers/okr')

const router = express.Router()

//Fetch okrs => GET => /okrs
router.get('/okrs', okrController.getOkrs)

//Create okr => POST => /okr
router.post('/okr', okrController.createOkr)

//Fetch an okr => GET => /okr/:okrId
router.get('/okr/:okrId', okrController.getOkr)

//Update an okr => PATCH => /okr/:okrId
router.patch('/okr/:okrId', okrController.updateOkr)

//Delete an okr => DELETE => /okr/:okrId
router.delete('/okr/:okrId', okrController.deleteOkr)

//Exporting the router
module.exports = router