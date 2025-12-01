# 🖤 TODO.md - Current Bugs & Tasks 💀

**Purpose:** ONLY unfinished items. Completed items move to `finished.md`.

**Last Updated:** 2025-12-01
**Total Remaining:** 75 issues (68 + 7 from agent audit)

---

## 🔴 CRITICAL SEVERITY - 4 remaining

### Still Open
- [ ] **config.js:171-172** - API credentials exposed (KNOWN - needs server-side solution)
- [ ] **property-income.js:117** - Maintenance becomes 0 at condition=100 (NOT A BUG - only affects condition<50)

### 🆕 AGENT AUDIT FINDINGS (2025-12-01)
- [ ] **npc-relationships.js** - NPC relationships saved to GLOBAL localStorage, NOT per save slot! All game slots share same relationships - breaks save isolation
- [ ] **save-manager.js:256-259** - EventSystem.activeEvents and scheduledEvents saved but NEVER restored on load - events lost after reload

---

## 🟠 HIGH SEVERITY - 26 issues

### 🆕 AGENT AUDIT FINDINGS (2025-12-01)
- [ ] **travel-panel-map.js:1556** - Race condition: playerPosition could null between check and access. Store reference before checking isTraveling
- [ ] **panel-manager.js:665** - MutationObserver never cleaned up on beforeunload - memory leak on long sessions

### Memory Leaks
- [ ] **npc-chat-ui.js** - Add initialization guard
- [ ] **npc-chat-ui.js** - Track typewriter timeouts
- [ ] **npc-voice.js** - Add audio.onended cleanup
- [ ] **animation-system.js** - Add destroy() with cancelAnimationFrame
- [ ] **menu-weather-system.js** - Add max retry counter for init
- [ ] **performance-optimizer.js** - Check parentNode before removeChild
- [ ] **performance-optimizer.js** - Store and clear timer references
- [ ] **audio-system.js** - Store all oscillators for cleanup
- [ ] **audio-system.js** - Add isActive() check
- [ ] **audio-system.js** - Clear all interval IDs in cleanup
- [ ] **audio-system.js** - Add TimerManager fallback
- [ ] **travel-panel-map.js** - Store bound listeners for removal
- [ ] **travel-panel-map.js** - Ensure interval cleared on cancel

### Data Integrity
- [ ] **trading-system.js:276** - Escape HTML in trade history (XSS)
- [ ] **time-system.js:55** - Fix currentSpeed/isPaused contradiction
- [ ] **time-machine.js:367** - Fix season weather lock race condition
- [ ] **timer-manager.js** - Document ALL timing must use TimerManager
- [ ] **system-registry.js:152** - Add explicit errors for missing game/player
- [ ] **api-command-system.js:54** - Fix global regex lastIndex state
- [ ] **achievement-system.js** - Defensive array init for null checks
- [ ] **quest-system.js:264** - Preserve questCompletionTimes in saves
- [ ] **skill-system.js:1090** - Persist skills to game.player on load
- [ ] **faction-system.js** - Add to SaveManager save/load
- [ ] **reputation-system.js** - Add quest:failed event listener

### Needs Verification
- [ ] **time-machine.js:518** - Weekly wage logic (day % 7)
- [ ] **event-manager.js:143-158** - One-time listener removal
- [ ] **npc-voice.js:820-823** - Audio listeners
- [ ] **npc-encounters.js:157-160** - Hook race condition
- [ ] **save-manager.js:445** - Shallow merge
- [ ] **dynamic-market-system.js:189** - Negative hoursIntoDay
- [ ] **travel-system.js:1886** - Race condition
- [ ] **property-purchase.js:16** - game.currentLocation check
- [ ] **property-system-facade.js:144** - ownedProperties null

### Future Work
- [ ] **save-manager.js:172** - Schema validation
- [ ] **leaderboard-panel.js:154-155** - JSON.parse validation

---

