const express = require('express')
const mongoose = require('mongoose')
const createError = require ('http-errors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Server URL 'mongodb+srv://john_dba:<password>@cluster0.4nbnqlj.mongodb.net/?retryWrites=true&w=majority'
//username 'john_dba'
//Password 'lCxzTxao2ACCqX8q'

mongoose.connect('mongodb+srv://cluster0.4nbnqlj.mongodb.net/', {
    dbName: 'RestAPI_Products',
    user: 'john_dba',
    pass: 'lCxzTxao2ACCqX8q',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongodb connected...')
})

app.all('/test', (req, res) => {    
    // console.log(req.query.name)
    // console.log(req.query)
    // console.log(req.query.price)
    // res.send(req.query)
    // console.log(req.params)
    // res.send(req.params)
    console.log(req.body);
    res.send(req.body);
})

const ProductRoute = require('./routes/products.route')
app.use('/products', ProductRoute)

// 404 error handler and pass to error handler
app.use((req, res, next) => {
    // const err = new Error('Page not found')
    // err.status = 404
    // next(err)
    next(createError(404, 'Page Not Found'))
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

// Port listening our App request
app.listen(3000, () => {
    console.log('Server started at port 3000');
});