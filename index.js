const fs = require('fs')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp'
  });
  const page = await browser.newPage()
  await page.goto('https://www.amazon.com/s?i=computers-intl-ship&bbn=16225007011&rh=n%3A16225007011%2Cp_89%3ALogitech%2Cp_36%3A1253503011%2Cp_6%3AA1DE4A1USLSZ40%7CATVPDKIKX0DER&dc&fs=true&qid=1677862087&rnid=303116011&ref=sr_nr_p_6_2&ds=v1%3ATb2VMXQxiXgtimNUqykI%2FmHSjk4Uw%2Bws5tDoJX%2BxOuM');


  let items = []

  let disabledLink = false
  while (!disabledLink) {
    await page.waitForSelector('[data-cel-widget="search_result_0"]')
    const productHandles = await page.$$('.sg-col-inner');
    for (const product of productHandles) {
      let title = "Null"
      let price = "Null"
      let image = "Null"

      try {
        title = await page.evaluate(el => el.querySelector("h2 > a > span").textContent, product);
      } catch (error) {}
      try {
        price = await page.evaluate(el => el.querySelector(".a-price > .a-offscreen").textContent, product)
      } catch (error) {}
      try {
        image = await page.evaluate(img => img.querySelector(".s-image").getAttribute("src"), product);
      } catch (error) {}

      if (title !== "Null") {
       
        fs.appendFile('results.csv', `${title.replace(/,/g, ".")},${price},${image}\n`, (err)=>{
          if(err) throw err;
          console.log("saved!")
        })
      }
      //await page.waitForSelector('div > div > span > a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator', {visible: true}).catch((error)=> console.log(error))
      const is_disabled = (await page.$('div > div > span > span.s-pagination-item.s-pagination-next.s-pagination-disabled')) !== null
      // console.log()
      disabledLink = is_disabled
      if (!is_disabled) {
        try{
          await Promise.all([
            page.click('div > div > span > a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator'),
            page.waitForNavigation({waitUntil: 'networkidle2'})
          ])
        }catch(error){}
      }
    }
  }


  //await browser.close()
})();
