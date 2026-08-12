import { chromium } from 'playwright';

const outDir = 'C:\\Users\\xoker\\AppData\\Local\\Temp\\claude\\c--Users-xoker-OneDrive-Documents-pulse-rev\\69590ab0-7d08-420a-8a5b-9305d2fa7608\\scratchpad';

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 420, height: 860 } });
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push(String(err)));

await page.goto('http://localhost:5183', { waitUntil: 'networkidle' });
await page.click('.boot');
await page.waitForSelector('.circuit', { timeout: 6000 });

const gaps = await page.$$('.circuit__gap');
for (const gap of gaps) {
  const box = await gap.boundingBox();
  await page.mouse.move(box.x + 5, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.85, box.y + box.height / 2, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(150);
}
await page.screenshot({ path: `${outDir}\\07-game-alllit.png` });

await page.waitForSelector('.online', { timeout: 3000 });
await page.screenshot({ path: `${outDir}\\08-online.png` });

// keyboard nav check: tab to enter pulse
console.log('CONSOLE_ERRORS:', JSON.stringify(errors));
await browser.close();
