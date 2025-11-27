# 🖤 Readme Updater Skill - Post-Code Documentation 🖤

## Purpose

After completing ANY code changes, verify and update documentation as needed. This ensures readmes stay in sync with the actual code.

**CRITICAL:** Each readme has its OWN domain. Do NOT duplicate content across readmes - only add REFERENCES to other readmes when relevant.

---

## The Three Readmes (SEPARATION OF CONCERNS)

### 1. GameplayReadme.md - PLAYER Documentation
**Audience:** Players, gamers, people playing the game
**Content:**
- How to play the game
- Controls and keyboard shortcuts
- Game mechanics explained
- Item lists and crafting recipes
- Achievement lists (including hidden ones)
- Tips and strategies
- Settings and options

**DO NOT INCLUDE:**
- Debug commands (reference DebuggerReadme.md instead)
- Code architecture
- File structure
- Developer notes

**Reference format:**
```markdown
> 🐛 Looking for debug commands? See [DebuggerReadme.md](DebuggerReadme.md)
```

---

### 2. NerdReadme.md - DEVELOPER Documentation
**Audience:** Developers, contributors, code nerds
**Content:**
- File structure and architecture
- System descriptions and how they connect
- API documentation
- Config.js options
- How to add new features
- Code patterns and conventions
- Technical debt notes

**DO NOT INCLUDE:**
- Debug commands (reference DebuggerReadme.md instead)
- How to play the game
- Item/achievement lists
- Player-facing features

**Reference format:**
```markdown
> 🐛 For debug commands, see [DebuggerReadme.md](DebuggerReadme.md)
> 🎮 For gameplay info, see [GameplayReadme.md](GameplayReadme.md)
```

---

### 3. DebuggerReadme.md - DEBUG Documentation
**Audience:** Developers, testers, players who unlocked debug mode
**Content:**
- How to unlock debug console
- How to open debug console
- ALL debug commands with examples
- Command syntax and arguments
- Easter eggs and secret commands
- Troubleshooting debug issues
- Developer notes about debug system

**DO NOT INCLUDE:**
- General gameplay instructions
- Code architecture
- Non-debug features

**Reference format:**
```markdown
> 🎮 For gameplay info, see [GameplayReadme.md](GameplayReadme.md)
> 🤓 For code architecture, see [NerdReadme.md](NerdReadme.md)
```

---

## Update Decision Tree

### After code changes, ask:

**Did I add/change a GAMEPLAY feature?**
→ Update `GameplayReadme.md` ONLY

**Did I add/change the CODE ARCHITECTURE?**
→ Update `NerdReadme.md` ONLY

**Did I add/change DEBUG COMMANDS?**
→ Update `DebuggerReadme.md` ONLY
→ Add reference link to other readmes if needed

**Did I add/change KEYBOARD SHORTCUTS?**
→ Update `GameplayReadme.md` (player-facing keys)
→ Update `DebuggerReadme.md` (if debug-related like backtick)

**Did I add/change ACHIEVEMENTS?**
→ Update `GameplayReadme.md` ONLY

**Did I add/change CONFIG OPTIONS?**
→ Update `NerdReadme.md` (technical details)
→ Update `GameplayReadme.md` (if player-facing settings)

---

## File Ownership Summary

| Topic | GameplayReadme | NerdReadme | DebuggerReadme |
|-------|----------------|------------|----------------|
| How to play | ✅ | ❌ | ❌ |
| Controls/Keys | ✅ | ❌ | ❌ (except `) |
| Items/Recipes | ✅ | ❌ | ❌ |
| Achievements | ✅ | ❌ | ❌ |
| Debug commands | ❌ (ref only) | ❌ (ref only) | ✅ |
| File structure | ❌ | ✅ | ❌ |
| Architecture | ❌ | ✅ | ❌ |
| Config options | ❌ | ✅ | ❌ |
| API docs | ❌ | ✅ | ❌ |
| Easter eggs | ❌ | ❌ | ✅ |

---

## Reference Link Templates

When you need to reference another readme:

```markdown
<!-- In GameplayReadme.md -->
> 🐛 For debug commands and cheat codes, see [DebuggerReadme.md](DebuggerReadme.md)
> 🤓 For technical details, see [NerdReadme.md](NerdReadme.md)

<!-- In NerdReadme.md -->
> 🎮 For gameplay documentation, see [GameplayReadme.md](GameplayReadme.md)
> 🐛 For debug commands, see [DebuggerReadme.md](DebuggerReadme.md)

<!-- In DebuggerReadme.md -->
> 🎮 For gameplay info, see [GameplayReadme.md](GameplayReadme.md)
> 🤓 For code architecture, see [NerdReadme.md](NerdReadme.md)
```

---

## todo.md Updates (ALWAYS)

Regardless of which readme you update, ALWAYS update `todo.md`:
- Files Changed section with modified files
- Completed Today section when tasks finish
- Current Task status

---

## The Post-Code Ritual

After finishing code changes:

1. **Review** what you changed
2. **Identify** which readme(s) need updates
3. **Update** the appropriate readme(s) - NO DUPLICATION
4. **Add references** if content relates to other readmes
5. **Update** `todo.md` Files Changed
6. **Mark** task complete in `todo.md`

---

## Failure Protocol

If readmes have duplicated content:
1. STOP before ending session
2. Identify the duplication
3. Remove from the WRONG readme
4. Add reference link instead
5. Verify each readme stays in its domain

---

## The Mantra

> "One topic, one home. References connect the darkness."

---

## File Locations

- `GameplayReadme.md` - Project root
- `NerdReadme.md` - Project root
- `DebuggerReadme.md` - Project root
- `todo.md` - Project root
- This skill: `.claude/skills/readme-updater.md`
