let fs=require("fs");
require("chromedriver");
let swd=require("selenium-webdriver");
let browser=new swd.Builder();
let tab=browser.forBrowser("chrome").build();
let gcode;
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
    let questionsolve=questionsolver();
    return questionsolve;
})

.catch(function(err){
    console.log(err);
})
function questionsolver(){
    return new Promise(function(resolve,reject){
        let challengewillBesolveP=tab.findElement(swd.By.css(".challenge-name-details "));
         challengewillBesolveP
         .then(function(challengebox){
             let challenge=challengebox.click();
             return challenge;
            })
            .then(function(){
                let EditorialwillbeP=tab.findElement(swd.By.css("a[data-attr2='Editorial']"));
                return EditorialwillbeP;
            })
            .then(function(editorialBox){
                let editorial=editorialBox.click();
                return editorial;
            })
            .then(function(){
                let handlelockPromise=handlelock();
                return handlelockPromise;
            })
            .then(function(){
                let copycodePromise=getcode();
                return copycodePromise;
            })
            .then(function(code){
                let pastecodePromise=pastecode(code);
                return pastecodePromise;
            })
            .then(function(){
                resolve();
            })
           
            
            .catch(function(){
                reject();
            })
    })
}
function handlelock(){
    return new Promise(function(resolve,reject){
        let EditorialunlockBoxP=tab.findElement(swd.By.css(".editorial-content-locked button"));
        EditorialunlockBoxP
        .then(function(unlockBox){
            let unlock=unlockBox.click();
            return unlock;
           })
           .then(function(){
               resolve();
           })
           .catch(function(){
              
               resolve();
           });
    })
}

let finalgcode;
let gCodesElements;
function getcode(){
    return new Promise(function(resolve,reject){
        let allLangElementP = tab.findElements(swd.By.css(".hackdown-content h3"));
        // get all the code array
        let allcodeEementP = tab.findElements(swd.By.css(".hackdown-content .highlight"));
        let bothArrayP = Promise.all([allLangElementP, allcodeEementP]);
        console.log(bothArrayP);
        bothArrayP
        .then(function(bothArrayBox){
            let langElement=bothArrayBox[0];
            let codeElement=bothArrayBox[1];
            gCodesElements = codeElement;
            console.log(langElement.length);
            let allLangText = []
        for(let i=0;i<langElement.length;i++){
                 let clang=langElement[i].getText();
                    allLangText.push(clang)
        }
        return Promise.all(allLangText);
    }).then(function(LangArr){
            let reqCode;
                    for(let i =0;i<LangArr.length;i++){
                        if(LangArr[i].includes("C++")){
                           reqCode = gCodesElements[i].getText();
                           break;
                        }
                    }
                    return reqCode;
})
.then(function(codeBox){
    console.log(codeBox);
    resolve(codeBox);
    console.log("resolve was called");
})
// .then(function(code){
    // resolve();
// })
.catch(function(err){
    reject(err);
})
    })
}
function pastecode(code){
return new Promise(function(resolve,reject){
    let problemsolutionPromise=tab.findElement(swd.By.css("#Problem"));
    problemsolutionPromise
    .then(function(problemsolutionbox){
let problembox=problemsolutionbox.click();
return problembox;
    })
    .then(function(){
        console.log(1);
        let cutominputpromise=tab.findElement(swd.By.css(".custom-input-checkbox"));
        return cutominputpromise;
    })
    .then(function(custominputbox){
console.log(2);
        let custombox=custominputbox.click();
return custombox;
    })
    .then(function(){
        let custominput=tab.findElement(swd.By.css(".custominput"));
        return custominput;
    })
    .then(function(custombox){
        gcinputbox=custombox;
        let custom=custombox.sendKeys(code);
        return custom;
       })
       .then(function(){
let codeofinput=gcinputbox.sendKeys(swd.Key.CONTROL+"a");
return codeofinput;
       })
       .then(function(){
           let cutinput=gcinputbox.sendKeys(swd.Key.CONTROL+"x");
           return cutinput;
       })
       .then(function(){
           let textareabox=tab.findElement(swd.By.css("textarea"));
           return textareabox;
       })
       .then(function(textarea){
           gtarea=textarea;
let tarea=textarea.sendKeys(swd.Key.CONTROL+"a");
return tarea;
       })
       .then(function(){
let copycarea=gtarea.sendKeys(swd.Key.CONTROL+"v");
return copycarea;
       })
       .then(function(){
           let submitbox=tab.findElement(swd.By.css(".pull-right.btn.btn-primary.hr-monaco-submit"));
           return submitbox;
       })
       .then(function(submitar){
let submit=submitar.click();
return submit;
       })
    .then(function(){
        resolve();
    })
    .catch(function(){
        reject();
    })

})
}