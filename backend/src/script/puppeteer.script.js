import puppeteer from "puppeteer";
import asyncHandler from "../utils/asyncHandler.js";
const irctcConnectScript = asyncHandler(async (username, password, browser) => {
  try {
    // Connect to the existing browser instance
    const page = await browser.pages(); // Get all open pages in the browser
    const newPage = await page[0].newPage();

    await newPage.setViewport({ width: 1920, height: 1080 });

    // Navigate to the IRCTC website
    await newPage.goto("https://www.irctc.co.in/nget/train-search");
    console.log("Navigated to IRCTC website");

    // Wait for the login button to appear and click it
    await newPage.waitForSelector(
      'a[aria-label="Click here to Login in application"]'
    );
    await newPage.click('a[aria-label="Click here to Login in application"]');
    console.log("Clicked login button");

    // Wait for the login popup to appear
    await newPage.waitForSelector('input[formcontrolname="userid"]');
    console.log("Login popup appeared");

    // Fill in the username and password fields
    await newPage.type('input[formcontrolname="userid"]', username);
    await newPage.type('input[formcontrolname="password"]', password);
    console.log("Entered username and password");

    // Wait for the CAPTCHA element to appear
    await newPage.waitForSelector('img.captcha-img');

    // Pause the script and prompt the user to solve the CAPTCHA
    console.log('Please solve the CAPTCHA and press Enter when done.');

// // Wait for the CAPTCHA completion indicator to appear (or any other element that indicates CAPTCHA completion)
// await newPage.waitForSelector('captcha-completion-indicator-selector');

//     // Click the login button
//     await Promise.all([
//       newPage.waitForNavigation(), // Wait for navigation to complete
//       newPage.click('button[type="submit"]') // Click the login button
//     ]);
//     console.log('Clicked login submit button');


    // Wait for the desired page to load or perform further actions
    await newPage.waitForNavigation();
    console.log('Login successful');
    

    //Wait for selecting from destination
    await newPage.waitForSelector('input.ui-inputtext');

    await newPage.type('input.ui-inputtext', "NAGPUR - NGP (NAGPUR)");



  } catch (error) {
    console.error("Error during IRCTC login:", error);
    throw error; // Rethrow the error for proper error handling
  }
})

export default irctcConnectScript;