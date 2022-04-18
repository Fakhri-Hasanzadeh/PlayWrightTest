const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    
    recordVideo:{
        dir: 'videos'
    }
  });

  // Open new page
  const page = await context.newPage();

  // Go to https://en.wikipedia.org/wiki/Main_Page
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');

  // Click #n-mainpage-description >> text=Main page
  await page.locator('#n-mainpage-description >> text=Main page').click();
  // assert.equal(page.url(), 'https://en.wikipedia.org/wiki/Main_Page');

  // Click text=Contents
  await page.locator('text=Contents').click();
  // assert.equal(page.url(), 'https://en.wikipedia.org/wiki/Wikipedia:Contents');

  // Click span:has-text("Current events")
  await page.locator('span:has-text("Current events")').click();
  // assert.equal(page.url(), 'https://en.wikipedia.org/wiki/Portal:Current_events');

  // Click td:has-text("5") >> nth=0
  await page.locator('td:has-text("5")').first().click();

  // Click a:has-text("12") >> nth=0
  await page.locator('a:has-text("12")').first().click();
  // assert.equal(page.url(), 'https://en.wikipedia.org/wiki/Portal:Current_events#2022_April_12');

  // Click text=2022 by day
  await page.locator('text=2022 by day').click();
  // assert.equal(page.url(), 'https://en.wikipedia.org/wiki/Category:2022_by_day');

  // Click text=Portal:Current events/January 2022
  await page.locator('text=Portal:Current events/January 2022').click();
  // assert.equal(page.url(), 'https://en.wikipedia.org/wiki/Portal:Current_events/January_2022');

  // Click #ca-edit >> text=Edit
  await page.locator('#ca-edit >> text=Edit').click();
  // assert.equal(page.url(), 'https://en.wikipedia.org/w/index.php?title=Portal:Current_events/January_2022&action=edit');

  // Click a[role="button"]:has-text("Start editing")
  await page.locator('a[role="button"]:has-text("Start editing")').click();

  // Click text={{Events by month|2022|prefix=Portal:Current events/}} '''[[January]]''' '''[[20
  await page.locator('text={{Events by month|2022|prefix=Portal:Current events/}} \'\'\'[[January]]\'\'\' \'\'\'[[20').click();

  // Click text={{Events by month|2022|prefix=Portal:Current events/}} '''[[January]]''' '''[[20
  await page.locator('text={{Events by month|2022|prefix=Portal:Current events/}} \'\'\'[[January]]\'\'\' \'\'\'[[20').click();

  // Click text=Editing Portal:Current events/January 2022 Jump to navigation Jump to search Gro
  await page.locator('text=Editing Portal:Current events/January 2022 Jump to navigation Jump to search Gro').click();

  // Triple click text={{Events by month|2022|prefix=Portal:Current events/}} '''[[January]]''' '''[[20
  await page.locator('text={{Events by month|2022|prefix=Portal:Current events/}} \'\'\'[[January]]\'\'\' \'\'\'[[20').click({
    clickCount: 3
  });

  // Click text=View history
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await Promise.all([
   // page.waitForNavigation(/*{ url: 'https://en.wikipedia.org/wiki/User:GeoffreyT2000' }*/),
    page.locator('text=View history').click()
  ]);

  // Go to https://en.wikipedia.org/wiki/Jamie_McGowan
  await page.goto('https://en.wikipedia.org/wiki/Jamie_McGowan');
  await page.screenshot({path:'testfile.png'})
  // ---------------------
  await context.close();
  await browser.close();
})();