let fs=require("fs");
let files=["f1.txt","f2.txt","f3.txt","f4.txt","f5.txt"];
for(let i=0;i<files.length;i++){
    let filekapromis=fs.promises.readFile(files[i]);
    filekapromis.then(function(data){
        console.log(""+data);
    });
}