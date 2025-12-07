# Medieval Trading Game - Systems Architecture Outline

## Version: 0.90.02 | Unity AI Lab
## Last Updated: 2025-12-06

---

## THE GOLDEN RULE

**`config.js` is the SINGLE SOURCE OF TRUTH for all game systems.**

Every system MUST read its configuration from `GameConfig`. Hardcoded values in individual system files are FORBIDDEN. If a value can be tweaked for balance, it belongs in config.js.

---

## SYSTEM CATEGORIES

### 1. CORE SYSTEMS (src/js/core/)

| System | File | Config Section | Status |
|--------|------|----------------|--------|
| Game State | game.js | `GameConfig.player` | PARTIAL |
| Time Machine | time-machine.js | `GameConfig.time` | COMPLETE |
| Config | config.js | N/A (IS the config) | COMPLETE |

### 2. PLAYER SYSTEMS

| System | File | Config Section | Status |
|--------|------|----------------|--------|
| Player Stats | game.js | `GameConfig.player.startingStats` | COMPLETE |
| Survival (Hunger/Thirst) | game.js | `GameConfig.survival` | COMPLETE |
| Health Regen | game.js | `GameConfig.survival.healthRegen` | COMPLETE |
| Character Creation | character-creation.js | `GameConfig.player.characterCreation` | COMPLETE |
| Perks | perk-system.js | `GameConfig.perkModifiers` | PARTIAL |

### 3. COMBAT SYSTEMS (src/js/systems/combat/)

| System | File | Config Section | Status |
|--------|------|----------------|--------|
| Combat System | combat-system.js | `GameConfig.combat` | NEEDS UPDATE |
| Combat Modal | combat-modal.js | `GameConfig.combat` | NEEDS UPDATE |
| NPC Combat Stats | npc-combat-stats.js | `GameConfig.combat.npcTiers` | MISSING |

**MISSING FROM CONFIG:**
```javascript
combat: {
    // ...existing...

    // NPC death/respawn system (ADDED 2025-12-06)
    npcDeath: {
        enabled: true,
        respawnTimeHours: 24,        // 24 game hours = 1440 minutes
        respawnTimeMinutes: 1440
    },

    // Reputation loss from combat
    reputationLoss: {
        outlaw: 5,      // Killing outlaws - minimal rep loss
        civilian: 20,   // Killing regular NPCs
        boss: 50,       // Killing bosses
        questTarget: 0  // No rep loss for quest targets
    },

    // Combat stat display
    showFinalStats: true,  // Show 0 health at end of combat

    // Death handling
    deathEnabled: true,    // Player can actually die (false = always 1 HP)
    deathDelay: 2000       // MS delay before game over triggers
}
```

### 4. TRAVEL SYSTEMS (src/js/systems/travel/)

| System | File | Config Section | Status |
|--------|------|----------------|--------|
| Travel System | travel-system.js | `GameConfig.travel` | MISSING |
| Travel Panel Map | travel-panel-map.js | `GameConfig.travel.map` | MISSING |
| Gatehouse System | gatehouse-system.js | `GameConfig.gatehouses` | MISSING |

**MISSING FROM CONFIG:**
```javascript
travel: {
    // Base travel settings
    enabled: true,
    baseSpeedMinutesPerUnit: 5,  // Minutes per map unit

    // Cancel/reroute
    allowCancelTravel: true,
    allowRerouteTravel: true,

    // Map rendering
    map: {
        showUndiscoveredAsQuestionMarks: true,
        showGatehouseNamesWhenDiscovered: true,  // ADDED 2025-12-06
        labelFontSize: 12,
        areaLabelFontSize: 24
    }
},

gatehouses: {
    enabled: true,
    fees: {
        northern_outpost: 10000,
        western_watch: 50000,
        jade_harbor: 100000
    },
    zones: {
        northern: 'northern_outpost',
        western: 'western_watch',
        eastern: 'jade_harbor'
    }
}
```

### 5. WORLD SYSTEMS (src/js/systems/world/)

