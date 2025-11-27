# 🖤 REFACTOR TODO - Medieval Trading Game v0.5 🖤
## *"From chaos, we forge order... from spaghetti, we weave silk"* - Unity

---

## 📊 CURRENT STATE ANALYSIS

### The Grim Statistics 💀
- **Total JS Files:** 73 files
- **Total JS Lines:** ~75,000+ lines
- **Total CSS Files:** 4 files
- **Total CSS Lines:** ~13,429 lines
- **HTML Files:** 3 files
- **Script Load Order Dependencies:** 50+ fragile links

### The Worst Offenders ⚰️
| File | Lines | Crime Against Humanity |
|------|-------|----------------------|
| `property-system.js` | 32,286 | MASSIVE MONOLITH - property management god class |
| `unified-item-system.js` | 28,761 | Data dump masquerading as a system |
| `game.js` | 9,985 | 20+ responsibilities in one file |
| `styles.css` | 8,780 | CSS soup with 15-18% dead code |
| `travel-system.js` | 3,389 | Core travel logic buried in rendering |
| `quest-system.js` | 3,000+ | Quest logic + UI + data all tangled |

---

## 🔥 CRITICAL SECURITY FIXES (DO FIRST)

### 1. Exposed API Credentials in config.js
**Location:** `src/js/config.js` lines ~800-850
**Problem:** JSONBin API key and Bin ID exposed in plain text
**Fix:**
```javascript
// 💀 BEFORE (exposed to the void):
jsonbin: {
    binId: 'ACTUAL_BIN_ID',
    apiKey: 'ACTUAL_API_KEY'
}

// 🖤 AFTER (shrouded in darkness):
jsonbin: {
    binId: window.ENV?.JSONBIN_ID || null,
    apiKey: window.ENV?.JSONBIN_KEY || null
}
```
**Action:** Create `.env` file (gitignored) and environment variable loader

---

## 🏗️ PROPOSED NEW FILE STRUCTURE

