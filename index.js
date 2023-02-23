const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
    userDataDir: './tmp'
  });
  const page = await browser.newPage()
  await page.goto('https://www.amazon.com/s?i=computers-intl-ship&rh=n%3A16225007011&fs=true&qid=1677168693&ref=sr_pg_1');
  const productHandles = await page.$$('.sg-col-inner');

  const i = 0
  const items = []

  for (const product of productHandles) {
    let disabledLink = false
    while(disabledLink){
      let title = ""
      let price = ""
      let image = ""

      try {
        title = await page.evaluate(el => el.querySelector("h2 > a > span").textContent, product);
      }catch (error) {}
      try{
        price = await page.evaluate(el => el.querySelector(".a-price > .a-offscreen").textContent, product)
      }catch (error) {}
      try{
        image = await page.evaluate(img => img.querySelector(".s-image").getAttribute("src"), product);
      } catch (error) {}

      if (title !== ""){
        items.push({title, price, image})
      }
      const is_disabled = await page.$$('span .s-pagination-item .s-pagination-next .s-pagination-disabled') !== null
      console.log(is_disabled)
      if (!is_disabled === disabledLink){
        await page.click("a.s-pagination-item.s-pagination-next.s-pagination-separator")
      }
    }
  }
  // const is_disabled = await page.$('span.s-pagination-item .s-pagination-next .s-pagination-disabled') !== null
  // console.log(is_disabled)
  console.log(items.length)
  console.log(items)
  //await page.screenshot({ path: 'mail.jpg'})

  // await browser.close()
})();
