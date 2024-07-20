//Import express app & the blogController file
const express = require('express');
const blogController = require('../controllers/blogController'); // Ensure this path is correct


//Creates router object instance
const router = express.Router();

// Route definitions
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/create', blogController.blog_create_get);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

//Exporting routes to import on the index.js file 
//where the server listens for GET req from the client 
//and sends GET req to the correct path
module.exports = router;