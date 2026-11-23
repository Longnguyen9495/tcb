import { test, expect } from '@playwright/test';

test('showroom can switch and flip the credit card', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('#hero-title')).toBeVisible();
  await expect(page.locator('.product-card')).toHaveCount(4);
  await page.locator('[data-card="eco"]').click();
  await expect(page.locator('#selected-name')).toHaveText('Visa Eco');
  await expect(page.locator('#card-rotor')).toHaveAttribute('data-theme', 'eco');
  await page.locator('#flip-card').click();
  await expect(page.locator('#flip-card')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-card="signature"]').click();
  await expect(page.locator('#flip-card')).toHaveAttribute('aria-pressed', 'false');
  expect(errors).toEqual([]);
});

test('offer filters, URL state and poster dialog work', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-filter="shopping"]').click();
  await expect(page.locator('.product-card:visible')).toHaveCount(2);
  await expect(page).toHaveURL(/nhu-cau=shopping/);
  await page.locator('[data-filter="all"]').click();
  await expect(page.locator('.product-card:visible')).toHaveCount(4);
  await page.locator('.poster-card[data-poster="eco"]').click();
  await expect(page.locator('#poster-modal')).toBeVisible();
  await expect(page.locator('#modal-title')).toHaveText('Visa Eco');
  await page.locator('#modal-next').click();
  await expect(page.locator('#modal-title')).toHaveText('Everyday');
  await page.keyboard.press('Escape');
  await expect(page.locator('#poster-modal')).not.toBeVisible();
});

test('no horizontal document overflow and poster assets load', async ({ page }) => {
  await page.goto('/');
  const width = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: window.innerWidth }));
  expect(width.document).toBeLessThanOrEqual(width.viewport + 2);
  const sources = await page.locator('.poster-card img').evaluateAll(images => images.map(img => img.getAttribute('src')));
  for (const src of sources) {
    const response = await page.request.get(new URL(src, page.url()).href);
    expect(response.ok(), `${src} must be accessible`).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/webp');
  }
});

test('code can be copied and navigation works on mobile', async ({ page, isMobile }) => {
  await page.goto('/');
  await page.locator('.code-pill.copy-code').click();
  await expect(page.locator('#toast')).toContainText('TF1682');
  if (isMobile) {
    await page.locator('#menu-toggle').click();
    await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#mobile-menu a').first().click();
    await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  }
});

test('reduced motion keeps content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-reveal]:not(.is-visible)')).toHaveCount(0);
});
