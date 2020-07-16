let fs=require("fs");
console.log("before");
let fileKapromise=fs.promises.readFile("f1.txt");
let thenKapromise=fileKapromise.then(function(data){
    console.log("Content"+data);
    // return "string";
})
console.log(thenKapromise);
setTimeout(function(){
    console.log(thenKapromise);
    setTimeout(function(){
        thenKapromise.then(function(data){
            console.log("Inside in a then ka promise");
            console.log(data);
        })
    })
},1000);
console.log("After");