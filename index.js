
const express = require('express');

//storing instance of express app
const app = express()

app.use(express.static('views'))



app.get('/', (req, res) => {

    //automatically sets content type header
    res.send('<p>Home page </p>')
})



app.get('/about', (req, res) => {

    //automatically sets content type header
    res.sendFile('<p>About Page</p>')
})


// Listen for requests and add error handling
const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Error handling
server.on('error', (error) => {
    console.error('Server error:', error);
});