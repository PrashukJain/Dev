let ppt=require("puppeteer");
let { email, password } = require("../../credentials.json");
(async function () {
    // headless browser
    let browser = await ppt.launch({
        headless: false,
        slowMo: 100,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    let pkaArray = await browser.pages();
    let page=pkaArray[0]
    await page.setDefaultNavigationTimeout(60000);
    await page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login")
    await page.type("#input-1",email);
    await page.type("#input-2",password);
    // await page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click("button[data-analytics='LoginPassword']"),
    ]);
    await page.waitForSelector("a[data-analytics='NavBarProfileDropDown']",
        { visible: true });
    await page.click("a[data-analytics='NavBarProfileDropDown']");

    await page.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']",
        { visible: true });
    await Promise.all([page.click("a[data-analytics='NavBarProfileDropDownAdministration']"), page.waitForNavigation({ waitUntil: "networkidle0" })]);
    await page.goto("https://www.hackerrank.com/administration/challenges", { waitUntil: "networkidle0" });
    await handleSinglePage(page, browser);
})();
async function handleSinglePage(page, browser) {
    await page.waitForSelector("a.backbone.block-center");
    // findelement=> $
    // findelements=> $$
    let allchallenges = await page.$$("a.backbone.block-center");
    let hrefPArr = [];

    for (let i = 0; i < allchallenges.length; i++) {
        // selenium
        // allchallenges[i].getAttribute("href");

        // puppeteer
        let hrefP = page.evaluate(function (elem) {
            return elem.getAttribute("href");
        }, allchallenges[i]);
        hrefPArr.push(hrefP);
    }
    let allHref = await Promise.all(hrefPArr);
    console.log(allHref);
    let paralleltaskP = [];
    // parallely add moderator for one page
    for (let i = 0; i < allHref.length; i++) {
        let newTab = await browser.newPage();
        let p =solveSingleQs(newTab, `https://www.hackerrank.com${allHref[i]}`);
        paralleltaskP.push(p);
    }
    await Promise.all(paralleltaskP);
    // next page is available=> repeat
    // return 
}
async function solveSingleQs(newTab, link) {
    await newTab.goto(link, { waitUntil: "networkidle0" });
    // add a user as a moderator
    await newTab.waitForSelector("li[data-tab='moderators']");
await newTab.click("li[data-tab='moderators']");
await newTab.type("#moderator","txyz2");
await newTab.click(".btn.moderator-save");
await newTab.click(".save-challenge.btn.btn-green");
await newTab.close();
    // close 
} 