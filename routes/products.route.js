const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('A response from express router')
})

router.post('/', (req, res, next) => {
    res.send('Some products created')
})

module.exports = router;