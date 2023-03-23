const express = require('express')


const app = express();

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