const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const irctcLogin = require('./irctc');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.post('/login', async (req, res) => {
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
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});