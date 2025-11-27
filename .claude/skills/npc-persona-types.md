# NPC Persona Types Skill

## Purpose
Ensure consistent usage of NPC persona types when working with NPCDialogueSystem. Every NPC interaction must use the correct persona ID.

## Persona Type Constants

### Boss Personas (NPCDialogueSystem.bossPersonas)
| ID | Name | Voice | Used For |
|----|------|-------|----------|
| `dark_lord` | Malachar the Dark Lord | onyx | Shadow Tower boss |
| `frost_lord` | The Frost Lord | ash | Frozen Cave boss |
| `dragon` | Scorathax the Ancient | onyx | Deep Cavern boss |
| `alpha_wolf` | Grimfang | ballad | Forest Dungeon boss |
| `bandit_chief` | Scarhand Viktor | onyx | Bandit Camp boss |
| `goblin_king` | Griknak | fable | Goblin Warren boss |
| `smuggler_boss` | Captain Blackheart | dan | Smuggler's Cove boss |
| `necromancer` | The Necromancer | ash | Generic dungeon boss |
| `cultist_leader` | The High Priest | ash | Cult encounters |

### Merchant Personas (NPCDialogueSystem.merchantPersonas)
| ID | Voice | Used For |
|----|-------|----------|
| `friendly` | nova | Welcoming, fair traders |
| `greedy` | onyx | Gold-obsessed merchants |
| `shrewd` | sage | Calculating business types |
| `eccentric` | fable | Quirky, random sellers |
| `mysterious` | ash | Apothecaries, occult shops |
| `desperate` | echo | Struggling merchants |

## Usage Rules (MANDATORY)

### 1. Always use exact persona IDs
```javascript
// CORRECT
NPCDialogueSystem.generateDialogue('dark_lord', 'firstMeeting');
NPCDialogueSystem.generateBossDialogue('frost_lord', 'battle');

// WRONG - don't make up IDs
NPCDialogueSystem.generateDialogue('evil_boss', 'attack');
NPCDialogueSystem.generateBossDialogue('ice_monster', 'greeting');
```

### 2. Map game entities to persona IDs
When a boss or NPC is defined elsewhere, map its `personality` field to a valid persona ID:

```javascript
// In BOSS_ENCOUNTERS definition
malachar: {
    id: 'malachar',
    personality: 'dark_lord',  // Maps to NPCDialogueSystem.bossPersonas.dark_lord
    ...
}

// When calling dialogue system
const persona = boss.personality || boss.id;
NPCDialogueSystem.generateBossDialogue(persona, context, bossData);
```

### 3. Context types for bosses
| Context | When to use |
|---------|-------------|
| `firstMeeting` | Initial boss encounter |
| `battle` | During combat |
| `victory` | Boss wins (player dies) |
| `defeat` | Boss is defeated |

### 4. Fallback handling
Always handle cases where persona doesn't exist:
```javascript
const persona = NPCDialogueSystem.getPersona(npcType);
if (!persona) {
    console.warn(`Unknown persona: ${npcType}, using fallback`);
    // Use default behavior
}
```

## Function Signatures

### generateDialogue(npcType, context, options)
- `npcType`: string - Valid persona ID from bossPersonas or merchantPersonas
- `context`: string - Context for dialogue ('firstMeeting', 'battle', etc.)
- `options`: object - { voice, customContext, playerMessage, npcData }
- Returns: Promise<{ text, voice, npcType, isBoss }>

### generateBossDialogue(bossId, context, bossData)
- `bossId`: string - Valid boss persona ID
- `context`: string - Boss context ('firstMeeting', 'battle', 'defeat', 'victory')
- `bossData`: object - { name, voice, description, taunt }
- Returns: Promise<{ text, voice, npcType, isBoss }>

### generateInteractiveDialogue(npcType, context, options)
- Same as generateDialogue but includes command system
- `options.allowedCommands`: array - Commands NPC can use
- Returns: Promise<{ text, voice, commands, npcType }>

## Command Types for Interactive NPCs
```javascript
const allowedCommands = [
    'take_item',    // NPC takes item from player
    'give_item',    // NPC gives item to player
    'take_gold',    // NPC takes gold
    'give_gold',    // NPC gives gold
    'damage',       // NPC damages player
    'heal',         // NPC heals player
    'rep_up',       // Increase reputation
    'rep_down',     // Decrease reputation
    'start_quest',  // Start a quest
    'complete_quest', // Complete a quest
    'quest_item'    // Give quest item
];
```

## Pre-Implementation Checklist
Before using NPCDialogueSystem:
- [ ] Verify persona ID exists in bossPersonas or merchantPersonas
- [ ] Use correct context for the situation
- [ ] Pass required options (voice, npcData for bosses)
- [ ] Handle fallback for API failures
- [ ] Update todo.md with integration
