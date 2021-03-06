let fs=require("fs");
let cheerio=require("cheerio");
let request=require("request");
 let url="https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results";
request(url,cb);
    function cb(err,response,html){
    console.log("Received Response");
    if(err==null&&response.statusCode==200){
console.log("File saved");
parseSeriesPage(html);

    }
    else if(response.statusCode==404){
console.log("Page Not Found");
    }
    else{
        console.log(err);
        console.log(response.statusCode);
    }
}
function parseSeriesPage(html){
    console.log("Parse file");
    let $=cheerio.load(html);
    console.log("``````````````````````````````");
    let Allcards=$(".match-score-block");
    // console.log(Allcards);
    for(let i=0;i<Allcards.length;i++){
        let mtype=$(Allcards[i]).find(".small.mb-0.match-description").text();
        // console.log(mtype);
        let isvalid=mtype.includes("ODI")||mtype.includes("T20I");
        if(isvalid){
        // console.log(mtype);
        let Allanchor=$(Allcards[i]).find(".match-cta-container a");
        let matchLink = $(Allanchor[0]).attr("href");
        let fullLink=`https://www.espncricinfo.com/${matchLink}`;
        console.log(fullLink);
        handleEachMatch(fullLink);
    }
    }
    console.log("````````````````````````````````````");
}
// handleEachMatch("https://www.espncricinfo.com//series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20")
let leaderboard=[];
let count=0;
function handleEachMatch(matchLink){
    request(matchLink, mcb);
    count++;
    function mcb(err, response, html) {
        console.log("Recieved Match Response");
        if (err == null && response.statusCode == 200) {
            // fs.writeFileSync(".html", html);
            console.log("File Saved");
            parseMatch(html);
            count--;
            if(count==0){
                console.table(leaderboard);
            }
        } else if (response.statusCode == 404) {
            console.log("Page not found");
        } else {
            console.log(err);
            console.log(response.statusCode);
        }
    }
}
function parseMatch(html){
    let $=cheerio.load(html);
    let format = $(".desc.text-truncate").text();
    if (format.includes("ODI") == true) {
        format = "ODI"
    } else {
        format = "T20I"
    }
let innings=$(".card.content-block.match-scorecard-table");
innings=innings.slice(0,2);
console.log("##########################################");
for(let i=0;i<innings.length;i++){
    let cInning=innings[i];
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    let teamName=$(cInning).find("h5").text();
    // console.log(teamName);
    teamName=teamName.split("Innings").shift();
    let BatsmanList=$(cInning).find(".table.batsman tbody tr");
for(let j=0;j<BatsmanList.length;j++){
    let bCols = $(BatsmanList[j]).find("td");
    let isBatsManRow = $(bCols[0]).hasClass("batsman-cell");
    if (isBatsManRow) {
        let batsManName = $(bCols[0]).text();
        let runs = $(bCols[2]).text();
        // console.log( batsManName + " " + runs);
        playerleaderboard(batsManName,teamName,runs,format);
    }
}
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
}
console.log("###############################################");

}
function playerleaderboard(playerName,teamName,runs,format){
    runs=Number(runs);
    for(let i=0;i<leaderboard.length;i++){
        let playerinfo=leaderboard[i];
        let match=playerinfo.Name==playerName&&playerinfo.Format==format&&playerinfo.Team==teamName;
        if(match){
            playerinfo.Runs+=runs;
            return ;
        }
    }
    let playerinfo={};
    playerinfo.Name=playerName;
    playerinfo.Team=teamName;
    playerinfo.Runs=runs;
    playerinfo.Format=format;
    leaderboard.push(playerinfo);
}