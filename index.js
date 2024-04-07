
const express = require('express');

//storing instance of express app
const app = express()


//listen for request 

app.listen(3000)


app.get('/', (req,res) => {

    //automatically sets content type header
    res.send('<p>Home page </p>')
})

app.get('/', (req,res) => {

    //automatically sets content type header
    res.send('<p>Home page </p>')
})

app.get('/about', (req,res) => {

    //automatically sets content type header
    res.send('<p>About Page</p>')
})