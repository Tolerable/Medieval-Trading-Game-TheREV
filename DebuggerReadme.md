# 🖤 DEBUGGER README - The Secret Arts of Game Manipulation 🖤
## Medieval Trading Game - Debug Console Documentation

**Version:** 0.7
**Last Updated:** 2025-11-28
**Access:** Unlocked via "Super Hacker" achievement OR backtick key (`)
**Total Commands:** 30

---

> *"Every developer needs a backdoor. This is yours."* - Unity AI Lab

---

## COMPLETE COMMAND LIST (A-Z)

All 30 debug commands in alphabetical order:

| # | Command | Description |
|---|---------|-------------|
| 1 | `advancetime <hours>` | Advance time by hours |
| 2 | `clear` | Clear the debug console |
| 3 | `clearinventory` | Clear player inventory |
| 4 | `clearleaderboard` | Clear all entries from the Hall of Champions |
| 5 | `encounter [type]` | Spawn random encounter |
| 6 | `gamestate` | Show current game state |
| 7 | `geecashnow` | Add 1000 gold (respects carry weight) |
| 8 | `givegold <amount>` | Add gold to player |
| 9 | `giveitem <itemId> [qty]` | Add item to inventory |
| 10 | `giveproperty <type>` | Give property to player |
| 11 | `heal` | Fully heal player |
| 12 | `help` | Show all available commands |
| 13 | `listachievements` | List all achievements |
| 14 | `listitems` | List all item IDs |
| 15 | `listlocations` | List all locations |
| 16 | `listnpctypes` | List all NPC encounter types |
| 17 | `merchant` | Spawn merchant encounter |
| 18 | `refreshleaderboard` | Force refresh Hall of Champions display |
| 19 | `reload` | Reload the game |
| 20 | `resetachievements` | Reset all achievements |
| 21 | `setgold <amount>` | Set gold to exact amount |
| 22 | `setstat <stat> <value>` | Set player stat value |
| 23 | `showgold` | Show gold from all sources |
| 24 | `showleaderboard` | Show all leaderboard entries in console |
| 25 | `smuggler` | Spawn smuggler encounter (rare items) |
| 26 | `teleport <locationId>` | Teleport to location |
| 27 | `testachievement` | Test achievement popup (unlocks 3 random) |
| 28 | `trader` | Spawn random trader encounter |
| 29 | `unlockachievement <id>` | Unlock specific achievement |
| 30 | `unlockall` | Unlock ALL achievements (triggers Super Hacker!) |
| 31 | `verifyeconomy` | Verify circular economy chains |

---

## TABLE OF CONTENTS

1. [Complete Command List](#complete-command-list-a-z)
2. [Unlocking the Debug Console](#unlocking-the-debug-console)
3. [Opening the Console](#opening-the-console)
4. [Gold & Economy Commands](#gold--economy-commands)
5. [Travel & Location Commands](#travel--location-commands)
6. [Time Commands](#time-commands)
7. [Achievement Commands](#achievement-commands)
8. [Leaderboard Commands](#leaderboard-commands)
9. [Item & Inventory Commands](#item--inventory-commands)
10. [NPC & Encounter Commands](#npc--encounter-commands)
11. [Player Stats Commands](#player-stats-commands)
12. [System Commands](#system-commands)
13. [Easter Eggs](#easter-eggs)

---

## UNLOCKING THE DEBUG CONSOLE

The debug console is hidden by default. There are two ways to unlock it:

### Method 1: Achievement Unlock (Legitimate)
Earn the **"Super Hacker"** ULTRA achievement by unlocking ALL other achievements (including the 11 hidden ones). This is the intended way to access debug mode.

### Method 2: Direct Access (Developer Mode)
Press the **backtick key (`)** at any time to open the debug console directly. This bypasses the achievement requirement.

---

## OPENING THE CONSOLE

Once unlocked, you can open the debug console by:

