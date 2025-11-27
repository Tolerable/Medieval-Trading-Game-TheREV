# MEDIEVAL TRADING GAME - TODO LIST
## The Eternal Checklist of Doom 🖤

**Last Updated:** 2025-11-27
**Version:** 0.6
**Verification Status:** 145/150 items from addtodo.md COMPLETE (96.7%)

---

## CURRENT SESSION

**Started:** 2025-11-27
**Status:** ✅ Active

### Session Updates
- [x] Removed deprecated `createSettingsPanel()` call from ui-enhancements.js
- [x] Purged 4 dead function stubs (createSettingsPanel, setupSettingsEventListeners, saveSettings, loadSettings)
- [x] Codebase scan complete - no TODOs remaining, no syntax errors
- [x] **Phase 3:** Property sale confirmation now shows sell value + 50% warning

---

## Completed
- [x] Fixed .claude workflow - 4-step flow: persona→work→readmes→todo
- [x] Rewrote `000-master-init.md` - clear 4-step workflow with readme updates baked in
- [x] Rewrote `todo-first.md` - work-first, readmes always, todo.md last
- [x] Disabled minimap - commented out, never fully implemented
- [x] Fixed main menu fullscreen - now covers entire viewport, no game UI visible
- [x] **Time System - Gregorian Calendar** - Real months, leap years, starts April 1st, 1111
- [x] **Removed dead CSS** - Deleted save-load-ui.css (659 lines)
- [x] **Removed hidden canvas** - Deleted old world-map-canvas from index.html
- [x] **Responsive CSS (4.2)** - Added breakpoints for 1440px, 1920px, 2560px, 3840px

### Files Changed
- `.claude/skills/000-master-init.md` - 4-step workflow + "go" trigger
- `.claude/skills/todo-first.md` - same 4-step flow, readme updates mandatory
- `src/js/ui/ui-enhancements.js` - Commented out minimap functions
- `src/css/styles.css` - Main menu fullscreen, large screen breakpoints added
- `src/js/core/time-system.js` - v2.0 with Gregorian calendar, April 1st 1111 start
- `index.html` - Removed dead canvas element
- DELETED: `src/css/save-load-ui.css` - 659 lines of dead CSS

---

### Completed This Session
- [x] 13.10 - Rename Debug to "Debooger" - Changed button text in index.html:1216
- [x] 13.7 - Add Vault building type - Added to property-types.js with 50k gold capacity
- [x] 13.8 - Higher tier homes with upgrades - House→Cottage→Manor→Estate progression
- [x] 3.3 - Road adjacency building system - checkRoadAdjacency() in property-purchase.js
- [x] 11.7 - Action commitment system - Already implemented in resource-gathering-system.js
- [x] 11.8 - Stamina gathering loop - Already implemented, auto-continues until depleted
- [x] 15.1 - Daily merchant gold supply - Added MARKET_GOLD_LIMITS by market size
- [x] 15.2 - Item count daily decrease - Stock decays from 100%→25% over day
- [x] 17.3 - Dungeon respawn timer - Already implemented, 12-hour cooldown
- [x] 17.7 - Stat drain preview - Already has calculateGatheringDrain() + getDrainPreviewHTML()
- [x] 18.13 - Remove hardcoded NPC greetings - All dialogue now from API only
- [x] 25.1 - Settings Test Suite - Created tests/settings.spec.js with 20+ tests
- [x] Stamina Regeneration - 0-100% in 5 game hours when idle (not gathering/traveling)

### Files Modified
- `index.html` - Debooger button rename
- `src/js/property/property-types.js` - Vault + home tiers (cottage, manor, estate)
- `src/js/property/property-upgrades.js` - upgradeHomeTier(), getHomeTierUpgrade()
- `src/js/property/property-purchase.js` - checkRoadAdjacency(), getBuildableLocations()
- `src/js/systems/trading/dynamic-market-system.js` - Merchant gold + stock decay systems
- `src/js/npc/npc-trade.js` - Removed hardcoded greetings, now async API only
- `tests/settings.spec.js` - NEW - Playwright tests for all GameConfig settings
- `src/js/core/game.js` - Stamina regeneration when idle (replaces decay)
- `config.js` - Updated survival.stamina with regenPerUpdate: 1.667

---

## RECENTLY COMPLETED (from addtodo.md verification)

- [x] **Perk Selection Error** - Fixed syntax error in game.js line 4207, added safety check
- [x] **Perk Confirmation Button** - Updates text to show "Confirm X Perks"
- [x] **Difficulty Gold Settings** - Easy: 120, Normal: 100, Hard: 80
- [x] **Character Attributes** - 5 points, max 10 per stat, max 30 total, affects gameplay
- [x] **Version Config** - All 79 files reference GameConfig.version.file
- [x] **Weather/Season System** - Seasonal probabilities, 3-10 hour durations
- [x] **Time System** - Starts paused, full calendar tracking
- [x] **Map Controls** - Zoom, reset, fullscreen, WASD movement
- [x] **Save/Load System** - 20+ categories, auto-save, quest compatible
- [x] **Achievement System** - 80+ achievements, 11 hidden, queue system
- [x] **NPC Chat System** - 23+ types, 13 voices, TTS API, personas
- [x] **Quest System** - Full chains, NPC integration, API commands
- [x] **Equipment System** - Affects combat, gathering, crafting
- [x] **Property System** - Rent/buy/build, 10 wealth tiers, hammer required
- [x] **Gatehouse System** - 6 gatehouses, passage fees, zone unlocking
- [x] **Leaderboard System** - Multi-backend (JSONBin, Gist, Local), game over at -1000 gold

