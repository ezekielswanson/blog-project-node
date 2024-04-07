
const express = require('express');

//storing instance of express app
const app = express()

app.use(express.static('views'))




//listen for request 
app.listen(3000)


app.get('/', (req, res) => {

    //automatically sets content type header
    res.send('<p>Home page </p>')
})



app.get('/about', (req, res) => {

    //automatically sets content type header
    res.sendFile('<p>About Page</p>')
})