1. **Pressing backtick (`)** - Opens/focuses the command input
2. **Clicking the 🐛 Debooger button** in the panels panel (if visible)
3. **Using keyboard shortcut** - Backtick always works

The console appears as a dark overlay with:
- Command input field at the bottom
- Output log showing previous commands and results
- Auto-scroll to most recent output
- Max 500 entries before cleanup

---

## GOLD & ECONOMY COMMANDS

### geecashnow
The classic cheat code. Adds 1000 gold (respects carry weight).
```
> geecashnow
💰 Added 1000 gold! Total: 1100
```

### givegold <amount>
Adds gold to player inventory.
```
> givegold 500
💰 Added 500 gold! Total: 1500
```

### setgold <amount>
Sets your gold to an exact amount.
```
> setgold 10000
💰 Gold set to 10000
```

### showgold
Shows gold from all sources (inventory, bank, properties).
```
> showgold
💰 Gold Summary:
  Inventory: 1,500
  Bank: 5,000
  Total: 6,500
```

### giveproperty <type>
Gives a property to the player.
```
> giveproperty warehouse
🏠 Property added: Warehouse
```

### verifyeconomy
Verifies circular economy chains are functioning.
```
> verifyeconomy
✅ Economy verification complete
```

---

## TRAVEL & LOCATION COMMANDS

### teleport <location_id>
Instantly travel to any location without time passing or stamina cost.
```
> teleport capital
🗺️ Teleported to The Royal Capital

> teleport greendale
🗺️ Teleported to Greendale Village
```

**Valid Location IDs:**
- `capital` - The Royal Capital
- `greendale` - Greendale Village
- `ironhaven` - Ironhaven Fortress
- `jade_harbor` - Jade Harbor
- `mistwood` - Mistwood Forest
- `dragons_peak` - Dragon's Peak
- `frozen_north` - Frozen North
- And 20+ more (use `listlocations` to see all)

### listlocations
Lists all available location IDs.
```
> listlocations
📍 Available locations:
  - capital (The Royal Capital)
  - greendale (Greendale Village)
  - ironhaven (Ironhaven Fortress)
  ...
```

---

## TIME COMMANDS

### advancetime <hours>
Advances game time by specified hours.
```
> advancetime 24
⏰ Advanced time by 24 hours. It's now Day 2, 08:00

> advancetime 168
⏰ Advanced time by 168 hours. It's now Day 8, 08:00
```

---

## ACHIEVEMENT COMMANDS

### unlockachievement <achievement_id>
Unlocks a specific achievement.
```
> unlockachievement first_steps
🏆 Unlocked: First Steps - Begin your trading journey
```

### unlockall
Unlocks ALL achievements (including hidden ones). Triggers Super Hacker!
```
> unlockall
🏆 All 72 achievements unlocked! You absolute legend.
```

### resetachievements
Resets all achievement progress (cannot be undone!).
```
> resetachievements
⚠️ All achievements reset. Starting fresh...
```

### listachievements
Lists all achievements and their status.
```
> listachievements
🏆 Achievements: 45/72 unlocked
  [x] First Steps
  [x] Pocket Change
  [ ] Road Warrior
  ...
```

### testachievement
Tests achievement popup by unlocking 3 random locked achievements.
```
> testachievement
🏆 Testing achievement popups... Unlocking 3 random achievements!
```

---

## LEADERBOARD COMMANDS

### clearleaderboard
Clears all entries from the Hall of Champions.
```
> clearleaderboard
🏆 Hall of Champions cleared!
```

### refreshleaderboard
Force refresh the Hall of Champions display.
```
> refreshleaderboard
🔄 Leaderboard refreshed!
```

### showleaderboard
Show all leaderboard entries in the debug console.
```
> showleaderboard
🏆 Leaderboard entries:
  1. Merchant King - 1,500,000 gold
  2. Trade Master - 1,200,000 gold
  ...
```

---

## ITEM & INVENTORY COMMANDS

### giveitem <item_id> [quantity]
Adds items to your inventory.
```
> giveitem iron_sword 1
📦 Added 1x Iron Sword to inventory

> giveitem bread 50
📦 Added 50x Bread to inventory

> giveitem gold_bar 10
📦 Added 10x Gold Bar to inventory
```

### listitems
Lists all valid item IDs.
```
> listitems
📦 Available items (177 total):
  Resources: wood, stone, iron_ore, copper_ore, coal...
  Food: bread, meat, cheese, fish, vegetables...
  Weapons: iron_sword, steel_sword, bow, crossbow...
  ...
```

### clearinventory
Removes ALL items from inventory (keeps gold).
```
> clearinventory
📦 Inventory cleared! Hope you didn't need that stuff.
```

---

## NPC & ENCOUNTER COMMANDS

### encounter [type]
Triggers a random encounter immediately, optionally of a specific type.
```
> encounter
🎭 Random encounter triggered!
  Type: Wandering Merchant
  Name: Marcus the Trader

> encounter bandit
🎭 Spawned bandit encounter!
```

### trader
Spawns a random trader encounter.
```
> trader
🎭 Spawned trader encounter: Elena the Peddler
```

### merchant
Spawns a merchant encounter.
```
> merchant
🎭 Spawned merchant encounter: Thomas the Trader
```

### smuggler
Spawns a smuggler encounter (rare items).
```
> smuggler
🎭 Spawned smuggler encounter: Shadow Dealer
```

### listnpctypes
Lists all available NPC encounter types.
```
> listnpctypes
👤 NPC Types:
  merchant, blacksmith, innkeeper, guard
  bandit, thief, traveler, pilgrim
  noble, peasant, courier, smuggler
```

---

## PLAYER STATS COMMANDS

### heal
Fully restores health, hunger, thirst, and energy.
```
> heal
💚 Fully healed! Health, hunger, thirst, energy all maxed.
```

### setstat <stat> <value>
Sets a specific stat value.
```
> setstat health 100
💚 Health set to 100

> setstat strength 10
💪 Strength set to 10
```

---

## SYSTEM COMMANDS

### help
Shows all available commands.
```
> help
📋 Debug Commands:
  geecashnow - Add 1000 gold
  givegold <amount> - Add gold
  ...
```

### clear
Clears the debug console output.
```
> clear
(Console cleared)
```

### gamestate
Shows current game state information.
```
> gamestate
📊 Game State:
  Location: The Royal Capital
  Gold: 1,500
  Day: 5
  Time: 14:30
  ...
```

### reload
Reloads the page (same as F5).
```
> reload
🔄 Reloading...
```

---

## EASTER EGGS

### Secret Commands

These hidden commands exist for the truly dedicated:

| Command | Effect |
|---------|--------|
| `iddqd` | Classic DOOM god mode reference |
| `idkfa` | Classic DOOM all weapons reference |
| `konami` | ↑↑↓↓←→←→BA - Something special |
| `matrix` | "There is no spoon" - Visual effect |
| `unity` | Shows a special message from the devs |
| `42` | The answer to everything |
| `xyzzy` | Classic adventure game reference |

### Developer Messages

Type these for fun responses:
- `hello` - Unity says hi
- `bye` - Unity says goodbye
- `love` - Unity appreciates you
- `hate` - Unity is hurt
- `coffee` - Unity needs caffeine

---

## TROUBLESHOOTING

### Console Not Opening?
1. Make sure you're not in a text input field
2. Try clicking somewhere on the game first
3. Press backtick (`) - it's next to the 1 key
4. Check if "Super Hacker" achievement is unlocked

