const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp'
  });
  const page = await browser.newPage()
  await page.goto('https://www.amazon.com/s?i=computers-intl-ship&bbn=16225007011&rh=n%3A16225007011%2Cp_89%3AApple&dc&fs=true&ds=v1%3Aju2opDf4k6YwsPIuTMqjVIB1%2FQaU4Xw3V2cRthXJOXc&qid=1677683905&rnid=2528832011&ref=sr_nr_p_89_1');


  const items = []

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
        items.push({
          title,
          price,
          image
        })
      }
      //await page.waitForSelector('div > div > span > a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator', {visible: true})
      const is_disabled = (await page.$('span.s-pagination-item .s-pagination-next .s-pagination-disabled')) !== null
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
  console.log(items)
  console.log(items.length)

  //await page.screenshot({ path: 'mail.jpg'})

  //await browser.close()
})();
