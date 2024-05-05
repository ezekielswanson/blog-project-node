//require the library (also known as libraries or packages)
const mongoose = require('mongose');


/*
-Schema defines the structure of our doc's
-schema is what the model wraps aroud
*/

const Schema = mongoose.Schmea;

//Constuctor function that creats new instace of an object - and pass in obj as parameter
/*
   title with a nested object of properties & values 
   type = string 
   and the type has to be a string *denoted by the required property.
*/
const blogSchema = new Schema({
    title:  {
        type: string,
        required: true
    },

    snippet: {
        type: string,
        required: true
    },
    body: {
        type: string,
        required: true
    }

/*Time stamps create time stamped properties on our blog doc such as 
-created at
-updated at 

-Everytime we create blog doc in the future 
these additional time stamp options auto assign our schmea's properties 
to that new blog doc (database) for us

*/

},{ timestapms: true})