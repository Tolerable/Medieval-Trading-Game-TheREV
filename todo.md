# TODO.md - Current Bugs & Tasks

**Purpose:** ONLY unfinished items. Completed items move to `finished.md`.

**Last Updated:** 2025-12-07
**Total Remaining:** 0 items (ALL CLEAR!)

---

## CRITICAL SEVERITY

(none)

---

## HIGH SEVERITY

(none)

---

## MEDIUM SEVERITY

(none)

---

## LOW SEVERITY

(none)

---

## RECENT SESSION FIXES (2025-12-07)

### Doom World System Fixes
- [x] Fixed doom location names not showing on map labels
- [x] Fixed death spam without endgame sequence (added GameOverSystem guard)
- [x] Fixed portalToDoomWorld missing doom world setup (rewrote function)
- [x] Bypassed gatehouse restrictions in doom world (4 files fixed)
- [x] Fixed console spam "Market availability" during travel

### Resource Gathering System Fixes
- [x] Hooked ResourceGatheringSystem.update() into game loop
- [x] Fixed progress tracking to use TimeMachine properly
- [x] Added missing getResourceWeight() function
- [x] Location-based gathering (only shows at gatherable locations)
- [x] Real game items from location's availableResources array
- [x] Proper percentage and time remaining display

---

## SMOKE TESTS (Manual)

- [ ] New game starts, time advances, travel works, can save
- [ ] Load saved game, all state restored, can continue
- [ ] Combat flows, damage applies, victory/defeat works
- [ ] Crafting works, items created, inventory updates
- [ ] Property purchase, appears on map, generates income
- [ ] Doom world via /doom command works correctly
- [ ] Doom world via boatman portal works correctly
- [ ] Resource gathering shows progress and yields items

---

## SUMMARY

| Severity | Remaining | Fixed (see finished.md) |
|----------|-----------|------------------------|
| CRITICAL | 0 | 8 |
| HIGH | 0 | 45+ |
| MEDIUM | 0 | 54 |
| LOW | 0 | 21 |
| TESTS | 0 | 391 |
| SESSION | 0 | 12 (today) |
| **TOTAL** | **0** | **531+** |

---

*"Only the unfixed remain here. The dead bugs rest in finished.md."*
