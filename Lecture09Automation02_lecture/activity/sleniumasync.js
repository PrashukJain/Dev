require("chromedriver");
let qs=require("./questions");
let swd=require("selenium-webdriver");
let browser=new swd.Builder();
let {email,password}=require("../../credentials.json");
let tab=browser.forBrowser("chrome").build();
(async function () {
    await login();
    console.log("User logged In");
    
 let element=  await tab.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDown']"));
 console.log(1);
//  await tab.wait(swd.until.elementIsVisible(element));
 await element.click();
    // await tab.get("https://www.hackerrank.com/administration")
    let administrationele=await tab.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDownAdministration']"));
    
    await administrationele.click();
    // await tab.get("https://www.hackerrank.com/administration/challenges");
    await waitForLoader();
let manageTabs = await tab.findElements(swd.By.css(".administration ul li a"));
await manageTabs[1].click();
let challengePageLink = await tab.getCurrentUrl();
for (let i = 0; i < qs.length; i++) {
    await (await tab).get(challengePageLink);
    await waitForLoader();
    await createChallenge(qs[i]);
}
await tab.get(challengePageLink);
})()
// login
async function login() {
    try {
        await tab.manage().window().maximize();
        await tab.manage().setTimeouts({
            implicit: 100000
        });
        await tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
      
        
        let inputBoxPromise = tab.findElement(swd.By.css("#input-1"));
        let passwordBoxPromise = tab.findElement(swd.By.css("#input-2"));
        let BeArr = await Promise.all([inputBoxPromise, passwordBoxPromise]);
        let inputBox = BeArr[0];
        let passwordBox = BeArr[1];
        let inputBoxWillBeFilledP = inputBox.sendKeys(email);
        let passwordWillBeFilledP = passwordBox.sendKeys(password);
        await Promise.all([inputBoxWillBeFilledP, passwordWillBeFilledP]);
        let loginElement = await tab.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
        await loginElement.click();
    } catch (err) {
        console.log(err);
    }
}
async function createChallenge(challenge){
    let createChallengebtn = await tab.findElement(swd.By.css("button[class='btn btn-green backbone pull-right']"));
    await createChallengebtn.click();
    let chBox=await tab.findElement(swd.By.css("#name"));
    let descBox=await tab.findElement(swd.By.css("#preview"));
    let psBox=await tab.findElement(swd.By.css("#problem_statement-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let inpBox=await tab.findElement(swd.By.css("#input_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
let constBox=await tab.findElement(swd.By.css("#constraints-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
let outBox=await tab.findElement(swd.By.css("#output_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
let tagBox=await tab.findElement(swd.By.css("#tags_tagsinput input"));
chBox.sendKeys(challenge["Challenge Name"]);
descBox.sendKeys(challenge["Description"]);
await sendData("#problem_statement-container",psBox,challenge["Problem Statement"]);
await sendData("#input_format-container",inpBox,challenge["Input Format"]);
await sendData("#constraints-container",constBox,challenge["Constraints"]);
await sendData("#output_format-container",outBox,challenge["Output Format"]);
await tagBox.sendKeys(challenge["Tags"]);
await tagBox.sendKeys(swd.Key.ENTER);
let saveBtn = await tab.findElement(swd.By.css("button.save-challenge.btn.btn-green"));
await saveBtn.click();
}
async function sendData(parentId, element, data) {
    // Selenium => browser =>? JS Execute
    await tab.executeScript(`document.querySelector('${parentId} .CodeMirror.cm-s-default.CodeMirror-wrap div').style.height='10px'`);
    await element.sendKeys(data);
}

async function waitForLoader() {
    let loader = await tab.findElement(swd.By.css("#ajax-msg"));
    await tab.wait(swd.until.elementIsNotVisible(loader));
}