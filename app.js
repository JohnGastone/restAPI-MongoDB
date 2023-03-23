const express = require('express')


const app = express();

const ProductRoute = require('./routes/products.route')
app.use('/products', ProductRoute)

app.listen(3000, () => {
    console.log('Server started at port 3000');
});