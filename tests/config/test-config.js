/**
 * PLAYWRIGHT TEST CONFIGURATION
 * Toggle which test suites run with simple true/false flags
 *
 * ALL TESTS DISABLED FOR CI/CD - Deploy only, no testing
 * Set any to true to enable those tests
 */

module.exports = {
  // ═══════════════════════════════════════════════════════════════
  // CORE GAME TESTS - ALL DISABLED
  // ═══════════════════════════════════════════════════════════════

  loadingTests: false,
  newGameTests: false,
  mainMenuTests: false,
  gameFlowTests: true,  // Enabled - tests now handle full intro sequence

  // ═══════════════════════════════════════════════════════════════
  // DEBOOGER & CHEAT COMMAND TESTS - ALL DISABLED
  // ═══════════════════════════════════════════════════════════════

  deboogerCommandTests: false,
  goldCommands: false,
  itemCommands: false,
  statCommands: false,
  worldCommands: false,
  questCommands: false,
  encounterCommands: false,
  utilityCommands: false,
  achievementCommands: false,

  // ═══════════════════════════════════════════════════════════════
  // PANEL TESTS - ALL DISABLED
  // ═══════════════════════════════════════════════════════════════

  panelTests: false,

  panels: {
    inventory: false,
    character: false,
    market: false,
    travel: false,
    map: false,
    quests: false,
    achievements: false,
    properties: false,
    financial: false,
    people: false,
    settings: false,
    messageLog: false,
    location: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // KEYBINDING TESTS - DISABLED
  // ═══════════════════════════════════════════════════════════════

  keybindingTests: false,

  // ═══════════════════════════════════════════════════════════════
  // FEATURE TESTS - ALL DISABLED
  // ═══════════════════════════════════════════════════════════════

  tradingTests: false,
  travelTests: false,
  questTests: false,
  achievementTests: false,
  saveLoadTests: false,
  characterCreationTests: false,
  timeSystemTests: false,

  // ═══════════════════════════════════════════════════════════════
  // ADDITIONAL TEST SUITES - ALL DISABLED
  // ═══════════════════════════════════════════════════════════════

  settingsTests: false,
  uiElementsTests: false,
  comprehensiveUiTests: false,

  // ═══════════════════════════════════════════════════════════════
  // TEST SETTINGS
  // ═══════════════════════════════════════════════════════════════

  loadTimeout: 30000,
  actionDelay: 200,
  screenshotOnFailure: true,
  verboseLogging: false,
  skipFullGameTests: true,
};
