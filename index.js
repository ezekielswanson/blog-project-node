//Load environment variables from .env file
require('dotenv').config();

//setting connection string to database
const dbURI = process.env.MONGODB_URI;

//Access token for HubSpot
const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;


//Loading libraries
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();



app.listen(process.env.PORT || 3000,()=>{

  //Connecting to MongoDB database
  mongoose.connect(dbURI, /*{ useNewUrlParser: true, useUnifiedTopology: true } */ )

  .catch(err => console.log(err,"connection failed"));
  
})



// register view engine
app.set('view engine', 'ejs');


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});


//Routes GET req to the correct endpoint
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});




// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

