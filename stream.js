const fs = require('fs')


//Set up up read stream and telling it where to read the data from
//Read stream from blogs3 file
const readStream = fs.createReadStream('./docs/blog3.txt',{encoding: 'utf8'});


//on is an event listener 
//data is an event on this raed stream
//everytime we recieve a "buffer" of data in a stream
//in a stream we get small packages of data so we can use them asap
/*
data is the event 
-everytime we cet chunk of data from the stream 
we invoke the call back function and get access to that chunk of data 

****you get access to the chunk of data*****

*/
readStream.on('data', (chunk) => {
    console.log('-----NEW CHUNK---------')
    console.log(chunk)
})