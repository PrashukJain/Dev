let fs=require("fs");
console.log("Before");
let readFilePromises=fs.promises.readFile("f1.txt");
readFilePromises
.then(function(data){
    // let readFile=readFilePromises.text();
    console.log("readFile "+data);
})
.catch(function(){
    console.log("error");
})
console.log("after");