const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        if (req.method === "GET") {
            console.log('It is a GET request')
        } else if (req.method === 'POST') {
            console.log('It is a POST request')
        } else {
            console.log('It is just another request')
        }
        res.write('You are at the homepage ')
    res.end();
    } else if (req.url === ('/another')) {
        res.write('I am from another route ')
    res.end();
    }
    else{
    res.write('I am listening to your requests ')
    res.end();}
})

server.listen(3000, () => {
    console.log('Our server will be at port 3000')
})