| System | File | Config Section | Status |
|--------|------|----------------|--------|
| City Reputation | city-reputation-system.js | `GameConfig.reputation.city` | MISSING |
| City Events | city-event-system.js | `GameConfig.events.city` | MISSING |
| Weather System | weather-system.js | `GameConfig.weather` | MISSING |

**MISSING FROM CONFIG:**
```javascript
reputation: {
    city: {
        enabled: true,
        levels: {
            HOSTILE: { min: -100, max: -50 },
            UNTRUSTED: { min: -49, max: -20 },
            SUSPICIOUS: { min: -19, max: -1 },
            NEUTRAL: { min: 0, max: 19 },
            FRIENDLY: { min: 20, max: 49 },
            TRUSTED: { min: 50, max: 79 },
            ELITE: { min: 80, max: 100 }
        },
        priceModifiers: {
            HOSTILE: 1.2,
            UNTRUSTED: 1.1,
            SUSPICIOUS: 1.05,
            NEUTRAL: 1.0,
            FRIENDLY: 0.95,
            TRUSTED: 0.9,
            ELITE: 0.8
        }
    },
    npc: {
        // NPC-specific reputation settings
        tradeUnlockThresholds: {
            alwaysTrade: 0,      // merchant, innkeeper, etc
            lowRep: 10,         // blacksmith, apothecary, etc
            mediumRep: 25,      // jeweler, banker, etc
            highRep: 50         // noble
        }
    }
}
```

### 6. PROGRESSION SYSTEMS (src/js/systems/progression/)

| System | File | Config Section | Status |
|--------|------|----------------|--------|
| Quest System | quest-system.js | `GameConfig.quests` | MISSING |
| Main Quests | main-quests.js | `GameConfig.quests.main` | MISSING |
| Achievement System | achievement-system.js | `GameConfig.achievements` | PARTIAL |

**MISSING FROM CONFIG:**
```javascript
quests: {
    enabled: true,
    maxActiveQuests: 5,
    questMarkers: {
        available: '!',
        inProgress: '?',
        complete: '!'
    }
}
```

### 7. NPC SYSTEMS (src/js/npc/)

| System | File | Config Section | Status |
|--------|------|----------------|--------|
| NPC Relationship | npc-relationship-system.js | `GameConfig.npc.relationships` | MISSING |
| NPC Persona Database | npc-persona-database.js | `GameConfig.npc.personas` | MISSING |
| NPC Trade Window | npc-trade-window.js | `GameConfig.npc.trading` | MISSING |

**MISSING FROM CONFIG:**
```javascript
npc: {
    relationships: {
        enabled: true,
        startingReputation: 0,
        maxReputation: 100,
        minReputation: -100,
        reputationDecayEnabled: false,
        reputationDecayPerDay: 1
    },
    trading: {
        enabled: true,
        showTradePreview: true,
        refreshInventoryOnVisit: true
    },
    death: {
        enabled: true,                    // ADDED 2025-12-06
        respawnTimeGameHours: 24,         // 24 game hours
        respawnTimeGameMinutes: 1440,     // 1440 game minutes
        removeFromPanelWhenDead: true
    }
}
```

### 8. UI SYSTEMS (src/js/ui/)

| System | File | Config Section | Status |
|--------|------|----------------|--------|
| People Panel | people-panel.js | `GameConfig.ui.panels.people` | MISSING |
| Market Panel | market-panel.js | `GameConfig.ui.panels.market` | MISSING |
| Travel Panel | travel-panel.js | `GameConfig.ui.panels.travel` | MISSING |
| Tooltip System | tooltip-system.js | `GameConfig.ui.tooltips` | MISSING |

### 9. DATA SYSTEMS (src/js/data/)

| System | File | Config Section | Status |
|--------|------|----------------|--------|
| Game World | game-world.js | `GameConfig.world` | MISSING |
| Item Database | item-database.js | `GameConfig.items` | PARTIAL |