```
src/
├── js/
│   ├── core/                          # 🖤 The Heart of Darkness
│   │   ├── game-engine.js             # Game loop, state transitions
│   │   ├── game-state.js              # GameState object ONLY
│   │   ├── game-world.js              # GameWorld data structure
│   │   ├── config.js                  # Config (sanitized)
│   │   ├── constants.js               # Magic numbers → named constants
│   │   └── event-manager.js           # Central event bus
│   │
│   ├── systems/                       # 🦇 The Functional Organs
│   │   ├── player/
│   │   │   ├── player-manager.js      # Player state, stats, progression
│   │   │   ├── inventory-manager.js   # Consolidated inventory logic
│   │   │   ├── equipment-manager.js   # Equipment slots, bonuses
│   │   │   └── skill-manager.js       # Skill trees, XP
│   │   │
│   │   ├── economy/
│   │   │   ├── trading-manager.js     # Buy/sell logic (COMPLETE IT)
│   │   │   ├── market-manager.js      # Dynamic pricing
│   │   │   ├── merchant-ranks.js      # Rank progression
│   │   │   ├── crafting-manager.js    # Crafting logic (ADD ACTUAL CRAFTING)
│   │   │   └── trade-routes.js        # Route profit calculations (COMPLETE IT)
│   │   │
│   │   ├── property/
│   │   │   ├── property-manager.js    # Core property logic (SPLIT FROM 32K MONOLITH)
│   │   │   ├── property-upgrades.js   # Upgrade trees
│   │   │   ├── property-production.js # Production calculations
│   │   │   └── employee-manager.js    # Employee hiring/management
│   │   │
│   │   ├── npc/
│   │   │   ├── npc-manager.js         # Central NPC coordination
│   │   │   ├── npc-dialogue.js        # Dialogue generation (Pollinations AI)
│   │   │   ├── npc-voice.js           # TTS/voice synthesis
│   │   │   ├── npc-relationships.js   # Reputation per NPC
│   │   │   ├── npc-encounters.js      # Random encounter logic
│   │   │   └── npc-merchants.js       # Merchant-specific behaviors
│   │   │
│   │   ├── world/
│   │   │   ├── travel-manager.js      # Travel logic ONLY (no rendering)
│   │   │   ├── pathfinding.js         # A* or Dijkstra (extracted)
│   │   │   ├── location-manager.js    # Location data, discovery
│   │   │   ├── dungeon-manager.js     # Dungeon exploration (ADD ACTUAL LOGIC)
│   │   │   └── weather-system.js      # Weather effects (if exists)
│   │   │
│   │   ├── progression/
│   │   │   ├── quest-manager.js       # Quest logic ONLY
│   │   │   ├── quest-data.js          # Quest definitions (data file)
│   │   │   ├── achievement-manager.js # Achievement tracking
│   │   │   └── achievement-data.js    # Achievement definitions (data file)
│   │   │
│   │   └── combat/
│   │       ├── combat-manager.js      # Combat logic (if exists)
│   │       └── encounter-resolver.js  # Combat resolution
│   │
│   ├── data/                          # 🗡️ Pure Data (No Logic)
│   │   ├── items/
│   │   │   ├── item-database.js       # Item definitions
│   │   │   ├── weapon-data.js         # Weapon stats
│   │   │   ├── armor-data.js          # Armor stats
│   │   │   └── consumable-data.js     # Potions, food
│   │   │
│   │   ├── world/
│   │   │   ├── location-data.js       # Location definitions
│   │   │   ├── npc-data.js            # NPC definitions
│   │   │   └── loot-tables.js         # Drop rates (from dungeon system)
│   │   │
│   │   └── progression/
│   │       ├── skill-trees.js         # Skill definitions
│   │       ├── rank-data.js           # Merchant rank requirements
│   │       └── recipe-data.js         # Crafting recipes
│   │
│   ├── ui/                            # 🌙 The Visual Darkness
│   │   ├── components/
│   │   │   ├── panel-manager.js       # Panel show/hide coordination
│   │   │   ├── modal-manager.js       # Modal dialogs
│   │   │   ├── tooltip-manager.js     # Tooltips
│   │   │   └── notification-manager.js # Toast notifications
│   │   │
│   │   ├── panels/
│   │   │   ├── inventory-panel.js     # Inventory UI
│   │   │   ├── equipment-panel.js     # Equipment UI
│   │   │   ├── quest-panel.js         # Quest log UI
│   │   │   ├── achievement-panel.js   # Achievement UI
│   │   │   ├── settings-panel.js      # Settings UI
│   │   │   ├── property-panel.js      # Property management UI
│   │   │   └── leaderboard-panel.js   # Global leaderboard UI
│   │   │
│   │   ├── npc-ui/
│   │   │   ├── npc-chat-panel.js      # Chat interface
│   │   │   ├── npc-trade-panel.js     # Trade interface
│   │   │   └── npc-portrait.js        # Portrait/avatar display
│   │   │
│   │   ├── map/
│   │   │   ├── map-renderer.js        # UNIFIED map rendering (merge duplicates)
│   │   │   ├── minimap-renderer.js    # Minimap (extends base)
│   │   │   └── map-markers.js         # Location markers, paths
│   │   │
│   │   └── hud/
│   │       ├── stats-display.js       # Player stats HUD
│   │       ├── resource-bar.js        # Gold, HP, etc.
│   │       └── action-bar.js          # Quick actions
│   │
│   ├── persistence/                   # 🕯️ Save the Souls
│   │   ├── save-manager.js            # UNIFIED save/load (merge 3 duplicates!)
│   │   ├── save-slots.js              # Multi-slot management
│   │   ├── compression.js             # Unicode compression
│   │   ├── migration.js               # Save version migration
│   │   └── cloud-sync.js              # GitHub Gist sync
│   │
│   ├── audio/                         # 🔮 Sounds of the Abyss
│   │   ├── audio-manager.js           # Central audio coordination
│   │   ├── sound-effects.js           # SFX playback
│   │   ├── music-manager.js           # Background music
│   │   └── voice-synthesis.js         # Web Audio API TTS
│   │
│   ├── utils/                         # ⚰️ Dark Utilities
│   │   ├── helpers.js                 # General helpers
│   │   ├── validators.js              # Input validation
│   │   ├── formatters.js              # Number/text formatting
│   │   ├── random.js                  # RNG utilities
│   │   └── dom-utils.js               # DOM manipulation helpers
│   │
│   ├── debug/                         # 🩸 Developer Blood Magic
│   │   ├── debug-console.js           # Debug commands
│   │   ├── debug-overlay.js           # Visual debug info
│   │   └── performance-monitor.js     # FPS, memory tracking
│   │
│   └── init/                          # 💀 Birth of the Game
│       ├── bootstrap.js               # Initial load sequence
│       ├── dependency-loader.js       # Module load order
│       └── feature-detection.js       # Browser capability checks
│
├── css/
│   ├── base/
│   │   ├── reset.css                  # CSS reset
│   │   ├── variables.css              # CSS custom properties
│   │   └── typography.css             # Font styles
│   │
│   ├── components/
│   │   ├── buttons.css                # Button styles
│   │   ├── panels.css                 # Panel containers
│   │   ├── modals.css                 # Modal dialogs
│   │   ├── forms.css                  # Form elements
│   │   └── tooltips.css               # Tooltip styles
│   │
│   ├── systems/
│   │   ├── inventory.css              # Inventory panel
│   │   ├── npc.css                    # NPC interactions
│   │   ├── map.css                    # Map display
│   │   ├── trading.css                # Trade interfaces
│   │   └── property.css               # Property management
│   │
│   ├── themes/
│   │   ├── default.css                # Default dark theme
│   │   ├── high-contrast.css          # Accessibility
│   │   └── colorblind.css             # Colorblind modes
│   │
│   └── main.css                       # Import orchestrator
│
└── assets/
    ├── images/
    ├── sounds/
    └── fonts/
```

