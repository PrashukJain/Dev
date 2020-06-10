let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");
console.log("Sending Request");
let url="https://www.espncricinfo.com/series/19322/commentary/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20";
request(url,cb);
function cb(err,response,html){
    console.log("Received Response");
    if(err==null&&response.statusCode==200){
        fs.writeFileSync("lbc.html",html);
        console.log("File Saved");
        parsehtml(html);
       }
       else if(response.statusCode==404){
           console.log("File Saved");
       }
       else{
           console.log(err);
           console.log(response.statusCode);
       }
}
function parsehtml(html){
    console.log("parsing html");
    let $=cheerio.load(html);
    console.log("```````````````````````````````````````");
    let element=$('.match-comment-wrapper');
//1->generic
    // let lbc=$(element[0]).text();
    // console.log(lbc);
    //2->
    let ans=$(element.html()).text();
    console.log(ans);
    console.log("``````````````````````````````````");
}
function parseHtml2(html){
    let $ = cheerio.load(html)
    $ = cheerio.load($(".match-comment-wrapper .match-comment-long-text span").html())
    console.log($("*").text())
 }
 