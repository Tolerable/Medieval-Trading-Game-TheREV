/**
 * Tutorial Manager - Orchestrates the tutorial experience
 * Coordinates between quests, NPCs, world, and UI
 */

class TutorialManager {
    constructor() {
        this.isActive = false;
        this.currentStep = null;
        this.completedSteps = new Set();
        this.tutorialState = {};
        this.highlightedElement = null;
        this.tutorialOverlay = null;

        // Bind event handlers
        this._onQuestComplete = this._onQuestComplete.bind(this);
        this._onUIAction = this._onUIAction.bind(this);
    }

    /**
     * Initialize and start tutorial mode
     */
    start() {
        if (this.isActive) return;

        console.log('[TutorialManager] Starting tutorial...');
        this.isActive = true;
        this.currentStep = 'tutorial_0_1';
        this.completedSteps.clear();

        // Set tutorial flag on game state
        if (window.GameState) {
            window.GameState.inTutorial = true;
        }

        // Register event listeners
        document.addEventListener('quest-completed', this._onQuestComplete);
        document.addEventListener('ui-action', this._onUIAction);

        // Initialize tutorial world
        this._loadTutorialWorld();

        // Spawn guide NPC
        this._spawnGuideNPC();

        // Show welcome dialogue
        this._triggerDialogue('tutorial_guide', 'welcome');

        // Emit tutorial started event
        document.dispatchEvent(new CustomEvent('tutorial-started'));
    }

    /**
     * End tutorial and transition to main game
     */
    complete() {
        if (!this.isActive) return;

        console.log('[TutorialManager] Tutorial complete!');
        this.isActive = false;
        this.currentStep = null;

        // Clear tutorial flag
        if (window.GameState) {
            window.GameState.inTutorial = false;
        }

        // Remove event listeners
        document.removeEventListener('quest-completed', this._onQuestComplete);
        document.removeEventListener('ui-action', this._onUIAction);

        // Clear any highlights
        this.clearHighlight();

        // Show completion dialogue
        this._triggerDialogue('tutorial_guide', 'farewell');

        // Emit tutorial complete event
        document.dispatchEvent(new CustomEvent('tutorial-complete'));

        // Save completion to localStorage
        localStorage.setItem('tutorial_completed', 'true');

        // Transition to main game
        this._transitionToMainGame();
    }

    /**
     * Skip tutorial (for returning players)
     */
    skip() {
        console.log('[TutorialManager] Tutorial skipped');
        this.isActive = false;
        localStorage.setItem('tutorial_skipped', 'true');
        document.dispatchEvent(new CustomEvent('tutorial-skipped'));
        this._transitionToMainGame();
    }

    /**
     * Advance to next tutorial step
     */
    advanceStep(nextStepId) {
        if (!this.isActive) return;

        // Mark current step complete
        if (this.currentStep) {
            this.completedSteps.add(this.currentStep);
        }

        this.currentStep = nextStepId;
        console.log(`[TutorialManager] Advanced to step: ${nextStepId}`);

        // Check if tutorial is complete
        if (nextStepId === 'tutorial_complete') {
            this.complete();
            return;
        }

        // Update UI for new step
        this._updateStepUI(nextStepId);

        // Emit step change event
        document.dispatchEvent(new CustomEvent('tutorial-step-changed', {
            detail: { step: nextStepId }
        }));
    }

