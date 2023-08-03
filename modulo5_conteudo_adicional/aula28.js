import { chromium } from 'k6/x/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    messages: {
      executor: 'constant-vus',
      exec: 'browser',
      vus: 5,
      duration: '10s',
    }
  },
};

export function browser() {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  page
    .goto('https://test.k6.io/browser.php', { waitUntil: 'networkidle' })
    .then(() => {
      page.locator('#checkbox1').check();

      check(page, {
        'checkbox is checked': (p) =>
          p.locator('#checkbox-info-display').textContent() === 'Thanks for checking the box',
      });
    })
    .finally(() => {
      page.close();
      browser.close();
    });
}
