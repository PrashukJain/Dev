let fs=require("fs");
console.log("before");
// async functions
// you start the work but don't wait for completion=> ()
fs.readFile("f1.txt",function(err,content){
    console.log("Content "+content);
});
console.log("After");
console.log("`````````````````````````");