const puppeteer = require("puppeteer");


(async() =>{
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  const page = await browser.newPage()
  await page.goto("https://www.amazon.com/s?i=computers-intl-ship&rh=n%3A16225007011&fs=true&page=2&qid=1673971065&ref=sr_pg_400", {
    waitUntil: "load"
  })

  const is_disabled = await page.$('a.')
  

})
