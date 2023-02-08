const puppeteer = require("puppeteer");


let scrape = async() =>{
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  const page = await browser.newPage()
  await page.goto("https://www.amazon.com/s?i=computers-intl-ship&rh=n%3A16225007011&fs=true&page=2&qid=1673971065&ref=sr_pg_400", {
    waitUntil: "load"
  })

  var results = [];
  var lastPageNumber = 400

  for (let index = 0; index < lastPageNumber; index++){
    //await page.waitForTimeout(5000);

    results = results.concat(await extractEvaluateCall(page))
    if (index != lastPageNumber - 1){
      await page.$('a .s-pagination-item .s-pagination-next .s-pagination-button')
    }``
  }
  // browser.close()
  return results;
}

async function extractEvaluateCall(page){
  return page.evaluate(()=>{
    let data = []
    let elements = document.querySelectorAll('.sg-col-inner')

    for (let element of elements){
      //console.log(element)
      let title = element.childNodes[5];
      let price = element.childNodes[7];

      data.push({ title, price })
    }
  })
}

scrape().then((value)=>{
  console.log(value);
  console.log("Collection length: "+ value.length);
  console.log(value[0]);
  console.log(value[value.length - 1])
})
