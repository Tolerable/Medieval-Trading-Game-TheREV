// ═══════════════════════════════════════════════════════════════
// 🖤 LOADING MANAGER - watching the void slowly fill with code
// ═══════════════════════════════════════════════════════════════
// File Version: GameConfig.version.file
// conjured by Unity AI Lab - *yawns* another loading screen...
// ═══════════════════════════════════════════════════════════════

const LoadingManager = {
    // 📊 Systems to track - more systems = smoother progress
    // Order roughly matches script loading order for accurate progress
    systems: [
        // Early systems (config, utils)
        { name: 'GameConfig', check: () => typeof GameConfig !== 'undefined' },
        { name: 'EventManager', check: () => typeof EventManager !== 'undefined' },
        { name: 'TimerManager', check: () => typeof TimerManager !== 'undefined' },

        // Core data systems
        { name: 'GameWorld', check: () => typeof GameWorld !== 'undefined' },
        { name: 'ItemDatabase', check: () => typeof ItemDatabase !== 'undefined' },
        { name: 'UnifiedItemSystem', check: () => typeof UnifiedItemSystem !== 'undefined' },

        // Game systems
        { name: 'TimeSystem', check: () => typeof TimeSystem !== 'undefined' },
        { name: 'TradingSystem', check: () => typeof TradingSystem !== 'undefined' },
        { name: 'TravelSystem', check: () => typeof TravelSystem !== 'undefined' },
        { name: 'QuestSystem', check: () => typeof QuestSystem !== 'undefined' },

        // UI systems
        { name: 'AchievementSystem', check: () => typeof AchievementSystem !== 'undefined' },
        { name: 'TooltipSystem', check: () => typeof TooltipSystem !== 'undefined' },
        { name: 'ModalSystem', check: () => typeof ModalSystem !== 'undefined' },

        // Late systems (panels, save)
        { name: 'SaveManager', check: () => typeof SaveManager !== 'undefined' },
        { name: 'SettingsPanel', check: () => typeof SettingsPanel !== 'undefined' },
        { name: 'GlobalLeaderboardSystem', check: () => typeof GlobalLeaderboardSystem !== 'undefined' },

        // Final check - game.js fully loaded
        { name: 'GameReady', check: () => typeof startNewGame === 'function' || typeof window.startNewGame === 'function' }
    ],

    // 📊 Status messages based on progress
    statusMessages: [
        { threshold: 0, title: 'Awakening the void...', status: 'Initializing...' },
        { threshold: 10, title: 'Loading core systems...', status: 'Loading configuration...' },
        { threshold: 20, title: 'Generating world...', status: 'Creating locations...' },
        { threshold: 35, title: 'Loading items...', status: 'Filling warehouses...' },
        { threshold: 50, title: 'Setting up markets...', status: 'Hiring merchants...' },
        { threshold: 65, title: 'Preparing quests...', status: 'Writing adventures...' },
        { threshold: 80, title: 'Almost there...', status: 'Final preparations...' },
        { threshold: 95, title: 'Ready to trade!', status: 'Welcome, merchant...' }
    ],

    // 📊 State
    progress: 0,
    isComplete: false,
    checkInterval: null,
    startTime: 0,
    maxWaitTime: 25000,  // 🖤 Max 25 seconds before force-completing

    // 🚀 Start monitoring loading progress
    init() {
        console.log('🖤 LoadingManager: Starting to watch the void fill up...');
        this.startTime = Date.now();
        this.progress = 0;
        this.updateUI(0);

        // 🖤 Check systems frequently for smooth progress
        this.checkInterval = setInterval(() => this.checkProgress(), 50);
    },

    // 📊 Check how many systems are loaded
    checkProgress() {
        let loaded = 0;

        for (let i = 0; i < this.systems.length; i++) {
            try {
                if (this.systems[i].check()) {
                    loaded++;
                }
            } catch (e) {
                // System check failed, not loaded yet
            }
        }

        // 🖤 Calculate progress percentage
        const newProgress = Math.round((loaded / this.systems.length) * 100);

        // 🖤 Only update if progress increased (never go backwards)
        if (newProgress > this.progress) {
            this.progress = newProgress;
            this.updateUI(this.progress);
        }

        // 💀 All systems loaded?
        if (loaded === this.systems.length && !this.isComplete) {
            this.progress = 100;
            this.updateUI(100);
            // 🖤 Brief pause at 100% so user sees it
            setTimeout(() => this.complete(), 600);
        }

        // 🖤 Timeout fallback
        const elapsed = Date.now() - this.startTime;
        if (elapsed > this.maxWaitTime && !this.isComplete) {
            console.warn(`🖤 LoadingManager: Timeout after ${elapsed}ms. Force-completing...`);
            this.progress = 100;
            this.updateUI(100);
            setTimeout(() => this.complete(), 300);
        }
    },

    // 🎨 Update the loading UI
    updateUI(progress) {
        const fill = document.getElementById('loading-progress-fill');
        const titleEl = document.getElementById('loading-title');
        const statusEl = document.getElementById('loading-status');

        // 🖤 Update progress bar (CSS transition handles smoothness)
        if (fill) {
            fill.style.width = progress + '%';
        }

        // 🖤 Find appropriate status message
        let message = this.statusMessages[0];
        for (let i = this.statusMessages.length - 1; i >= 0; i--) {
            if (progress >= this.statusMessages[i].threshold) {
                message = this.statusMessages[i];
                break;
            }
        }

        if (titleEl) titleEl.textContent = message.title;
        if (statusEl) statusEl.textContent = message.status;
    },

    // ✅ Loading complete - show the menu
    complete() {
        if (this.isComplete) return;
        this.isComplete = true;

        clearInterval(this.checkInterval);

        const elapsed = Date.now() - this.startTime;
        console.log(`🖤 LoadingManager: Everything loaded in ${elapsed}ms! Time to suffer in the medieval economy.`);

        // 🌙 Transition to menu
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const mainMenu = document.getElementById('main-menu');

            if (loadingScreen) loadingScreen.classList.add('hidden');
            if (mainMenu) mainMenu.classList.remove('hidden');

            // 🌦️ Start menu weather effects
            if (typeof MenuWeatherSystem !== 'undefined' && MenuWeatherSystem.init) {
                MenuWeatherSystem.init();
            }

            console.log('🖤 LoadingManager: Main menu revealed. Let the games begin.');
        }, 400);
    },

    // 🔧 Debug helper - check what's missing
    debugStatus() {
        console.log('🖤 LoadingManager Debug:');
        console.log(`  Progress: ${this.progress}%`);
        console.log(`  Elapsed: ${Date.now() - this.startTime}ms`);
        this.systems.forEach(sys => {
            let status = '❌';
            try {
                status = sys.check() ? '✅' : '❌';
            } catch (e) {
                status = '💥';
            }
            console.log(`  ${sys.name}: ${status}`);
        });
    }
};

// 🖤 Start loading check immediately
LoadingManager.init();

window.LoadingManager = LoadingManager;
console.log('🖤 LoadingManager loaded - watching scripts trickle in like my will to live');
