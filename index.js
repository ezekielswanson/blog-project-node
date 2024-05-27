const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongodb & listen for requests tuts1995
const dbURI = "mongodb+srv://zeke:tuts1995@nodetuts.63mmpj6.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts";


async function connect() {
    try {
      await mongoose.connect(dbURI);
      console.log("Successful connection to MongoDB");
    } catch (error) {
      console.log(error);
    }
  }

  connect();

  const PORT = process.env.PORT || 3000; // Using environment variable or default to 3000

  app.listen(PORT, () => console.log(`Server started on ${PORT}`));


/*
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

*/

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
//takes url encoded data and pass it into the req obj
//handles form data
app.use(express.urlencoded({extended: true}));

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5ea99b49b8531f40c0fde689')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
//scroping with url
//DRY - allows you to change the URL structure in 1 place
app.use('/blogs', blogRoutes)



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});