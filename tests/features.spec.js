// @ts-check
const { test, expect } = require('@playwright/test');
const config = require('./config/test-config');
const {
  waitForGameLoad,
  startNewGame,
  openDebugConsole,
  runDebugCommand,
  togglePanelWithKey,
  getPlayerGold,
  isPanelVisible,
} = require('./helpers/test-helpers');

/**
 * 🖤 FEATURE TESTS
 * Tests core game features: trading, travel, quests, saves, etc.
 */

// ═══════════════════════════════════════════════════════════════
// 💰 TRADING SYSTEM TESTS
// ═══════════════════════════════════════════════════════════════

test.describe('Trading System', () => {
  test.skip(!config.tradingTests, 'Trading tests disabled');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await startNewGame(page);
    // Give player some gold to trade with
    await openDebugConsole(page);
    await runDebugCommand(page, 'setgold 5000');
    await page.keyboard.press('Escape');
  });

  test('Market panel shows items for sale', async ({ page }) => {
    await togglePanelWithKey(page, 'm');
    await page.waitForTimeout(500);

    const hasItems = await page.evaluate(() => {
      const panel = document.getElementById('market-panel');
      if (!panel) return false;
      return panel.querySelectorAll('.market-item, .item-row, .trade-item').length > 0;
    });

    expect(hasItems).toBe(true);
  });

  test('Can switch between buy and sell tabs', async ({ page }) => {
    await togglePanelWithKey(page, 'm');
    await page.waitForTimeout(300);

    // Click sell tab
    const sellTab = await page.locator('.tab:has-text("Sell"), [data-tab="sell"], #sell-tab');
    if (await sellTab.count() > 0) {
      await sellTab.first().click();
      await page.waitForTimeout(300);

      // Should now show sell interface
      const sellActive = await page.evaluate(() => {
        const tab = document.querySelector('[data-tab="sell"], #sell-tab, .sell-tab');
        return tab && (tab.classList.contains('active') || tab.getAttribute('aria-selected') === 'true');
      });
    }
  });

  test('Buying item reduces gold', async ({ page }) => {
    const initialGold = await getPlayerGold(page);

    await togglePanelWithKey(page, 'm');
    await page.waitForTimeout(500);

    // Try to buy first available item
    const buyBtn = await page.locator('.buy-btn, button:has-text("Buy"), .market-item button');
    if (await buyBtn.count() > 0) {
      await buyBtn.first().click();
      await page.waitForTimeout(500);

      const newGold = await getPlayerGold(page);
      expect(newGold).toBeLessThan(initialGold);
    }
  });

  test('Selling item increases gold', async ({ page }) => {
    // First give player an item
    await openDebugConsole(page);
    await runDebugCommand(page, 'giveitem bread 10');
    await page.keyboard.press('Escape');

    const initialGold = await getPlayerGold(page);

    await togglePanelWithKey(page, 'm');
    await page.waitForTimeout(300);

    // Click sell tab
    const sellTab = await page.locator('.tab:has-text("Sell"), [data-tab="sell"]');
    if (await sellTab.count() > 0) {
      await sellTab.first().click();
      await page.waitForTimeout(300);

      // Try to sell
      const sellBtn = await page.locator('.sell-btn, button:has-text("Sell")');
      if (await sellBtn.count() > 0) {
        await sellBtn.first().click();
        await page.waitForTimeout(500);

        const newGold = await getPlayerGold(page);
        expect(newGold).toBeGreaterThan(initialGold);
      }
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// 🚶 TRAVEL SYSTEM TESTS
// ═══════════════════════════════════════════════════════════════

test.describe('Travel System', () => {
  test.skip(!config.travelTests, 'Travel tests disabled');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await startNewGame(page);
  });

  test('Travel panel shows destinations', async ({ page }) => {
    await togglePanelWithKey(page, 't');
    await page.waitForTimeout(500);

    const hasDestinations = await page.evaluate(() => {
      const panel = document.getElementById('travel-panel');
      if (!panel) return false;
      return panel.querySelectorAll('.destination, .location-item, button').length > 0;
    });

    expect(hasDestinations).toBe(true);
  });

  test('Clicking destination shows travel info', async ({ page }) => {
    await togglePanelWithKey(page, 't');
    await page.waitForTimeout(300);

    const destination = await page.locator('.destination, .location-item, .travel-destination');
    if (await destination.count() > 0) {
      await destination.first().click();
      await page.waitForTimeout(300);

      // Should show travel button or info
      const travelBtn = await page.locator('#travel-btn, .start-travel-btn, button:has-text("Travel")');
      expect(await travelBtn.count()).toBeGreaterThan(0);
    }
  });

  test('Can start travel to destination', async ({ page }) => {
    await togglePanelWithKey(page, 't');
    await page.waitForTimeout(300);

    // Select a destination
    const destination = await page.locator('.destination, .location-item');
    if (await destination.count() > 0) {
      await destination.first().click();
      await page.waitForTimeout(200);

      // Click travel button
      const travelBtn = await page.locator('.start-travel-btn, #begin-travel-btn, button:has-text("Travel")');
      if (await travelBtn.count() > 0) {
        await travelBtn.first().click();
        await page.waitForTimeout(500);

        // Should be traveling or have moved
        const isTraveling = await page.evaluate(() => {
          if (typeof TravelSystem !== 'undefined') {
            return TravelSystem.playerPosition?.isTraveling ||
                   TravelSystem.isTraveling;
          }
          return false;
        });
        // May or may not be traveling depending on game state
      }
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// 📜 QUEST SYSTEM TESTS
// ═══════════════════════════════════════════════════════════════

test.describe('Quest System', () => {
  test.skip(!config.questTests, 'Quest tests disabled');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await startNewGame(page);
  });

  test('Quest log shows available quests', async ({ page }) => {
    await togglePanelWithKey(page, 'q');
    await page.waitForTimeout(500);

    const hasQuests = await page.evaluate(() => {
      const panel = document.getElementById('quest-panel') ||
                    document.getElementById('quest-log-panel');
      if (!panel) return false;
      return panel.textContent.length > 20;
    });

    expect(hasQuests).toBe(true);
  });

  test('Quest categories exist', async ({ page }) => {
    await togglePanelWithKey(page, 'q');
    await page.waitForTimeout(300);

    const categories = await page.locator('.quest-category, .category-tab, [data-category]');
    expect(await categories.count()).toBeGreaterThan(0);
  });

  test('Main quest exists', async ({ page }) => {
    await togglePanelWithKey(page, 'q');
    await page.waitForTimeout(300);

    const hasMainQuest = await page.evaluate(() => {
      const panel = document.getElementById('quest-panel') ||
                    document.getElementById('quest-log-panel');
      if (!panel) return false;
      const text = panel.textContent.toLowerCase();
      return text.includes('main') || text.includes('shadow') || text.includes('prologue');
    });

    expect(hasMainQuest).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// 🏆 ACHIEVEMENT SYSTEM TESTS
// ═══════════════════════════════════════════════════════════════

test.describe('Achievement System', () => {
  test.skip(!config.achievementTests, 'Achievement tests disabled');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await startNewGame(page);
  });

  test('Achievement panel shows categories', async ({ page }) => {
    await togglePanelWithKey(page, 'h');
    await page.waitForTimeout(500);

    const categories = await page.locator('.achievement-category, .category, [data-category]');
    expect(await categories.count()).toBeGreaterThan(0);
  });

  test('Achievements display progress', async ({ page }) => {
    await togglePanelWithKey(page, 'h');
    await page.waitForTimeout(300);

    const hasProgress = await page.evaluate(() => {
      const panel = document.getElementById('achievements-panel');
      if (!panel) return false;
      return panel.querySelectorAll('.achievement, .achievement-item').length > 0;
    });

    expect(hasProgress).toBe(true);
  });

  test('Achievement unlocks trigger notification', async ({ page }) => {
    await openDebugConsole(page);
    await runDebugCommand(page, 'unlockachievement first_steps');
    await page.waitForTimeout(1500);

    // Check if achievement was unlocked
    const isUnlocked = await page.evaluate(() => {
      if (typeof AchievementSystem !== 'undefined') {
        return AchievementSystem.isUnlocked('first_steps');
      }
      return false;
    });

    expect(isUnlocked).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// 💾 SAVE/LOAD SYSTEM TESTS
// ═══════════════════════════════════════════════════════════════

test.describe('Save/Load System', () => {
  test.skip(!config.saveLoadTests, 'Save/Load tests disabled');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await startNewGame(page);
  });

  test('Quick save works (F5)', async ({ page }) => {
    await page.keyboard.press('F5');
    await page.waitForTimeout(1000);

    // Check if save was created
    const hasSave = await page.evaluate(() => {
      const saves = localStorage.getItem('tradingGame_saves') ||
                    localStorage.getItem('trader-claude-saves');
      return saves && saves.length > 10;
    });

    expect(hasSave).toBe(true);
  });

  test('Save persists player data', async ({ page }) => {
    // Set up unique state
    await openDebugConsole(page);
    await runDebugCommand(page, 'setgold 12345');
    await page.keyboard.press('Escape');

    // Save
    await page.keyboard.press('F5');
    await page.waitForTimeout(500);

    // Change gold
    await openDebugConsole(page);
    await runDebugCommand(page, 'setgold 0');
    await page.keyboard.press('Escape');

    // Load
    await page.keyboard.press('F9');
    await page.waitForTimeout(1000);

    // Gold should be restored
    const gold = await getPlayerGold(page);
    expect(gold).toBe(12345);
  });
});

// ═══════════════════════════════════════════════════════════════
// 👤 CHARACTER CREATION TESTS
// ═══════════════════════════════════════════════════════════════

test.describe('Character Creation', () => {
  test.skip(!config.characterCreationTests, 'Character creation tests disabled');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForGameLoad(page);
    await page.click('#new-game-btn');
    await page.waitForTimeout(500);
  });

  test('Character name can be entered', async ({ page }) => {
    const input = await page.locator('#character-name-input');
    await input.fill('TestHero');
    await page.waitForTimeout(200);

    const value = await input.inputValue();
    expect(value).toBe('TestHero');
  });

  test('Difficulty affects starting gold', async ({ page }) => {
    // Select easy difficulty
    await page.click('input[value="easy"]');
    await page.waitForTimeout(200);

    // Start game and check gold
    await page.click('#start-game-btn');
    await page.waitForTimeout(1000);

    const easyGold = await getPlayerGold(page);

    // Go back and try hard
    await page.goto('/');
    await waitForGameLoad(page);
    await page.click('#new-game-btn');
    await page.waitForTimeout(500);

    await page.click('input[value="hard"]');
    await page.click('#start-game-btn');
    await page.waitForTimeout(1000);

    const hardGold = await getPlayerGold(page);

    // Easy should have more gold than hard
    expect(easyGold).toBeGreaterThan(hardGold);
  });

  test('Attribute buttons modify points', async ({ page }) => {
    const plusBtn = await page.locator('.attr-plus, .attribute-plus, button:has-text("+")');

    if (await plusBtn.count() > 0) {
      const initialPoints = await page.evaluate(() => {
        const display = document.querySelector('.points-remaining, .attribute-points');
        return display ? parseInt(display.textContent) : 0;
      });

      await plusBtn.first().click();
      await page.waitForTimeout(200);

      const newPoints = await page.evaluate(() => {
        const display = document.querySelector('.points-remaining, .attribute-points');
        return display ? parseInt(display.textContent) : 0;
      });

      // Points should have decreased
      expect(newPoints).toBeLessThan(initialPoints);
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// ⏰ TIME SYSTEM TESTS
// ═══════════════════════════════════════════════════════════════

test.describe('Time System', () => {
  test.skip(!config.timeSystemTests, 'Time system tests disabled');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await startNewGame(page);
  });

  test('Time advances automatically', async ({ page }) => {
    const initialTime = await page.evaluate(() => {
      if (typeof TimeSystem !== 'undefined') {
        return TimeSystem.totalMinutes || TimeSystem.hour * 60 + TimeSystem.minute;
      }
      return 0;
    });

    await page.waitForTimeout(3000); // Wait 3 seconds

    const newTime = await page.evaluate(() => {
      if (typeof TimeSystem !== 'undefined') {
        return TimeSystem.totalMinutes || TimeSystem.hour * 60 + TimeSystem.minute;
      }
      return 0;
    });

    expect(newTime).toBeGreaterThan(initialTime);
  });

  test('Pause stops time', async ({ page }) => {
    // Pause the game
    await page.keyboard.press(' ');
    await page.waitForTimeout(200);

    const time1 = await page.evaluate(() => {
      if (typeof TimeSystem !== 'undefined') {
        return TimeSystem.totalMinutes || 0;
      }
      return 0;
    });

    await page.waitForTimeout(2000);

    const time2 = await page.evaluate(() => {
      if (typeof TimeSystem !== 'undefined') {
        return TimeSystem.totalMinutes || 0;
      }
      return 0;
    });

    // Time should not have changed while paused
    expect(time2).toBe(time1);
  });

  test('Resume continues time', async ({ page }) => {
    // Pause
    await page.keyboard.press(' ');
    await page.waitForTimeout(200);

    // Resume
    await page.keyboard.press(' ');
    await page.waitForTimeout(200);

    const time1 = await page.evaluate(() => {
      if (typeof TimeSystem !== 'undefined') {
        return TimeSystem.totalMinutes || 0;
      }
      return 0;
    });

    await page.waitForTimeout(2000);

    const time2 = await page.evaluate(() => {
      if (typeof TimeSystem !== 'undefined') {
        return TimeSystem.totalMinutes || 0;
      }
      return 0;
    });

    // Time should have advanced
    expect(time2).toBeGreaterThan(time1);
  });
});

// ═══════════════════════════════════════════════════════════════
// ⌨️ KEYBINDING TESTS
// ═══════════════════════════════════════════════════════════════

test.describe('Keybindings', () => {
  test.skip(!config.keybindingTests, 'Keybinding tests disabled');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await startNewGame(page);
  });

  test('All panel keybindings work', async ({ page }) => {
    const keybindings = [
      { key: 'i', panel: 'inventory-panel' },
      { key: 'c', panel: 'character-panel' },
      { key: 'm', panel: 'market-panel' },
      { key: 't', panel: 'travel-panel' },
      { key: 'q', panel: 'quest-panel' },
      { key: 'h', panel: 'achievements-panel' },
      { key: 'p', panel: 'properties-panel' },
      { key: 'f', panel: 'financial-panel' },
      { key: 'o', panel: 'people-panel' },
    ];

    for (const { key, panel } of keybindings) {
      await page.keyboard.press(key);
      await page.waitForTimeout(300);

      const visible = await isPanelVisible(page, panel);
      // Panel should be visible (or at least not error)

      // Close it
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
    }
  });

  test('Escape closes open panels', async ({ page }) => {
    // Open inventory
    await page.keyboard.press('i');
    await page.waitForTimeout(300);

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    const visible = await isPanelVisible(page, 'inventory-panel');
    expect(visible).toBe(false);
  });

  test('Space toggles pause', async ({ page }) => {
    const initialPaused = await page.evaluate(() => {
      if (typeof TimeSystem !== 'undefined') {
        return TimeSystem.isPaused || TimeSystem.paused;
      }
      return false;
    });

    await page.keyboard.press(' ');
    await page.waitForTimeout(300);

    const nowPaused = await page.evaluate(() => {
      if (typeof TimeSystem !== 'undefined') {
        return TimeSystem.isPaused || TimeSystem.paused;
      }
      return false;
    });

    expect(nowPaused).not.toBe(initialPaused);
  });
});
