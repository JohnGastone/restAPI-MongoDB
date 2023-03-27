const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')

router.get('/', (req, res, next) => {
    //next(new Error('Can not get a list of all products'))
    res.send('A response from express router')
})

router.post('/', (req, res, next) => {
    console.log(req.body)
    const product = new Product(
    {
        name: req.body.name,
        price: req.body.price
        })
    product.save()
        .then(result => {
            console.log(result);
            res.send(result)
        })
        .catch(err => {
            console.log(err.message);
    })
    res.send('Some products created')
})

router.get('/:id', (req, res, next) => {
    res.send('Get a specific product by its id')
})

router.patch('/:id', (req, res, next) => {
    res.send('Update a specific product by its id')
})

router.delete('/:id', (req, res, next) => {
    res.send('Delete a specific product by its id')
})
module.exports = router;