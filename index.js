
const express = require('express');

//storing instance of express app
const app = express()

app.use(express.static('views'))



app.get('/', (req, res) => {

    /* Automatically sets content type header
    res.send('<p>Home page </p>')
    */
    res.sendFile(path.join(__dirname, 'views', 'index.html'));

})



app.get('/about', (req, res) => {

    /* automatically sets content type header
    sends a html string response back to client
    res.send('<p>About Page</p>')
    */

    res.sendFile('./views/about.html', { root: __dirname})


    
})


// Listen for requests and add error handling
const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Error handling
server.on('error', (error) => {
    console.error('Server error:', error);
});



/* 404 page
-Works as a catch all, if nothing else matches send the user to the 404 page.

*/
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
  });