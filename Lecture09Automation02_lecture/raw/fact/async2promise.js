let fs=require("fs");
console.log("before");
function fsrf(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,function(err,data){
            if(err){
                reject(err);
            }
            else
            resolve(data);
        })

    });
}
let readFilePromise=fsrf("f1.txt");
readFilePromise.then(function(data){
    console.log("content "+ data);
})
.catch(function(err){
    console.log(err);
})
console.log("After");