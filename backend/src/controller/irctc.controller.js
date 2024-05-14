import irctcLogin from "../script/puppeteer.script.js";
import asyncHandler from "../utils/asyncHandler.js";
import puppeteer from "puppeteer";
const connectIrctc = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
        // Launch a new browser instance
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--window-size=1920,1080',
                '--disable-features=site-per-process'
            ],
        });
        // const page = await browser.newPage();
        // await page.emulate(puppeteer.devices['Desktop'])
        // Call the irctcLogin function and pass the browserWSEndpoint
        // Store the browser WebSocket endpoint in an environment variable
        // process.env.BROWSER_WS_ENDPOINT = browser.wsEndpoint();
        // const browserWSEndpoint = process.env.BROWSER_WS_ENDPOINT;

        // Connect to the existing browser instance using the WebSocket endpoint
        // const existingBrowser = await puppeteer.connect({ browserWSEndpoint });
        await irctcLogin(username, password, browser);
        res.send('IRCTC login successful');
    } catch (error) {
        res.status(500).send(`Error during IRCTC login: ${error.message}`);
    }
})
export { connectIrctc };