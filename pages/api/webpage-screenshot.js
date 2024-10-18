import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) {
      res.status(400).json({ error: 'URL is required' });
      return;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({ encoding: 'base64', fullPage: true });
    await browser.close();

    res.status(200).json({ screenshot: `data:image/png;base64,${screenshot}` });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
