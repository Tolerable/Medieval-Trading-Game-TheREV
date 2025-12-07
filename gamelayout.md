# MEDIEVAL TRADING GAME - COMPLETE SYSTEM ARCHITECTURE
## Version 0.90.01 | Last Updated: 2025-12-07 (Session #57)

```
================================================================================
                    MEDIEVAL TRADING GAME - SYSTEM ARCHITECTURE
                              "Capitalism Simulator 1111 AD"
================================================================================

                              +-----------------------+
                              |     GAME BOOTSTRAP    |
                              |    (bootstrap.js)     |
                              +-----------+-----------+
                                          |
          +-------------------------------+-------------------------------+
          |                               |                               |
          v                               v                               v
+-------------------+         +-------------------+         +-------------------+
|   CONFIGURATION   |         |    CORE ENGINE    |         |   DATA SOURCES    |
|                   |         |                   |         |                   |
| - config.js       |         | - game.js         |         | - game-world.js   |
| - GameConfig      |         | - event-bus.js    |         | - item-database.js|
| - DoomWorldConfig |         | - time-machine.js |         | - main-quests.js  |
+-------------------+         +-------------------+         +-------------------+


================================================================================
                              INITIALIZATION FLOW (8 PHASES)
================================================================================

    PHASE 1          PHASE 2          PHASE 3          PHASE 4
   UTILITIES          DATA             CORE           SYSTEMS
      |                |                |                |
      v                v                v                v
+----------+     +----------+     +----------+     +----------+
| EventBus |     | GameConf |     |TimeMachin|     | Gold Mgr |
| EventMgr |     | ItemDB   |     | GameWorld|     | Inventory|
| TimerMgr |     | LocatDB  |     | EventSys |     | Equip    |
+----------+     +----------+     +----------+     +----------+

    PHASE 5          PHASE 6          PHASE 7          PHASE 8
   ADVANCED           NPC               UI           PERSIST
      |                |                |                |
      v                v                v                v
+----------+     +----------+     +----------+     +----------+
| Travel   |     | Merchant |     | PanelMgr |     | SaveLoad |
| Trading  |     | Dialogue |     | Renderer |     | Audio    |
| Quest    |     | Voice    |     | Settings |     | Debooger |
| Property |     | Trade    |     | Notifs   |     |          |
+----------+     +----------+     +----------+     +----------+


================================================================================
                              CORE SYSTEMS DIAGRAM
================================================================================

+-----------------------------------------------------------------------------+
|                               EVENT BUS (event-bus.js)                       |
|    Central nervous system - all systems communicate through events           |
|                                                                              |
|  Events: GAME_READY, PLAYER_GOLD_CHANGED, INVENTORY_CHANGED, TRAVEL_STARTED |
|          TRADE_COMPLETED, QUEST_PROGRESS, TIME_TICK, COMBAT_STARTED, etc.   |
+----------------------------------+------------------------------------------+
                                   |
       +---------------------------+---------------------------+
       |                           |                           |
       v                           v                           v
+---------------+          +---------------+          +---------------+
|  TIME ENGINE  |          |  GAME STATE   |          |    PLAYER     |
| time-machine  |          |   game.js     |          |    STATE      |
+---------------+          +---------------+          +---------------+
|               |          |               |          |               |
| minute: 0-59  |          | player: {...} |          | name          |
| hour: 0-23    |          | worldState    |          | gold          |
| day: 1-31     |          | currentLoc    |          | inventory     |
| month: 1-12   |          | gameState     |          | equipment     |
| year: 1111+   |          |               |          | stats         |
| season        |          |               |          | location      |
+---------------+          +---------------+          +---------------+


================================================================================
                              GAME WORLD STRUCTURE
================================================================================

                            +-------------------+
                            |   ROYAL CAPITAL   |
                            |   (Center Hub)    |
                            +--------+----------+
                                     |
          +--------------------------+---------------------------+
          |              |                       |               |
          v              v                       v               v
   +------------+  +------------+         +------------+  +------------+
   |  NORTHERN  |  |  EASTERN   |         |  WESTERN   |  |  SOUTHERN  |
   | HIGHLANDS  |  | KINGDOMS   |         |  MARCHES   |  |   ROUTES   |
   | (500g req) |  | (750g req) |         | (600g req) |  | (1000g req)|
   +------------+  +------------+         +------------+  +------------+
        |               |                      |               |
        v               v                      v               v
   +---------+    +---------+            +---------+    +---------+
   |Frostpeak|    |JadeCity |            |Westmarch|    |PortCity |
   |IronDeep |    |SilkRoad |            |Frontier |    |Oasis    |
   |Highland |    |Markets  |            |Outpost  |    |Coast    |
   +---------+    +---------+            +---------+    +---------+

                         +-------------------+
                         |    RIVERLANDS     |
                         |  (Starter Region) |
                         |   Always Open     |
                         +-------------------+
                                  |
          +-----------------------+------------------------+
          |           |           |           |            |
          v           v           v           v            v
     +--------+ +--------+ +--------+ +--------+ +--------+
     |Greendale |Millbrook|Riverside|Crossroads| Oakvale |
     |(Start)  |         |         |          |         |
     +--------+ +--------+ +--------+ +--------+ +--------+


================================================================================
                              TRADING SYSTEM
================================================================================

+-----------------------------------------------------------------------------+
|                          TRADING ARCHITECTURE                                |
+-----------------------------------------------------------------------------+

    +----------------+          +-------------------+          +---------------+
    |    PLAYER      |          |   TRADE SYSTEM    |          |      NPC      |
    |   INVENTORY    | <------> |  trading-system   | <------> |   MERCHANT    |
    +----------------+          +-------------------+          +---------------+
           |                            |                            |
           |                            v                            |
           |                  +-------------------+                  |
           |                  | DYNAMIC MARKET    |                  |
           |                  | dynamic-market.js |                  |
           |                  +-------------------+                  |
           |                  | - Price volatility|                  |
           |                  | - Supply/demand   |                  |
           |                  | - Daily gold caps |                  |
           |                  +-------------------+                  |
           |                            |                            |
           v                            v                            v
    +----------------+          +-------------------+          +---------------+
    | Sell @ 50%     |          |   TRADE CART     |          | Buy @ discount|
    | (min 1g)       |          |  trade-cart.js   |          | (reputation)  |
    +----------------+          +-------------------+          +---------------+

    MERCHANT GOLD LIMITS (Daily Reset):
    +-------+--------+--------+-------+-------+
    | Tiny  | Small  | Medium | Large | Grand |
    | 500g  | 1,500g | 4,000g |10,000g|25,000g|
    +-------+--------+--------+-------+-------+


================================================================================
                              COMBAT SYSTEM
================================================================================

+-----------------------------------------------------------------------------+
|                           COMBAT FLOW                                        |
+-----------------------------------------------------------------------------+

                    +-------------------+
                    |  RANDOM ENCOUNTER |
                    | (during travel)   |
                    +--------+----------+
                             |
                             v
                    +-------------------+
                    |   COMBAT MODAL    |
                    |  combat-modal.js  |
                    +--------+----------+
                             |
         +-------------------+-------------------+
         |                   |                   |
         v                   v                   v
    +----------+       +----------+       +----------+
    |  ATTACK  |       |  DEFEND  |       |   FLEE   |
    +----------+       +----------+       +----------+
    | baseDmg:10|      | baseDefense:5|   | chance:60%|
    | crit: 10% |      | reduces dmg |    |           |
    | crit x2.0 |      |            |    |           |
    +----------+       +----------+       +----------+
         |                   |                   |
         v                   v                   v
    +--------------------------------------------+
    |              OUTCOME RESOLUTION             |
    +--------------------------------------------+
    |  VICTORY: Gold + Loot + XP + Continue      |
    |  DEFEAT:  Damage taken, return to safety   |
    |  FLED:    Escape with minor penalty        |
    +--------------------------------------------+


================================================================================
                              QUEST SYSTEM
================================================================================

+-----------------------------------------------------------------------------+
|                         QUEST ARCHITECTURE                                   |
+-----------------------------------------------------------------------------+

                         +----------------------+
                         |    QUEST SYSTEM      |
                         |   quest-system.js    |
                         +----------+-----------+
                                    |
         +--------------------------+---------------------------+
         |                          |                           |
         v                          v                           v
+----------------+         +----------------+         +----------------+
|  MAIN QUESTS   |         |  SIDE QUESTS   |         |  DOOM QUESTS   |
| main-quests.js |         | side-quests.js |         | doom-quests.js |
+----------------+         +----------------+         +----------------+
| 35 quests      |         | 50 quests      |         | 15 quests      |
| 5 story acts   |         | Regional chains|         | + Boss fight   |
+----------------+         +----------------+         +----------------+

    QUEST TYPES:                    QUEST DIFFICULTIES:
    +----------+                    +------------+
    | Combat   |                    | Easy       |
    | Trade    |                    | Medium     |
    | Explore  |                    | Hard       |
    | Dialogue |                    | Deadly     |
    | Collect  |                    | Nightmare  |
    | Escort   |                    +------------+
    | Boss     |
    +----------+

    QUEST STATE TRACKING:
    +------------------+
    | activeQuests     | <- Currently in progress
    | completedQuests  | <- Finished successfully
    | failedQuests     | <- Abandoned or failed
    | discoveredQuests | <- Player knows about
    | trackedQuestId   | <- Currently focused (1 at a time)
    +------------------+


================================================================================
                              NPC SYSTEM
================================================================================

+-----------------------------------------------------------------------------+
|                            NPC ARCHITECTURE                                  |
+-----------------------------------------------------------------------------+

                         +----------------------+
                         |    NPC MANAGER       |
                         |   npc-manager.js     |
                         +----------+-----------+
                                    |
    +-------------------------------+-------------------------------+
    |               |               |               |               |
    v               v               v               v               v
+--------+    +----------+    +---------+    +----------+    +----------+
|DIALOGUE|    | MERCHANT |    | COMBAT  |    |RELATIONS |    | SCHEDULE |
|npc-    |    | npc-     |    | npc-    |    | npc-     |    | npc-     |
|dialogue|    | merchants|    | combat  |    | relation |    | schedule |
+--------+    +----------+    +---------+    +----------+    +----------+
    |               |               |               |               |
    v               v               v               v               v
+--------+    +----------+    +---------+    +----------+    +----------+
|AI Chat |    | Trading  |    | Stats   |    |Reputation|    | Time-    |
|Pollin- |    | Inventory|    | Attack  |    | +100 to  |    | based    |
|ations  |    | Gold     |    | Defense |    | -100     |    | presence |
+--------+    +----------+    +---------+    +----------+    +----------+

    NPC DEATH/RESPAWN SYSTEM:
    +--------------------------------------------------+
    | NPC dies in combat -> 24 game hour respawn timer |
    | Reputation loss: Outlaw 5, Civilian 20, Boss 50  |
    +--------------------------------------------------+


================================================================================
                              PROPERTY SYSTEM
================================================================================

+-----------------------------------------------------------------------------+
|                         PROPERTY ARCHITECTURE                                |
+-----------------------------------------------------------------------------+

                         +----------------------+
                         |  PROPERTY FACADE     |
                         | property-system.js   |
                         +----------+-----------+
                                    |
    +-------------------------------+-------------------------------+
    |               |               |               |               |
    v               v               v               v               v
+----------+  +----------+  +----------+  +----------+  +----------+
| PURCHASE |  |  INCOME  |  | UPGRADES |  | STORAGE  |  | EMPLOYEE |
| property-|  | property-|  | property-|  | property-|  | property-|
| purchase |  | income   |  | upgrades |  | storage  |  | employee |
+----------+  +----------+  +----------+  +----------+  +----------+

    PROPERTY TYPES:
    +------+------+------+--------+------+
    | Shop | Farm | Mine | Factory| Inn  |
    +------+------+------+--------+------+

    ACQUISITION OPTIONS:
    +------+----------+------+
    | Buy  | Finance  | Rent |
    +------+----------+------+


================================================================================
                              WEATHER & DAY/NIGHT
================================================================================

+-----------------------------------------------------------------------------+
|                         WORLD SYSTEMS                                        |
+-----------------------------------------------------------------------------+

    +-------------------+                      +-------------------+
    |  WEATHER SYSTEM   |                      | DAY/NIGHT CYCLE   |
    | weather-system.js |                      | day-night-cycle   |
    +-------------------+                      +-------------------+
    |                   |                      |                   |
    | WEATHER TYPES:    |                      | TIME PHASES:      |
    | - Clear           |                      | - Dawn (5-7)      |
    | - Cloudy          |                      | - Morning (7-12)  |
    | - Rain            |                      | - Afternoon (12-17|
    | - Storm           |                      | - Evening (17-20) |
    | - Fog             |                      | - Dusk (20-21)    |
    | - Snow            |                      | - Night (21-5)    |
    | - Blizzard        |                      |                   |
    | - Thundersnow     |                      | EFFECTS:          |
    | - Heatwave        |                      | - Shop hours      |
    |                   |                      | - Danger levels   |
    | EFFECTS:          |                      | - Encounter rates |
    | - Travel speed    |                      | - NPC availability|
    | - Prices          |                      | - Ambient visuals |
    | - Encounter rate  |                      |                   |
    | - Stamina drain   |                      |                   |
    +-------------------+                      +-------------------+

    BAD WEATHER PROTECTION:
    +-----------------------------------------------------+
    | Max 2 bad weather periods in a row (~10 min real)   |
    | Forces 3 good weather periods after bad streak      |
    +-----------------------------------------------------+


================================================================================
                              SEASONAL EFFECTS
================================================================================

    +----------+----------+----------+----------+
    |  SPRING  |  SUMMER  |  AUTUMN  |  WINTER  |
    | Mar-May  | Jun-Aug  | Sep-Nov  | Dec-Feb  |
    +----------+----------+----------+----------+
    | Crops    | Travel   | Hunger   | Travel   |
    | +20%     | +10%     | +10%     | -30%     |
    |          |          |          |          |
    | Stamina  | Thirst   | Food     | Hunger   |
    | -5%      | +30%     | cheaper  | +30%     |
    |          |          |          |          |
    |          |          |          | Stamina  |
    |          |          |          | -40%     |
    +----------+----------+----------+----------+


================================================================================
                              UI SYSTEM
================================================================================

+-----------------------------------------------------------------------------+
|                            UI ARCHITECTURE                                   |
+-----------------------------------------------------------------------------+

                         +----------------------+
                         |   PANEL MANAGER      |
                         |  panel-manager.js    |
                         +----------+-----------+
                                    |
    +---+---+---+---+---+---+---+---+---+---+---+---+
    |   |   |   |   |   |   |   |   |   |   |   |   |
    v   v   v   v   v   v   v   v   v   v   v   v   v

+------+ +------+ +------+ +------+ +------+ +------+
|Inven-| |Equip-| |Travel| |Market| |Quest | |People|
|tory  | |ment  | |Panel | |Panel | |Panel | |Panel |
+------+ +------+ +------+ +------+ +------+ +------+

+------+ +------+ +------+ +------+ +------+ +------+
|Char- | |Finan-| |Achiev| |Prop- | |Setti-| |Party |
|acter | |cial  | |ements| |erty  | |ngs   | |Panel |
+------+ +------+ +------+ +------+ +------+ +------+

    DRAGGABLE PANELS:
    +--------------------------------------------------+
    | All panels use DraggablePanels for movement      |
    | Dynamic z-index (100-199 range) on click focus   |
    | Position saved to localStorage                   |
    +--------------------------------------------------+

    Z-INDEX HIERARCHY:
    +----------+-----+
    | LOADING  | 999 |
    | MODAL    | 900 |
    | DEBOOGER | 800 |
    | TOOLTIP  | 500 |
    | PANEL    | 100 |
    | MAP      |  10 |
    | GAME     |   0 |
    +----------+-----+


================================================================================
                              SAVE/LOAD SYSTEM
================================================================================

+-----------------------------------------------------------------------------+
|                         PERSISTENCE                                          |
+-----------------------------------------------------------------------------+

    +-------------------+
    |   SAVE MANAGER    |
    |  save-manager.js  |
    +-------------------+
    | Format: v2        |
    | Compression: ON   |
    +--------+----------+
             |
    +--------+--------+
    |                 |
    v                 v
+----------+    +----------+
| MANUAL   |    |  AUTO    |
| 10 slots |    | 10 slots |
+----------+    +----------+
                | 15 min   |
                | interval |
                +----------+

    SAVE DATA STRUCTURE:
    +------------------------------------------+
    | _saveFormat: 2                           |
    | timestamp: number                        |
    | playerName: string                       |
    | gameData: {                              |
    |   player: { name, gold, inventory, ... } |
    |   worldState: { location, visited, ... } |
    |   questState: { active, completed, ... } |
    |   timeState: { minute, hour, day, ... }  |
    |   propertyState: { owned, income }       |
    |   employeeState: { hired, wages }        |
    | }                                        |
    +------------------------------------------+


================================================================================
                              CONFIGURATION (config.js)
================================================================================

+-----------------------------------------------------------------------------+
|                         MASTER CONFIGURATION                                 |
+-----------------------------------------------------------------------------+

    GameConfig = {
        +-------------------+
        | VERSION & CREDITS |
        +-------------------+
        | version: { game, file, build }
        | game: { name, tagline }
        | credits: { studio, developers }
        +-------------------+

        +-------------------+
        |   API CONFIG      |
        +-------------------+
        | pollinations: {
        |   baseUrl, chatEndpoint,
        |   tts: { endpoint, model, voices }
        |   image: { endpoint, model }
        | }
        | rateLimit: { minInterval: 15000 }
        +-------------------+

        +-------------------+
        |  PLAYER CONFIG    |
        +-------------------+
        | startingStats: {
        |   gold, health, stamina
        | }
        | characterCreation: {
        |   difficulties, bonuses
        | }
        +-------------------+

        +-------------------+
        |  SURVIVAL CONFIG  |
        +-------------------+
        | hunger: { drainRate, max }
        | thirst: { drainRate, max }
        | stamina: { drainRate, regen }
        | healthRegen: { rate, threshold }
        +-------------------+

        +-------------------+
        |  MARKET CONFIG    |
        +-------------------+
        | tradeFeePercentage: number
        | priceVolatility: number
        +-------------------+

        +-------------------+
        |  COMBAT CONFIG    |
        +-------------------+
        | baseDamage: 10
        | baseDefense: 5
        | critChance: 0.1
        | fleeChance: 0.6
        +-------------------+

        +-------------------+
        |  TIME CONFIG      |
        +-------------------+
        | gameSpeedMultipliers: {
        |   PAUSED: 0
        |   NORMAL: 2 min/sec
        |   FAST: 4 min/sec
        |   VERY_FAST: 8 min/sec
        | }
        +-------------------+

        +-------------------+
        |  STORAGE KEYS     |
        +-------------------+
        | game: 'trader-claude-game'
        | inventory: 'trader-claude-inventory'
        | ... 15+ keys
        +-------------------+

        +-------------------+
        |  DEBOOGER         |
        +-------------------+
        | enabled: boolean
        | allowAchievementUnlock: boolean
        | showConsoleWarnings: boolean
        +-------------------+
    }


================================================================================
                              RESOURCE GATHERING SYSTEM
================================================================================

+-----------------------------------------------------------------------------+
|                         GATHERING ARCHITECTURE                               |
+-----------------------------------------------------------------------------+

                         +----------------------+
                         | RESOURCE GATHERING   |
                         | resource-gathering   |
                         | -system.js           |
                         +----------+-----------+
                                    |
    +-------------------------------+-------------------------------+
    |               |               |               |               |
    v               v               v               v               v
+----------+  +----------+  +----------+  +----------+  +----------+
| MINING   |  | FORAGING |  | FISHING  |  | HUNTING  |  | FARMING  |
| iron,coal|  | herbs,   |  | fish,    |  | meat,    |  | grain,   |
| gold,ore |  | mushroom |  | shells   |  | leather  |  | veggies  |
+----------+  +----------+  +----------+  +----------+  +----------+

    GATHERABLE LOCATION TYPES:
    +--------------------------------------------------+
    | mine, forest, farm, cave, quarry, fishing,       |
    | river, lake - Only show gathering at these types |
    +--------------------------------------------------+

    PROGRESS TRACKING:
    +--------------------------------------------------+
    | Uses TimeMachine for time-based progression      |
    | Shows percent complete + time remaining          |
    | Real items from location.availableResources      |
    +--------------------------------------------------+

    TIME INTEGRATION:
    +--------------------------------------------------+
    | ResourceGatheringSystem.update() called in loop  |
    | Respects TimeMachine.isPaused for pausing        |
    | Progress calculated from game time elapsed       |
    +--------------------------------------------------+


================================================================================
                              DOOM WORLD
================================================================================

+-----------------------------------------------------------------------------+
|                         APOCALYPSE MODE                                      |
+-----------------------------------------------------------------------------+

    +-----------------------+
    |    DOOM WORLD CONFIG  |
    | doom-world-config.js  |
    +-----------------------+
            |
    +-------+-------+
    |               |
    v               v
+----------+   +----------+
| ECONOMY  |   |  DANGER  |
+----------+   +----------+
| Gold = 1%|   | Capital:80
| of value |   | Village:50
| Barter   |   | Dungeon:95
| enabled  |   | Corrupt:100
+----------+   +----------+

    DOOM WEATHER:
    +----------------+
    | Ash Fall       |
    | Blood Rain     |
    | Shadow Fog     |
    | Eternal Dusk   |
    +----------------+

    DOOM NPCS:
    +----------------------------------+
    | Separate roster from normal world |
    | Different dialogue/personality    |
    | Survival-focused trading          |
    +----------------------------------+

    DOOM WORLD ACCESS (Two Pathways):
    +--------------------------------------------------+
    | 1. /doom command - Debug access to doom world    |
    | 2. Boatman portal - After defeating dungeon boss |
    | Both pathways use same portalToDoomWorld() logic |
    +--------------------------------------------------+

    DOOM WORLD ISOLATION:
    +--------------------------------------------------+
    | - Zone locks/gatehouse fees BYPASSED in doom     |
    | - Doom location names (corrupted) shown on map   |
    | - Separate visited/discovered location tracking  |
    | - Normal world state preserved separately        |
    | - GameOverSystem guards prevent death spam       |
    +--------------------------------------------------+


================================================================================
                              FILE STRUCTURE
================================================================================

MTG v0.90.01/
+-- config.js                     [Master configuration]
+-- index.html                    [Entry point]
+-- gamelayout.md                 [This file]
+-- todo.md                       [Task tracking]
+-- Gee'sThoughts.md              [Development log]
|
+-- src/js/
|   +-- core/                     [Core engine]
|   |   +-- game.js               [Main game state]
|   |   +-- time-machine.js       [Time engine]
|   |   +-- event-bus.js          [Event system]
|   |   +-- event-manager.js      [DOM events]
|   |
|   +-- data/                     [Data definitions]
|   |   +-- game-world.js         [World locations]
|   |   +-- doom-world-config.js  [Doom rules]
|   |   +-- items/
|   |       +-- item-database.js  [All items]
|   |       +-- unified-item-system.js
|   |
|   +-- systems/                  [Game systems]
|   |   +-- combat/               [Combat mechanics]
|   |   +-- crafting/             [Crafting system]
|   |   +-- employee/             [Employee mgmt]
|   |   +-- progression/          [Quests, achievements]
|   |   +-- save/                 [Save/load]
|   |   +-- trading/              [Trading system]
|   |   +-- travel/               [Travel system]
|   |   +-- world/                [Weather, day/night]
|   |   +-- npc/                  [NPC subsystems]
|   |
|   +-- npc/                      [NPC systems]
|   |   +-- npc-manager.js        [NPC registry]
|   |   +-- npc-dialogue.js       [AI dialogue]
|   |   +-- npc-trade.js          [NPC trading]
|   |   +-- npc-merchants.js      [Merchants]
|   |   +-- npc-relationships.js  [Reputation]
|   |
|   +-- property/                 [Property system]
|   |   +-- property-system-facade.js
|   |   +-- property-types.js
|   |   +-- property-purchase.js
|   |   +-- property-income.js
|   |
|   +-- ui/                       [User interface]
|   |   +-- components/           [UI components]
|   |   +-- panels/               [Game panels]
|   |   +-- map/                  [Map rendering]
|   |   +-- ui-enhancements.js
|   |   +-- key-bindings.js
|   |
|   +-- effects/                  [Visual/audio]
|   |   +-- visual-effects-system.js
|   |   +-- environmental-effects-system.js
|   |   +-- audio/
|   |
|   +-- debooger/                 [Dev tools]
|   |   +-- debooger-command-system.js
|   |   +-- performance-optimizer.js
|   |
|   +-- init/                     [Initialization]
|   |   +-- bootstrap.js          [Module loader]
|   |   +-- loading-manager.js
|   |
|   +-- utils/                    [Utilities]
|       +-- color-utils.js
|       +-- virtual-list.js
|
+-- src/css/                      [Stylesheets]
|   +-- styles.css                [Main styles]
|   +-- z-index-system.css        [Z-index layers]
|   +-- npc-systems.css           [NPC styles]
|   +-- ui-enhancements.css
|
+-- tests/                        [Test suite]
+-- READMEs/                       [Documentation]


================================================================================
                              DATA FLOW PATTERNS
================================================================================

    PLAYER ACTION FLOW:
    +------------------------------------------------------------------+
    |                                                                  |
    |  User Click -> DOM Event -> EventManager -> System Handler       |
    |       |                                          |               |
    |       v                                          v               |
    |  EventBus.emit() <----------------------- State Update           |
    |       |                                          |               |
    |       v                                          v               |
    |  Subscriber Systems <------------------- UI Refresh              |
    |                                                                  |
    +------------------------------------------------------------------+

    TRADE FLOW EXAMPLE:
    +------------------------------------------------------------------+
    | 1. User clicks "Sell Item" button                                |
    | 2. DOM event fires                                               |
    | 3. EventManager delegates to TradingSystem.sellItem()            |
    | 4. TradingSystem updates inventory and gold                      |
    | 5. Emits ITEM_SOLD event via EventBus                            |
    | 6. InventoryPanel and GoldDisplay listen and update              |
    +------------------------------------------------------------------+

    CONFIG CASCADE:
    +------------------------------------------------------------------+
    |                                                                  |
    |  GameConfig (source) -> System reads -> System uses -> UI shows  |
    |                                                                  |
    |  Example: GameConfig.combat.baseDamage affects all combat        |
    |                                                                  |
    +------------------------------------------------------------------+


================================================================================
                              KEY STATS
================================================================================

    +--------------------------------+
    | CODE STATISTICS                |
    +--------------------------------+
    | Total JS Lines:    ~57,000     |
    | System Files:      88+         |
    | Quest Count:       100+        |
    | Item Count:        100+        |
    | Location Count:    40+         |
    | NPC Types:         20+         |
    +--------------------------------+

    +--------------------------------+
    | CURRENT VERSION                |
    +--------------------------------+
    | Version:           0.90.01     |
    | Build Status:      Active Dev  |
    | Bugs Fixed:        531+        |
    +--------------------------------+


================================================================================
                              MAINTENANCE NOTES
================================================================================

    WHEN UPDATING THIS FILE:
    +------------------------------------------------------------------+
    | 1. Keep ASCII art formatting consistent                          |
    | 2. Update version number at top                                  |
    | 3. Update "Last Updated" date                                    |
    | 4. Add new systems to appropriate sections                       |
    | 5. Keep box widths consistent (~78 chars)                        |
    | 6. Use + for corners, - for horizontal, | for vertical           |
    +------------------------------------------------------------------+

    CRITICAL RULES:
    +------------------------------------------------------------------+
    | - All hardcoded values must be in config.js                      |
    | - Systems read config, never hardcode magic numbers              |
    | - All state changes emit events via EventBus                     |
    | - UI listens to events for reactive updates                      |
    | - XSS prevention: always escapeHtml() user content               |
    +------------------------------------------------------------------+


================================================================================
                    END OF ARCHITECTURE DOCUMENT
================================================================================
```
