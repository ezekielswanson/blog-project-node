/* What file am I working with the model on? 
Import that file here 
*/

/* Aside

//importing blog model allowing you to put routes on the 
//blog model
//.. means go out of the current directory into another
//code runs from top to bottom

*/

const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { blogs: result, title: 'All blogs' });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    blog_index
};
