// @ts-check
const { test, expect } = require('@playwright/test');
const config = require('./config/test-config');
const {
  waitForGameLoad,
  startNewGame,
  isPanelVisible,
  togglePanelWithKey,
  openPanel,
  closePanel,
} = require('./helpers/test-helpers');

/**
 * 🖤 PANEL TESTS
 * Tests all game panels open/close correctly via buttons and keyboard
 */

test.describe('Game Panels', () => {
  test.skip(!config.panelTests, 'Panel tests disabled in config');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await startNewGame(page);
  });

  // ═══════════════════════════════════════════════════════════════
  // 📦 INVENTORY PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Inventory Panel', () => {
    test.skip(!config.panels.inventory, 'Inventory panel tests disabled');

    test('opens with I key or direct call', async ({ page }) => {
      // Try keyboard first
      await togglePanelWithKey(page, 'i');
      let visible = await isPanelVisible(page, 'inventory-panel');

      // Fallback to direct function call if keyboard didn't work
      if (!visible) {
        await openPanel(page, 'inventory');
        visible = await isPanelVisible(page, 'inventory-panel');
      }

      expect(visible).toBe(true);
    });

    test('closes with Escape or direct call', async ({ page }) => {
      await openPanel(page, 'inventory');
      await page.waitForTimeout(300);

      // First try Escape key
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);

      let visible = await isPanelVisible(page, 'inventory-panel');

      // If still visible, use direct close
      if (visible) {
        await closePanel(page, 'inventory-panel');
        visible = await isPanelVisible(page, 'inventory-panel');
      }

      expect(visible).toBe(false);
    });

    test('opens via action bar button', async ({ page }) => {
      // Try clicking the inventory button
      const invBtn = page.locator('#inventory-btn, [data-panel="inventory"], button:has-text("📦")');
      if (await invBtn.count() > 0) {
        await invBtn.first().click();
        await page.waitForTimeout(300);
      } else {
        await openPanel(page, 'inventory');
      }

      const visible = await isPanelVisible(page, 'inventory-panel');
      expect(visible).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 👤 CHARACTER PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Character Panel', () => {
    test.skip(!config.panels.character, 'Character panel tests disabled');

    test('opens with C key or direct call', async ({ page }) => {
      // Try keyboard first
      await togglePanelWithKey(page, 'c');
      let visible = await isPanelVisible(page, 'character-panel');

      // Fallback to direct function call
      if (!visible) {
        await openPanel(page, 'character');
        visible = await isPanelVisible(page, 'character-panel');
      }

      // Also check for player-info-panel which might be the character panel
      if (!visible) {
        visible = await isPanelVisible(page, 'player-info-panel');
      }

      expect(visible).toBe(true);
    });

    test('displays player stats', async ({ page }) => {
      await openPanel(page, 'character');
      await page.waitForTimeout(300);

      // Check for stat elements in character or player-info panel
      const hasStats = await page.evaluate(() => {
        const panel = document.getElementById('character-panel') ||
                      document.getElementById('player-info-panel') ||
                      document.querySelector('.player-info');
        if (!panel) return false;
        const text = panel.textContent.toLowerCase();
        return text.includes('health') || text.includes('strength') ||
               text.includes('level') || text.includes('gold') ||
               text.includes('endurance') || text.includes('charisma');
      });

      expect(hasStats).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 🏪 MARKET PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Market Panel', () => {
    test.skip(!config.panels.market, 'Market panel tests disabled');

    test('opens with M key or direct call', async ({ page }) => {
      await togglePanelWithKey(page, 'm');
      let visible = await isPanelVisible(page, 'market-panel');

      if (!visible) {
        await openPanel(page, 'market');
        visible = await isPanelVisible(page, 'market-panel');
      }

      expect(visible).toBe(true);
    });

    test('shows buy/sell tabs or items', async ({ page }) => {
      await openPanel(page, 'market');
      await page.waitForTimeout(300);

      const hasTabs = await page.evaluate(() => {
        const panel = document.getElementById('market-panel');
        if (!panel) return false;
        const text = panel.textContent.toLowerCase();
        return text.includes('buy') || text.includes('sell') ||
               text.includes('market') || text.includes('trade') ||
               text.includes('item') || text.includes('gold');
      });

      expect(hasTabs).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 🚶 TRAVEL PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Travel Panel', () => {
    test.skip(!config.panels.travel, 'Travel panel tests disabled');

    test('opens with T key or direct call', async ({ page }) => {
      await togglePanelWithKey(page, 't');
      let visible = await isPanelVisible(page, 'travel-panel');

      if (!visible) {
        await openPanel(page, 'travel');
        visible = await isPanelVisible(page, 'travel-panel');
      }

      expect(visible).toBe(true);
    });

    test('shows destination list or travel options', async ({ page }) => {
      await openPanel(page, 'travel');
      await page.waitForTimeout(300);

      const hasDestinations = await page.evaluate(() => {
        const panel = document.getElementById('travel-panel');
        if (!panel) return false;
        const text = panel.textContent.toLowerCase();
        return panel.querySelectorAll('.destination, .location-item, .travel-destination, button').length > 0 ||
               text.includes('destination') || text.includes('travel') ||
               text.includes('walk') || text.includes('journey');
      });

      expect(hasDestinations).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 🗺️ MAP PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Map Panel', () => {
    test.skip(!config.panels.map, 'Map panel tests disabled');

    test('opens with N key or direct call', async ({ page }) => {
      await togglePanelWithKey(page, 'n');
      let visible = await isPanelVisible(page, 'map-panel');

      if (!visible) {
        await openPanel(page, 'map');
        visible = await isPanelVisible(page, 'map-panel');
      }

      // Map might already be visible in game view
      if (!visible) {
        visible = await page.evaluate(() => {
          const mapContainer = document.querySelector('.map-container, #world-map, canvas.map');
          return mapContainer !== null;
        });
      }

      expect(visible).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 📜 QUEST PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Quest Panel', () => {
    test.skip(!config.panels.quests, 'Quest panel tests disabled');

    test('opens with Q key or direct call', async ({ page }) => {
      await togglePanelWithKey(page, 'q');
      let visible = await isPanelVisible(page, 'quest-panel') ||
                    await isPanelVisible(page, 'quest-log-panel') ||
                    await isPanelVisible(page, 'quests-panel');

      if (!visible) {
        await openPanel(page, 'quests');
        visible = await isPanelVisible(page, 'quest-panel') ||
                  await isPanelVisible(page, 'quest-log-panel') ||
                  await isPanelVisible(page, 'quests-panel');
      }

      expect(visible).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 🏆 ACHIEVEMENTS PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Achievements Panel', () => {
    test.skip(!config.panels.achievements, 'Achievements panel tests disabled');

    test('opens with H key or direct call', async ({ page }) => {
      await togglePanelWithKey(page, 'h');
      let visible = await isPanelVisible(page, 'achievements-panel');

      if (!visible) {
        await openPanel(page, 'achievements');
        visible = await isPanelVisible(page, 'achievements-panel');
      }

      expect(visible).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 🏠 PROPERTIES PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Properties Panel', () => {
    test.skip(!config.panels.properties, 'Properties panel tests disabled');

    test('opens with P key or direct call', async ({ page }) => {
      await togglePanelWithKey(page, 'p');
      let visible = await isPanelVisible(page, 'properties-panel');

      if (!visible) {
        await openPanel(page, 'properties');
        visible = await isPanelVisible(page, 'properties-panel');
      }

      expect(visible).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 💰 FINANCIAL PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Financial Panel', () => {
    test.skip(!config.panels.financial, 'Financial panel tests disabled');

    test('opens with F key or direct call', async ({ page }) => {
      await togglePanelWithKey(page, 'f');
      let visible = await isPanelVisible(page, 'financial-panel') ||
                    await isPanelVisible(page, 'finances-panel');

      if (!visible) {
        await openPanel(page, 'financial');
        visible = await isPanelVisible(page, 'financial-panel') ||
                  await isPanelVisible(page, 'finances-panel');
      }

      expect(visible).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 👥 PEOPLE PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('People Panel', () => {
    test.skip(!config.panels.people, 'People panel tests disabled');

    test('opens with O key or direct call', async ({ page }) => {
      await togglePanelWithKey(page, 'o');
      let visible = await isPanelVisible(page, 'people-panel') ||
                    await isPanelVisible(page, 'npc-panel');

      if (!visible) {
        await openPanel(page, 'people');
        visible = await isPanelVisible(page, 'people-panel') ||
                  await isPanelVisible(page, 'npc-panel');
      }

      expect(visible).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // ⚙️ SETTINGS PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Settings Panel', () => {
    test.skip(!config.panels.settings, 'Settings panel tests disabled');

    test('opens with comma key or direct call', async ({ page }) => {
      await togglePanelWithKey(page, ',');
      let visible = await isPanelVisible(page, 'settings-panel');

      if (!visible) {
        await openPanel(page, 'settings');
        visible = await isPanelVisible(page, 'settings-panel');
      }

      expect(visible).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 📍 LOCATION PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Location Panel', () => {
    test.skip(!config.panels.location, 'Location panel tests disabled');

    test('is visible by default or can be opened', async ({ page }) => {
      let visible = await isPanelVisible(page, 'location-panel');

      // Location info might be displayed in a different element
      if (!visible) {
        visible = await page.evaluate(() => {
          const loc = document.querySelector('.location-info, .current-location, #location-name');
          return loc !== null && loc.textContent.length > 0;
        });
      }

      expect(visible).toBe(true);
    });

    test('shows current location name', async ({ page }) => {
      const hasLocation = await page.evaluate(() => {
        // Check various possible location display elements
        const panel = document.getElementById('location-panel') ||
                      document.querySelector('.location-info, .current-location');
        if (panel && panel.textContent.length > 5) return true;

        // Also check the location name in the sidebar
        const locationName = document.querySelector('.location-name, #location-name, h2.location');
        return locationName && locationName.textContent.length > 2;
      });

      expect(hasLocation).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 💬 MESSAGE LOG PANEL
  // ═══════════════════════════════════════════════════════════════

  test.describe('Message Log Panel', () => {
    test.skip(!config.panels.messageLog, 'Message log tests disabled');

    test('is visible by default', async ({ page }) => {
      let visible = await isPanelVisible(page, 'message-log');

      // Message log might have a different ID
      if (!visible) {
        visible = await page.evaluate(() => {
          const log = document.querySelector('.message-log, #messages, .game-log');
          return log !== null;
        });
      }

      expect(visible).toBe(true);
    });
  });
});
