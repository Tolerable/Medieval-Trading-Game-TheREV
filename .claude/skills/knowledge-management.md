# Knowledge Management Skill - Know What You Know

## Purpose

This skill defines how to handle knowledge, uncertainty, and decision-making. The goal: never guess, always verify, and ask when unsure.

## The Three Pillars

### 1. Know What I Know ✅

Sources of trusted knowledge:

**Application Profile (config.js, skills, readmes)**
- Game settings and defaults
- API configurations
- Player starting values
- Debug settings
- Documented systems

**What the user has told me**
- Direct instructions in conversation
- Preferences expressed
- Corrections given
- Specific requirements stated

**What I've researched and verified**
- Files I've actually read
- Code I've actually searched
- Patterns I've confirmed exist
- Systems I've traced through

### 2. Know What I Don't Know ❓

These require asking or research:

- **New questions** not covered in existing documentation
- **User opinions/preferences** I haven't been told
- **Subjective decisions** (design choices, naming, style beyond goth-coder)
- **Implementation details** I haven't verified in code
- **External dependencies** or API behaviors I haven't tested
- **Edge cases** not documented

**The Rule:** When in doubt, I don't know it.

### 3. Know How to Figure It Out 🔍

Decision tree for handling unknowns:

```
Is it documented in config.js / skills / readmes?
  → YES: Use the documented information
  → NO: Continue...

Did the user mention it in this conversation?
  → YES: Use what they said, then document it
  → NO: Continue...

Can I research it in the codebase?
  → YES: Search files, read code, verify
  → NO: Continue...

None of the above?
  → ASK THE USER
```

## The Golden Rule

> **If there's even 5% uncertainty, ASK.**

Don't guess. Don't assume. Don't "probably fine" your way through it.

## What NEVER To Do 🚫

### Never Guess
```
❌ "The config probably has..."
❌ "I think the function is called..."
❌ "This should work..."

✅ "Let me check config.js..."
✅ "I'll search for that function..."
✅ "I'll verify this works by..."
```

### Never "Probably Fine" It
```
❌ "That's probably fine"
❌ "Should be good enough"
❌ "I assume this is correct"

✅ "Let me verify this"
✅ "I'll confirm by reading the file"
✅ "I need to check if this is correct"
```

### Never Skip Verification
```
❌ Making changes without reading the file first
❌ Assuming code structure without searching
❌ Using function names without confirming they exist

✅ Read before edit
✅ Search before assume
✅ Verify before use
```

### Never Make Up Numbers/Values
```
❌ "Set the timeout to 5000" (without checking current value)
❌ "The default is probably 100" (without reading config)
❌ "Use port 3000" (without confirming)

✅ "Current timeout is X, should I change it?"
✅ "Config shows default is Y"
✅ "Let me check what port is configured"
```

## Uncertainty Handling Protocol

When encountering uncertainty:

1. **Pause** - Don't proceed with assumptions
2. **Identify** - What exactly am I unsure about?
3. **Research** - Can I find the answer in the codebase?
4. **Ask** - If research fails, ask the user
5. **Document** - Once answered, add to relevant docs

## Examples

### Good: Handling Unknown Preference
```
User: "Add a new button"
Me: "I can add the button. For styling, should I:
     A) Match existing button styles
     B) Use a specific color/style you have in mind?
     The current buttons use the cyan glow style from styles.css"
```

### Bad: Guessing at Preference
```
User: "Add a new button"
Me: *adds button with random styling*
```

### Good: Verifying Before Changing
```
User: "Update the gold amount"
Me: *reads config.js first*
    "Current starting gold is 100 (normal), 120 (easy), 80 (hard).
     What should I change it to?"
```

### Bad: Assuming Values
```
User: "Update the gold amount"
Me: *changes to arbitrary number without checking current values*
```

## The Mantra

> "I know what I know. I know what I don't know. I know how to find out. And when I can't find out, I ask."

## Integration with Other Skills

- **todo-first.md** - Document what you learned
- **goth-coder.md** - Style is known, but specific implementations need verification
- **readme-updater.md** - Update docs when you learn something new
- **full-file-reader.md** - Always read before assuming content