    /**
     * Highlight a UI element for the current step
     */
    highlightElement(selector, message = null) {
        this.clearHighlight();

        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`[TutorialManager] Element not found: ${selector}`);
            return;
        }

        // Add highlight class
        element.classList.add('tutorial-highlight');
        this.highlightedElement = element;

        // Create tooltip if message provided
        if (message) {
            this._showTooltip(element, message);
        }

        // Scroll element into view if needed
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Clear any active highlight
     */
    clearHighlight() {
        if (this.highlightedElement) {
            this.highlightedElement.classList.remove('tutorial-highlight');
            this.highlightedElement = null;
        }
        this._hideTooltip();
    }

    /**
     * Check if a specific step is completed
     */
    isStepCompleted(stepId) {
        return this.completedSteps.has(stepId);
    }

    /**
     * Get current tutorial progress (0-100)
     */
    getProgress() {
        const totalSteps = 23; // From tutorial-quests.js
        return Math.round((this.completedSteps.size / totalSteps) * 100);
    }

    // ============ Private Methods ============

    _loadTutorialWorld() {
        // Restrict player to tutorial locations
        if (window.TutorialWorld) {
            const tutorialLocations = Object.keys(window.TutorialWorld);
            if (window.GameWorld) {
                window.GameWorld.setAccessibleLocations(tutorialLocations);
            }
        }

        // Set starting location
        if (window.GameState) {
            window.GameState.currentLocation = 'tutorial_village';
        }
    }

    _spawnGuideNPC() {
        if (window.TutorialNPCs && window.NPCSystem) {
            const guide = window.TutorialNPCs.tutorial_guide;
            window.NPCSystem.spawnStaticNPC(guide);
        }
    }

    _triggerDialogue(npcId, dialogueKey) {
        if (window.TutorialNPCs && window.DialogueSystem) {
            const npc = window.TutorialNPCs[npcId];
            if (npc && npc.dialogues && npc.dialogues[dialogueKey]) {
                const dialogue = npc.dialogues[dialogueKey];
                window.DialogueSystem.show({
                    speaker: npc.name,
                    text: dialogue.text,
                    portrait: npc.id
                });

                // Highlight element if specified
                if (dialogue.highlightElement) {
                    this.highlightElement(dialogue.highlightElement);
                }
            }
        }
    }

    _updateStepUI(stepId) {
        // Parse step ID to determine what to highlight
        const stepParts = stepId.split('_');
        const act = parseInt(stepParts[1]);

        switch (act) {
            case 0: // UI Basics
                // Highlight relevant UI elements based on step
                break;
            case 1: // Trading
                if (stepId.includes('market')) {
                    this.highlightElement('#market-btn', 'Click to open the Market');
                }
                break;
            case 2: // Travel
                if (stepId.includes('map')) {
                    this.highlightElement('#map-btn', 'Click to open the Map');
                }
                break;
            case 4: // Combat
                // Combat-specific highlights
                break;
        }
    }

    _showTooltip(element, message) {
        this._hideTooltip();

        const tooltip = document.createElement('div');
        tooltip.className = 'tutorial-tooltip';
        tooltip.textContent = message;
        tooltip.id = 'tutorial-tooltip';

        // Position near element
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.left = `${rect.right + 10}px`;
        tooltip.style.top = `${rect.top}px`;

        document.body.appendChild(tooltip);
    }

    _hideTooltip() {
        const existing = document.getElementById('tutorial-tooltip');
        if (existing) {
            existing.remove();
        }
    }

    _transitionToMainGame() {
        // Unlock all locations
        if (window.GameWorld) {
            window.GameWorld.setAccessibleLocations(null); // null = all
        }

        // Set player to starting main game location
        if (window.GameState) {
            window.GameState.currentLocation = 'greendale_village';
        }

        // Trigger main quest unlock
        document.dispatchEvent(new CustomEvent('unlock-main-quest'));
    }

    _onQuestComplete(event) {
        const questId = event.detail?.questId;
        if (!questId || !questId.startsWith('tutorial_')) return;

        // Find next step from quest data
        if (window.TutorialQuests) {
            const quest = Object.values(window.TutorialQuests).find(q => q.id === questId);
            if (quest && quest.nextQuest) {
                this.advanceStep(quest.nextQuest);
            } else if (quest && quest.id === 'tutorial_5_3') {
                // Last quest
                this.advanceStep('tutorial_complete');
            }
        }
    }

    _onUIAction(event) {
        const action = event.detail?.action;
        if (!this.isActive || !action) return;

        // Track UI actions for objectives
        const uiObjectives = {
            'open_market': 'tutorial_1_1',
            'open_inventory': 'tutorial_0_2',
            'open_map': 'tutorial_2_1',
            'open_character': 'tutorial_0_3'
        };

        if (uiObjectives[action] === this.currentStep) {
            // UI action matches current objective
            document.dispatchEvent(new CustomEvent('objective-completed', {
                detail: { type: 'ui_action', action: action }
            }));
        }
    }
}

// Singleton instance
const tutorialManager = new TutorialManager();

// Check if should auto-start tutorial
function checkTutorialStatus() {
    const completed = localStorage.getItem('tutorial_completed');
    const skipped = localStorage.getItem('tutorial_skipped');

    if (!completed && !skipped) {
        // Show tutorial prompt
        return 'prompt';
    }
    return 'skip';
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TutorialManager, tutorialManager, checkTutorialStatus };
}
