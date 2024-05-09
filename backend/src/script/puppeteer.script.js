const puppeteer = require('puppeteer');

async function irctcLogin(username, password, browserWSEndpoint) {
  try {
    // Connect to the existing browser instance
    const remote = await puppeteer.connect({ browserWSEndpoint });
    const page = await remote.newPage();
    await page.setViewport({width:1920, height:1080})

     // Navigate to the IRCTC website
     await page.goto('https://www.irctc.co.in/nget/train-search');
     console.log('Navigated to IRCTC website');
 
     // Wait for the login button to appear and click it
     await page.waitForSelector('a[aria-label="Click here to Login in application"]');
     await page.click('a[aria-label="Click here to Login in application"]');
     console.log('Clicked login button');
 
     // Wait for the login popup to appear
     await page.waitForSelector('input[formcontrolname="userid"]');
     console.log('Login popup appeared');
 
     // Fill in the username and password fields
     await page.type('input[formcontrolname="userid"]', username);
     await page.type('input[formcontrolname="password"]', password);
     console.log('Entered username and password');
 
    //  // Click the login button
    //  await page.click('button[type="submit"]');
    //  console.log('Clicked login submit button');
 
     // Wait for the desired page to load or perform further actions
    //  await page.waitForNavigation();
    //  console.log('Login successful');
 
     // Close the browser
    //  await remote.disconnect()
  } catch (error) {
    console.error('Error during IRCTC login:', error);
    throw error; // Rethrow the error for proper error handling
  }
}

module.exports = irctcLogin;