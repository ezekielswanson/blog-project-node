
const express = require('express');

//storing instance of express app
const app = express()


//Register view engine
app.set('view engine', 'ejs')


//Take a view - render it, sennd back to broswer
//Automatically sets content type header
app.get('/', (req, res) => {

    res.render('index', {title: 'Home'});

})



app.get('/about', (req, res) => {

    /* automatically sets content type header
    sends a html string response back to client
    res.send('<p>About Page</p>')
    */

   res.render('about', {title: 'About'})


    
})


// Listen for requests and add error handling
const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Error handling
server.on('error', (error) => {
    console.error('Server error:', error);
});


//inside render method -> send back create "view"
app.get('/blogs/create', (req, res) => {
    res.render('create')
})


/* 404 page
-Works as a catch all, if nothing else matches send the user to the 404 page.

*/
app.use((req, res) => {
    res.status(404).render('404');
  });