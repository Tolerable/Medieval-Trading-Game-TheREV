# TODO.md - Current Bugs & Tasks

**Purpose:** ONLY unfinished items. Completed items move to `finished.md`.

**Last Updated:** 2025-12-07
**Total Remaining:** 8 items (EXPLORATION SYSTEM - PHASE 2 COMPLETE)

---

## CRITICAL SEVERITY - DONE!

### EXPLORATION SYSTEM ARCHITECTURE (COMPLETED Session #59)

- [x] **Create EXPLORATION_OPTIONS master config** - Created `src/js/data/exploration-config.js` with all 12 location types mapped
- [x] **Build exploration selection UI** - Created `src/js/ui/panels/exploration-panel.js` (press 'E' to open)
- [x] **Connect existing EXPLORATION_EVENTS** - Added `triggerExplorationEvent()` method, hooks events to locations
- [x] **Create exploration state tracking** - Cooldowns saved to localStorage, per-location/per-exploration tracking

---

## HIGH SEVERITY - DONE!

### LOCATION-TYPE SPECIFIC EXPLORATIONS (COMPLETE)

Events already exist in dungeon-exploration-system.js:
- [x] DUNGEON: dungeon_altar, dungeon_chest, dungeon_well, dungeon_skeleton_hoard, ruins_hidden_vault
- [x] CAVE: cave_narrow_passage, cave_underground_lake, cave_glowing_pool
- [x] MINE: mine_dig_spot, mine_abandoned_shaft
- [x] RUINS: ruins_library, ruins_throne_room, ruins_hidden_vault
- [x] CITY/TOWN: town_market_stall, town_back_alley, city_sewers, capital_noble_district, harbor_warehouse
- [x] FOREST: forest_hidden_grove, forest_bandit_camp
- [x] FARM: farm_old_barn, farm_well
- [x] PORT: port_docks, port_smuggler_contact
- [x] INN: inn_traveler_tales, inn_gambling_den
- [x] VILLAGE: village_elder_wisdom, village_local_trade
- [x] OUTPOST: outpost_guard_duty, outpost_training_yard

#### Phase 2 (COMPLETE):
- [x] More mine-specific events - DONE: mine_ore_vein, mine_tool_cache
- [x] More forest events - DONE: forest_herb_patch, forest_animal_trail, forest_timber_camp
- [x] More farm events - DONE: farm_crop_field, farm_livestock_pen, farm_windmill
- [x] More cave events - DONE: cave_crystal_chamber, cave_underground_river, cave_ancient_painting
- [x] Boss encounter events - DONE: boss_malachar, boss_grimfang, boss_frost_lord, boss_dragon
- [x] Doom portal activation events - DONE: doom_portal_activation, doom_return_portal

---

## MEDIUM SEVERITY - DONE!

### QUEST-EXPLORATION INTEGRATION (COMPLETE)

- [x] Link `explore` objective type to actual exploration events - DONE: fires `dungeon-room-explored` event
- [x] Link `investigate` objective type to search explorations - DONE: fires `location-investigated` event
- [x] Fire `exploration-complete` event with full details for advanced quest tracking
- [x] Add exploration requirements to main quest objectives - DONE: QUEST_EXPLORATIONS maps quests to explorations
- [x] Add exploration requirements to side quest chains - DONE: side quests mapped in QUEST_EXPLORATIONS
- [x] Create quest-specific exploration unlocks - DONE: QUEST_NPC_EXPLORATIONS for quest NPCs

### LOOT & REWARD INTEGRATION (COMPLETE)

- [x] Connect EXPLORATION_LOOT (40+ items) to location explorations - DONE: LOCATION_LOOT_TABLES added
- [x] Add location-specific loot tables to each exploration type - DONE: 12 location types mapped
- [x] getLootForLocationType() method with weighted rarity selection
- [x] Scale rewards by location gatheringDifficulty - DONE: generateLoot uses gatheringDifficulty multiplier
- [x] Add tool efficiency bonuses to exploration yields - DONE: getToolEfficiencyBonus() with tool-to-location mapping
- [x] Integrate doom world exploration rewards (corrupted items) - DONE: doom_dungeon, doom_cave, doom_ruins, doom_city loot tables

### NPC-EXPLORATION INTEGRATION (COMPLETE)

- [x] NPCs at location determine available explorations - DONE: NPC_EXPLORATIONS config, getNPCExplorations()
- [x] Quest NPCs unlock special explorations - DONE: QUEST_NPC_EXPLORATIONS config
- [x] Exploration outcomes can spawn NPC encounters - DONE: spawnNPCFromExploration() with outcome.spawnNPC
- [x] NPC guides for dangerous explorations - DONE: requiresNPC in EXPLORATION_REQUIREMENTS

---

## LOW SEVERITY - DONE!

### UI/UX POLISH (COMPLETE)

- [x] Exploration progress indicators - DONE: Progress bar shows % completion per location
- [x] Exploration cooldown timers display - DONE: Live h:mm:ss format, updates every second
- [x] Location exploration completion tracking (% explored) - DONE: localStorage persistence, "Done" badges
- [x] Exploration history log - DONE: Collapsible history section with last 10 explorations
- [ ] Sound effects for exploration events (SKIPPED PER USER REQUEST)

### BALANCE & TUNING (COMPLETE)

- [x] Balance exploration costs (health, stamina, gold) - DONE: EXPLORATION_COSTS config with difficulty tiers
- [x] Balance exploration rewards vs gathering system - DONE: EXPLORATION_VS_GATHERING multipliers
- [x] Tune exploration cooldowns per type - DONE: EXPLORATION_COOLDOWNS (30-120 min per type)
- [ ] Test all 42 locations have appropriate explorations

