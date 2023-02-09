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

  const is_disabled = await page.$('span.s-pagination-item.s-pagination-next.s-pagination-disabled') !== null
  console.log(is_disabled)

  // var results = [];
  // var lastPageNumber = 400

  // for (let index = 0; index < lastPageNumber; index++){
  //   //await page.waitForTimeout(5000);

  //   results = results.concat(await extractEvaluateCall(page))
  //   if (index != lastPageNumber - 1){
  //     await page.$$('#search > div > div > a')
  //   }``
  // }
  // browser.close()
  // return results;
}

// async function extractEvaluateCall(page){
//   return page.evaluate(()=>{
//     let data = []
//     let elements = document.querySelectorAll('.sg-col-inner')

//     for (let element of elements){
//       //console.log(element)
//       let title = element.childNodes[5];
//       let price = element.childNodes[7];

//       data.push({ title, price })
//     }
//   })
// }

scrape()