---

## 🔧 REFACTORING PHASES

### PHASE 1: Critical Fixes (Security & Performance) 💀
**Priority: HIGHEST | Estimated Effort: HIGH**

#### 1.1 Remove Global Console Capture
**Location:** `game.js` lines 14-194
**Problem:** Capturing ALL console output kills performance
**Fix:** Remove entirely or make opt-in for debug mode only
```javascript
// 💀 DELETE THIS MONSTROSITY:
(function() {
    const originalConsole = { ...console };
    // ... 180 lines of performance murder
})();
```

#### 1.2 Remove Global Click Handler
**Location:** `game.js` lines 64-167
**Problem:** Every single click goes through this handler
**Fix:** Use event delegation on specific containers only
```javascript
// 🖤 BEFORE (catching everything):
document.addEventListener('click', handleGlobalClick);

// 🖤 AFTER (surgical precision):
document.getElementById('game-container').addEventListener('click', handleGameClick);
```

#### 1.3 Fix Memory Leaks
**Locations:**
- `npc-voice-chat-system.js` - Audio contexts not cleaned up
- `ui-enhancements.js` - Animation frames not cancelled
- Various event listeners never removed

**Fix:** Implement proper cleanup:
```javascript
class VoiceSystem {
    destroy() {
        this.audioContext?.close();
        this.pendingRequests.forEach(r => r.abort());
        this.eventListeners.forEach(([el, type, fn]) => el.removeEventListener(type, fn));
    }
}
```

---

### PHASE 2: Merge Duplicate Code 🦇
**Priority: HIGH | Estimated Effort: MEDIUM**

#### 2.1 Unify Save/Load Systems (60% code duplication!)
**Files to merge:**
- `save-load-system.js` (1,890 lines) - Core logic
- `save-load-ui.js` (557 lines) - Duplicate UI
- `save-ui-system.js` (1,723 lines) - Another duplicate UI

**Target:** Single `persistence/save-manager.js` (~1,500 lines)

#### 2.2 Unify Map Rendering (30% code duplication!)
**Files to merge:**
- `travel-panel-map.js` (1,807 lines) - Mini-map
- `game-world-renderer.js` (2,015 lines) - Main map

**Target:**
- `ui/map/map-renderer.js` - Base rendering class (~800 lines)
- `ui/map/minimap-renderer.js` - Extends base (~400 lines)

#### 2.3 Consolidate NPC Systems (overlapping responsibilities)
**Files to consolidate:**
- `npc-dialogue-system.js`
- `npc-voice-chat-system.js`
- `npc-workflow-system.js`
- `npc-chat-ui.js`
- `npc-trade-window.js`

**Target:** Clear separation of concerns:
- Logic files in `systems/npc/`
- UI files in `ui/npc-ui/`

---

### PHASE 3: Split Monoliths 🗡️
**Priority: HIGH | Estimated Effort: HIGH**

#### 3.1 Split game.js (9,985 lines → ~5 files)
**Extract to:**
- `core/game-engine.js` - Game loop, initialization
- `core/game-state.js` - GameState object
- `core/game-world.js` - GameWorld structure
- `ui/hud/stats-display.js` - UI updates
- `utils/helpers.js` - Utility functions

#### 3.2 Split property-system.js (32,286 lines → ~4 files)
**Extract to:**
- `systems/property/property-manager.js` - Core logic
- `systems/property/property-upgrades.js` - Upgrade system
- `systems/property/property-production.js` - Production
- `ui/panels/property-panel.js` - UI components

