const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// Storing instance of express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Morgan logging middleware
app.use(morgan('dev'));

// Mongoose and Mongo Sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'Jesus Christ is My Savior',
        body: 'click here to read more!'
    });

    // Saves data to the db
    blog.save()
        .then((result) => {
            res.send(result); // Added semicolon
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('An error occurred while saving the blog'); // Added error response
        }); // Closed the catch block properly
});

// Retrieve all blogs from collection
app.get('/all-blogs', (req, res) => {
    // Finding all documents in the blog collection
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('An error occurred while retrieving the blogs'); // Corrected error response
        }); // Closed the catch block properly
});


app.get('/single-blog', (req, res) => {
    Blog.findById('id-goes-here')
      // Then take result from DB
      .then((result) => {
        // Send as response to browser
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

// Connect to MongoDB
const dbURI = 'mongodb+srv://gbaby16:gbaby16@cluster0.urkpacq.mongodb.net/?retryWrites=true&w=majority';

/*
- This is an async line of code so it returns a promise
- add then method on the promise
- then method takes a callback function
*/
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        const server = app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });

        // Error handling for server
        server.on('error', (error) => {
            console.error('Server error:', error);
        });
    })
    .catch((err) => console.log('Check your connection with the DB', err));

// Rendering static files
app.use(express.static('public'));

// General request logging middleware - enhanced with `next` to continue the cycle
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
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' }
    ];
    res.render('index', { title: 'Home', blogs: blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create');
});

// 404 page - moved to be the last middleware
app.use((req, res) => {
    res.status(404).render('404');
});
