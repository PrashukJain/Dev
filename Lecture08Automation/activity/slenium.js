require("chromedriver");
let sw=require("selenium-webdriver");
let browser=new sw.Builder();
let {email,password}=require("../../credentials.json");
let tab=browser.forBrowser("chrome").build();
let tabwillbepromise=tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
tabwillbepromise
.then(function(){
    let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000});
        return findTimeOutP;
})
.then(function(){
    let intputid=tab.findElement(sw.By.css("#input-1"));
    let passid=tab.findElement(sw.By.css("#input-2"));
    return Promise.all([intputid,passid]);
})
.then(function(inputBox){
    let input=inputBox[0].sendKeys(email);
    let passwo=inputBox[1].sendKeys(password);
    return Promise.all([input,passwo]);
})

.then(function(){
    let loginwillbepromise=tab.findElement(sw.By.css("button[data-analytics='LoginPassword']"));
    return loginwillbepromise;

})
.then(function(loginbox){
    let login=loginbox.click();
    return login;
})
.then(function(){
    let interviewboxP=tab.findElement(sw.By.css("h3[title='Interview Preparation Kit']"));
    return interviewboxP;
})
.then(function(intBox){
    let interview=intBox.click();
    return interview;
})
.then(function(){
    let warmboxP=tab.findElement(sw.By.css("a[data-attr1='warmup']"));
    return warmboxP;
})
.then(function(warmbox){
let warmupchallenges=warmbox.click();
return warmupchallenges;
})
.catch(function(){
    console.log("failed");
})