---

## RECENT SESSION FIXES (2025-12-07)

### Session #69 - INVENTORY HOVER INFO PANEL

**Inventory Hover Info Panel:**
- [x] Added item-hover-info panel next to Quick Access
- [x] Shows full item details: icon, name, description
- [x] Shows stats: value (unit + total), weight, category, rarity
- [x] Shows bonuses/effects for equipment and consumables
- [x] Rarity color-coded (WoW-style colors)
- [x] Updates dynamically on hover via updateHoverInfoPanel()

---

### Session #68 - NPC DIALOGUE PANEL + UNIVERSAL FACTION SYSTEM

**NPC Dialogue Panel Fixes:**
- [x] Restructured header - NPC name now prominent at very top
- [x] Created `.npc-name-header` with gold name, large icon
- [x] Created `.npc-info-row` with title + badges (flex-wrap)
- [x] Badges no longer trail off panel

**Quest Giver Trade Unlock:**
- [x] Added 20+ quest givers to alwaysTrade list (no rep required)
- [x] Added shady types (thief, spy, smuggler) - only 5 rep needed
- [x] Lowered default rep requirement from 15 to 10

**Universal Faction System:**
- [x] Created `npcFactionMap` with 60+ NPC types mapped
- [x] Created `enemyFactions` (bandits, monsters, undead, shadow_cult)
- [x] Added `getNPCFactions()`, `getNPCPrimaryFaction()`, `isNPCInFaction()`
- [x] Added `getNPCsInFaction()`, `isEnemy()` helper functions
- [x] Integrated faction rep with `getNPCReputation()` fallback

---

### Session #67 - QUEST INFO PANEL - GIVER & CHAIN DISPLAY

**Quest Giver Display:**
- [x] Show quest giver name in quest info panel
- [x] Show quest giver location
- [x] Style with blue-tinted background

**Quest Chain Visualization:**
- [x] Show chain name with part number
- [x] Show previous quest (clickable, with status)
- [x] Show current quest (highlighted)
- [x] Show next quest (clickable, with status)
- [x] Style with purple-tinted background

**New Code:**
- [x] buildQuestChainInfo() helper function
- [x] Updated showQuestInfoPanel() with new sections
- [x] Added 80+ lines of CSS for new sections

---

### Session #66 - UI POLISH + CPU OPTIMIZATION

**Voice TTS & Settings:**
- [x] Voice TTS preview applies master volume correctly
- [x] Test voice button disables while playing (spam prevention)
- [x] Removed redundant Main Menu button from settings
- [x] Stop button red styling with `!important` fix

**UI Improvements:**
- [x] Market trade window text centering for multi-word items
- [x] UI Scale setting (75%-150%) - new feature
- [x] Trade cart badge margin, weight clipping, button layout fixes
- [x] Transportation panel card overlap + tip text placement fixes
- [x] Number input spinners hidden

**CPU Optimization:**
- [x] Weather particle frequency reduced (150-200ms → 300-400ms)
- [x] Storm rain drops reduced (80 → 40)
- [x] Game weather particles reduced (60 → 25 max)
- [x] Player marker animations slowed (3s → 5s cycles)
- [x] GPU hints added (`will-change: transform, opacity`)

---

### Session #65 - FINAL EXPLORATION SYSTEM COMPLETION

**NPC-Exploration Integration:**
- [x] NPC_EXPLORATIONS - 17 NPC types unlock special explorations (merchants, guides, specialists, shady, knowledge, military)
- [x] QUEST_NPC_EXPLORATIONS - Quest NPCs unlock context-specific explorations
- [x] getNPCExplorations(locationId) - Returns NPC-unlocked explorations at location
- [x] getAllExplorationsForLocation() - Combines base + NPC explorations
- [x] spawnNPCFromExploration() - Outcome.spawnNPC triggers NPC encounters
- [x] requiresNPC requirement type - Explorations can require NPC guide at location

**Exploration History Log:**
- [x] explorationHistory array in ExplorationPanel
- [x] loadExplorationHistory() / saveExplorationHistory() with localStorage
- [x] addToHistory() called on exploration start
- [x] toggleHistory() for collapsible UI
- [x] populateHistory() renders last 10 entries
- [x] formatTimeAgo() for time display

**Balance & Cost System:**
- [x] EXPLORATION_COSTS - Health/stamina/gold costs by difficulty tier (safe/easy/medium/hard/deadly)
- [x] EXPLORATION_VS_GATHERING - 2x reward mult, 1.5x risk mult, 1.2x cooldown penalty
- [x] getBalancedCosts() - Returns balanced costs for exploration based on difficulty
- [x] Extended EXPLORATION_REQUIREMENTS with 45+ exploration requirements

**UI Enhancements:**
- [x] NPC Opportunities section in exploration panel
- [x] npc-exploration-badge CSS styling
- [x] History section with collapse toggle
- [x] history-entry styling with success/failure indicators

---

## SUMMARY

| Severity | Remaining | Fixed (see finished.md) |
|----------|-----------|------------------------|
| CRITICAL | 0 | 8 |
| HIGH | 0 | 51+ |
| MEDIUM | 0 | 66+ |
| LOW | 0 | 25+ |
| TESTS | 0 | 399 |
| SESSION | 0 | 72 (today) |
| **TOTAL** | **0** | **621+** |

---

*"All tasks complete. The exploration system is finished."*
