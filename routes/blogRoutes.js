

const express = require('express')
const blogController = require('../controller/blogController');


//Creates instance of router object
//lets us put routes on the router obj instead of app.
const router = express.Router();


router.get('/', blogController.blog_index)

router.get('/', (req, res) => {
   
  });
  
  
  /*
  //Adding blog to dbg
  router.post('/blogs', (req, res) => {
      const blog = new Blog({
        title: 'New blog added',
        snippet: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        body: 'The full content of the blog.'
      });
    
      blog.save()
        .then(result => {
          res.redirect('/blogs');
        })
        .catch(err => {
          console.log(err);
        });
    });
  
  */
  
  //post
  router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
  
    blog.save()
      .then((result) => {
        res.redirect('/blogs');
      })
  })
    
  
  //handling blog id
  // : in front of id denotes it's an id
  router.get('/blogs/:id', (req, res) =>{
    //search in DB for doc w/ id
  
    //get id
    const id = req.params.id;
    console.log(id);
  
    //get document from db with that id
    /*
    -Blog is the model in the database
    -method on that model and the method 
    takes in data (id)
    -"think pass in data into the method/function"
    */
  
    //find by id then render data
    Blog.findById(id)
      .then(result => {
        res.render('details', {blog: result, title: "Blog Details"})
      })
      .catch(err => {
        console.log("id incorrect", err)
  
      })
  
  })
  
  
  router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    //in node can't send redirect as response when sending ajax req
    /*
    -will send json data BACK to brwoser and that json data has redirect prop
    -when data's recieved back in details.ejs look @ redirect prop 
    and this will be where we redirect. Based on the redirect prop  in jSON
    */
  
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' })
      })
      .catch(err => {
        console.log("id incorrect", err)
  
      })
  })


  module.exports = router;