**MISSING FROM CONFIG:**
```javascript
world: {
    defaultStartingLocation: 'greendale',
    randomStartEnabled: true,
    starterZoneLocations: ['greendale', 'riverside_hamlet', 'sunhaven', 'kings_inn', 'royal_capital'],

    // NPC tracking (ADDED 2025-12-06)
    npcRespawnEnabled: true,
    npcRespawnTimeMinutes: 1440  // 24 game hours
}
```

---

## SYSTEMS ADDED IN LAST 48 HOURS

### 1. NPC Death/Respawn System (2025-12-06)
**Files:** game-world.js, combat-modal.js, people-panel.js
**Config needed:**
```javascript
GameConfig.npc.death = {
    enabled: true,
    respawnTimeGameMinutes: 1440,
    removeFromPanelWhenDead: true,
    reputationLossOnKill: {
        outlaw: 5,
        civilian: 20,
        boss: 50
    }
}
```

### 2. Dynamic Trade Lock System (2025-12-06)
**Files:** city-reputation-system.js, people-panel.js
**Config needed:**
```javascript
GameConfig.reputation.city.tradeAffected = true
GameConfig.reputation.npc.dynamicTradeUnlock = true
```

### 3. Combat Death System (2025-12-06)
**Files:** combat-system.js, combat-modal.js
**Config needed:**
```javascript
GameConfig.combat.playerDeathEnabled = true
GameConfig.combat.showFinalHealthStats = true
```

### 4. Gatehouse Payment System (2025-12-05)
**Files:** gatehouse-system.js, people-panel.js
**Config needed:**
```javascript
GameConfig.gatehouses = {
    enabled: true,
    fees: {...},
    zones: {...}
}
```

### 5. Gate Visibility from Capital (2025-12-05)
**Files:** game-world-renderer.js, travel-panel-map.js
**Config needed:**
```javascript
GameConfig.travel.map.revealGatesFromCapital = true
GameConfig.travel.map.showGatehouseNamesWhenDiscovered = true
```

### 6. Location ID/Name Swap (2025-12-06)
**Files:** game-world.js, gatehouse-system.js, main-quests.js (22 files total)
**Config needed:** N/A (data change, not config)

---

## HOW TO ADD A NEW SYSTEM

1. **Define config section in config.js FIRST**
2. Create the system file
3. System reads ALL values from `GameConfig.yourSection`
4. Add to this outline document
5. Test that config changes affect the system

---

## CONFIG.JS STRUCTURE OVERVIEW

```
GameConfig = {
    version: {},           // Version info
    debooger: {},          // Debug mode settings
    game: {},              // Game identity
    credits: {},           // Developer credits
    links: {},             // External links
    api: {},               // API endpoints (Pollinations, etc)
    ui: {},                // UI strings and settings
    storage: {},           // localStorage keys
    leaderboard: {},       // Global leaderboard
    defaults: {},          // Default values
    settings: {},          // User-adjustable settings
    player: {},            // Player starting values
    survival: {},          // Hunger/thirst/stamina
    market: {},            // Trading mechanics
    services: {},          // Inn, property costs
    combat: {},            // Combat mechanics
    items: {},             // Item definitions
    perkModifiers: {},     // Perk balance
    time: {},              // Game speed/time
    scoring: {},           // Score calculation
    dungeon: {},           // Dungeon exploration
    apiCommands: {},       // NPC command system
    keybindings: {},       // Keyboard shortcuts
    cicd: {},              // CI/CD test config

    // === MISSING SECTIONS TO ADD ===
    travel: {},            // Travel system config
    gatehouses: {},        // Gatehouse system
    reputation: {},        // City & NPC reputation
    quests: {},            // Quest system
    npc: {},               // NPC systems
    world: {}              // World/location settings
}
```

---

## MAINTENANCE NOTES

- When adding features, CHECK THIS DOCUMENT FIRST
- If a system isn't listed, ADD IT before coding
- Config values should be descriptive with comments
- All hardcoded "magic numbers" belong in config.js
- This document is the map; config.js is the territory

---

*Document created by Unity. config.js is the gate to all truth.*
