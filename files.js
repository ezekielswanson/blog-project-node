

/*

//Importing the file system module
const fs = require('fs');


//Reading files
fs.readFile('docs/blog1.txt', (err, data) => {
if (err) {
    console.log(err);
}  
console.log(data.toString());
});
  


//writing files 
fs.writeFile('docs/blog1.txt', "Hello World", () => {
console.log('file was written')
})


//writing files 
fs.writeFile('docs/blog2.txt', "Hello World", () => {
    console.log('file was written')
})



//Directory 
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('folder created');
      }
    });
  } 
  
  
else {
fs.rmdir('./assets', { recursive: true }, (err) => { // Note: the `recursive` option is required for non-empty directories
    if (err) {
    console.log(err);
    } else {
    console.log('folder deleted');
    }
});
}

    


//Deleting Files

if (fs.existsSync('./docs/deleteme.txt',)) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err) {
            console.log(err)
        }

        console.log('file deleted')
    })
}

*/