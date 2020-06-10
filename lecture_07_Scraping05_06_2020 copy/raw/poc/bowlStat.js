let cheerio=require("cheerio");
let request=require("request");
let fs=require("fs");
let url="https://www.espncricinfo.com/series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20";
request(url,cb)
function cb(err,response,html){
    console.log("Received Response");
    if(err==null&&response.statusCode==200){
        // fs.writeFileSync(,html);
        console.log("File Saved");
bowl(html);
    }
       else if(response.statusCode==404){
           console.log("Page Not Found");
       }
       else{
           console.log(err);
           console.log(response.statusCode);
       }
}
function bowl(html){
    console.log("parse");
    let $=cheerio.load(html);
    let element=$('.table.bowler tbody tr');
    let maxwicket=0;
    let playername;
    for(let i=0;i<element.length;i++){
    // let ans=$(element).text();
    let allcolofPlayer=$(element[i]).find('td');
    let cplayerName=$(allcolofPlayer[0]).text();
    let wicket=$(allcolofPlayer[4]).text();
    console.log(cplayerName+"-->"+wicket);
    if(maxwicket<Number.parseInt(wicket)){
        maxwicket=Number.parseInt(wicket);
        playername=cplayerName;
    }
    }
    console.log("````````````````````````````");
    console.log(playername+" --> "+maxwicket);
    console.log("``````````````````````````````");
}