const express = require('express')
const mongoose = require('mongoose')

const app = express();

// Server URL 'mongodb+srv://john_dba:<password>@cluster0.4nbnqlj.mongodb.net/?retryWrites=true&w=majority'
//username 'john_dba'
//Password 'lCxzTxao2ACCqX8q'

mongoose.connect('mongodb+srv://cluster0.4nbnqlj.mongodb.net/?retryWrites=true&w=majority/RestAPI_Products', {
    dbName: 'RestAPI_Products',
    user: 'john_dba',
    pass: 'lCxzTxao2ACCqX8q',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongodb connected...')
})

app.all('/test/:id/:name', (req, res) => {    
    // console.log(req.query.name)
    // console.log(req.query)
    // console.log(req.query.price)
    // res.send(req.query)
    console.log(req.params)
    res.send(req.params)
})

const ProductRoute = require('./routes/products.route')
app.use('/products', ProductRoute)

app.use((req, res, next) => {
    const err = new Error('Page not found')
    err.status = 404
    next(err)
    })

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(3000, () => {
    console.log('Server started at port 3000');
});