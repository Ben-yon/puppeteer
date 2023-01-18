const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp'
  });
  const page = await browser.newPage()
  await page.goto('https://www.amazon.com/s?rh=n%3A16225007011&fs=true&ref=lp_16225007011_sar');
  const productHandles = await page.$$('.sg-col-inner');

  const i = 0
  const items = []

  for (const product of productHandles) {
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
  }
  console.log(items.length)
  console.log(items)
  //await page.screenshot({ path: 'mail.jpg'})

  // await browser.close()
})();
