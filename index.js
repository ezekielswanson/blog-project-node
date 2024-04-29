const express = require('express');
const morgan = require('morgan');

// Storing instance of express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Morgan logging middleware
app.use(morgan('dev'));

// General request logging middleware - enhanced with next to continue the cycle
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next(); // Continue to the next middleware or route handler
});

// Routes
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: 'Home', blogs: blogs });
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create');
});

// 404 page - moved to be the last middleware
app.use((req, res) => {
    res.status(404).render('404');
});

// Listen for requests and add error handling
const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Error handling
server.on('error', (error) => {
    console.error('Server error:', error);
});


app.use(express.static('public'));