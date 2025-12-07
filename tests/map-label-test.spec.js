// Map label diagnostic test - follows actual new game flow
const { test, expect } = require('@playwright/test');

test('New game flow and check map labels', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);

    // 1. Click New Game
    await page.locator('#new-game-btn').click();
    await page.waitForTimeout(1000);

    // 2. Click Randomize character button (🎲)
    await page.locator('#randomize-character-btn').click();
    await page.waitForTimeout(500);

    // 3. Click Start button
    await page.locator('#start-game-btn').click();
    await page.waitForTimeout(2000);

    // 4. Tutorial prompt - click Yes or No (try No first)
    const noBtn = page.locator('text=No').or(page.locator('button:has-text("No")'));
    if (await noBtn.first().isVisible({ timeout: 2000 }).catch(() => false)) {
        await noBtn.first().click();
        await page.waitForTimeout(1000);
    }

    // 5. Quest accept - click Accept twice if needed
    const acceptBtn = page.locator('text=Accept').or(page.locator('button:has-text("Accept")'));
    for (let i = 0; i < 2; i++) {
        if (await acceptBtn.first().isVisible({ timeout: 1000 }).catch(() => false)) {
            await acceptBtn.first().click();
            await page.waitForTimeout(500);
        }
    }

    // Now in game - take screenshot
    await page.waitForTimeout(1000);
    await page.screenshot({
        path: 'tests/screenshots/game-start.png',
        fullPage: true
    });

    // Open debooger and reveal map
    await page.locator('#toggle-debooger-console').click();
    await page.waitForTimeout(500);

    const input = page.locator('#debooger-command-input');
    await input.fill('revealmap');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);

    // Close debooger
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Open the GAME WORLD MAP (M key or click map button)
    await page.keyboard.press('m');
    await page.waitForTimeout(1000);

    // Zoom out on game world map to see full world
    const gameMap = page.locator('#game-map');
    if (await gameMap.isVisible({ timeout: 2000 }).catch(() => false)) {
        await gameMap.hover();
        for (let i = 0; i < 15; i++) {
            await page.mouse.wheel(0, 400); // Scroll down = zoom out
            await page.waitForTimeout(150);
        }
    }
    await page.waitForTimeout(1000);

    // Take screenshot of game world map (zoomed out)
    await page.screenshot({
        path: 'tests/screenshots/map-labels-gameworld.png',
        fullPage: true
    });

    // Also take just the map element
    if (await gameMap.isVisible().catch(() => false)) {
        await gameMap.screenshot({
            path: 'tests/screenshots/map-labels-gameworld-only.png'
        });
    }

    // Count labels on main game world map
    const mainLabels = await page.locator('.map-location-label').all();
    console.log(`\n=== Found ${mainLabels.length} game world map labels ===\n`);

    // List all label texts
    console.log('=== ALL LABELS ===');
    for (let i = 0; i < mainLabels.length; i++) {
        const label = mainLabels[i];
        const text = await label.textContent();
        console.log(`Label ${i+1}: "${text}"`);
    }
});
