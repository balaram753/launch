import { chromium } from 'playwright';

const outDir = 'C:\\Users\\xoker\\AppData\\Local\\Temp\\claude\\c--Users-xoker-OneDrive-Documents-pulse-rev\\69590ab0-7d08-420a-8a5b-9305d2fa7608\\scratchpad';

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 420, height: 860 } });
const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', (err) => errors.push(String(err)));

await page.goto('http://localhost:5183', { waitUntil: 'networkidle' });
await page.waitForSelector('text=System Offline');
await page.screenshot({ path: `${outDir}\\01-offline.png` });

// desktop click-to-initialize
await page.click('.boot');
await page.waitForSelector('.decrypt', { timeout: 3000 });
await page.screenshot({ path: `${outDir}\\02-decrypt-early.png` });
await page.waitForTimeout(900);
await page.screenshot({ path: `${outDir}\\03-decrypt-mid.png` });

await page.waitForSelector('.ecg', { timeout: 4000 });
await page.screenshot({ path: `${outDir}\\04-ecg.png` });

await page.waitForSelector('.circuit', { timeout: 4000 });
await page.screenshot({ path: `${outDir}\\05-game.png` });

// drag first gap
const gap = await page.$('.circuit__gap');
const box = await gap.boundingBox();
await page.mouse.move(box.x + 5, box.y + box.height / 2);
await page.mouse.down();
await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2, { steps: 10 });
await page.mouse.up();
await page.screenshot({ path: `${outDir}\\06-game-connected1.png` });

console.log('CONSOLE_ERRORS:', JSON.stringify(errors));
await browser.close();
