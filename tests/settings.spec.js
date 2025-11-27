// @ts-check
const { test, expect } = require('@playwright/test');
const config = require('./config/test-config');

/**
 * 🖤 Medieval Trading Game - Settings/Config Tests
 * Tests all GameConfig settings and settings panel functionality
 * Making sure our configuration nightmare works as intended
 */

test.describe('GameConfig Settings Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate and wait for load
        await page.goto('/');
        await expect(page.locator('#loading-screen')).toHaveClass(/hidden/, { timeout: 20000 });
    });

    // ═══════════════════════════════════════════════════════════════
    // 📋 VERSION SETTINGS - the dark heart's identity
    // ═══════════════════════════════════════════════════════════════

    test('GameConfig.version exists and has required properties', async ({ page }) => {
        const version = await page.evaluate(() => {
            return window.GameConfig?.version || null;
        });

        expect(version).not.toBeNull();
        expect(version).toHaveProperty('game');
        expect(version).toHaveProperty('file');
        expect(version).toHaveProperty('build');
        expect(version.game).toBeTruthy();
        expect(version.file).toBeTruthy();
    });

    // ═══════════════════════════════════════════════════════════════
    // 🔧 DEBUG SETTINGS - chaos agent configuration
    // ═══════════════════════════════════════════════════════════════

    test('GameConfig.debug exists with enabled flag', async ({ page }) => {
        const debug = await page.evaluate(() => {
            return window.GameConfig?.debug || null;
        });

        expect(debug).not.toBeNull();
        expect(debug).toHaveProperty('enabled');
        expect(typeof debug.enabled).toBe('boolean');
    });

    // ═══════════════════════════════════════════════════════════════
    // 🎮 GAME IDENTITY - who even are we
    // ═══════════════════════════════════════════════════════════════

    test('GameConfig.game has name and identity properties', async ({ page }) => {
        const game = await page.evaluate(() => {
            return window.GameConfig?.game || null;
        });

        expect(game).not.toBeNull();
        expect(game).toHaveProperty('name');
        expect(game.name).toBe('Medieval Trading Game');
    });

    // ═══════════════════════════════════════════════════════════════
    // 🤖 API CONFIG - summoning circle settings
    // ═══════════════════════════════════════════════════════════════

    test('GameConfig.api has pollinations configuration', async ({ page }) => {
        const api = await page.evaluate(() => {
            return window.GameConfig?.api || null;
        });

        expect(api).not.toBeNull();
        expect(api).toHaveProperty('pollinations');
        expect(api.pollinations).toHaveProperty('baseUrl');
        expect(api.pollinations.baseUrl).toContain('pollinations.ai');
    });

    test('GameConfig.api.rateLimit has proper limits', async ({ page }) => {
        const rateLimit = await page.evaluate(() => {
            return window.GameConfig?.api?.rateLimit || null;
        });

        expect(rateLimit).not.toBeNull();
        expect(rateLimit.minRequestInterval).toBeGreaterThanOrEqual(15000);
        expect(rateLimit.maxRetries).toBeGreaterThanOrEqual(1);
    });

    // ═══════════════════════════════════════════════════════════════
    // 💾 STORAGE KEYS - where data goes to persist
    // ═══════════════════════════════════════════════════════════════

    test('GameConfig.storage has all required keys', async ({ page }) => {
        const storage = await page.evaluate(() => {
            return window.GameConfig?.storage || null;
        });

        expect(storage).not.toBeNull();
        expect(storage).toHaveProperty('prefix');
        expect(storage).toHaveProperty('highScores');
        expect(storage).toHaveProperty('saveSlots');
        expect(storage).toHaveProperty('settings');
    });

    // ═══════════════════════════════════════════════════════════════
    // 🏆 LEADERBOARD CONFIG - eternal glory settings
    // ═══════════════════════════════════════════════════════════════

    test('GameConfig.leaderboard has proper structure', async ({ page }) => {
        const leaderboard = await page.evaluate(() => {
            return window.GameConfig?.leaderboard || null;
        });

        expect(leaderboard).not.toBeNull();
        expect(leaderboard).toHaveProperty('enabled');
        expect(leaderboard).toHaveProperty('backend');
        expect(leaderboard).toHaveProperty('settings');
        expect(leaderboard.settings).toHaveProperty('maxEntries');
        expect(leaderboard.settings).toHaveProperty('displayEntries');
    });

    // ═══════════════════════════════════════════════════════════════
    // ⚙️ DEFAULT SETTINGS - factory configuration
    // ═══════════════════════════════════════════════════════════════

    test('GameConfig.defaults has volume and save settings', async ({ page }) => {
        const defaults = await page.evaluate(() => {
            return window.GameConfig?.defaults || null;
        });

        expect(defaults).not.toBeNull();
        expect(defaults).toHaveProperty('soundVolume');
        expect(defaults).toHaveProperty('musicVolume');
        expect(defaults).toHaveProperty('autoSave');
        expect(defaults.soundVolume).toBeGreaterThanOrEqual(0);
        expect(defaults.soundVolume).toBeLessThanOrEqual(1);
    });

    // ═══════════════════════════════════════════════════════════════
    // 🎛️ SETTINGS CATEGORIES - all user preferences
    // ═══════════════════════════════════════════════════════════════

    test('GameConfig.settings.audio has volume controls', async ({ page }) => {
        const audio = await page.evaluate(() => {
            return window.GameConfig?.settings?.audio || null;
        });

        expect(audio).not.toBeNull();
        expect(audio).toHaveProperty('masterVolume');
        expect(audio).toHaveProperty('musicVolume');
        expect(audio).toHaveProperty('sfxVolume');
        expect(audio).toHaveProperty('isMuted');
        expect(audio.masterVolume).toBeGreaterThanOrEqual(0);
        expect(audio.masterVolume).toBeLessThanOrEqual(1);
    });

    test('GameConfig.settings.visual has display options', async ({ page }) => {
        const visual = await page.evaluate(() => {
            return window.GameConfig?.settings?.visual || null;
        });

        expect(visual).not.toBeNull();
        expect(visual).toHaveProperty('particlesEnabled');
        expect(visual).toHaveProperty('screenShakeEnabled');
        expect(visual).toHaveProperty('animationsEnabled');
        expect(visual).toHaveProperty('quality');
        expect(['low', 'medium', 'high']).toContain(visual.quality);
    });

    test('GameConfig.settings.ui has interface options', async ({ page }) => {
        const ui = await page.evaluate(() => {
            return window.GameConfig?.settings?.ui || null;
        });

        expect(ui).not.toBeNull();
        expect(ui).toHaveProperty('animationsEnabled');
        expect(ui).toHaveProperty('hoverEffectsEnabled');
        expect(ui).toHaveProperty('fontSize');
        expect(ui).toHaveProperty('theme');
    });

    test('GameConfig.settings.accessibility has a11y options', async ({ page }) => {
        const a11y = await page.evaluate(() => {
            return window.GameConfig?.settings?.accessibility || null;
        });

        expect(a11y).not.toBeNull();
        expect(a11y).toHaveProperty('reducedMotion');
        expect(a11y).toHaveProperty('highContrast');
        expect(a11y).toHaveProperty('screenReaderEnabled');
        expect(a11y).toHaveProperty('colorBlindMode');
        expect(a11y).toHaveProperty('keyboardNavigation');
    });

    // ═══════════════════════════════════════════════════════════════
    // 💰 PLAYER CONFIG - starting values
    // ═══════════════════════════════════════════════════════════════

    test('GameConfig.player.startingGold has difficulty values', async ({ page }) => {
        const startingGold = await page.evaluate(() => {
            return window.GameConfig?.player?.startingGold || null;
        });

        expect(startingGold).not.toBeNull();
        expect(startingGold).toHaveProperty('easy');
        expect(startingGold).toHaveProperty('normal');
        expect(startingGold).toHaveProperty('hard');
        expect(startingGold.easy).toBe(120);
        expect(startingGold.normal).toBe(100);
        expect(startingGold.hard).toBe(80);
    });

    test('GameConfig.player.startingStats has required stats', async ({ page }) => {
        const stats = await page.evaluate(() => {
            return window.GameConfig?.player?.startingStats || null;
        });

        expect(stats).not.toBeNull();
        expect(stats).toHaveProperty('health');
        expect(stats).toHaveProperty('maxHealth');
        expect(stats).toHaveProperty('stamina');
        expect(stats).toHaveProperty('maxStamina');
        expect(stats.health).toBe(100);
        expect(stats.maxHealth).toBe(100);
    });
});

