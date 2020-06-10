let fs=require("fs");
function getContent(src){
    console.log( fs.readdirSync(src));
}
getContent(process.argv[2]);