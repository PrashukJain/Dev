require("chromedriver");
let sw=require("selenium-webdriver");
let browser=new sw.Builder();
let {email,password}=require("../../credentials.json");
let gCodesElements, gcInputBox, gTextArea;
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
.then(function () {
    console.log("Reached warm challenges page")
    // selenium
    let allQtag = tab.findElements(sw.By.css("a.js-track-click.challenge-list-item"));
    return allQtag

}).then(function (alQues) {

    let allQLinkP = alQues.map(function (anchor) {
        return anchor.getAttribute("href");
    })
    let allLinkPromise = Promise.all(allQLinkP);
    return allLinkPromise;
}).then(function (allQLink) {
    // serial execution of all the promises
    let f1Promise = questionSolver(allQLink[0]);
    for (let i = 1; i < allQLink.length; i++) {
        f1Promise = f1Promise.then(function () {
            return questionSolver(allQLink[i])
        })
    }
    let lstQuestWillBeSolvedP = f1Promise;
    return lstQuestWillBeSolvedP;
}).then(function(){
    console.log("All questions");
})
.catch(function(){
    console.log("failed");
})
function questionSolver(url){
return new Promise(function (resolve, reject) {
    // logic to solve a question
    let allCBTnWSP = tab.get(url);;
    // allCBTnWSP.then(function (cBtnArr) {
    //     let cBtnWillBeClickedP = cBtnArr[0].click();
    //     return cBtnWillBeClickedP;
    // })
    allCBTnWSP
    .then(function(){
        let attributewillbePromise=tab.findElement(sw.By.css("a[data-attr2='Editorial']"));
        return attributewillbePromise;
    })
    .then(function(editorialBtn){
let editorial=editorialBtn.click();
return editorial;
    }).then(function(){
        let hndleP=handlelockButton();
        return hndleP;
    })
    .then(function () {
        // get all the lang array
        let cCodeWillBecopied = copyCode();
        return cCodeWillBecopied;
    }).then(function (code) {
        let codeWillBepastedP = pasteCode(code);
        return codeWillBepastedP;
    })

    .then(function () {
        resolve();
    }).catch(function (err) {
        reject();
    })
})
}
function handlelockButton(){
    return new Promise(function(resolve,reject){
        let lockBtnwillBeFp=tab.findElement(sw.By.css(".editorial-content-locked button"));
        lockBtnwillBeFp
        .then(function(lockBtn){
lock=lockBtn.click();
return lock;
        })
        .then(function(){
            resolve();
        })
        .catch(function(){
            resolve();
        })
    });
}
function copyCode() {
    return new Promise(function (resolve, reject) {
        // all name
        let allLangElementP = tab.findElements(sw.By.css(".hackdown-content h3"));
        // get all the code array
        let allcodeEementP = tab.findElements(sw.By.css(".hackdown-content .highlight"));
        let bothArrayP = Promise.all([allLangElementP, allcodeEementP]);
        bothArrayP
            .then(function (bothArrays) {
                let langsElements = bothArrays[0];
                gCodesElements = bothArrays[1];
                let allLangTextP = [];
                for (let i = 0; i < langsElements.length; i++) {
                    let cLangP = langsElements[i].getText();
                    allLangTextP.push(cLangP);
                }
                return Promise.all(allLangTextP);
            })
            .then(function (allLangs) {
                let codeOfCP;
                for (let i = 0; i < allLangs.length; i++) {
                    if (allLangs[i].includes("C++")) {
                        codeOfCP = gCodesElements[i].getText();
                        break;
                    }
                }
                return codeOfCP;
            }).then(function (code) {
                console.log(code)
                resolve(code);
                console.log("resolved was called");
            }).catch(function (err) {
                reject(err);
            })
    });
}

function pasteCode(code) {
    return new Promise(function (resolve, reject) {
        // click on problem tab
        let pTabWillBeSelectedP = tab.findElement(sw.By.css("li#Problem"));
        pTabWillBeSelectedP.then(function (pTab) {
            let pTwillBeClickedP = pTab.click();
            return pTwillBeClickedP;
        }).then(function () {
            let inputBoxWBeSP = tab.findElement(sw.By.css(".custom-input-checkbox"));
            return inputBoxWBeSP;
        }).then(function (inputBox) {
            let inputbWillBeCP = inputBox.click();
            return inputbWillBeCP;
        }).then(function () {
            let cInputWillBeSelectedP = tab.findElement(sw.By.css(".custominput"));
            return cInputWillBeSelectedP;
        }).then(function (cInputBox) {
            gcInputBox = cInputBox;
            let codeWillBeEnteredP = cInputBox.sendKeys(code);
            return codeWillBeEnteredP;
        }).then(function () {
            let ctrlAWillBeSendP = gcInputBox.sendKeys(sw.Key.CONTROL + "a");
            return ctrlAWillBeSendP;
        }).then(function () {
            let ctrlXWillBeSendP = gcInputBox.sendKeys(sw.Key.CONTROL + "x");
            return ctrlXWillBeSendP;
        })
            .then(function () {
                let tAreaP = tab.findElement(sw.By.css("textarea"));
                console.log(2);
                return tAreaP;
            }).then(
                function (tArea) {
                gTextArea = tArea;
                let CodeWillBeEP = tArea.sendKeys(sw.Key.CONTROL + "a");
                // console.log(3);
                return CodeWillBeEP;
            }).then(function () {
                let ctrlVWillBeSendP = gTextArea.sendKeys(sw.Key.CONTROL + "v");
                return ctrlVWillBeSendP;
            }).then(function () {
                let submitCodeBtnWillBeS = tab.findElement(sw.By.css("button.hr-monaco-submit"));
                return submitCodeBtnWillBeS;
            }).then(function (submitBtn) {
                let submitBtnWillBeClickedP = submitBtn.click();
                return submitBtnWillBeClickedP;
            })
            .then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
        // write the code 
        // submit the code 
    })
}