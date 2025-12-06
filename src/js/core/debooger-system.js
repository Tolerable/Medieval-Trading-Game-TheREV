// ═══════════════════════════════════════════════════════════════
// DEBOOGER SYSTEM - opt-in debugging for dark souls of code
// ═══════════════════════════════════════════════════════════════
// Version: 0.90.01 | Unity AI Lab
// Creators: Hackall360, Sponge, GFourteen
// www.unityailab.com | github.com/Unity-Lab-AI/Medieval-Trading-Game
// unityailabcontact@gmail.com
// ═══════════════════════════════════════════════════════════════
// disabled by default for performance, enable when you need to suffer

const DeboogerSystem = {
    enabled: false,  // NOW respects GameConfig - check on init
    maxEntries: 500, // prevent memory bloat like my todo list at 3am
    _initialized: false,
    _originalLog: null,
    _originalWarn: null,
    _originalError: null,

    // initialize Debooger system - NOW CHECKS CONFIG FIRST
    init() {
        // Check GameConfig.debooger.enabled FIRST - production builds stay locked
        var deboogerBtn = document.getElementById('toggle-debooger-console');
        var deboogerPanel = document.getElementById('debooger-console');

        if (typeof GameConfig !== 'undefined' && GameConfig.debooger && GameConfig.debooger.enabled === true) {
            this.enabled = true;
            this.setupConsoleCapture();
            // Show the button for developers
            if (deboogerBtn) deboogerBtn.style.display = 'block';
            console.log('🐛 Debooger system enabled - Super Hacker mode!');
        } else {
            this.enabled = false;
            // Hide the button and console panel for production
            if (deboogerBtn) deboogerBtn.style.display = 'none';
            if (deboogerPanel) deboogerPanel.style.display = 'none';
            console.log('🔒 Debooger system DISABLED by config');
        }
    },

    // Enable Debooger manually - BUT CONFIG IS STILL THE MASTER
    enable() {
        // Config override - if config says NO, manual enable is DENIED
        if (typeof GameConfig !== 'undefined' && GameConfig.debooger && GameConfig.debooger.enabled === false) {
            console.log('🔒 Cannot enable - GameConfig.debooger.enabled = false is ABSOLUTE');
            return;
        }
        this.enabled = true;
        this.setupConsoleCapture();
        console.log('🐛 Debooger system manually enabled');
    },

    // Disable Debooger
    disable() {
        this.enabled = false;
        if (this._originalLog) {
            console.log = this._originalLog;
            console.warn = this._originalWarn;
            console.error = this._originalError;
        }
        // Clear console content to free memory
        const contentEl = document.getElementById('debooger-console-content');
        if (contentEl) {
            contentEl.innerHTML = '';
        }
        console.log('🐛 Debooger system disabled');
    },

    // Setup console capture (only when enabled)
    setupConsoleCapture() {
        if (this._initialized) return;

        const deboogerConsoleContent = () => document.getElementById('debooger-console-content');

        const addToDeboogerConsole = (type, args) => {
            if (!this.enabled) return;
            const contentEl = deboogerConsoleContent();
            if (!contentEl) return;

            const timestamp = new Date().toLocaleTimeString();
            const colors = { log: '#0f0', warn: '#ff0', error: '#f00', info: '#0ff' };
            const color = colors[type] || '#0f0';
            const message = Array.from(args).map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');

            const entry = document.createElement('div');
            entry.style.color = color;
            entry.style.marginBottom = '3px';
            entry.innerHTML = `<span style="color: #666;">[${timestamp}]</span> ${message}`;
            contentEl.appendChild(entry);
            contentEl.scrollTop = contentEl.scrollHeight;

            while (contentEl.children.length > this.maxEntries) {
                contentEl.removeChild(contentEl.firstChild);
            }
        };

        // Store originals for restoration
        this._originalLog = console.log;
        this._originalWarn = console.warn;
        this._originalError = console.error;

        console.log = (...args) => { this._originalLog.apply(console, args); addToDeboogerConsole('log', args); };
        console.warn = (...args) => { this._originalWarn.apply(console, args); addToDeboogerConsole('warn', args); };
        console.error = (...args) => { this._originalError.apply(console, args); addToDeboogerConsole('error', args); };

        this._initialized = true;
    }
};

// expose to global scope
window.DeboogerSystem = DeboogerSystem;

// ONLY auto-init if debooger is enabled in config
if (typeof GameConfig !== 'undefined' && GameConfig.debooger && GameConfig.debooger.enabled === true) {
    // AUTO-INIT - Debooger system initializes itself on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            DeboogerSystem.init();
        });
    } else {
        // DOM already loaded, init now
        DeboogerSystem.init();
    }
    console.log('🐛 Debooger System loaded!');
} else {
    console.log('🔒 Debooger System DISABLED by config - not initializing');
}
