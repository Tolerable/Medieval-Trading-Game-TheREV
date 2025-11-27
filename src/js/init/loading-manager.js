// ═══════════════════════════════════════════════════════════════
// 🖤 LOADING MANAGER - watching the void slowly fill with code
// ═══════════════════════════════════════════════════════════════
// File Version: GameConfig.version.file
// conjured by Unity AI Lab - *yawns* another loading screen...
// ═══════════════════════════════════════════════════════════════

const LoadingManager = {
    // 📊 Systems to track - order matters for progress bar
    systems: [
        { name: 'GameConfig', check: () => typeof GameConfig !== 'undefined', label: 'Loading configuration...' },
        { name: 'GameWorld', check: () => typeof GameWorld !== 'undefined', label: 'Generating world...' },
        { name: 'ItemDatabase', check: () => typeof ItemDatabase !== 'undefined', label: 'Loading items...' },
        { name: 'TradingSystem', check: () => typeof TradingSystem !== 'undefined', label: 'Setting up markets...' },
        { name: 'QuestSystem', check: () => typeof QuestSystem !== 'undefined', label: 'Preparing quests...' },
        { name: 'AchievementSystem', check: () => typeof AchievementSystem !== 'undefined', label: 'Loading achievements...' },
        { name: 'TravelSystem', check: () => typeof TravelSystem !== 'undefined', label: 'Mapping routes...' },
        { name: 'SaveManager', check: () => typeof SaveManager !== 'undefined', label: 'Checking saves...' },
        { name: 'GameReady', check: () => typeof startNewGame === 'function' || typeof window.startNewGame === 'function', label: 'Finalizing...' }
    ],

    progress: 0,
    isComplete: false,
    checkInterval: null,
    startTime: 0,
    maxWaitTime: 15000, // 🖤 max 15 seconds before force-completing

    // 🚀 Start monitoring loading progress
    init() {
        console.log('🖤 LoadingManager: Starting to watch the void fill up...');
        this.startTime = Date.now();
        this.updateUI(0, 'Summoning medieval times...');
        this.checkInterval = setInterval(() => this.checkProgress(), 100);
    },

    // 📊 Check how many systems are loaded
    checkProgress() {
        let loaded = 0;
        let currentLabel = 'Loading...';
        let failedSystem = null;

        for (let i = 0; i < this.systems.length; i++) {
            const sys = this.systems[i];
            if (sys.check()) {
                loaded++;
            } else {
                currentLabel = sys.label;
                failedSystem = sys.name;
                break; // 🖤 stop at first unloaded system
            }
        }

        const progress = Math.round((loaded / this.systems.length) * 100);
        this.updateUI(progress, currentLabel);

        // 💀 All systems go?
        if (loaded === this.systems.length && !this.isComplete) {
            this.complete();
            return;
        }

        // 🖤 Timeout fallback - if we've waited too long, just proceed
        const elapsed = Date.now() - this.startTime;
        if (elapsed > this.maxWaitTime && !this.isComplete) {
            console.warn(`🖤 LoadingManager: Timeout after ${elapsed}ms. Stuck on: ${failedSystem}. Force-completing...`);
            this.complete();
        }
    },

    // 🎨 Update the loading UI
    updateUI(progress, status) {
        const fill = document.getElementById('loading-progress-fill');
        const statusEl = document.getElementById('loading-status');
        const titleEl = document.getElementById('loading-title');

        if (fill) fill.style.width = progress + '%';
        if (statusEl) statusEl.textContent = status;

        // 🖤 Fun loading messages based on progress
        if (titleEl) {
            if (progress < 25) titleEl.textContent = 'Awakening the void...';
            else if (progress < 50) titleEl.textContent = 'Summoning merchants...';
            else if (progress < 75) titleEl.textContent = 'Forging trade routes...';
            else if (progress < 100) titleEl.textContent = 'Almost there...';
            else titleEl.textContent = 'Ready to trade!';
        }

        this.progress = progress;
    },

    // ✅ Loading complete - show the menu
    complete() {
        this.isComplete = true;
        clearInterval(this.checkInterval);

        console.log('🖤 LoadingManager: Everything loaded! Time to suffer in the medieval economy.');
        this.updateUI(100, 'Welcome, merchant...');

        // 🌙 Small delay for dramatic effect, then show menu
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
            console.log('🖤 LoadingManager: window.startNewGame =', typeof window.startNewGame);
        }, 500);
    },

    // 🔧 Debug helper - check what's missing
    debugStatus() {
        console.log('🖤 LoadingManager Debug:');
        this.systems.forEach(sys => {
            console.log(`  ${sys.name}: ${sys.check() ? '✅' : '❌'}`);
        });
        console.log(`  window.startNewGame: ${typeof window.startNewGame}`);
    }
};

// 🖤 Start loading check immediately
LoadingManager.init();

window.LoadingManager = LoadingManager;
console.log('🖤 LoadingManager loaded - watching scripts trickle in like my will to live');
