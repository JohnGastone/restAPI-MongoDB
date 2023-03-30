const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')

// Get a list of all products 
router.get('/', async (req, res, next) => {    
    //res.send('Getting a list of all products')
    try {
        const results = await Product.find({}, {name: 1, _id : 1, price : 1})
        res.send(results)
    } catch (error)
    {
        console.log(error.message)    
    }
})


router.post('/', async (req, res, next) => {
    // Saving a product using async & wait
    try {
        const product = new Product(req.body)
        const result = await product.save()
        res.send(result)
    } catch (error) {
        console.log(error.message);
    }
    
    
    //const product = new Product(
    // {
    //     name: req.body.name,
    //     price: req.body.price
    //     })
    // Saving a product using promises
    // product.save()
    //     .then(result => {
    //         console.log(result);
    //         res.send(result)
    //     })
    //     .catch(err => {
    //         console.log(err.message);
    // })

    res.send('Some products created')
})

// Get a product by its id
router.get('/:id', async(req, res, next) => {
    const id = req.params.id
    try {
        const product = await Product.findById(id)
        res.send(product)
    } catch (error) {
        console.log(error.message)
    }
})

// Update a product by its id
router.patch('/:id', (req, res, next) => {
    res.send('Update a specific product by its id')
})

// Delete a product by its id
router.delete('/:id', (req, res, next) => {
    res.send('Delete a specific product by its id')
})
module.exports = router;