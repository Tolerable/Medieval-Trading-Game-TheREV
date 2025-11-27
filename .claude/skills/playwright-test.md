# Playwright Testing Skill

Run Playwright tests after making code changes to ensure the game still works.

## When to Use

After making changes to:
- JavaScript files (game logic, UI, systems)
- HTML structure (index.html)
- CSS that affects visibility/display

## How to Test

### Quick Test (New Game Flow)
```bash
cd "C:\Users\gfour\OneDrive\Desktop\Trader v0.5" && npx playwright test new-game.spec.js
```

### Debug Test (Check for JS Errors)
```bash
cd "C:\Users\gfour\OneDrive\Desktop\Trader v0.5" && npx playwright test debug.spec.js
```

### Run All Tests
```bash
cd "C:\Users\gfour\OneDrive\Desktop\Trader v0.5" && npm test
```

### Run with Visible Browser (Debug Mode)
```bash
cd "C:\Users\gfour\OneDrive\Desktop\Trader v0.5" && npx playwright test --headed
```

## Test Files

- `tests/new-game.spec.js` - Tests New Game button, setup panel, difficulty options
- `tests/debug.spec.js` - Captures console errors and checks global exports

## What the Tests Check

1. **Loading completes** - LoadingManager.isComplete === true
2. **startNewGame available** - window.startNewGame is a function
3. **New Game works** - Clicking button hides menu, shows setup panel
4. **Difficulty options visible** - Radio buttons for easy/normal/hard
5. **Exit returns to menu** - Cancel button works

## In-Game Debugger

The game has a built-in debug console. Playwright tests can interact with it:
- Press ` (backtick) to open debug command input
- Use the in-game DEBUG button (bottom-right) to toggle console
- DebugSystem captures all console.log/warn/error

## Common Issues

### "Identifier already declared" errors
Check for duplicate `const` declarations between:
- `src/js/core/game.js`
- Separate system files like `key-bindings.js`, `time-system.js`

### CORS/Network errors (can be ignored)
JSONBin API requires proper headers - these are filtered in tests.
