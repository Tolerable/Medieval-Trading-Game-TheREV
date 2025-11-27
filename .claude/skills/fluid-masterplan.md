# 🌊 FLUID MASTERPLAN - The Living Document Protocol
## *"Plans are not carved in stone. They flow like dark water, adapting to the void."* - Unity

---

## 🖤 WHAT IS THIS?

The masterplan is a **living, breathing document** that evolves as the codebase changes. It is NOT a rigid checklist but a fluid guide that:

1. **Adapts** to new discoveries during development
2. **Re-evaluates** completed tasks when related systems change
3. **Marks overlaps** when multiple systems touch the same code
4. **Questions assumptions** from earlier estimates

---

## 🦇 THE FLUID PRINCIPLES

### Principle 1: COMPLETED ≠ FOREVER DONE
When a task is marked ✅ DONE, it means:
- It was done at the time of completion
- It MAY need re-examination if:
  - Related systems are modified later
  - New overlapping functionality is added
  - Dependencies change
  - Bugs are discovered in the area

**Mark for re-examination with:** `✅ DONE (⚠️ RE-CHECK: reason)`

### Principle 2: ESTIMATES ARE GUESSES
Original estimates (like "~2000 dead CSS lines") are based on initial analysis. Reality often differs:
- **Task 4.4 estimated 2000 dead lines, actual was ~750**
- Always update estimates with actual findings
- Don't delete old estimates - show the correction for learning

### Principle 3: OVERLAPPING SYSTEMS REQUIRE CROSS-REFERENCES
When systems overlap, add cross-references:
```
| 2.2 | ✅ DONE | Extract TimeSystem | ⚡ OVERLAP: game.js, TravelSystem |
```

### Principle 4: DEFERRED ≠ ABANDONED
Deferred tasks are:
- Not forgotten, just postponed
- Often deferred due to risk assessment
- Should be re-evaluated periodically
- May become easier after other tasks complete

---

## 🗡️ RE-EXAMINATION TRIGGERS

Mark a completed task for re-examination when:

1. **New extraction affects it**:
   - Example: If we extract PlayerSystem from game.js, re-check TimeSystem integration

2. **Bug found in area**:
   - Example: If travel bugs appear, re-check TravelSystem + Mount/Ship systems

3. **Duplicate code discovered**:
   - Example: If we find another color utility, re-check ColorUtils consolidation

4. **Performance issues**:
   - Example: If CSS causes layout thrashing, re-check CSS cleanup task

5. **Feature request touches area**:
   - Example: New time-based feature needs TimeSystem review

---

## ⚰️ HOW TO UPDATE THE MASTERPLAN

### Adding New Tasks
```markdown
| X.X | 📋 NEW | Description | Added: YYYY-MM-DD |
```

### Marking for Re-examination
```markdown
| X.X | ✅ DONE (⚠️ RE-CHECK) | Description | Re-check: reason |
```

### Updating Estimates
```markdown
| X.X | ✅ DONE | Description (~actual vs ~estimated) |
```

### Documenting Overlaps
```markdown
| X.X | ✅ DONE | Description | ⚡ OVERLAPS: System1, System2 |
```

---

## 🌙 CURRENT OVERLAP MAP

Systems that share code/state and need coordinated changes:

```
┌─────────────────────────────────────────────────────────────┐
│ TimeSystem ←──────→ TravelSystem ←──────→ Mount/Ship       │
│     ↓                    ↓                    ↓            │
│ GameWorld ←──────→ GameWorldRenderer ←──→ TravelPanelMap   │
│     ↓                    ↓                                 │
│ SaveManager ←────→ All Systems (save/load integration)     │
│                                                            │
│ ColorUtils ←──────→ GameWorldRenderer, TravelPanelMap      │
│                                                            │
│ NPC Systems (5) ←─→ DialogueSystem, EncounterSystem        │
└─────────────────────────────────────────────────────────────┘
```

---

## 💀 WHEN TO INVOKE THIS SKILL

Use this protocol when:
1. Completing any task - check for overlaps
2. Finding actual numbers differ from estimates - update
3. Discovering a bug in a "completed" area - mark for re-check
4. Starting work that touches multiple systems - note overlaps
5. Periodically reviewing the masterplan - re-evaluate deferred items

---

## 🔮 THE DARK TRUTH

*"A plan that never changes was never a plan - it was a wish."* - Unity

The masterplan succeeds not by being followed blindly, but by being a living record of:
- What we intended
- What we actually did
- What we learned
- What still needs attention

**The code is the truth. The masterplan is the map. Maps get updated.**
