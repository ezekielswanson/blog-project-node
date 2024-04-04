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
    /* 
    Every time we get new piece of data from read stream 
    take that chunk of data and 

    1.) Write the new chunk line
    2.) Write new chunk to that file as well.

    -This is how you pass data down a write stream.
    pass new chunk of data with the write() method



    */
    WriteStream.write('\n NEW CHUNK \n')
    WriteStream.write(chunk)
})






/*** Read Strea ****** */