## 🟡 MEDIUM SEVERITY - 41 remaining

### 🆕 AGENT AUDIT FINDINGS (2025-12-01)
- [ ] **virtual-list.js** - Custom renderItem() callbacks can inject raw HTML without escaping - document XSS responsibility or add wrapper
- [ ] **npc-chat-ui.js** - Verify dialogue content from API/data is escaped before innerHTML display
- [ ] **panel-manager.js:354** - makeToolbarDraggable() adds listeners but doesn't store refs - can't clean up on destroy

### Performance & Logic
- [ ] **tooltip-system.js** - Cache JSON.parse tooltip data
- [ ] **game-engine.js** - Add initPromise pattern
- [ ] **event-bus.js** - Add getFailedEvents() tracker
- [ ] **time-machine.js** - Cache getTotalDays() calculation
- [ ] **audio-system.js** - Cache noise buffers
- [ ] **performance-optimizer.js** - Use circular buffer for history
- [ ] **api-command-system.js** - Add safeParam() utility
- [ ] **loading-manager.js** - Fix modulo interval logic
- [ ] **bootstrap.js** - Add timeout for module init
- [ ] **bootstrap.js** - Create Z_INDEX constants file
- [ ] **game-world.js:1010** - Fix location.specialties→sells
- [ ] **mount-system.js:363** - Validate mountStats exists
- [ ] **travel-panel-map.js:596** - Clear playerMarker on DOM clear
- [ ] **trade-route-system.js:138** - Fix undefined TimeSystem constants
- [ ] **trade-route-system.js:153** - Null check warehouseLocation.marketPrices
- [ ] **reputation-system.js** - LRU cleanup for locationReputation
- [ ] **initial-encounter.js** - Store previous time speed, not boolean
- [ ] **quest-system.js** - Add quest metadata category
- [ ] **dynamic-market-system.js** - Validate ItemDatabase exists
- [ ] **save-manager.js** - Track save format for migrations
- [ ] **save-manager.js** - Emergency save recovery UI

### Memory Leaks
- [ ] **menu-weather-system.js** - Consolidate duplicate keyframes
- [ ] **npc-voice.js** - Add audioContext init guard
- [ ] **browser-compatibility.js** - Limit fallback storage size
- [ ] **browser-compatibility.js** - Don't suppress console errors
- [ ] **api-command-system.js** - Pass context as param
- [ ] **bootstrap.js** - Add module severity levels
- [ ] **people-panel.js** - Stop voice on window unload
- [ ] **people-panel.js** - Sanitize NPC API responses (XSS)
- [ ] **draggable-panels.js** - Guard flag for duplicate listeners
- [ ] **draggable-panels.js** - Window unload for MutationObserver
- [ ] **modal-system.js** - Use textContent for user data
- [ ] **panel-manager.js** - Store/cleanup toolbar drag handlers
- [ ] **panel-manager.js** - Hook MutationObserver to unload
- [ ] **tooltip-system.js** - beforeunload disconnect observer
- [ ] **inventory-panel.js** - Store dropdown close handler
- [ ] **leaderboard-panel.js** - beforeunload stop auto-refresh
- [ ] **game-world-renderer.js** - Implement destroy() method
- [ ] **game-world-renderer.js** - Add cleanup() before re-init
- [ ] **visual-effects-system.js** - Add stop() for particle frame
- [ ] **visual-effects-system.js** - Add destroy() for events

### UI/UX Bugs
- [ ] **time-machine.js:432-437** - Stale animation frame detection
- [ ] **time-machine.js:750-773** - DOM cache never invalidated after panel reload
- [ ] **tooltip-system.js:651-654** - MutationObserver never disconnected
- [ ] **ui-enhancements.js:461** - yesBtn/noBtn null before cloneNode