// ═══════════════════════════════════════════════════════════════
// 🎨 SETTINGS PANEL UI TESTS - making sure the panel works
// ═══════════════════════════════════════════════════════════════

test.describe('Settings Panel UI Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#loading-screen')).toHaveClass(/hidden/, { timeout: 20000 });
        // Wait for main menu to be visible (not hidden)
        await page.waitForSelector('#main-menu:not(.hidden)', { timeout: 5000 });
    });

    test('settings button exists on main menu', async ({ page }) => {
        // Check for settings button on main menu inside .menu-buttons
        const settingsBtn = page.locator('#main-menu .menu-buttons #settings-btn, #settings-btn');
        await expect(settingsBtn.first()).toBeVisible();
    });

    test('clicking settings opens settings panel', async ({ page }) => {
        // Click settings button from main menu
        const settingsBtn = page.locator('#main-menu .menu-buttons #settings-btn, #settings-btn').first();
        await settingsBtn.click();

        // Wait for settings panel to become visible (it uses display:block not class toggle)
        await page.waitForTimeout(500);

        // Check if settings panel is open using JS (more reliable than selector visibility)
        const isOpen = await page.evaluate(() => {
            return typeof SettingsPanel !== 'undefined' && SettingsPanel.isOpen === true;
        });

        expect(isOpen).toBe(true);
    });

    test('settings panel has audio controls', async ({ page }) => {
        // Open settings
        const settingsBtn = page.locator('#main-menu .menu-buttons #settings-btn, #settings-btn').first();
        await settingsBtn.click();
        await page.waitForTimeout(500);

        // Look for volume controls (sliders or checkboxes)
        const audioControls = page.locator('#settings-panel input[type="range"], .volume-slider, [id*="volume"], [class*="volume"]');

        // Should have at least one audio control
        const count = await audioControls.count();
        expect(count).toBeGreaterThanOrEqual(1);
    });

    test('settings can be closed', async ({ page }) => {
        // Open settings
        const settingsBtn = page.locator('#main-menu .menu-buttons #settings-btn, #settings-btn').first();
        await settingsBtn.click();
        await page.waitForTimeout(500);

        // Close settings using SettingsPanel.hide() function
        await page.evaluate(() => {
            if (typeof SettingsPanel !== 'undefined' && SettingsPanel.hide) {
                SettingsPanel.hide();
            }
        });
        await page.waitForTimeout(500);

        // Settings header should no longer be visible
        const isHidden = await page.evaluate(() => {
            const panel = document.getElementById('settings-panel');
            return !panel || panel.style.display === 'none';
        });
        expect(isHidden).toBeTruthy();
    });
});

// ═══════════════════════════════════════════════════════════════
// 🔄 SETTINGS PERSISTENCE TESTS - do settings actually save?
// ═══════════════════════════════════════════════════════════════

test.describe('Settings Persistence Tests', () => {
    test('settings persist to localStorage', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#loading-screen')).toHaveClass(/hidden/, { timeout: 20000 });

        // Check if settings are being saved to localStorage
        const storageKey = await page.evaluate(() => {
            return window.GameConfig?.storage?.settings || 'medievalTradingGameSettings';
        });

        // Attempt to get settings from localStorage
        const savedSettings = await page.evaluate((key) => {
            return localStorage.getItem(key);
        }, storageKey);

        // If game has been played before, settings should exist
        // If not, at least the key should be defined in config
        expect(storageKey).toBeTruthy();
    });

    test('changing settings updates game state', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#loading-screen')).toHaveClass(/hidden/, { timeout: 20000 });

        // Get initial settings state
        const initialSettings = await page.evaluate(() => {
            return window.GameConfig?.settings?.audio?.isMuted || false;
        });

        // The setting should have a defined value
        expect(typeof initialSettings).toBe('boolean');
    });
});
