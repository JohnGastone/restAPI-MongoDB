const express = require('express')


const app = express();

app.get('/', (req, res, next) => {
    console.log(req.url)
    console.log(req.method)
    res.send("Our server now runs on express js")
})

app.post('/', (req, res, next) => {
    
})

app.delete('/', (req, res, next) => {
    
})

app.listen(3000, () => {
    console.log('Server started at port 3000');
});