### Command Not Working?
1. Check spelling (commands are case-insensitive)
2. Make sure you have the right number of arguments
3. Check if the ID exists (use `items`, `locations`, etc.)
4. Some commands require confirmation

### Game Broke After Debug?
1. Try `heal` to restore stats
2. Use `save` then `reload`
3. Worst case: `reset confirm` (loses ALL progress)

---

## NOTES FOR DEVELOPERS

### Adding New Commands

Commands are defined in `src/js/debug/debug-command-system.js`:

```javascript
this.registerCommand('mycommand', 'Description here', (args) => {
    // Command logic
    return '✨ Command executed!';
});
```

### Debug Console Files

| File | Purpose |
|------|---------|
| `debug-system.js` | Console UI and output capture |
| `debug-command-system.js` | Command registration and execution |
| `debug-overlay.js` | Visual overlay components |

### Console Log Capture

All `console.log`, `console.warn`, and `console.error` calls are captured and displayed in the debug console with timestamps.

---

## DISCLAIMER

Using debug commands may:
- Break achievement progression
- Corrupt save files (rare)
- Make the game too easy
- Spoil the intended experience

**Use responsibly!** Or don't. We're not your parents. 🖤

---

*"With great power comes great responsibility... but also the ability to spawn 1000 gold bars."* - Unity AI Lab

---

**Files Referenced:**
- `src/js/debug/debug-system.js`
- `src/js/debug/debug-command-system.js`
- `src/js/core/debug-system.js`

**See Also:**
- [GameplayReadme.md](GameplayReadme.md) - Full game documentation
- [NerdReadme.md](NerdReadme.md) - Developer documentation
- [todo.md](todo.md) - Current development tasks
