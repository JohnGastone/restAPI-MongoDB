const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const mongoose = require('mongoose')

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

// Creating a product using async & wait
router.post('/', async (req, res, next) => {    
    try {
        const product = new Product(req.body)
        const result = await product.save()
        res.send(result)
    } catch (error) {
        console.log(error.message);
        if (error.name === 'ValidationError') {
            next(createError(422, error.message));
            return;
        }
        next(error)
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
        //const product = await Product.findOne({ _id: id });
        if (!product) {
            throw createError(404, 'Product does not exist')
        }
        res.send(product)
    } catch (error) {
        //console.log(error.message)
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid product ID'))
        }
        next(error)
    }
})

// Update a product by its id
router.patch('/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const updates = req.body
        const options = {new : true}

        const result = await Product.findByIdAndUpdate(id, updates, options);
        if (!result) {
            throw createError(404, 'Product does not exist')
        }
        res.send(result);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
           return next(createError(400, 'Invalid product ID'))
        }
        next(error)
        
    }
})

// Delete a product by its id
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const product = await Product.findByIdAndDelete(id)
        //const product = await Product.deleteOne({ _id: id })
        if (!result) {
            throw createError(404, 'Product does not exist')
        }
        res.send(result)
    } catch (error) {
        //console.log(error.message)
        if (error instanceof mongoose.CastError) {
           return  next(createError(400, 'Invalid product ID'))
        }
        next(error)
        
    }
})
module.exports = router;