#### 3.3 Split unified-item-system.js (28,761 lines → data files)
**Extract to:**
- `data/items/item-database.js` - Base items
- `data/items/weapon-data.js` - Weapons
- `data/items/armor-data.js` - Armor
- `data/items/consumable-data.js` - Consumables
- `data/items/material-data.js` - Crafting materials

#### 3.4 Split ui-enhancements.js (1,570 lines - GOD CLASS)
**Extract to:**
- `ui/components/tooltip-manager.js`
- `ui/components/notification-manager.js`
- `ui/components/animation-controller.js`
- `utils/dom-utils.js`

---

### PHASE 4: Complete Placeholder/Incomplete Features 🌙
**Priority: MEDIUM | Estimated Effort: HIGH**

#### 4.1 Trading System - INCOMPLETE
**Location:** `trading-system.js` (397 lines)
**Missing:**
- [ ] Bulk trading UI
- [ ] Price negotiation
- [ ] Trade history
- [ ] Favorite items
- [ ] Quick-sell functionality

#### 4.2 Crafting System - RECIPES ONLY, NO LOGIC
**Location:** `crafting-economy-system.js` (855 lines)
**Missing:**
- [ ] Actual crafting function
- [ ] Crafting UI panel
- [ ] Material gathering integration
- [ ] Recipe discovery system
- [ ] Crafting skill progression
- [ ] Quality tiers based on skill

#### 4.3 Dungeon System - LOOT TABLES ONLY
**Location:** `dungeon-exploration-system.js` (2,796 lines)
**Missing:**
- [ ] Dungeon generation logic
- [ ] Room-by-room exploration
- [ ] Combat encounters
- [ ] Trap mechanics
- [ ] Boss fights
- [ ] Dungeon completion rewards
- [ ] Dungeon UI panel

#### 4.4 Trade Routes - INCOMPLETE
**Location:** `trade-route-system.js` (389 lines)
**Missing:**
- [ ] Route creation UI
- [ ] Profit calculations
- [ ] Risk assessment
- [ ] Guard hiring for routes
- [ ] Route automation
- [ ] Route discovery

#### 4.5 Inventory System - INCOMPLETE
**Location:** `inventory-system.js` (263 lines)
**Missing:**
- [ ] Sort functionality (UI exists, logic missing)
- [ ] Filter functionality (UI exists, logic missing)
- [ ] Search functionality
- [ ] Stack splitting
- [ ] Item comparison
- [ ] Quick-equip

#### 4.6 Skill System - PLACEHOLDERS
**Missing:**
- [ ] Skill tree UI
- [ ] Skill point allocation
- [ ] Skill effects implementation
- [ ] Passive skill bonuses
- [ ] Active skill abilities

---

### PHASE 5: CSS Cleanup 🔮
**Priority: MEDIUM | Estimated Effort: MEDIUM**

#### 5.1 Remove Dead CSS (~2,000-2,400 lines)
**Files affected:** All CSS files
**Action:** Audit with coverage tools, remove unused selectors

#### 5.2 Consolidate Duplicate Styles (~1,600-2,000 lines)
**Problem areas:**
- Button styles defined 4+ times
- Panel styles duplicated across files
- Color values hardcoded instead of variables

#### 5.3 Implement CSS Variables Properly
```css
/* 🖤 Create variables.css: */
:root {
    /* Colors */
    --color-primary: #4a90d9;
    --color-secondary: #2c5282;
    --color-accent: #00ffff;
    --color-danger: #ff4444;
    --color-success: #44ff44;
    --color-warning: #ffaa00;

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* Typography */
    --font-family-primary: 'MedievalSharp', serif;
    --font-family-mono: 'Courier New', monospace;

    /* Borders */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-glow: 0 0 10px var(--color-accent);
}
```

---

### PHASE 6: Performance Optimizations 🩸
**Priority: MEDIUM | Estimated Effort: MEDIUM**

#### 6.1 Implement Object Pooling
**For:**
- DOM elements (inventory slots, map markers)
- Audio sources
- Particle effects

#### 6.2 Add Request Debouncing
**For:**
- NPC dialogue requests
- Leaderboard updates
- Auto-save triggers

#### 6.3 Implement Lazy Loading
**For:**
- Sound effects (load on first use)
- Large data files
- Non-critical UI panels

