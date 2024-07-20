const axios = require('axios');
const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}



const blog_create_post = async (req, res) => {
  const blog = new Blog(req.body);

  try {
    const result = await blog.save();
    await handleHubSpotIntegration(result);
    res.redirect('/blogs');
  }

  catch (error) {
    console.error('Error creating blog or custom object:', error);
    res.status(500).send('An error occurred while creating the blog.'); // Handle error response
  }

};



/*

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}
*/





const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

/*HubSpot API calls */


//Create object
const createCustomObject = async (data) => {
  const url = 'https://api.hubapi.com/crm/v3/objects/2-30267161';
  const headers = {
    Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  };

  try {
    const res = await axios.post(url, { properties: data }, { headers });
    return res.data.id;
  } 
  
  catch (error) {
    console.error('Error creating custom object instance. Please check HubSpot Custom Object API Documentation', error);
    throw error;
  }
}


const updateCustomObject = async (objectId, data) => {
  const url = `https://api.hubapi.com/crm/v3/objects/2-30267161/{objectId}`;
  const headers = {
    Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  };

  try {
    await axios.patch(url, {properties: data}, {headers});

  }

  catch (error) {
    console.error('Error updated custom object instance. Please check HubSpot Custom Object API Documentation', error);
    throw error;
  }


}


// Function to handle HubSpot integration
const handleHubSpotIntegration = async (blogData) => {
  const { title, snippet, body } = blogData;

  // Create a custom object in HubSpot
  const objectId = await createCustomObject({ title, snippet, body });

  // Update the custom object with blog data
  await updateCustomObject(objectId, { title, snippet, body });

  console.log('Custom object created and updated successfully');
};














module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete,
 createCustomObject

}















/* What file am I working with the model on? 
Import that file here 
*/

/* Aside

//importing blog model allowing you to put routes on the 
//blog model
//.. means go out of the current directory into another
//code runs from top to bottom

*/


/*** New Code Here  ****/
/*
const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}


//in node can't send redirect as response when sending ajax req
    /*
    -will send json data BACK to brwoser and that json data has redirect prop
    -when data's recieved back in details.ejs look @ redirect prop 
    and this will be where we redirect. Based on the redirect prop  in jSON
*/

/*
const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

//This makes blog_index available as a property of the exported object.
module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete
}
*/