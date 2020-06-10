let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");
console.log("Sending Request");
let url="https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results";
request(url,cb);
function cb(err,response,html){
    console.log("Received Response");
    if(err==null&&response.statusCode==200){
        // fs.writeFileSync("index.html",html);
        console.log("File Saved");
        bowl(html);
       }
       else if(response.statusCode==404){
           console.log("File Saved");
       }
       else{
           console.log(err);
           console.log(response.statusCode);
       }
}
