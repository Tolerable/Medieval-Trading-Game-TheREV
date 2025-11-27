// ═══════════════════════════════════════════════════════════════
// 🌟 INITIAL ENCOUNTER SYSTEM - the mysterious stranger at dawn
// ═══════════════════════════════════════════════════════════════
// File Version: GameConfig.version.file
// conjured by Unity AI Lab - every story needs a beginning...
// ═══════════════════════════════════════════════════════════════
// When a new trader enters this world, they meet a hooded figure
// who speaks of shadows gathering and a destiny waiting to unfold
// ═══════════════════════════════════════════════════════════════

const InitialEncounterSystem = {
    // 🔧 CONFIG
    hasShownEncounter: false,
    encounterDelay: 1500, // ms after game start to show encounter

    // 📖 THE MYSTERIOUS STRANGER - your first encounter in this world
    mysteriousStranger: {
        id: 'mysterious_stranger_intro',
        name: 'Hooded Stranger',
        type: 'prophet',
        personality: 'mysterious',
        speakingStyle: 'cryptic',
        voice: 'onyx', // deep, ominous voice
        voiceInstructions: 'Speak slowly and deliberately. Your voice is ancient and knowing. Pause between sentences for dramatic effect.',
        context: 'introduction',
        location: 'the road',
        isEncounter: true,
        greetings: [
            "Ah... another soul drawn to this land by fate's cruel hand.",
            "The winds spoke of your arrival, young one.",
            "So... the prophecy stirs. Another piece moves upon the board."
        ]
    },

    // 🚀 INITIALIZE - called when game starts
    init() {
        console.log('🌟 InitialEncounterSystem: Awakened, waiting for new souls...');
    },

    // 🎭 TRIGGER INITIAL ENCOUNTER - called after character creation
    triggerInitialEncounter(playerName, startLocation) {
        // 🖤 only trigger ONCE per new game
        if (this.hasShownEncounter) {
            console.log('🌟 Initial encounter already shown this session');
            return;
        }

        this.hasShownEncounter = true;
        console.log(`🌟 Preparing initial encounter for ${playerName} at ${startLocation}...`);

        // 🌙 Delay for dramatic effect - let the player see the world first
        setTimeout(() => {
            this.showIntroductionSequence(playerName, startLocation);
        }, this.encounterDelay);
    },

    // 📖 INTRODUCTION SEQUENCE - the story begins
    showIntroductionSequence(playerName, startLocation) {
        // Pause time during this sequence
        if (typeof TimeSystem !== 'undefined' && !TimeSystem.isPaused) {
            TimeSystem.isPaused = true;
            this.timePausedByUs = true;
        }

        // 🖤 First, show a narrative text overlay
        const introText = this.getLocationIntro(startLocation);

        if (typeof ModalSystem !== 'undefined') {
            ModalSystem.show({
                title: '🌄 A New Dawn',
                content: `
                    <div style="font-style: italic; color: #c0c0d0; line-height: 1.8; font-size: 1.05em;">
                        <p style="margin-bottom: 1rem;">${introText}</p>
                        <p style="margin-bottom: 1rem;">You arrived here with little more than the clothes on your back and a handful of coins. The road behind you holds nothing but memories; the road ahead holds... everything.</p>
                        <p style="color: #a0a0c0;">As you take your first steps into the village square, you notice a hooded figure watching you from the shadows...</p>
                    </div>
                `,
                buttons: [
                    {
                        text: '🎭 Approach the Stranger',
                        className: 'primary',
                        onClick: () => {
                            ModalSystem.hide();
                            this.showStrangerEncounter(playerName);
                        }
                    },
                    {
                        text: '🚶 Ignore and Explore',
                        onClick: () => {
                            ModalSystem.hide();
                            this.skipEncounterButUnlockQuest();
                        }
                    }
                ]
            });
        } else {
            // 🖤 fallback - just unlock the quest
            this.unlockMainQuest();
        }
    },

    // 📍 Get location-specific intro text
    getLocationIntro(locationId) {
        const intros = {
            greendale: "The morning sun breaks through the mist over Greendale, a humble farming village nestled in the valley. Merchants have gathered in the small market square, their voices mingling with the bleating of sheep and the creak of wagon wheels.",
            ironhaven: "The forge fires of Ironhaven cast long shadows across the cobblestones. This mining town never truly sleeps - the rhythmic clang of hammers echoes through the streets even at dawn.",
            riverwood: "The River Elm whispers secrets as it flows past Riverwood. This peaceful settlement sits at a crossroads of trade, where fishermen's catches mingle with merchants' wares.",
            royal_capital: "The towering spires of the Royal Capital pierce the clouds. This is the heart of the realm, where fortunes are made and lost with each passing hour.",
            silk_road_inn: "The famous Silk Road Inn rises from the dusty crossroads, its windows glowing with warm light. Travelers from all corners of the realm gather here.",
            default: "The village awakens around you, its inhabitants beginning their daily routines. The smell of fresh bread mingles with the earthy scent of livestock."
        };

        return intros[locationId] || intros.default;
    },

    // 🎭 STRANGER ENCOUNTER - the mysterious figure speaks
    showStrangerEncounter(playerName) {
        const stranger = this.mysteriousStranger;
        const greeting = stranger.greetings[Math.floor(Math.random() * stranger.greetings.length)];

        if (typeof ModalSystem !== 'undefined') {
            ModalSystem.show({
                title: '🎭 The Hooded Stranger',
                content: `
                    <p style="margin-bottom: 1rem; color: #a0a0c0;">A figure in a dark cloak steps forward from the shadows. You cannot see their face beneath the hood, but you sense ancient eyes studying you.</p>
                    <p style="font-style: italic; color: #c0a0ff; font-size: 1.1em; margin-bottom: 1rem;">"${greeting}"</p>
                    <p style="margin-bottom: 1rem;">The stranger's voice is like wind through dead leaves.</p>
                    <p style="font-style: italic; color: #c0a0ff; font-size: 1.1em; margin-bottom: 1rem;">"Listen well, ${playerName}... Darkness gathers in the north. The Shadow Tower, long dormant, stirs once more. The wizard Malachar... he has returned."</p>
                    <p style="color: #f0a0a0; margin-bottom: 1rem;">The stranger pauses, and for a moment you feel a chill run down your spine.</p>
                    <p style="font-style: italic; color: #c0a0ff; font-size: 1.1em;">"You are more than a simple trader, young one. Fate has brought you here for a reason. Seek out Elder Morin in this village. He will guide your first steps on this path."</p>
                `,
                buttons: [
                    {
                        text: '❓ "Who are you?"',
                        className: 'secondary',
                        onClick: () => {
                            ModalSystem.hide();
                            this.showStrangerReveal(playerName);
                        }
                    },
                    {
                        text: '✅ "I will find the Elder."',
                        className: 'primary',
                        onClick: () => {
                            ModalSystem.hide();
                            this.completeEncounter(true);
                        }
                    }
                ]
            });
        }
    },

    // 🎭 STRANGER REVEAL - who is this mysterious figure?
    showStrangerReveal(playerName) {
        if (typeof ModalSystem !== 'undefined') {
            ModalSystem.show({
                title: '🎭 The Hooded Stranger',
                content: `
                    <p style="margin-bottom: 1rem;">The stranger chuckles softly, a sound like stones grinding together.</p>
                    <p style="font-style: italic; color: #c0a0ff; font-size: 1.1em; margin-bottom: 1rem;">"Who am I? A watcher. A keeper of memories. I have seen empires rise and fall, and I have seen the shadow grow and recede like the tide."</p>
                    <p style="margin-bottom: 1rem;">The hood tilts slightly, as if considering whether to say more.</p>
                    <p style="font-style: italic; color: #c0a0ff; font-size: 1.1em; margin-bottom: 1rem;">"Perhaps when you have proven yourself worthy, we shall meet again. Until then... trade well, ${playerName}. Build your fortune. You will need it for what is to come."</p>
                    <p style="color: #a0a0c0; font-style: italic;">Before you can respond, the stranger melts back into the shadows as if they were never there.</p>
                `,
                buttons: [
                    {
                        text: '✅ Continue',
                        className: 'primary',
                        onClick: () => {
                            ModalSystem.hide();
                            this.completeEncounter(true);
                        }
                    }
                ]
            });
        }
    },

    // 🖤 SKIP ENCOUNTER - player chose to ignore the stranger
    skipEncounterButUnlockQuest() {
        this.completeEncounter(false);

        // Add a message about the stranger disappearing
        if (typeof addMessage === 'function') {
            addMessage('💨 The hooded figure fades into the crowd before you can approach...');
            addMessage('📜 Perhaps speaking with the village elder would be wise.');
        }
    },

    // ✅ COMPLETE ENCOUNTER - unlock the main quest and resume game
    completeEncounter(talkedToStranger) {
        console.log('🌟 Initial encounter complete, talked to stranger:', talkedToStranger);

        // 📜 Unlock the main quest
        this.unlockMainQuest();

        // 🖤 Resume time if we paused it
        if (this.timePausedByUs && typeof TimeSystem !== 'undefined') {
            TimeSystem.isPaused = false;
            this.timePausedByUs = false;
        }

        // 📝 Add journal entry based on choice
        if (typeof addMessage === 'function') {
            if (talkedToStranger) {
                addMessage('📜 Quest Available: "A New Beginning" - Speak with Elder Morin');
                addMessage('🎭 The stranger\'s words echo in your mind... the Shadow Tower stirs.');
            } else {
                addMessage('📜 Quest Available: "A New Beginning" - Speak with Elder Morin');
            }
        }

        // 🏆 Track this moment for achievements
        if (typeof AchievementSystem !== 'undefined' && AchievementSystem.trackEvent) {
            AchievementSystem.trackEvent('initial_encounter_complete', { talkedToStranger });
        }

        console.log('🌟 Initial encounter system complete - main quest unlocked');
    },

    // 📜 UNLOCK MAIN QUEST - make the prologue quest available
    unlockMainQuest() {
        if (typeof QuestSystem !== 'undefined') {
            // Discover the main prologue quest
            if (QuestSystem.discoverQuest) {
                QuestSystem.discoverQuest('main_prologue');
                console.log('🌟 main_prologue quest discovered');
            } else if (QuestSystem.discoveredQuests && !QuestSystem.discoveredQuests.includes('main_prologue')) {
                QuestSystem.discoveredQuests.push('main_prologue');
                console.log('🌟 main_prologue added to discovered quests');
            }

            // Update quest UI if available
            if (QuestSystem.updateQuestLog) {
                QuestSystem.updateQuestLog();
            }
        } else {
            console.warn('🌟 QuestSystem not available - could not unlock main quest');
        }
    },

    // 🎮 FOR TESTING - manually trigger the encounter
    testEncounter(playerName = 'Test Trader') {
        this.hasShownEncounter = false;
        this.triggerInitialEncounter(playerName, 'greendale');
    }
};

// ═══════════════════════════════════════════════════════════════
// 🌍 GLOBAL ACCESS - for testing and debug commands
// ═══════════════════════════════════════════════════════════════
window.InitialEncounterSystem = InitialEncounterSystem;
window.testInitialEncounter = function(name) {
    InitialEncounterSystem.testEncounter(name);
};

// 🚀 INITIALIZE - awaken the system
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        InitialEncounterSystem.init();
    });
} else {
    InitialEncounterSystem.init();
}

console.log('🌟 Initial Encounter System loaded - the mysterious stranger awaits new souls...');
