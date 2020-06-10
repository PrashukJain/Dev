let fs=require("fs");
console.log("Before");
//firstly in synchronous the code will be execute the y cannot wait
let content=fs.readFileSync("f1.txt");
console.log("Content "+content);
console.log("finish");