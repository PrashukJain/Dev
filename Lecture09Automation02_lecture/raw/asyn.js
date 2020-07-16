let fs=require("fs");
function readFilesby(file){
let readFilePromises=fs.promises.readFile(file);
readFilePromises
.then(function(data){
    // let readFile=readFilePromises.text();
    console.log("readFile "+data);
    readFilesby("f2.txt");
})
.catch(function(){
    console.log("error");
})
}
readFilesby("f1.txt");
console.log("after");