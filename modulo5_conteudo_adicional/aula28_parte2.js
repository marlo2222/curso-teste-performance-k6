import { chromium } from 'k6/experimental/browser';
import { check } from 'k6';

export const options = {
    vus: 3,
    duration: '5s',
    thresholds: {
        checks: ["rate == 1.0"]
    }
};

export default  async function(){
    const browser = chromium.launch({headless: false});
    const context = browser.newContext();
    const page = context.newPage();

    try {
        await page.goto('https://test.k6.io', { waitUntil: 'networkidle' });

        await Promise.all([
            page.waitForNavigation(),
            page.locator('a[href="/my_messages.php"]').click(),
        ]);

        page.locator('input[name="login"]').type('admin');
        page.locator('input[name="password"]').type('123');

        await Promise.all([
            page.waitForNavigation(),
            page.locator('input[type="submit"]').click(),
        ]);

        check(page, {
            'header': page.locator('h2').textContent() == 'Welcome, admin!',
        });

    } finally {
        page.close();
        browser.close();
    }
};