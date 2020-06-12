let fs=require("fs");
require("chromedriver");
let swd=require("selenium-webdriver");
let browser=new swd.Builder();
let tab=browser.forBrowser("chrome").build();
let tabWillBeOpenedPromise=tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
let { email, password } = require("../../../credentials.json");
tabWillBeOpenedPromise
.then(function(){
    let findTimeOutP=tab.manage().setTimeouts({
        implicit:10000
    });
    return findTimeOutP;
})
.then(function(){
    let inputBoxPromise=tab.findElement(swd.By.css("#input-1"));
    return inputBoxPromise;
})
.then(function(inputBox){
let inputBoxWillBeFilledP=inputBox.sendKeys(email);
return inputBoxWillBeFilledP;
}).then(function(){
    let passwordboxPromise=tab.findElement(swd.By.css("#input-2"));
    return passwordboxPromise;
})
.then(function(passwordbox){
let passwordwilbefilled=passwordbox.sendKeys(password);
return passwordwilbefilled;
})
.then(function(){
    let loginbox=tab.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
    return loginbox;
})
.then(function(login){
    let log=login.click();
    return log;
})
.then(function(){
    let interviewkit=tab.findElement(swd.By.css("h3[title='Interview Preparation Kit']"));
    return interviewkit;
})
.then(function(interviewbox){
let interview=interviewbox.click();
return interview;
})
.then(function(){
    let warmupchallenge=tab.findElement(swd.By.css("a[data-attr1='warmup']"));
    return warmupchallenge;
})
.then(function(warmup){
    let warm=warmup.click();
    return warm;
})
.then(function(){
    
})

.catch(function(err){
    console.log(err);
})