#### 6.4 Add Virtual Scrolling
**For:**
- Inventory with 100+ items
- Quest log
- Achievement list
- Leaderboard

---

### PHASE 7: Architecture Improvements ⚰️
**Priority: LOW | Estimated Effort: HIGH**

#### 7.1 Implement Dependency Injection
```javascript
// 🖤 Create service container:
class ServiceContainer {
    constructor() {
        this.services = new Map();
    }

    register(name, factory) {
        this.services.set(name, { factory, instance: null });
    }

    get(name) {
        const service = this.services.get(name);
        if (!service.instance) {
            service.instance = service.factory(this);
        }
        return service.instance;
    }
}

// Usage:
container.register('trading', (c) => new TradingManager(c.get('inventory'), c.get('economy')));
```

#### 7.2 Implement State Management
```javascript
// 🖤 Central state store:
class GameStore {
    constructor() {
        this.state = {};
        this.subscribers = new Map();
    }

    subscribe(path, callback) {
        if (!this.subscribers.has(path)) {
            this.subscribers.set(path, new Set());
        }
        this.subscribers.get(path).add(callback);
        return () => this.subscribers.get(path).delete(callback);
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.notify(action.path);
    }
}
```

#### 7.3 Add Module System
```javascript
// 🖤 bootstrap.js - Proper initialization order:
const LOAD_ORDER = [
    // Core (no dependencies)
    'core/constants',
    'core/event-manager',
    'core/config',

    // Data (depends on core)
    'data/items/item-database',
    'data/world/location-data',

    // Systems (depends on data)
    'systems/player/player-manager',
    'systems/economy/trading-manager',

    // UI (depends on systems)
    'ui/panels/inventory-panel',

    // Init (depends on everything)
    'init/game-start'
];
```

---

## 📋 INCOMPLETE FEATURES CHECKLIST

### Must Complete for "100% Working" 🖤

- [ ] **Crafting System** - Currently recipe-only, no actual crafting
- [ ] **Dungeon Exploration** - Loot tables exist, no exploration logic
- [ ] **Trade Routes** - Incomplete profit/risk calculations
- [ ] **Inventory Sort/Filter** - UI exists, logic missing
- [ ] **Skill System** - Placeholders, no implementation
- [ ] **Combat System** - Encounters exist, resolution missing
- [ ] **Weather Effects** - Referenced but not implemented
- [ ] **Day/Night Cycle** - Time exists, no visual changes
- [ ] **NPC Schedules** - NPCs don't move or have routines
- [ ] **Faction System** - Referenced, not implemented
- [ ] **Reputation Consequences** - Tracked but doesn't affect gameplay
- [ ] **Property Automation** - Basic only, needs expansion
- [ ] **Mount System** - Referenced in travel, not implemented
- [ ] **Ship Trading** - Port locations exist, no ship mechanics

---

## 🎯 REFACTORING ORDER OF OPERATIONS

```
Week 1: Security & Critical Performance
├── Remove exposed API credentials
├── Remove global console capture
├── Remove global click handler
└── Fix identified memory leaks

Week 2: Merge Duplicates
├── Unify save/load systems
├── Unify map renderers
└── Consolidate NPC UI files

Week 3-4: Split Monoliths
├── Split game.js
├── Split property-system.js
├── Split unified-item-system.js
└── Split ui-enhancements.js

Week 5-6: Complete Features
├── Implement crafting logic
├── Implement dungeon exploration
├── Complete trading system
└── Complete inventory sort/filter

Week 7: CSS Cleanup
├── Remove dead CSS
├── Consolidate duplicates
└── Implement CSS variables

Week 8: Performance & Polish
├── Add object pooling
├── Implement lazy loading
├── Add virtual scrolling
└── Final testing
```

---

## 🖤 THE DARK MANTRAS

> *"Every line of code is a soul trapped in silicon. Treat them with the respect they deserve."*

> *"Duplicate code is a ghost that haunts your codebase. Exorcise it."*

> *"A monolith is a mass grave of good intentions. Give each function its own tombstone."*

> *"Comments are love letters to your future self. Make them count."*

> *"The void doesn't care about your technical debt. But your users do."*

---

## Files Changed
- Created: `refactortodo.md` - This comprehensive refactoring plan

## Status: IN PROGRESS 🦇
*The darkness reveals all... now we must act upon its whispers.*

---
*Generated with dark devotion by Unity 🖤*
*"From the ashes of spaghetti code, a phoenix of clean architecture shall rise"*
