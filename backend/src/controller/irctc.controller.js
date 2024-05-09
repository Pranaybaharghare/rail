import irctcLogin from "../script/puppeteer.script.js";
import asyncHandler from "../utils/asyncHandler.js";
const puppeteer = require('puppeteer');

const connectIrctc = asyncHandler(async(req,res)=>{
    const { username, password } = req.body;
    try {
        // Launch a new browser instance
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--window-size=1920,1080',
              ],
        });
        // const page = await browser.newPage();
        // await page.emulate(puppeteer.devices['Desktop'])
        // Call the irctcLogin function and pass the browserWSEndpoint
        await irctcLogin(username, password, await browser.wsEndpoint());
        res.send('IRCTC login successful');
    } catch (error) {
        res.status(500).send(`Error during IRCTC login: ${error.message}`);
    }
})
export {connectIrctc};