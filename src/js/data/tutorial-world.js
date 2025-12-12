/**
 * Tutorial World Data - Isolated tutorial locations
 * 5 locations: village, forest, town, arena, dungeon
 * Pre-configured prices guarantee profit on trading quests
 */

const TutorialWorld = {
    // Tutorial Village - Starting area
    tutorial_village: {
        id: 'tutorial_village',
        name: 'Haven Village',
        region: 'tutorial',
        type: 'village',
        description: 'A peaceful village where new traders begin their journey. The elder provides guidance to aspiring merchants.',
        population: 150,
        marketSize: 'small',
        travelCost: { base: 0 },
        connections: ['tutorial_forest'],
        mapPosition: { x: 150, y: 400 },
        sells: ['bread', 'water', 'herbs'],  // Cheap here
        buys: ['timber', 'ore'],              // Needs these
        npcs: ['tutorial_guide', 'villager', 'trader'],
        tutorialPrices: {
            bread: { buy: 2, sell: 1 },
            water: { buy: 1, sell: 1 },
            herbs: { buy: 3, sell: 2 }
        }
    },

    // Tutorial Forest - Travel destination, resource gathering
    tutorial_forest: {
        id: 'tutorial_forest',
        name: 'Whisperwood',
        region: 'tutorial',
        type: 'forest',
        description: 'A small forest path connecting the village to the town. Timber and herbs can be gathered here.',
        population: 0,
        marketSize: 'tiny',
        travelCost: { base: 5 },
        connections: ['tutorial_village', 'tutorial_town'],
        mapPosition: { x: 350, y: 300 },
        sells: ['timber', 'herbs'],
        buys: [],
        npcs: ['woodcutter'],
        gatheringDifficulty: 0.5,  // Easy gathering for tutorial
        tutorialPrices: {
            timber: { buy: 5, sell: 3 },
            herbs: { buy: 4, sell: 2 }
        }
    },

    // Tutorial Town - Trading destination (guaranteed profit)
    tutorial_town: {
        id: 'tutorial_town',
        name: 'Markethold',
        region: 'tutorial',
        type: 'city',
        description: 'A bustling market town eager for goods from the village. Traders can make good profit selling supplies here.',
        population: 500,
        marketSize: 'medium',
        travelCost: { base: 10 },
        connections: ['tutorial_forest', 'tutorial_arena'],
        mapPosition: { x: 550, y: 200 },
        sells: ['weapons', 'armor'],
        buys: ['bread', 'herbs', 'timber'],  // Pays premium for village goods
        npcs: ['merchant', 'guard', 'trader'],
        tutorialPrices: {
            bread: { buy: 8, sell: 5 },    // Sells bread for 5x village price
            herbs: { buy: 10, sell: 7 },   // Good profit on herbs
            timber: { buy: 12, sell: 8 }   // Premium for timber
        }
    },

    // Tutorial Arena - Combat training
    tutorial_arena: {
        id: 'tutorial_arena',
        name: 'Training Grounds',
        region: 'tutorial',
        type: 'arena',
        description: 'A safe arena where new fighters learn the basics of combat against practice dummies and weak opponents.',
        population: 50,
        marketSize: 'tiny',
        travelCost: { base: 5 },
        connections: ['tutorial_town', 'tutorial_dungeon'],
        mapPosition: { x: 750, y: 300 },
        sells: ['weapons', 'armor', 'potions'],
        buys: [],
        npcs: ['combat_trainer', 'guard'],
        tutorialPrices: {
            weapons: { buy: 20, sell: 15 },
            armor: { buy: 25, sell: 18 },
            potions: { buy: 10, sell: 8 }
        },
        tutorialEnemies: ['training_dummy', 'weak_bandit']
    },

    // Tutorial Dungeon - Final boss area
    tutorial_dungeon: {
        id: 'tutorial_dungeon',
        name: 'Shadow Caves',
        region: 'tutorial',
        type: 'dungeon',
        description: 'A small cave system with a minor threat. Completing this dungeon marks the end of the tutorial.',
        population: 0,
        marketSize: 'none',
        travelCost: { base: 10 },
        connections: ['tutorial_arena'],
        mapPosition: { x: 950, y: 400 },
        sells: [],
        buys: [],
        npcs: [],
        tutorialPrices: {},
        tutorialEnemies: ['cave_spider', 'tutorial_boss'],
        isFinalArea: true
    }
};

// Tutorial-specific price lookup
function getTutorialPrice(locationId, itemId, type = 'buy') {
    const location = TutorialWorld[locationId];
    if (!location || !location.tutorialPrices || !location.tutorialPrices[itemId]) {
        return null;
    }
    return location.tutorialPrices[itemId][type];
}

// Get all tutorial location IDs
function getTutorialLocationIds() {
    return Object.keys(TutorialWorld);
}

// Check if location is tutorial area
function isTutorialLocation(locationId) {
    return locationId && locationId.startsWith('tutorial_');
}

// Export for use by other systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TutorialWorld, getTutorialPrice, getTutorialLocationIds, isTutorialLocation };
}
