/**
 * Tutorial NPCs - Guide and helper characters for tutorial
 * These are static NPCs with scripted dialogue (not procedural)
 */

const TutorialNPCs = {
    // Main Tutorial Guide - appears throughout tutorial
    tutorial_guide: {
        id: 'tutorial_guide',
        name: 'Elder Aldric',
        type: 'guide',
        personality: 'patient',
        speakingStyle: 'wise',
        voice: 'elder_male',
        description: 'A wise village elder who guides new traders through their first steps.',
        isStatic: true,  // Never despawns
        locations: ['tutorial_village', 'tutorial_town'],  // Where they can appear

        dialogues: {
            welcome: {
                text: "Welcome, young trader! I am Elder Aldric. Let me teach you the ways of commerce and survival in these lands.",
                trigger: 'tutorial_start',
                nextStep: 'tutorial_0_1'
            },
            market_intro: {
                text: "The Market is where you'll buy and sell goods. Click the Market button to see what's available.",
                trigger: 'tutorial_1_1',
                highlightElement: '#market-btn'
            },
            trading_tip: {
                text: "Buy low, sell high - that's the trader's creed. Goods are cheaper where they're made, and valuable where they're needed.",
                trigger: 'tutorial_1_3'
            },
            travel_intro: {
                text: "To travel between locations, use the Map. Each journey takes time and may cost gold.",
                trigger: 'tutorial_2_1',
                highlightElement: '#map-btn'
            },
            combat_intro: {
                text: "Sometimes the road is dangerous. Learn to defend yourself at the Training Grounds.",
                trigger: 'tutorial_4_1'
            },
            farewell: {
                text: "You've learned well! Go forth and make your fortune. The world awaits!",
                trigger: 'tutorial_complete'
            }
        },

        // Responses to player actions
        reactions: {
            first_purchase: "Excellent! You've made your first purchase. Now find somewhere to sell it for profit.",
            first_sale: "Well done! You've completed your first trade. The profit is yours to keep.",
            first_travel: "You've taken your first steps into the wider world. Stay alert on the roads.",
            first_combat: "You survived! Combat is risky, but sometimes necessary."
        }
    },

    // Village Merchant - simple trading NPC
    tutorial_merchant: {
        id: 'tutorial_merchant',
        name: 'Martha',
        type: 'merchant',
        personality: 'friendly',
        speakingStyle: 'casual',
        voice: 'female_young',
        description: 'A cheerful village merchant who sells basic supplies.',
        isStatic: true,
        locations: ['tutorial_village'],
        canTrade: true,

        inventory: {
            bread: 20,
            water: 30,
            herbs: 10
        },
        gold: 100,

        greetings: [
            "Welcome to my shop! Looking for supplies?",
            "Hello there! Everything's fresh today.",
            "A new face! Let me know if you need anything."
        ]
    },

    // Town Buyer - pays premium for goods
    tutorial_buyer: {
        id: 'tutorial_buyer',
        name: 'Merchant Godfrey',
        type: 'merchant',
        personality: 'businesslike',
        speakingStyle: 'formal',
        voice: 'male_middle',
        description: 'A wealthy town merchant always looking to buy goods from travelers.',
        isStatic: true,
        locations: ['tutorial_town'],
        canTrade: true,

        inventory: {
            weapons: 5,
            armor: 3
        },
        gold: 500,

        greetings: [
            "Ah, a trader! Show me what you've brought.",
            "I pay fair prices for quality goods.",
            "The town always needs supplies. What have you got?"
        ],

        // Pays premium for tutorial goods
        buyPrices: {
            bread: 5,
            herbs: 7,
            timber: 8
        }
    },

    // Combat Trainer
    tutorial_trainer: {
        id: 'tutorial_trainer',
        name: 'Sergeant Kira',
        type: 'trainer',
        personality: 'stern',
        speakingStyle: 'military',
        voice: 'female_strong',
        description: 'A veteran soldier who trains new fighters in the basics of combat.',
        isStatic: true,
        locations: ['tutorial_arena'],

        dialogues: {
            intro: {
                text: "So you want to learn to fight? Good. The roads aren't safe for those who can't defend themselves.",
                trigger: 'tutorial_4_1'
            },
            combat_basics: {
                text: "Combat is simple: Attack to deal damage, Defend to reduce incoming damage, or use Items if you need healing.",
                trigger: 'tutorial_4_2'
            },
            victory: {
                text: "Not bad! You've got potential. Keep practicing and you might survive out there.",
                trigger: 'combat_victory'
            }
        }
    },

    // Woodcutter in forest
    tutorial_woodcutter: {
        id: 'tutorial_woodcutter',
        name: 'Old Tom',
        type: 'gatherer',
        personality: 'gruff',
        speakingStyle: 'simple',
        voice: 'male_old',
        description: 'A weathered woodcutter who knows the forest well.',
        isStatic: true,
        locations: ['tutorial_forest'],
        canTrade: true,

        inventory: {
            timber: 15,
            herbs: 5
        },
        gold: 30,

        greetings: [
            "Hmph. What brings you to the woods?",
            "Need timber? I've got some to spare.",
            "Watch your step. Forest can be tricky."
        ]
    }
};

// Get NPC by ID
function getTutorialNPC(npcId) {
    return TutorialNPCs[npcId] || null;
}

// Get all NPCs for a location
function getTutorialNPCsForLocation(locationId) {
    return Object.values(TutorialNPCs).filter(npc =>
        npc.locations && npc.locations.includes(locationId)
    );
}

// Get dialogue for trigger
function getTutorialDialogue(npcId, trigger) {
    const npc = TutorialNPCs[npcId];
    if (!npc || !npc.dialogues) return null;

    for (const [key, dialogue] of Object.entries(npc.dialogues)) {
        if (dialogue.trigger === trigger) {
            return dialogue;
        }
    }
    return null;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TutorialNPCs, getTutorialNPC, getTutorialNPCsForLocation, getTutorialDialogue };
}