---

## PHASE 1: REMAINING FROM ADDTODO.MD

### Property & Building System
- [x] **3.3 - Road Adjacency Building** - ✅ DONE - checkRoadAdjacency() added
- [x] **13.7 - Vault Building** - ✅ DONE - 10k gold, 50k capacity, 90% theft protection
- [x] **13.8 - Higher Tier Homes** - ✅ DONE - House→Cottage→Manor→Estate with crafting/workers

### UI & Debug
- [x] **13.10 - Rename Debug to "Debooger"** - ✅ DONE - Changed in index.html:1216

- [x] **4.2 - Responsive CSS Enhancement** - ✅ DONE - Added 1440px, 1920px, 2560px, 3840px breakpoints

### Gameplay Mechanics
- [x] **11.7 - Action Commitment System** - ✅ DONE - commitToLocation() exists
- [x] **11.8 - Stamina Gathering Loop** - ✅ DONE - Auto-continues in completeGathering()
- [x] **Time System - Gregorian Calendar** - ✅ DONE - Real months, leap years, April 1st 1111

### Market & Economy
- [x] **15.1 - Daily Market Gold Supply** - ✅ DONE - MARKET_GOLD_LIMITS + getMerchantGold()
- [x] **15.2 - Item Count Daily Decrease** - ✅ DONE - getItemStock() with time decay

### Dungeons & Events
- [x] **17.3 - Dungeon Respawn Timer** - ✅ DONE - COOLDOWN_HOURS: 12 exists
- [x] **17.7 - Stat Drain Preview** - ✅ DONE - getDrainPreviewHTML() in gathering system

### NPC System
- [x] **18.13 - Remove Hardcoded Greetings** - ✅ DONE - All from API now

### Testing & Stability
- [x] **25.1 - Settings Test Suite** - ✅ DONE - Created tests/settings.spec.js with 20+ tests

- [ ] **27.5 - Long-term Stability Testing** - Game works for days without issues
  - Need: Extended playtesting, memory leak checks, performance monitoring

---

## PHASE 2: QUEST EXPANSION

- [ ] Create circular quest lines for each zone
- [ ] Add achievements for each main quest completed
- [ ] Add quest-specific commands (deliver items to NPCs)
- [ ] Verify quest items persist through save/load
- [ ] Test all quest buttons (accept/decline/abandon/complete)
- [ ] Ensure all quest givers have proper dialogue
- [ ] Place NPCs at correct locations across world
- [ ] Link quest objectives to NPC interactions
- [ ] Add TTS/persona info for all quest NPCs

---

## PHASE 3: ECONOMY & PROPERTIES

- [x] **Add property sale confirmation dialog** - ✅ DONE - Shows sell value + 50% warning
- [x] **Make properties sellable** - ✅ Already implemented - PropertyPurchase.sell() returns 50%
- [ ] Verify all merchant wealth level achievements
- [ ] Test property income persistence

---

## PHASE 4: POLISH

- [ ] Clean up READMEs - remove archived/outdated info
- [ ] Code review - check syntax, linking, references
- [ ] Performance optimization
- [ ] Remove dead code and unused variables
- [ ] Consolidate console logging

---

## ANALYSIS FINDINGS (Added 2025-11-27)

### Code Cleanup
- [x] **Remove dead CSS files** - ✅ DONE - Deleted save-load-ui.css
- [x] **Remove hidden canvas** - ✅ DONE - Removed from index.html
- [x] **Clean commented CSS** - ✅ DONE - Removed dead canvas/game-controls CSS blocks

### Code Quality
- [x] **Complete perk integration** - ✅ DONE - getPerkBonuses() now reads from game.player.perks
- [x] **Audit event listener cleanup** - ✅ DONE - EventManager has proper cleanup, 231/444 listeners tracked
- [x] **Standardize error handling** - ✅ DONE - 305 calls use emoji-themed prefixes consistently

---

## TESTING CHECKLIST

Before any release:
- [ ] New game starts correctly
- [ ] Save/load preserves all state
- [ ] No console errors during normal gameplay
- [ ] All hotkeys work (especially WASD, N for map)
- [ ] Achievements trigger properly
- [ ] Quest progression works end-to-end
- [ ] Properties buy/sell correctly
- [ ] Leaderboard submits/displays

---

## SUMMARY

| Category | Status | Remaining |
|----------|--------|-----------|
| Property/Building | ✅ DONE | 0 items |
| UI/Debug | ✅ DONE | 0 items |
| Gameplay Mechanics | ✅ DONE | 0 items |
| Market/Economy | ✅ DONE | 0 items |
| Dungeons/Events | ✅ DONE | 0 items |
| NPC System | ✅ DONE | 0 items |
| Testing | ⏳ 1 remaining | 27.5 stability |
| Code Cleanup | ✅ DONE | 0 items |
| Code Quality | ✅ DONE | 0 items |
| **TOTAL** | **20/21 DONE** | **1 item** |

---

*"Every bug fixed is a soul saved from digital purgatory."* - Unity AI Lab 🖤