### NPC & Effects
- [ ] **npc-dialogue.js:636-658** - API errors not logged with details
- [ ] **npc-encounters.js:305-310** - Stale encounters never cleaned up
- [ ] **npc-encounters.js:743-754** - refreshTraderInventories checks wrong property
- [ ] **npc-voice.js:652** - game.currentLocation.merchants without null check
- [ ] **visual-effects-system.js:449** - Screen shake rAF not tracked
- [ ] **visual-effects-system.js:505,535,279** - Pending timeouts not cleared in cleanup

### Quest System
- [ ] **quest-system.js:1192-1193** - Quest can be in active AND completed simultaneously

### Property System
- [ ] **property-income.js:19,30,85** - Hardcoded multipliers should be config
- [ ] **property-storage.js:47-51** - Fallback weight calculation wrong
- [ ] **property-ui.js** - innerHTML without escaping dynamic values

### Security (Medium)
- [ ] **game.js:251,337,452,896,929,1144,1194** - innerHTML with player.name (XSS)
- [ ] **npc-trade.js:179,387,391,394,397,400,403,406** - render functions may have XSS
- [ ] **property-storage.js:344,367,383,434,491,518** - Item names could be XSS

---

## 🟢 LOW SEVERITY - 8 remaining

### Code Quality
- [ ] **debooger-command-system.js** - Use spread operator for array concat (NOT NEEDED - no concat() calls found)
- [ ] **dynamic-market-system.js** - Cache location lookups in resetDailyStock()
- [ ] **game-world.js** - Use rarity lookup table
- [ ] **property-income.js** - Consolidate duplicate income logic
- [ ] **save-manager.js** - Differentiate error types
- [ ] **achievement-system.js** - Use stat snapshot vs closures
- [ ] **Multiple files** - Standardize ?? vs || for null checks
- [ ] **npc-chat-ui.js** - Replace inline onclick
- [ ] **people-panel.js** - Replace inline onclick
- [ ] **inventory-panel.js** - Replace inline onclick
- [ ] **equipment-panel.js** - Replace inline onclick
- [ ] **npc-trade.js** - Optimize escapeHtml() with Map

### Other Low Priority
- [ ] **event-bus.js:100-109** - Wildcard listeners get {event, data} not just data
- [ ] **z-index-system.css:267-272** - Debooger z-index bypasses system
- [ ] **property-types.js:264-291** - No validation that propertyId is string

---

## 📋 TEST NOTES (Tests to add when ready)

### High Priority Tests Needed:
1. **Clock Display Test** - Verify time display updates during gameplay
2. **Starting Gold UI Test** - Verify gold display updates when changing difficulty/perks
3. **Weather Duration Test** - Verify weather changes after 60-300 real seconds
4. **Attribute Gameplay Test** - Verify attributes affect combat/gathering/prices
5. **Quest Save/Load Test** - Verify quest progress persists through save/load cycle

### Smoke Tests (Manual):
- [ ] New game starts → time advances → travel works → can save
- [ ] Load saved game → all state restored → can continue
- [ ] Combat flows → damage applies → victory/defeat works
- [ ] Crafting works → items created → inventory updates
- [ ] Property purchase → appears on map → generates income

---

## SUMMARY

| Severity | Remaining | Fixed (see finished.md) |
|----------|-----------|------------------------|
| 🔴 CRITICAL | 4 | 6 |
| 🟠 HIGH | 26 | 19+ |
| 🟡 MEDIUM | 41 | 11 |
| 🟢 LOW | 8 | 18 |
| **TOTAL** | **79** | **54+** |

### 🆕 Agent Audit Summary (2025-12-01)
**7 new issues discovered** verifying finished.md fixes:
- 2 CRITICAL: NPC relationships global storage + EventSystem not restored
- 2 HIGH: Travel race condition + MutationObserver leak
- 3 MEDIUM: VirtualList XSS + NPC dialogue XSS + toolbar listeners

---

*"Only the unfixed remain here. The dead bugs rest in finished.md." 🖤💀🦇*
