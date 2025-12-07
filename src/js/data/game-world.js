// ═══════════════════════════════════════════════════════════════
// GAME WORLD SYSTEM - where dreams die and gold lives in darkness
// ═══════════════════════════════════════════════════════════════
// Version: 0.90.01 | Unity AI Lab
// Creators: Hackall360, Sponge, GFourteen
// www.unityailab.com | github.com/Unity-Lab-AI/Medieval-Trading-Game
// unityailabcontact@gmail.com
// ═══════════════════════════════════════════════════════════════

const GameWorld = {
    // ═══════════════════════════════════════════════════════════════
    //  MEDIEVAL MAP REGIONS - The lands that await your conquest
    // ═══════════════════════════════════════════════════════════════
    regions: {
        starter: {
            id: 'starter',
            name: 'Riverlands',
            description: 'A peaceful realm perfect for new merchants.',
            unlockRequirement: null, //  Always available - where noobs are born
            goldRequirement: 0
        },
        northern: {
            id: 'northern',
            name: 'Northern Highlands',
            description: 'Cold, harsh highlands with valuable furs and iron.',
            unlockRequirement: 'starter',
            goldRequirement: 500
        },
        eastern: {
            id: 'eastern',
            name: 'Eastern Kingdoms',
            description: 'Rich kingdoms with exotic spices and silks.',
            unlockRequirement: 'starter',
            goldRequirement: 750
        },
        western: {
            id: 'western',
            name: 'Western Marches',
            description: 'Wild frontiers with untapped resources and ancient ruins.',
            unlockRequirement: 'starter',
            goldRequirement: 600
        },
        southern: {
            id: 'southern',
            name: 'Southern Trade Routes',
            description: 'Prosperous merchant cities with luxury goods from distant lands.',
            unlockRequirement: 'northern',
            goldRequirement: 1000
        },
        capital: {
            id: 'capital',
            name: 'Royal Capital',
            description: 'The heart of the kingdom with rare treasures and noble patronage.',
            unlockRequirement: 'eastern',
            goldRequirement: 2000
        }
    },

    // ═══════════════════════════════════════════════════════════════
    //  LOCATIONS - SPOKE LAYOUT radiating from Royal Capital at center
    //  Includes: cities, towns, villages, mines, forests, farms,
    //    dungeons, caves, inns, ruins, ports
    // ═══════════════════════════════════════════════════════════════
    locations: {
        // ═══════════════════════════════════════════════════════════
        //  ROYAL CAPITAL - CENTER HUB (400, 300)
        // ═══════════════════════════════════════════════════════════
        royal_capital: {
            id: 'royal_capital',
            name: 'Royal Capital',
            region: 'capital',
            type: 'capital',
            description: 'The magnificent seat of the king - all roads lead here. The grand market sells luxury goods and buys rare treasures from across the realm.',
            population: 10000,
            marketSize: 'grand',
            travelCost: { base: 5 },
            connections: ['northern_outpost', 'jade_harbor', 'greendale', 'western_watch', 'kings_inn'],
            mapPosition: { x: 400, y: 300 },
            sells: ['royal_goods', 'luxury_items', 'fine_clothes', 'jewelry', 'silk_garments', 'perfume', 'wine', 'spices'],
            buys: ['artifacts', 'rare_gems', 'silk', 'gems', 'gold_bar', 'exotic_goods', 'furs', 'spices'],
            npcs: ['noble', 'guard', 'captain', 'jeweler', 'tailor', 'banker', 'herald', 'merchant', 'royal_advisor'] //  FIXED: Changed elder→royal_advisor to prevent quest confusion with village elders
        },

        // ═══════════════════════════════════════════════════════════
        //  CITIES (6 major cities around the capital)
        // ═══════════════════════════════════════════════════════════
        northern_outpost: {
            id: 'northern_outpost',
            name: 'Northern Outpost',
            region: 'northern',
            type: 'outpost',
            description: 'A fortified military outpost guarding the northern frontier. Pay the passage fee here to enter the Northern Territories.',
            population: 200,
            marketSize: 'small',
            travelCost: { base: 8 },
            connections: ['royal_capital', 'frostholm_village', 'iron_mines', 'ironforge_city'],
            mapPosition: { x: 400, y: 160 },
            sells: ['iron_sword', 'shield', 'helmet', 'chainmail', 'bandages', 'torch', 'rope'],
            buys: ['food', 'bread', 'meat', 'ale', 'furs', 'leather', 'coal'],
            npcs: ['guard', 'captain', 'sergeant', 'merchant'] // GATE - guards control passage to northern zone
        },
        jade_harbor: {
            id: 'jade_harbor',
            name: 'Jade Harbor',
            region: 'eastern',
            type: 'city',
            description: 'A prosperous port city where ships bring exotic goods from distant lands. Traders exchange silk, spices, and treasures.',
            population: 4000,
            marketSize: 'large',
            travelCost: { base: 8 },
            connections: ['royal_capital', 'fishermans_port', 'eastern_farm', 'silk_road_inn'],
            mapPosition: { x: 560, y: 280 },
            sells: ['silk', 'spices', 'tea', 'exotic_goods', 'porcelain', 'jade', 'perfume', 'rope', 'canvas', 'salt'],
            buys: ['fish', 'grain', 'timber', 'furs', 'iron_bar', 'gems', 'wine'],
            npcs: ['merchant', 'dockmaster', 'guard', 'sailor', 'ferryman'] // Quest: jade_harbor quests need merchant, guard (innkeeper only at inns!)
        },
        greendale: {
            id: 'greendale',
            name: 'GREENDALE',
            isAreaLabel: true, // Render as large area name on map
            region: 'starter',
            type: 'city',
            description: 'The breadbasket of the realm. Farmers bring wheat and livestock; bakers and brewers turn them into bread and ale.',
            population: 2500,
            marketSize: 'large',
            travelCost: { base: 8 },
            connections: ['royal_capital', 'vineyard_village', 'wheat_farm', 'riverside_inn'],
            mapPosition: { x: 340, y: 460 },
            sells: ['bread', 'ale', 'flour', 'cheese', 'butter', 'eggs', 'meat', 'vegetables', 'livestock'],
            buys: ['wheat', 'grain', 'milk', 'honey', 'salt', 'herbs', 'wool'],
            npcs: ['elder', 'baker', 'apothecary', 'merchant', 'farmer', 'guard'] // Quest: act1_quest1 (First Steps) needs elder (innkeeper only at inns!)
        },
        western_watch: {
            id: 'western_watch',
            name: 'Western Watch',
            region: 'western',
            type: 'outpost',
            description: 'A fortified outpost watching the wild western frontier. Pay the passage fee here to enter the Western Wilds.',
            population: 150,
            marketSize: 'small',
            travelCost: { base: 8 },
            connections: ['royal_capital', 'darkwood_village', 'stone_quarry', 'stonebridge'],
            mapPosition: { x: 240, y: 300 },
            sells: ['iron_sword', 'bow', 'arrows', 'rope', 'torch', 'bandages', 'map'],
            buys: ['food', 'bread', 'ale', 'leather', 'timber', 'coal'],
            npcs: ['guard', 'scout', 'sergeant', 'merchant'] // GATE - guards control passage to western zone
        },
        silverkeep: {
            id: 'silverkeep',
            name: 'Silverkeep',
            region: 'northern',
            type: 'city',
            description: 'A wealthy city of jewelers and silversmiths. They craft fine jewelry from precious metals and gems.',
            population: 2200,
            marketSize: 'large',
            travelCost: { base: 10 },
            connections: ['northern_outpost', 'silver_mine', 'mountain_pass_inn'],
            mapPosition: { x: 280, y: 160 },
            sells: ['jewelry', 'gemstone', 'mirror', 'crown', 'gold_bar', 'fine_clothes'],
            buys: ['silver_ore', 'gold_ore', 'gems', 'raw_gems', 'coal'],
            npcs: ['jeweler', 'merchant', 'guard', 'noble']
        },
        sunhaven: {
            id: 'sunhaven',
            name: 'Sunhaven',
            region: 'southern',
            type: 'city',
            description: 'A beautiful coastal city known for wine, olive oil, and fresh seafood. Fishermen and vintners trade here.',
            population: 3200,
            marketSize: 'large',
            travelCost: { base: 8 },
            connections: ['greendale', 'sunny_farm', 'coastal_cave', 'lighthouse_inn'],
            mapPosition: { x: 520, y: 460 },
            sells: ['wine', 'fish', 'oil', 'salt', 'rope', 'canvas', 'rum'],
            buys: ['grapes', 'olives', 'wheat', 'timber', 'iron_bar', 'glass'],
            npcs: ['merchant', 'fisherman', 'vintner', 'guard', 'sailor', 'villager', 'harbormaster'] // Quest: act1_quest3 needs harbormaster, main_rumors/sunhaven_lighthouse needs villager
        },

        // ═══════════════════════════════════════════════════════════
        //  VILLAGES (6 small settlements)
        // ═══════════════════════════════════════════════════════════
        frostholm_village: {
            id: 'frostholm_village',
            name: 'Frostholm',
            region: 'northern',
            type: 'village',
            description: 'A hardy village of hunters and trappers in the frozen north. They sell furs and winter gear, and need food and tools.',
            population: 200,
            marketSize: 'small',
            travelCost: { base: 10 },
            connections: ['northern_outpost', 'frozen_cave', 'winterwatch_outpost'],
            mapPosition: { x: 460, y: 100 },
            sells: ['furs', 'leather', 'hide', 'winter_clothing', 'meat'],
            buys: ['bread', 'ale', 'tools', 'rope', 'salt', 'grain'],
            npcs: ['chieftain', 'merchant', 'guard', 'hunter', 'trapper'] //  FIXED: Changed elder→chieftain (elder ONLY in Greendale for quest consistency)
        },
        vineyard_village: {
            id: 'vineyard_village',
            name: 'Vineyard Village',
            region: 'starter',
            type: 'village',
            description: 'A peaceful village of vintners. They grow grapes and produce fine wines and honey.',
            population: 300,
            marketSize: 'small',
            travelCost: { base: 6 },
            connections: ['greendale', 'orchard_farm'],
            mapPosition: { x: 320, y: 480 },
            sells: ['wine', 'grapes', 'honey', 'wax', 'cider'],
            buys: ['bread', 'cheese', 'tools', 'glass', 'barrels'],
            npcs: ['vintner', 'farmer', 'merchant']
        },
        darkwood_village: {
            id: 'darkwood_village',
            name: 'Darkwood',
            region: 'western',
            type: 'village',
            description: 'A logging village. Lumberjacks fell trees and sell raw timber. The sawmill buys logs to make planks.',
            population: 180,
            marketSize: 'small',
            travelCost: { base: 10 },
            connections: ['western_watch', 'ancient_forest', 'hermit_grove'],
            mapPosition: { x: 160, y: 240 },
            sells: ['timber', 'planks', 'wood', 'mushrooms', 'herbs', 'rope'],
            buys: ['axe', 'food', 'ale', 'nails', 'iron_tools'],
            npcs: ['lumberjack', 'miller', 'merchant']
        },
        riverwood: {
            id: 'riverwood',
            name: 'Riverwood',
            region: 'starter',
            type: 'village',
            description: 'A quiet fishing hamlet by the Silver River. Fishermen sell fresh catch and need bait and nets.',
            population: 150,
            marketSize: 'small',
            travelCost: { base: 8 },
            connections: ['greendale', 'river_cave'],
            mapPosition: { x: 480, y: 500 },
            sells: ['fish', 'pearls', 'timber', 'rope'],
            buys: ['bread', 'ale', 'salt', 'fishing_rod', 'canvas'],
            npcs: ['fisherman', 'merchant', 'boatwright']
        },
        hillcrest: {
            id: 'hillcrest',
            name: 'Hillcrest',
            region: 'eastern',
            type: 'village',
            description: 'A village of shepherds and dairy farmers. They sell wool, cheese, and leather.',
            population: 220,
            marketSize: 'small',
            travelCost: { base: 8 },
            connections: ['jade_harbor', 'eastern_farm', 'shepherds_inn'],
            mapPosition: { x: 620, y: 200 },
            sells: ['wool', 'cheese', 'leather', 'milk', 'butter', 'wool_cloth'],
            buys: ['bread', 'salt', 'dye', 'tools', 'grain'],
            npcs: ['shepherd', 'farmer', 'merchant']
        },
        miners_rest: {
            id: 'miners_rest',
            name: "Miner's Rest",
            region: 'western',
            type: 'village',
            description: 'A small settlement serving the nearby mines. Miners rest here and trade coal and tools.',
            population: 120,
            marketSize: 'small',
            travelCost: { base: 8 },
            connections: ['stone_quarry', 'deep_mine'],
            mapPosition: { x: 140, y: 380 },
            sells: ['coal', 'ale', 'simple_tools', 'torch', 'lamp'],
            buys: ['food', 'bread', 'meat', 'pickaxe', 'rope', 'bandages'],
            npcs: ['miner', 'bartender', 'merchant'] // innkeeper only at inns - bartender for village tavern
        },

        // ═══════════════════════════════════════════════════════════
        //  MINES (4 mining locations) - Sell raw ore, buy tools
        // ═══════════════════════════════════════════════════════════
        //  gatheringDifficulty: 1.0 = normal, higher = harder but better resources
        iron_mines: {
            id: 'iron_mines',
            name: 'Iron Mines',
            region: 'northern',
            type: 'mine',
            description: 'Deep mines producing iron ore and coal. Miners need tools, food, and light sources.',
            population: 80,
            marketSize: 'small',
            travelCost: { base: 12 },
            connections: ['northern_outpost', 'deep_cavern'],
            mapPosition: { x: 340, y: 100 },
            sells: ['iron_ore', 'coal', 'stone'],
            buys: ['pickaxe', 'torch', 'lamp', 'rope', 'food', 'ale', 'bandages'],
            npcs: ['miner', 'foreman', 'merchant'],
            gatheringDifficulty: 1.0, //  Base difficulty - common iron and coal
            availableResources: ['stone', 'iron_ore', 'coal', 'copper_ore'] //  What can be gathered here
        },
        silver_mine: {
            id: 'silver_mine',
            name: 'Silver Mine',
            region: 'northern',
            type: 'mine',
            description: 'A lucrative silver mine. Miners extract precious silver ore and occasionally find gems.',
            population: 60,
            marketSize: 'small',
            travelCost: { base: 14 },
            connections: ['silverkeep', 'crystal_cave'],
            mapPosition: { x: 200, y: 100 },
            sells: ['silver_ore', 'gems', 'stone'],
            buys: ['pickaxe', 'torch', 'food', 'ale', 'rope', 'bandages'],
            npcs: ['miner', 'foreman', 'jeweler'],
            gatheringDifficulty: 1.5, //  Harder - precious metals
            availableResources: ['stone', 'silver_ore', 'coal'] //  Silver mine specializes in silver
        },
        deep_mine: {
            id: 'deep_mine',
            name: 'Deep Mine',
            region: 'western',
            type: 'mine',
            description: 'An incredibly deep mine where brave miners seek gold and rare gems. Very dangerous but lucrative.',
            population: 40,
            marketSize: 'tiny',
            travelCost: { base: 18 },
            connections: ['miners_rest', 'shadow_dungeon'],
            mapPosition: { x: 100, y: 420 },
            sells: ['gold_ore', 'gems', 'rare_gems', 'coal'],
            buys: ['steel_pickaxe', 'lamp', 'rope', 'food', 'bandages', 'ale'],
            npcs: ['miner', 'adventurer'],
            gatheringDifficulty: 2.0, //  Very hard - gold and rare gems!
            availableResources: ['stone', 'iron_ore', 'gold_ore', 'coal'] //  Deep mine has gold!
        },

        // ═══════════════════════════════════════════════════════════
        //  FORESTS (5 forest locations) - Sell gathered goods
        // ═══════════════════════════════════════════════════════════
        //  gatheringDifficulty: 1.0 = normal, higher = harder but rarer/better resources
        ancient_forest: {
            id: 'ancient_forest',
            name: 'Ancient Forest',
            region: 'western',
            type: 'forest',
            description: 'A primordial forest where foragers gather rare herbs and ancient timber. Druids trade mystical goods.',
            population: 30,
            marketSize: 'tiny',
            travelCost: { base: 15 },
            connections: ['darkwood_village', 'druid_grove', 'forest_dungeon'],
            mapPosition: { x: 120, y: 180 },
            sells: ['herbs', 'medical_plants', 'mushrooms', 'timber', 'berries'],
            buys: ['bread', 'cheese', 'ale', 'axe', 'rope'],
            npcs: ['herbalist', 'hunter', 'forager'],
            gatheringDifficulty: 1.8, //  Hard - ancient trees, rare herbs
            availableResources: ['wood', 'timber', 'herbs', 'mushrooms', 'berries'] //  Ancient timber here!
        },
        whispering_woods: {
            id: 'whispering_woods',
            name: 'Whispering Woods',
            region: 'eastern',
            type: 'forest',
            description: 'A mystical forest where rare magical herbs grow. Herbalists and alchemists gather here.',
            population: 20,
            marketSize: 'tiny',
            travelCost: { base: 12 },
            connections: ['hillcrest', 'fairy_cave'],
            mapPosition: { x: 680, y: 160 },
            sells: ['herbs', 'medical_plants', 'mushrooms', 'honey', 'berries'],
            buys: ['bread', 'salt', 'glass', 'cloth'],
            npcs: ['herbalist', 'alchemist', 'wanderer'],
            gatheringDifficulty: 1.5, //  Medium-hard - magical herbs
            availableResources: ['wood', 'herbs', 'mushrooms', 'honey', 'berries'] //  Rare herbs!
        },
        hunters_wood: {
            id: 'hunters_wood',
            name: "Hunter's Wood",
            region: 'starter',
            type: 'forest',
            description: 'A forest teeming with game. Hunters sell pelts, meat, and leather. They need arrows and food.',
            population: 25,
            marketSize: 'small',
            travelCost: { base: 10 },
            connections: ['vineyard_village', 'hunting_lodge'],
            mapPosition: { x: 260, y: 520 },
            sells: ['furs', 'leather', 'hide', 'meat', 'mutton'],
            buys: ['bow', 'arrows', 'bread', 'ale', 'rope', 'salt'],
            npcs: ['hunter', 'trapper', 'merchant'],
            gatheringDifficulty: 1.0, //  Easy - beginner hunting ground
            availableResources: ['wood', 'meat', 'hide', 'herbs'] //  Basic forest resources
        },

        // ═══════════════════════════════════════════════════════════
        //  FARMS (4 farming locations) - Sell crops, buy tools
        // ═══════════════════════════════════════════════════════════
        //  gatheringDifficulty: farms are generally easy (0.8-1.2)
        wheat_farm: {
            id: 'wheat_farm',
            name: 'Golden Wheat Farm',
            region: 'starter',
            type: 'farm',
            description: 'Vast golden fields of wheat. Farmers sell raw wheat and grain. Mills buy wheat to make flour.',
            population: 50,
            marketSize: 'small',
            travelCost: { base: 6 },
            connections: ['greendale', 'riverside_inn'],
            mapPosition: { x: 340, y: 380 },
            sells: ['wheat', 'grain', 'eggs', 'vegetables', 'straw'],
            buys: ['scythe', 'tools', 'seeds', 'salt', 'cloth'],
            npcs: ['farmer', 'miller', 'farmhand'],
            gatheringDifficulty: 0.8, //  Very easy - basic farming
            availableResources: ['wheat', 'eggs', 'vegetables', 'milk'] //  Basic farm stuff
        },
        eastern_farm: {
            id: 'eastern_farm',
            name: 'Sunrise Farm',
            region: 'eastern',
            type: 'farm',
            description: 'A farm growing exotic eastern crops - tea, rice, and silkworms. Trades with Jade Harbor.',
            population: 45,
            marketSize: 'small',
            travelCost: { base: 8 },
            connections: ['jade_harbor', 'hillcrest'],
            mapPosition: { x: 620, y: 340 },
            sells: ['tea', 'silk', 'vegetables', 'herbs', 'eggs'],
            buys: ['tools', 'seeds', 'cloth', 'salt', 'iron_tools'],
            npcs: ['farmer', 'silkweaver', 'merchant'],
            gatheringDifficulty: 1.2, //  Slightly harder - exotic crops require skill
            availableResources: ['vegetables', 'herbs', 'eggs', 'flax'] //  Exotic eastern crops
        },
        orchard_farm: {
            id: 'orchard_farm',
            name: 'Orchard Farm',
            region: 'starter',
            type: 'farm',
            description: 'Beautiful orchards producing apples, pears, and cider. Beekeepers also sell honey here.',
            population: 35,
            marketSize: 'small',
            travelCost: { base: 6 },
            connections: ['vineyard_village', 'hunters_wood'],
            mapPosition: { x: 220, y: 480 },
            sells: ['apples', 'fruits', 'cider', 'honey', 'wax'],
            buys: ['tools', 'seeds', 'barrels', 'cloth'],
            npcs: ['farmer', 'beekeeper', 'orchardist'],
            gatheringDifficulty: 1.0, //  Normal - orchards and bees
            availableResources: ['honey', 'eggs', 'wool', 'milk'] //  Orchard goods + bees
        },
        sunny_farm: {
            id: 'sunny_farm',
            name: 'Sunny Meadows',
            region: 'southern',
            type: 'farm',
            description: 'Sun-drenched meadows growing olives and grapes. Produces olive oil and supplies Sunhaven.',
            population: 40,
            marketSize: 'small',
            travelCost: { base: 8 },
            connections: ['sunhaven', 'lighthouse_inn'],
            mapPosition: { x: 580, y: 520 },
            sells: ['grapes', 'oil', 'vegetables', 'herbs', 'honey'],
            buys: ['tools', 'seeds', 'barrels', 'salt', 'cloth'],
            npcs: ['farmer', 'vintner', 'olive_presser'],
            gatheringDifficulty: 1.1, //  Slightly harder - olive pressing, wine grapes
            availableResources: ['grapes', 'vegetables', 'herbs', 'oil'] //  Southern specialty crops
        },

        // ═══════════════════════════════════════════════════════════
        //  DUNGEONS (2) & RUINS (1) - Sell artifacts, buy supplies
        // ═══════════════════════════════════════════════════════════
        shadow_dungeon: {
            id: 'shadow_dungeon',
            name: 'Shadow Dungeon',
            region: 'western',
            type: 'dungeon',
            description: 'A terrifying dungeon where adventurers find ancient treasures. Dangerous but profitable.',
            population: 0,
            marketSize: 'tiny',
            travelCost: { base: 20 },
            connections: ['deep_mine'],
            mapPosition: { x: 60, y: 480 },
            sells: ['artifacts', 'gems', 'gold_bar', 'rare_gems'],
            buys: ['torch', 'lamp', 'rope', 'bandages', 'food', 'weapons'],
            npcs: ['adventurer', 'treasure_hunter'] // Quest: main_darkness_falls needs to enter here
        },
        forest_dungeon: {
            id: 'forest_dungeon',
            name: 'Overgrown Crypt',
            region: 'western',
            type: 'dungeon',
            description: 'An ancient crypt overtaken by forest. Treasure hunters find relics and enchanted items. Portal to the Doom World.',
            population: 0,
            marketSize: 'tiny',
            travelCost: { base: 18 },
            connections: ['ancient_forest'],
            mapPosition: { x: 80, y: 120 },
            sells: ['artifacts', 'old_books', 'gems', 'jewelry'],
            buys: ['torch', 'rope', 'bandages', 'food', 'weapons'],
            npcs: ['adventurer', 'scholar'] //  Doom world entry point #2
        },
        ruins_of_eldoria: {
            id: 'ruins_of_eldoria',
            name: 'Ruins of Eldoria',
            region: 'northern',
            type: 'ruins',
            description: 'The crumbling remains of an ancient elven city. Scholars and treasure hunters trade artifacts.',
            population: 10,
            marketSize: 'tiny',
            travelCost: { base: 16 },
            connections: ['winterwatch_outpost', 'frozen_cave'],
            mapPosition: { x: 540, y: 60 },
            sells: ['artifacts', 'old_books', 'crystals', 'parchment'],
            buys: ['torch', 'food', 'tools', 'ink', 'parchment'],
            npcs: ['scholar', 'explorer', 'archaeologist'] // Quest: hidden_history needs scholar
        },

        // ═══════════════════════════════════════════════════════════
        //  CAVES (6 cave locations) - Sell gathered cave goods
        //  gatheringDifficulty: caves are moderate to hard (1.2-2.0)
        // ═══════════════════════════════════════════════════════════
        deep_cavern: {
            id: 'deep_cavern',
            name: 'Deep Cavern',
            region: 'northern',
            type: 'cave',
            description: 'A vast underground cavern where explorers find mushrooms and crystal formations.',
            population: 15,
            marketSize: 'tiny',
            travelCost: { base: 14 },
            connections: ['iron_mines'],
            mapPosition: { x: 300, y: 60 },
            sells: ['mushrooms', 'crystals', 'stone'],
            buys: ['torch', 'lamp', 'rope', 'food'],
            npcs: ['explorer', 'miner'], // Quest: hidden_riches needs to enter here
            gatheringDifficulty: 1.4, //  Moderate - deep but common goods
            availableResources: ['stone', 'mushrooms', 'crystals'] //  Cavern resources
        },
        frozen_cave: {
            id: 'frozen_cave',
            name: 'Frozen Cave',
            region: 'northern',
            type: 'cave',
            description: 'An icy cave with beautiful frozen formations and rare ice crystals.',
            population: 5,
            marketSize: 'tiny',
            travelCost: { base: 16 },
            connections: ['frostholm_village', 'ruins_of_eldoria'],
            mapPosition: { x: 520, y: 40 },
            sells: ['crystals', 'fish', 'ice_goods'],
            buys: ['torch', 'food', 'furs', 'ale'],
            npcs: ['explorer', 'ice_harvester'], // Quest: frostholm_secret needs to enter here
            gatheringDifficulty: 1.8, //  Hard - freezing conditions, rare ice crystals
            availableResources: ['crystals', 'fish', 'stone'] //  Frozen specialties
        },
        crystal_cave: {
            id: 'crystal_cave',
            name: 'Crystal Cave',
            region: 'northern',
            type: 'cave',
            description: 'A dazzling cave filled with natural crystal formations. Collectors pay well for rare specimens.',
            population: 10,
            marketSize: 'tiny',
            travelCost: { base: 12 },
            connections: ['silver_mine'],
            mapPosition: { x: 140, y: 60 },
            sells: ['crystals', 'gems', 'mushrooms', 'stone'],
            buys: ['torch', 'lamp', 'rope', 'pickaxe', 'food'],
            npcs: ['gem_collector', 'miner'],
            gatheringDifficulty: 1.6, //  Medium-hard - valuable crystals and gems
            availableResources: ['crystals', 'gems', 'stone', 'mushrooms'] //  Crystal specialties
        },
        river_cave: {
            id: 'river_cave',
            name: 'River Cave',
            region: 'starter',
            type: 'cave',
            description: 'A cave carved by an underground river. Divers find pearls and rare cave fish in its depths.',
            population: 8,
            marketSize: 'tiny',
            travelCost: { base: 10 },
            connections: ['riverwood'],
            mapPosition: { x: 540, y: 540 },
            sells: ['pearls', 'fish', 'stone', 'mushrooms'],
            buys: ['torch', 'rope', 'food', 'ale'],
            npcs: ['diver', 'pearl_hunter'],
            gatheringDifficulty: 1.2, //  Easy-moderate - beginner cave, water hazards
            availableResources: ['fish', 'pearls', 'stone', 'mushrooms'] //  River cave goods
        },
        coastal_cave: {
            id: 'coastal_cave',
            name: 'Coastal Cave',
            region: 'southern',
            type: 'cave',
            description: 'A sea cave rumored to hold pirate treasure. Divers find pearls, coral, and occasional gold coins.',
            population: 5,
            marketSize: 'tiny',
            travelCost: { base: 12 },
            connections: ['sunhaven', 'smugglers_cove'],
            mapPosition: { x: 640, y: 500 },
            sells: ['pearls', 'gems', 'gold_bar', 'artifacts'],
            buys: ['torch', 'rope', 'food', 'weapons'],
            npcs: ['treasure_hunter', 'diver'],
            gatheringDifficulty: 1.7, //  Hard - tides, treasure hunting danger
            availableResources: ['pearls', 'gems', 'coral', 'fish'] //  Coastal treasures
        },
        fairy_cave: {
            id: 'fairy_cave',
            name: 'Fairy Grotto',
            region: 'eastern',
            type: 'cave',
            description: 'A magical cave where fairies are said to dwell. Rare glowing mushrooms and enchanted herbs grow here.',
            population: 0,
            marketSize: 'tiny',
            travelCost: { base: 14 },
            connections: ['whispering_woods'],
            mapPosition: { x: 720, y: 120 },
            sells: ['mushrooms', 'herbs', 'medical_plants', 'crystals', 'honey'],
            buys: ['bread', 'cheese', 'cloth', 'glass'],
            npcs: ['herbalist', 'wanderer'],
            gatheringDifficulty: 1.5, //  Medium - magical interference, rare herbs
            availableResources: ['mushrooms', 'herbs', 'crystals', 'honey'] //  Magical cave goods
        },

        // ═══════════════════════════════════════════════════════════
        //  INNS (7 rest stops and taverns)
        // ═══════════════════════════════════════════════════════════
        kings_inn: {
            id: 'kings_inn',
            name: "King's Rest Inn",
            region: 'capital',
            type: 'inn',
            description: 'A luxurious inn near the capital, favored by nobles. Serves fine wines and gourmet meals.',
            population: 30,
            marketSize: 'small',
            travelCost: { base: 5 },
            connections: ['royal_capital', 'silk_road_inn'],
            mapPosition: { x: 460, y: 360 },
            sells: ['wine', 'ale', 'bread', 'cheese', 'meat', 'perfume'],
            buys: ['grapes', 'wheat', 'milk', 'eggs', 'spices', 'honey'],
            npcs: ['innkeeper', 'noble', 'traveler', 'bard']
        },
        silk_road_inn: {
            id: 'silk_road_inn',
            name: 'Silk Road Inn',
            region: 'eastern',
            type: 'inn',
            description: 'A famous waystation for traveling merchants. Serves exotic eastern dishes and tea.',
            population: 50,
            marketSize: 'medium',
            travelCost: { base: 6 },
            connections: ['jade_harbor', 'kings_inn'],
            mapPosition: { x: 520, y: 360 },
            sells: ['tea', 'ale', 'bread', 'spices', 'exotic_goods'],
            buys: ['silk', 'wheat', 'vegetables', 'herbs', 'meat'],
            npcs: ['innkeeper', 'merchant', 'traveler', 'caravan_master']
        },
        riverside_inn: {
            id: 'riverside_inn',
            name: 'Riverside Inn',
            region: 'starter',
            type: 'inn',
            description: 'A cozy inn by the river, perfect for weary travelers. Fresh fish and cold ale served daily.',
            population: 25,
            marketSize: 'small',
            travelCost: { base: 6 },
            connections: ['greendale', 'wheat_farm'],
            mapPosition: { x: 380, y: 500 },
            sells: ['fish', 'ale', 'bread', 'cheese', 'cider'],
            buys: ['wheat', 'vegetables', 'salt', 'eggs', 'honey'],
            npcs: ['innkeeper', 'fisherman', 'traveler']
        },
        mountain_pass_inn: {
            id: 'mountain_pass_inn',
            name: 'Mountain Pass Inn',
            region: 'northern',
            type: 'inn',
            description: 'A sturdy inn at a treacherous mountain pass. Hot stew and warm fires for cold travelers.',
            population: 20,
            marketSize: 'small',
            travelCost: { base: 10 },
            connections: ['silverkeep', 'ironforge_city'],
            mapPosition: { x: 220, y: 200 },
            sells: ['ale', 'bread', 'meat', 'furs', 'torch', 'rope'],
            buys: ['wheat', 'vegetables', 'coal', 'wood', 'salt'],
            npcs: ['innkeeper', 'traveler', 'mountain_guide']
        },
        shepherds_inn: {
            id: 'shepherds_inn',
            name: "Shepherd's Rest",
            region: 'eastern',
            type: 'inn',
            description: 'A rustic inn popular with shepherds and farmers. Famous for lamb stew and local cheese.',
            population: 15,
            marketSize: 'small',
            travelCost: { base: 8 },
            connections: ['hillcrest'],
            mapPosition: { x: 680, y: 260 },
            sells: ['meat', 'cheese', 'ale', 'bread', 'wool', 'leather'],
            buys: ['wheat', 'salt', 'vegetables', 'herbs', 'grain'],
            npcs: ['innkeeper', 'shepherd', 'farmer']
        },
        lighthouse_inn: {
            id: 'lighthouse_inn',
            name: 'Lighthouse Inn',
            region: 'southern',
            type: 'inn',
            description: 'An inn built around an old lighthouse. Famous for fresh seafood and sailors\' tales.',
            population: 20,
            marketSize: 'small',
            travelCost: { base: 8 },
            connections: ['sunhaven', 'sunny_farm'],
            mapPosition: { x: 640, y: 440 },
            sells: ['fish', 'ale', 'bread', 'salt', 'rope', 'canvas'],
            buys: ['wheat', 'vegetables', 'oil', 'grapes', 'timber'],
            npcs: ['innkeeper', 'sailor', 'lighthouse_keeper']
        },
        hunting_lodge: {
            id: 'hunting_lodge',
            name: 'Hunting Lodge',
            region: 'starter',
            type: 'inn',
            description: 'A rustic lodge for hunters and adventurers. Sells game meat and hunting supplies.',
            population: 15,
            marketSize: 'small',
            travelCost: { base: 8 },
            connections: ['hunters_wood'],
            mapPosition: { x: 200, y: 560 },
            sells: ['meat', 'furs', 'leather', 'ale', 'bow', 'arrows'],
            buys: ['bread', 'salt', 'rope', 'herbs', 'bandages'],
            npcs: ['innkeeper', 'hunter', 'trapper']
        },

        // ═══════════════════════════════════════════════════════════
        //  OUTPOSTS (3 frontier locations)
        // ═══════════════════════════════════════════════════════════
        ironforge_city: {
            id: 'ironforge_city',
            name: 'Ironforge City',
            region: 'northern',
            type: 'city',
            description: 'A mighty fortress city built around ancient forges. Master smiths craft legendary weapons and armor from raw ore.',
            population: 3000,
            marketSize: 'large',
            travelCost: { base: 12 },
            connections: ['northern_outpost', 'mountain_pass_inn'],
            mapPosition: { x: 340, y: 200 },
            sells: ['iron_sword', 'steel_sword', 'iron_armor', 'chainmail', 'plate_armor', 'helmet', 'shield', 'iron_bar', 'steel_bar', 'iron_tools'],
            buys: ['iron_ore', 'coal', 'leather', 'wood', 'gold_ore'],
            npcs: ['blacksmith', 'guard', 'captain', 'apothecary', 'merchant', 'miner'] // CITY - behind the gate
        },
        winterwatch_outpost: {
            id: 'winterwatch_outpost',
            name: 'Winterwatch',
            region: 'northern',
            type: 'outpost',
            description: 'The northernmost outpost, guarding against wilderness threats. Soldiers buy furs and sell weapons.',
            population: 80,
            marketSize: 'small',
            travelCost: { base: 14 },
            connections: ['frostholm_village', 'ruins_of_eldoria'],
            mapPosition: { x: 480, y: 40 },
            sells: ['iron_sword', 'shield', 'iron_armor', 'rope', 'torch', 'bandages'],
            buys: ['furs', 'food', 'meat', 'ale', 'coal', 'wood'],
            npcs: ['guard', 'captain', 'scout']
        },
        stonebridge: {
            id: 'stonebridge',
            name: 'Stonebridge',
            region: 'western',
            type: 'village',
            description: 'An ancient village of master masons built around a great stone bridge. They craft tools and building materials from raw stone and timber.',
            population: 2800,
            marketSize: 'large',
            travelCost: { base: 12 },
            connections: ['western_watch', 'stone_quarry'],
            mapPosition: { x: 160, y: 340 },
            sells: ['bricks', 'mortar', 'tools', 'hammer', 'pickaxe', 'nails', 'planks', 'furniture'],
            buys: ['stone', 'timber', 'wood', 'iron_bar', 'clay', 'coal'],
            npcs: ['merchant', 'guard', 'blacksmith', 'mason'] // VILLAGE - behind the gate
        },

        // ═══════════════════════════════════════════════════════════
        //  PORTS (2 water locations)
        // ═══════════════════════════════════════════════════════════
        fishermans_port: {
            id: 'fishermans_port',
            name: "Fisherman's Port",
            region: 'eastern',
            type: 'port',
            description: 'A bustling fishing port with the freshest catch. Buy fish and salt, sell bread and ale.',
            population: 300,
            marketSize: 'medium',
            travelCost: { base: 8 },
            connections: ['jade_harbor', 'smugglers_cove'],
            mapPosition: { x: 680, y: 340 },
            sells: ['fish', 'salt', 'rope', 'canvas', 'pearls', 'oil'],
            buys: ['bread', 'ale', 'timber', 'iron_bar', 'cloth', 'grain'],
            npcs: ['fisherman', 'sailor', 'harbormaster', 'merchant']
        },
        smugglers_cove: {
            id: 'smugglers_cove',
            name: "Smuggler's Cove",
            region: 'eastern',
            type: 'port',
            description: 'A hidden cove where... questionable goods change hands. Rare items at inflated prices.',
            population: 60,
            marketSize: 'small',
            travelCost: { base: 14 },
            connections: ['fishermans_port', 'coastal_cave'],
            mapPosition: { x: 720, y: 420 },
            sells: ['exotic_goods', 'spices', 'rum', 'gems', 'silk', 'artifacts'],
            buys: ['gold_bar', 'jewelry', 'weapons', 'furs', 'rare_gems'],
            npcs: ['smuggler', 'merchant', 'fence'] // Quest: main_eastern_clues needs merchant
        },

        // ═══════════════════════════════════════════════════════════
        //  SPECIAL LOCATIONS
        // ═══════════════════════════════════════════════════════════
        hermit_grove: {
            id: 'hermit_grove',
            name: "Hermit's Grove",
            region: 'western',
            type: 'forest',
            description: 'A mysterious clearing where a wise hermit trades rare herbs and ancient knowledge.',
            population: 5,
            marketSize: 'tiny',
            travelCost: { base: 15 },
            connections: ['darkwood_village'],
            mapPosition: { x: 100, y: 280 },
            sells: ['herbs', 'medical_plants', 'mushrooms', 'honey', 'berries'],
            buys: ['bread', 'cheese', 'cloth', 'parchment', 'ink'],
            npcs: ['hermit', 'sage'],
            gatheringDifficulty: 1.6, //  Medium-hard - rare healing herbs, mystical forest
            availableResources: ['herbs', 'mushrooms', 'honey', 'berries'] //  Rare herbs
        },
        druid_grove: {
            id: 'druid_grove',
            name: 'Druid Grove',
            region: 'western',
            type: 'forest',
            description: 'A sacred grove tended by mysterious druids. They trade rare healing herbs and enchanted seeds.',
            population: 15,
            marketSize: 'tiny',
            travelCost: { base: 16 },
            connections: ['ancient_forest'],
            mapPosition: { x: 60, y: 220 },
            sells: ['medical_plants', 'herbs', 'honey', 'berries', 'mushrooms'],
            buys: ['bread', 'fruit', 'vegetables', 'cloth', 'glass'],
            npcs: ['druid', 'herbalist', 'acolyte'], // Quest: main_shadow_key needs druid
            gatheringDifficulty: 1.9, //  Hard - sacred grove, druids guard best herbs
            availableResources: ['herbs', 'medical_plants', 'honey', 'mushrooms'] //  Enchanted herbs
        },
        stone_quarry: {
            id: 'stone_quarry',
            name: 'Stone Quarry',
            region: 'western',
            type: 'mine',
            description: 'A massive quarry producing the finest building stone. Workers need tools and food.',
            population: 90,
            marketSize: 'medium',
            travelCost: { base: 10 },
            connections: ['western_watch', 'stonebridge', 'miners_rest'],
            mapPosition: { x: 180, y: 420 },
            sells: ['stone', 'clay', 'sand', 'bricks'],
            buys: ['pickaxe', 'tools', 'food', 'ale', 'rope', 'bandages'],
            npcs: ['quarry_foreman', 'stonecutter', 'merchant'],
            gatheringDifficulty: 0.9, //  Easy - open pit quarry, no cave dangers
            availableResources: ['stone', 'clay', 'sand'] //  Building materials
        }
    },

    // ═══════════════════════════════════════════════════════════════
    //  NPC SPAWN CONFIG - who the fuck lives where? 
    // ═══════════════════════════════════════════════════════════════
    //  Maps location types to NPC types that spawn there
    // This makes People panel actually show people, imagine that
    //  QUEST-ENABLED NPC SPAWNS - all quest givers now spawn somewhere! 
    npcSpawnsByLocationType: {
        capital: ['innkeeper', 'blacksmith', 'jeweler', 'tailor', 'banker', 'guard', 'noble', 'general_store', 'apothecary', 'herald', 'steward', 'captain', 'sage'], //  Capital has sage for wisdom quests 
        city: ['innkeeper', 'blacksmith', 'general_store', 'apothecary', 'guard', 'merchant', 'tailor', 'scholar', 'vintner'], //  FIXED: Removed elder - only in Greendale
        town: ['innkeeper', 'blacksmith', 'general_store', 'farmer', 'guard', 'miller', 'mason'], //  Added craft quest givers
        village: ['innkeeper', 'farmer', 'general_store'], //  FIXED: Removed elder - only in Greendale for quest consistency
        mine: ['miner', 'blacksmith', 'general_store', 'sergeant'], //  Mine foreman quests
        forest: ['hunter', 'herbalist', 'druid', 'huntmaster'], //  Forest quest giver
        farm: ['farmer', 'general_store', 'miller'], //  Farm quest giver
        inn: ['innkeeper', 'traveler', 'merchant', 'guard'],
        cave: ['explorer', 'miner', 'scholar'], //  Cave exploration quests
        dungeon: ['adventurer', 'guard', 'scholar'], //  Dungeon lore quests
        ruins: ['scholar', 'adventurer', 'explorer', 'sage'], //  Ancient knowledge quests
        outpost: ['guard', 'blacksmith', 'general_store', 'healer', 'sergeant'], //  Military quest NPCs
        port: ['ferryman', 'merchant', 'sailor', 'general_store', 'fisherman', 'harbormaster'], //  Port quest giver
        temple: ['priest', 'healer', 'sage'], //  Wisdom quests
        grove: ['druid', 'herbalist', 'sage'], //  Nature wisdom quests
        fortress: ['guard', 'captain', 'sergeant', 'blacksmith'] //  Military strongholds
    },

    //  Get NPCs that should spawn at a location
    getNPCsForLocation(locationId) {
        const location = this.locations[locationId];
        if (!location) return [];

        //  Check if location has explicit NPCs defined - ALL locations should have this now
        if (location.npcs && location.npcs.length > 0) {
            return location.npcs;
        }

        //  FALLBACK WARNING - Location is missing explicit NPCs array!
        console.warn(` Location "${locationId}" missing explicit npcs array! Using type-based fallback.`);

        //  Fall back to type-based spawns (legacy - should not be needed)
        const typeNPCs = this.npcSpawnsByLocationType[location.type] || [];

        //  Scale number of NPCs based on population
        let npcCount = 2; // minimum 2 NPCs
        if (location.population >= 1000) npcCount = 6;
        else if (location.population >= 500) npcCount = 5;
        else if (location.population >= 100) npcCount = 4;
        else if (location.population >= 50) npcCount = 3;

        //  Return the first N NPCs of this type
        return typeNPCs.slice(0, Math.min(npcCount, typeNPCs.length));
    },

    //  Get NPC data with persona info for display
    getNPCDataForLocation(locationId) {
        const location = this.locations[locationId];

        //  DOOM WORLD NPC SYSTEM 
        // When in doom world, return doom NPCs instead of normal NPCs
        const inDoom = (typeof TravelSystem !== 'undefined' && TravelSystem.isInDoomWorld?.()) ||
                       (typeof DoomWorldSystem !== 'undefined' && DoomWorldSystem.isActive) ||
                       (typeof game !== 'undefined' && game.inDoomWorld);

        if (inDoom && typeof DoomWorldNPCs !== 'undefined') {
            const doomLocationData = DoomWorldNPCs.locationNPCs[locationId];
            if (doomLocationData && doomLocationData.npcs) {
                const doomLocationName = DoomWorldNPCs.locationNames[locationId] || `Ruined ${location?.name || locationId}`;

                return doomLocationData.npcs.map(doomNpcType => {
                    // Get doom NPC type data
                    const doomType = DoomWorldNPCs.npcTypes[doomNpcType];
                    const npcId = `doom_${locationId}_${doomNpcType}`;

                    //  Doom NPC names are more descriptive
                    const doomName = this.formatDoomNPCName(doomNpcType);
                    const doomTitle = doomType?.title || 'Survivor';
                    const demeanor = doomType?.demeanor || 'desperate';

                    return {
                        id: npcId,
                        type: doomNpcType,
                        baseType: doomType?.base || doomNpcType,
                        name: doomName,
                        title: doomTitle,
                        voice: 'onyx', //  Darker voice for doom NPCs
                        personality: demeanor,
                        demeanor: demeanor,
                        location: locationId,
                        locationName: doomLocationName,
                        description: doomLocationData.description,
                        atmosphere: doomLocationData.atmosphere,
                        isDoom: true
                    };
                });
            }
        }

        //  Normal world NPC loading
        const npcTypes = this.getNPCsForLocation(locationId);

        // Filter and map NPCs, excluding killed ones
        return npcTypes.map(npcType => {
            //  Generate unique ID for this NPC at this location
            const npcId = `${locationId}_${npcType}`;

            // Check if this NPC is dead (killed in combat, respawns after 24 game hours)
            if (this.isNPCDead(npcId)) {
                return null; // Skip this NPC
            }

            //  Try to get persona from database
            let persona = null;
            if (typeof NPCPersonaDatabase !== 'undefined') {
                persona = NPCPersonaDatabase.getPersona(npcType);
            }

            //  Generate unique name for this NPC at this location
            const generatedName = this.generateNPCName(locationId, npcType);

            return {
                id: npcId,
                name: generatedName, //  Now uses unique location-seeded name!
                title: persona?.title || this.getNPCTitle(npcType),
                voice: persona?.voice || 'nova',
                personality: persona?.personality || 'friendly',
                location: locationId,
                locationName: location?.name || locationId,
                ...persona,
                //  CRITICAL: Set type AFTER persona spread to prevent overwrite from fallback personas
                type: npcType
            };
        }).filter(npc => npc !== null); // Remove nulls (killed NPCs)
    },

    //  Format doom NPC type to display name
    formatDoomNPCName(doomNpcType) {
        // Convert doom_type names like 'fallen_noble' to 'The Fallen Noble'
        const words = doomNpcType.split('_');
        const formatted = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return `The ${formatted}`;
    },

    // ═══════════════════════════════════════════════════════════════
    //  NPC NAME GENERATOR - Medieval names seeded by location 
    // ═══════════════════════════════════════════════════════════════
    // Each NPC gets a UNIQUE name based on their type and location
    // Names are deterministic - same location+type = same name always
    // ═══════════════════════════════════════════════════════════════

    //  Medieval first names by personality type
    _npcFirstNames: {
        // Hospitable types (innkeeper, bartender, traveler)
        hospitable_male: ['Edmund', 'Geoffrey', 'Harold', 'Oswald', 'Bertram', 'Gilbert', 'Walter', 'Cedric', 'Aldwin', 'Godwin', 'Humphrey', 'Reginald'],
        hospitable_female: ['Agnes', 'Matilda', 'Beatrice', 'Edith', 'Mildred', 'Gertrude', 'Hilda', 'Eleanor', 'Rosalind', 'Constance', 'Winifred', 'Maude'],
        // Strong types (guard, blacksmith, captain, sergeant)
        strong_male: ['Aldric', 'Gareth', 'Roderick', 'Theron', 'Magnus', 'Bjorn', 'Conrad', 'Godfrey', 'Leofric', 'Wulfric', 'Siegfried', 'Ragnar'],
        strong_female: ['Brynhild', 'Astrid', 'Freya', 'Sigrid', 'Greta', 'Helga', 'Ingrid', 'Brunhilde', 'Thyra', 'Gudrun', 'Valdis', 'Ragnhild'],
        // Wise types (elder, scholar, sage, priest, druid)
        //  Morin is the canonical elder name used in quests - included for story consistency 
        wise_male: ['Morin', 'Aldous', 'Cornelius', 'Erasmus', 'Fabian', 'Ignatius', 'Marius', 'Severus', 'Tiberius', 'Ambrose', 'Benedict', 'Cuthbert', 'Dunstan'],
        wise_female: ['Hildegard', 'Scholastica', 'Perpetua', 'Eugenia', 'Ursula', 'Brigid', 'Gwendolyn', 'Mechtild', 'Petronilla', 'Radegund', 'Walburga', 'Etheldreda'],
        // Crafty types (jeweler, tailor, apothecary)
        crafty_male: ['Silvanus', 'Tobias', 'Jasper', 'Felix', 'Lucian', 'Cyrus', 'Darius', 'Phineas', 'Ezra', 'Silas', 'Mordecai', 'Zachariah'],
        crafty_female: ['Sapphira', 'Lavinia', 'Cordelia', 'Portia', 'Octavia', 'Nerissa', 'Jessamine', 'Ophelia', 'Perdita', 'Rosamund', 'Seraphina', 'Viola'],
        // Merchant types (merchant, banker, general_store)
        merchant_male: ['Marcus', 'Lucius', 'Gaius', 'Quintus', 'Titus', 'Cassius', 'Brutus', 'Octavius', 'Valerius', 'Maximus', 'Crassus', 'Publius'],
        merchant_female: ['Livia', 'Aurelia', 'Cornelia', 'Flavia', 'Lucilla', 'Marcia', 'Julia', 'Claudia', 'Valeria', 'Fabia', 'Tullia', 'Antonia'],
        // Rural types (farmer, shepherd, miller, farmhand)
        rural_male: ['Alden', 'Bran', 'Colby', 'Dale', 'Earle', 'Ford', 'Grove', 'Heath', 'Jasper', 'Keld', 'Lee', 'Marsh'],
        rural_female: ['Daisy', 'Ivy', 'Lily', 'Rose', 'Violet', 'Holly', 'Hazel', 'Fern', 'Laurel', 'Willow', 'Heather', 'Clover'],
        // Seafaring types (sailor, ferryman, fisherman, dockmaster)
        seafaring_male: ['Morgan', 'Drake', 'Finn', 'Cormac', 'Brendan', 'Niall', 'Padraig', 'Seamus', 'Declan', 'Rory', 'Eamon', 'Killian'],
        seafaring_female: ['Marina', 'Coral', 'Pearl', 'Nerida', 'Ondine', 'Delphine', 'Morgana', 'Isla', 'Moira', 'Siobhan', 'Aoife', 'Niamh'],
        // Noble types (noble, herald, steward)
        noble_male: ['Alistair', 'Beaumont', 'Clarence', 'Dominic', 'Everard', 'Fitzgerald', 'Gervais', 'Horace', 'Ignatius', 'Jasper', 'Leopold', 'Montague'],
        noble_female: ['Adelaide', 'Bianca', 'Celestine', 'Delphine', 'Evangeline', 'Francesca', 'Genevieve', 'Helena', 'Isolde', 'Josephine', 'Katharine', 'Lorraine'],
        // Adventure types (adventurer, explorer, treasure_hunter)
        adventure_male: ['Ajax', 'Borin', 'Caelum', 'Dax', 'Erik', 'Flint', 'Grim', 'Hawk', 'Ivan', 'Jax', 'Knox', 'Lance'],
        adventure_female: ['Arya', 'Brienne', 'Cass', 'Dara', 'Elara', 'Freya', 'Giselle', 'Harper', 'Iris', 'Jade', 'Kira', 'Luna'],
        // Mining types (miner, foreman, gem_collector)
        mining_male: ['Durgan', 'Flint', 'Granite', 'Ironside', 'Jasper', 'Korvak', 'Lodestone', 'Malachite', 'Nickle', 'Orik', 'Pyrite', 'Quarry'],
        mining_female: ['Amber', 'Beryl', 'Crystal', 'Diamond', 'Emerald', 'Garnet', 'Jade', 'Opal', 'Ruby', 'Sapphire', 'Topaz', 'Zircon'],
        // Hunting types (hunter, trapper)
        hunting_male: ['Arrow', 'Bowman', 'Claw', 'Dusk', 'Fang', 'Gale', 'Hawke', 'Hunter', 'Ranger', 'Shadow', 'Talon', 'Wolf'],
        hunting_female: ['Artemis', 'Diana', 'Falcon', 'Huntress', 'Lynx', 'Raven', 'Scout', 'Swift', 'Vixen', 'Wildheart', 'Dawn', 'Starlight']
    },

    //  NPC type to name category mapping
    _npcTypeCategories: {
        innkeeper: 'hospitable', bartender: 'hospitable', traveler: 'hospitable', bard: 'hospitable',
        guard: 'strong', blacksmith: 'strong', captain: 'strong', sergeant: 'strong', scout: 'strong',
        elder: 'wise', scholar: 'wise', sage: 'wise', priest: 'wise', druid: 'wise', acolyte: 'wise', hermit: 'wise',
        jeweler: 'crafty', tailor: 'crafty', apothecary: 'crafty', herbalist: 'crafty', alchemist: 'crafty',
        merchant: 'merchant', banker: 'merchant', general_store: 'merchant', steward: 'merchant',
        farmer: 'rural', shepherd: 'rural', miller: 'rural', farmhand: 'rural', vintner: 'rural', beekeeper: 'rural', orchardist: 'rural',
        sailor: 'seafaring', ferryman: 'seafaring', fisherman: 'seafaring', dockmaster: 'seafaring', harbormaster: 'seafaring', lighthouse_keeper: 'seafaring', boatwright: 'seafaring',
        noble: 'noble', herald: 'noble', royal_advisor: 'wise', chieftain: 'strong', villager: 'rural', mason: 'strong', //  royal_advisor uses wise names, chieftain uses strong names
        adventurer: 'adventure', explorer: 'adventure', treasure_hunter: 'adventure', archaeologist: 'adventure', diver: 'adventure', pearl_hunter: 'adventure', ice_harvester: 'adventure', mountain_guide: 'adventure', caravan_master: 'adventure', wanderer: 'adventure',
        miner: 'mining', foreman: 'mining', gem_collector: 'mining',
        hunter: 'hunting', trapper: 'hunting', forager: 'rural', healer: 'wise',
        hooded_stranger: 'mysterious', prophet: 'mysterious' //  Quest givers
    },

    //  QUEST NPC NAME OVERRIDES - Ensure quest NPCs have correct canonical names
    // Maps location_npcType to the specific name that quest expects
    _questNPCNames: {
        'greendale_merchant': 'Cassia the Merchant',  // act1_quest2 - Establishing Trade
        'greendale_elder': 'Elder Morin',             // act1_quest1 - First Steps
        'sunhaven_harbormaster': 'Harbormaster Elena', // act1_quest3/4 - The Road South / Harbor Dealings
        // Add more quest-specific NPCs as needed
    },

    //  Cache for generated NPC names - consistent across sessions
    _npcNameCache: {},

    //  Seeded random number generator for consistent names
    _seededRandom(seed) {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            const char = seed.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        // LCG parameters for decent distribution
        const a = 1664525;
        const c = 1013904223;
        const m = Math.pow(2, 32);
        hash = (a * Math.abs(hash) + c) % m;
        return hash / m;
    },

    //  Generate a unique NPC name based on location and type
    generateNPCName(locationId, npcType) {
        const cacheKey = `${locationId}_${npcType}`;

        //  PRIORITY: Check if this NPC has a quest-specific name override
        if (this._questNPCNames[cacheKey]) {
            return this._questNPCNames[cacheKey];
        }

        //  Return cached name if we already generated one
        if (this._npcNameCache[cacheKey]) {
            return this._npcNameCache[cacheKey];
        }

        //  Get the category for this NPC type
        const category = this._npcTypeCategories[npcType] || 'hospitable';

        //  Use seeded random to pick gender (deterministic based on location+type)
        const genderSeed = this._seededRandom(cacheKey + '_gender');
        const isMale = genderSeed > 0.5;

        //  Get the appropriate name list
        const nameKey = `${category}_${isMale ? 'male' : 'female'}`;
        const nameList = this._npcFirstNames[nameKey] || this._npcFirstNames.hospitable_male;

        //  Pick name using seeded random
        const nameSeed = this._seededRandom(cacheKey + '_name');
        const nameIndex = Math.floor(nameSeed * nameList.length);
        const firstName = nameList[nameIndex];

        //  Format the full name with title
        const title = this._getNPCRoleTitle(npcType);
        const fullName = `${firstName} the ${title}`;

        //  Cache it for consistency
        this._npcNameCache[cacheKey] = fullName;

        return fullName;
    },

    //  Get role-appropriate title for NPC (simpler than full getNPCTitle)
    _getNPCRoleTitle(npcType) {
        const titles = {
            innkeeper: 'Innkeeper', blacksmith: 'Smith', general_store: 'Shopkeeper',
            apothecary: 'Apothecary', jeweler: 'Jeweler', tailor: 'Tailor',
            banker: 'Banker', guard: 'Guard', merchant: 'Merchant', farmer: 'Farmer',
            miner: 'Miner', hunter: 'Hunter', herbalist: 'Herbalist', druid: 'Druid',
            explorer: 'Explorer', adventurer: 'Adventurer', scholar: 'Scholar',
            healer: 'Healer', ferryman: 'Ferryman', sailor: 'Sailor', fisherman: 'Fisherman',
            traveler: 'Traveler', noble: 'Noble', priest: 'Priest', elder: 'Elder',
            captain: 'Captain', sergeant: 'Sergeant', scout: 'Scout', herald: 'Herald',
            steward: 'Steward', sage: 'Sage', bartender: 'Barkeep', bard: 'Bard',
            dockmaster: 'Dockmaster', harbormaster: 'Harbormaster', foreman: 'Foreman',
            shepherd: 'Shepherd', miller: 'Miller', vintner: 'Vintner', mason: 'Mason',
            villager: 'Villager', acolyte: 'Acolyte', hermit: 'Hermit', alchemist: 'Alchemist',
            forager: 'Forager', wanderer: 'Wanderer', caravan_master: 'Caravan Master',
            mountain_guide: 'Guide', lighthouse_keeper: 'Keeper', boatwright: 'Boatwright',
            farmhand: 'Farmhand', beekeeper: 'Beekeeper', orchardist: 'Orchardist',
            gem_collector: 'Gem Hunter', treasure_hunter: 'Treasure Hunter',
            trapper: 'Trapper', pearl_hunter: 'Pearl Diver', ice_harvester: 'Ice Harvester',
            archaeologist: 'Archaeologist', diver: 'Diver',
            hooded_stranger: 'Stranger', prophet: 'Prophet', //  Quest givers
            royal_advisor: 'Royal Advisor', //  NEW: Court sage for Royal Capital
            chieftain: 'Chieftain' //  NEW: Northern village leader for Frostholm
        };
        return titles[npcType] || npcType.charAt(0).toUpperCase() + npcType.slice(1).replace(/_/g, ' ');
    },

    //  Helper: format NPC type to display name (NOW USES GENERATED NAMES)
    formatNPCName(npcType, locationId = null) {
        //  If we have a location, generate a unique name
        if (locationId) {
            return this.generateNPCName(locationId, npcType);
        }

        //  Fallback to generic names if no location provided
        const names = {
            innkeeper: 'The Innkeeper',
            blacksmith: 'The Blacksmith',
            general_store: 'General Store Owner',
            apothecary: 'The Apothecary',
            jeweler: 'The Jeweler',
            tailor: 'The Tailor',
            banker: 'The Banker',
            guard: 'Town Guard',
            merchant: 'Traveling Merchant',
            farmer: 'Local Farmer',
            miner: 'Miner',
            hunter: 'Hunter',
            herbalist: 'Herbalist',
            druid: 'Forest Druid',
            explorer: 'Explorer',
            adventurer: 'Adventurer',
            scholar: 'Scholar',
            healer: 'Healer',
            ferryman: 'Ferryman',
            sailor: 'Sailor',
            fisherman: 'Fisherman',
            traveler: 'Weary Traveler',
            noble: 'Noble',
            priest: 'Priest',
            elder: 'The Elder',
            royal_advisor: 'The Royal Advisor', //  NEW
            chieftain: 'The Chieftain' //  NEW: Frostholm leader
        };
        return names[npcType] || npcType.charAt(0).toUpperCase() + npcType.slice(1).replace(/_/g, ' ');
    },

    //  Helper: get NPC title based on type
    getNPCTitle(npcType) {
        const titles = {
            innkeeper: 'Keeper of the Inn',
            blacksmith: 'Master of the Forge',
            general_store: 'Purveyor of Goods',
            apothecary: 'Keeper of Remedies',
            jeweler: 'Dealer in Precious Things',
            tailor: 'Crafter of Fine Garments',
            banker: 'Guardian of Gold',
            guard: 'Protector of the Peace',
            merchant: 'Dealer in Trade Goods',
            farmer: 'Tiller of the Land',
            miner: 'Delver of the Deep',
            hunter: 'Tracker of Game',
            herbalist: 'Gatherer of Plants',
            druid: 'Keeper of the Grove',
            explorer: 'Seeker of the Unknown',
            adventurer: 'Seeker of Fortune',
            scholar: 'Keeper of Knowledge',
            healer: 'Mender of Wounds',
            ferryman: 'Master of the Waters',
            sailor: 'Man of the Sea',
            fisherman: 'Catcher of Fish',
            traveler: 'Wanderer of Roads',
            noble: 'Person of Standing',
            priest: 'Servant of the Divine'
        };
        return titles[npcType] || 'Local Resident';
    },

    // ═══════════════════════════════════════════════════════════════
    //  RUNTIME STATE - Unlocked regions and visited locations
    // ═══════════════════════════════════════════════════════════════
    unlockedRegions: [],
    visitedLocations: [],
    doomVisitedLocations: [], //  Separate tracking for Doom World - starts fresh on each entry!
    currentRegion: 'starter',

    // Killed NPCs tracking - NPCs respawn after time defined in GameConfig
    killedNPCs: {}, // { npcId: killTimeInGameMinutes }

    // Get NPC respawn time from config (fallback to 1440 = 24 hours)
    get NPC_RESPAWN_TIME() {
        return (typeof GameConfig !== 'undefined' && GameConfig.npc?.death?.respawnTimeGameMinutes)
            || (typeof GameConfig !== 'undefined' && GameConfig.world?.npcRespawnTimeMinutes)
            || 1440;
    },

    // ═══════════════════════════════════════════════════════════════
    //  INITIALIZATION - Where the world awakens
    // ═══════════════════════════════════════════════════════════════
    init() {
        console.log(' GameWorld awakens from the void...');
        this.unlockedRegions = ['starter', 'capital', 'northern', 'eastern', 'western', 'southern'];
        //  Start with greendale as default - createCharacter() will add proper starting location based on perks
        // This ensures the map always has something to render even if called before character creation
        this.visitedLocations = ['greendale'];
        //  Reset doom world visited locations on new game - no bleeding between games!
        this.doomVisitedLocations = [];
        this.currentRegion = 'starter';
        // Reset killed NPCs on new game
        this.killedNPCs = {};

        //  Try to setup market prices (may fail if ItemDatabase not loaded)
        try {
            this.setupMarketPrices();
        } catch (error) {
            console.warn(' setupMarketPrices failed:', error.message);
        }

        //  Initialize dependent systems (wrap each in try-catch)
        try {
            if (typeof CityReputationSystem !== 'undefined') {
                CityReputationSystem.init();
                console.log(' CityReputationSystem initialized');
            }
        } catch (error) {
            console.warn(' CityReputationSystem.init failed:', error.message);
        }

        try {
            if (typeof CityEventSystem !== 'undefined') {
                CityEventSystem.init();
                console.log(' CityEventSystem initialized');
            }
        } catch (error) {
            console.warn(' CityEventSystem.init failed:', error.message);
        }

        try {
            if (typeof MarketPriceHistory !== 'undefined') {
                MarketPriceHistory.init();
                console.log(' MarketPriceHistory initialized');
            }
        } catch (error) {
            console.warn(' MarketPriceHistory.init failed:', error.message);
        }

        try {
            if (typeof DynamicMarketSystem !== 'undefined') {
                DynamicMarketSystem.init();
                console.log(' DynamicMarketSystem initialized');
            }
        } catch (error) {
            console.warn(' DynamicMarketSystem.init failed:', error.message);
        }

        console.log(' GameWorld initialization complete - the realm awaits');
    },

    // ═══════════════════════════════════════════════════════════════
    // NPC DEATH TRACKING - Track killed NPCs and respawn after 24 game hours
    // ═══════════════════════════════════════════════════════════════

    // Mark an NPC as killed - they won't appear for 24 game hours
    markNPCKilled(npcId, locationId) {
        const fullId = locationId ? `${locationId}_${npcId}` : npcId;
        const currentTime = this._getCurrentGameTime();
        this.killedNPCs[fullId] = currentTime;
        console.log(`NPC killed: ${fullId} at game time ${currentTime}`);

        // Fire event for other systems
        if (typeof EventBus !== 'undefined') {
            EventBus.emit('npc-killed', { npcId: fullId, killTime: currentTime });
        }
    },

    // Check if an NPC is currently dead (hasn't respawned yet)
    isNPCDead(npcId) {
        const killTime = this.killedNPCs[npcId];
        if (!killTime) return false;

        const currentTime = this._getCurrentGameTime();
        const timeSinceKill = currentTime - killTime;

        // Check if respawn time has passed
        if (timeSinceKill >= this.NPC_RESPAWN_TIME) {
            // NPC has respawned - remove from killed list
            delete this.killedNPCs[npcId];
            console.log(`NPC respawned: ${npcId}`);
            return false;
        }

        return true; // Still dead
    },

    // Get time until NPC respawns (in game minutes)
    getTimeUntilRespawn(npcId) {
        const killTime = this.killedNPCs[npcId];
        if (!killTime) return 0;

        const currentTime = this._getCurrentGameTime();
        const timeSinceKill = currentTime - killTime;
        const remaining = this.NPC_RESPAWN_TIME - timeSinceKill;

        return Math.max(0, remaining);
    },

    // Get current game time in minutes
    _getCurrentGameTime() {
        if (typeof game !== 'undefined' && game.player && game.player.stats) {
            // Calculate total game minutes from day and time
            const day = game.player.stats.day || 1;
            const hour = game.player.stats.hour || 6;
            const minute = game.player.stats.minute || 0;
            return ((day - 1) * 1440) + (hour * 60) + minute;
        }
        // Fallback
        return 0;
    },

    // Check all killed NPCs and clean up respawned ones
    checkNPCRespawns() {
        const currentTime = this._getCurrentGameTime();
        const respawned = [];

        for (const npcId in this.killedNPCs) {
            const killTime = this.killedNPCs[npcId];
            if (currentTime - killTime >= this.NPC_RESPAWN_TIME) {
                respawned.push(npcId);
                delete this.killedNPCs[npcId];
            }
        }

        if (respawned.length > 0) {
            console.log(`NPCs respawned: ${respawned.join(', ')}`);
            // Refresh people panel if open
            if (typeof PeoplePanel !== 'undefined' && PeoplePanel.isOpen) {
                PeoplePanel.refresh();
            }
        }
    },

    // ═══════════════════════════════════════════════════════════════
    //  MARKET SYSTEM - Setup and management
    // ═══════════════════════════════════════════════════════════════
    setupMarketPrices() {
        //  Check if ItemDatabase is loaded
        try {
            if (!window.ItemDatabase) {
                throw new Error('ItemDatabase not on window object');
            }
            console.log(' ItemDatabase is available, setting up market prices...');
        } catch (error) {
            //  ItemDatabase not ready - use empty markets
            console.warn(' ItemDatabase not loaded - using fallback market pricing');
            Object.values(this.locations).forEach(location => {
                location.marketPrices = {};
            });
            return;
        }

        Object.values(this.locations).forEach(location => {
            location.marketPrices = {};

            //  Base items available everywhere
            const baseItems = ['food', 'water', 'bread'];
            baseItems.forEach(itemId => {
                const item = ItemDatabase.getItem(itemId);
                if (item) {
                    location.marketPrices[itemId] = {
                        price: ItemDatabase.calculatePrice(itemId),
                        stock: Math.floor(Math.random() * 20) + 10
                    };
                }
            });

            //  Specialties with better prices ( check both 'sells' and 'specialties' for backwards compat )
            const locationItems = location.sells || location.specialties;
            if (locationItems && Array.isArray(locationItems)) {
                locationItems.forEach(specialty => {
                    const item = ItemDatabase.getItem(specialty);
                    if (item) {
                        location.marketPrices[specialty] = {
                            price: ItemDatabase.calculatePrice(specialty, { locationMultiplier: 0.8 }),
                            stock: Math.floor(Math.random() * 15) + 5
                        };
                    }
                });
            }

            //  Add random additional items based on location type
            this.addRandomMarketItems(location);

            //  Lookup tables for stock calculation - avoids if-else chains 
            const locationStockBase = { city: 15, town: 10, village: 5 };
            const rarityMultiplier = { common: 2, uncommon: 1.5, rare: 1, epic: 0.5, legendary: 0.2 };

            //  Ensure ALL items from ItemDatabase are available
            Object.keys(ItemDatabase.items).forEach(itemId => {
                if (!location.marketPrices[itemId]) {
                    const item = ItemDatabase.getItem(itemId);
                    if (item) {
                        const baseStock = (locationStockBase[location.type] || 5) * (rarityMultiplier[item.rarity] || 1);

                        location.marketPrices[itemId] = {
                            price: ItemDatabase.calculatePrice(itemId),
                            stock: Math.max(1, Math.floor(baseStock + Math.random() * 10))
                        };
                    }
                }
            });
        });
    },

    //  Add random items to market based on location type
    addRandomMarketItems(location) {
        const locationItemPools = {
            village: ['herbs', 'logs', 'stone', 'seeds', 'wool', 'clay', 'wood', 'food', 'water', 'bread', 'vegetables'],
            town: ['meat', 'fish', 'vegetables', 'fruits', 'cheese', 'tools', 'arrows', 'grain', 'ale', 'mead', 'wool', 'timber', 'bread'],
            city: ['iron_ore', 'copper_ore', 'tin', 'coal', 'hammer', 'axe', 'pickaxe', 'sword', 'spear', 'bow', 'bricks', 'mortar', 'nails', 'armor', 'steel_bar', 'iron_bar', 'gems', 'silk']
        };

        const itemPool = locationItemPools[location.type] || locationItemPools.town;
        const numAdditionalItems = Math.floor(Math.random() * 10) + 5;

        for (let i = 0; i < numAdditionalItems; i++) {
            const randomItemId = itemPool[Math.floor(Math.random() * itemPool.length)];
            const item = ItemDatabase.getItem(randomItemId);

            if (item && !location.marketPrices[randomItemId]) {
                location.marketPrices[randomItemId] = {
                    price: ItemDatabase.calculatePrice(randomItemId),
                    stock: Math.floor(Math.random() * 20) + 10
                };
            }
        }
    },

    //  Get base price for an item type
    getBasePrice(itemType) {
        const basePrices = {
            food: 5, water: 2, bread: 3, fish: 8, meat: 12, vegetables: 6, cheese: 15,
            fruits: 10, ale: 10, mead: 18, wine: 25, tea: 20, honey: 15, grain: 6,
            herbs: 8, medical_plants: 30, wood: 8, logs: 6, timber: 12, stone: 5,
            clay: 5, seeds: 4, wool: 12, bricks: 15, mortar: 8, coal: 6, trade_goods: 25,
            iron_ore: 12, copper_ore: 10, tin: 18, iron_bar: 35, steel_bar: 100, minerals: 45,
            basic_tools: 15, tools: 25, hammer: 15, axe: 20, pickaxe: 25, nails: 12,
            weapons: 80, armor: 120, sword: 50, spear: 30, bow: 40, arrows: 10,
            livestock: 50, luxury_goods: 200, luxury_items: 200, furs: 35,
            winter_clothing: 60, silk: 150, spices: 40, exotic_goods: 120, gems: 150,
            rare_gems: 800, crystals: 300, jade: 400, porcelain: 250, ice_goods: 30,
            magic_items: 500, royal_goods: 300, imperial_goods: 600, documents: 100,
            services: 75, information: 50, artifacts: 1000, rare_treasures: 2000,
            royal_favors: 5000, imperial_favors: 5000
        };
        return basePrices[itemType] || 50;
    },

    // ═══════════════════════════════════════════════════════════════
    //  REGION SYSTEM
    // ═══════════════════════════════════════════════════════════════
    isRegionUnlocked(regionId) {
        return this.unlockedRegions.includes(regionId);
    },

    unlockRegion(regionId) {
        if (!this.isRegionUnlocked(regionId)) {
            const region = this.regions[regionId];
            if (region && this.canUnlockRegion(regionId)) {
                this.unlockedRegions.push(regionId);
                addMessage(` New region unlocked: ${region.name}!`);
                return true;
            }
        }
        return false;
    },

    canUnlockRegion(regionId) {
        const region = this.regions[regionId];
        if (!region) return false;
        if (region.unlockRequirement && !this.isRegionUnlocked(region.unlockRequirement)) {
            return false;
        }
        if (game.player && game.player.gold >= region.goldRequirement) {
            return true;
        }
        return false;
    },

    // ═══════════════════════════════════════════════════════════════
    //  TRAVEL SYSTEM
    // ═══════════════════════════════════════════════════════════════
    getAvailableDestinations() {
        const currentLocation = this.locations[game.currentLocation.id];
        if (!currentLocation) return [];

        return currentLocation.connections
            .map(destId => this.locations[destId])
            .filter(dest => dest && this.isRegionUnlocked(dest.region))
            .map(dest => ({
                ...dest,
                travelCost: this.calculateTravelCost(game.currentLocation.id, dest.id),
                travelTime: this.calculateTravelTime(game.currentLocation.id, dest.id)
            }));
    },

    calculateTravelCost(fromId, toId) {
        const fromLocation = this.locations[fromId];
        const toLocation = this.locations[toId];
        if (!fromLocation || !toLocation) return 0;

        let baseCost = (fromLocation.travelCost.base + toLocation.travelCost.base) / 2;
        const transport = transportationOptions[game.player.transportation];
        const speedModifier = transport ? transport.speedModifier : 1.0;
        const eventModifier = game.travelSpeedModifier || 1.0;
        const finalCost = Math.round(baseCost / (speedModifier * eventModifier));
        return Math.max(finalCost, 1);
    },

    calculateTravelTime(fromId, toId) {
        const fromLocation = this.locations[fromId];
        const toLocation = this.locations[toId];
        if (!fromLocation || !toLocation) return 0;

        //  Check for Dungeon Bonanza event (July 18th) - instant 30 min dungeon travel
        if (typeof DungeonBonanzaSystem !== 'undefined') {
            const bonanzaOverride = DungeonBonanzaSystem.getDungeonTravelTimeOverride(fromId, toId);
            if (bonanzaOverride !== null) {
                console.log(` Dark Convergence active! Dungeon travel reduced to ${bonanzaOverride} minutes`);
                return bonanzaOverride;
            }
        }

        let baseTime = (fromLocation.travelCost.base + toLocation.travelCost.base) * 5;
        const transport = transportationOptions[game.player.transportation];
        const speedModifier = transport ? transport.speedModifier : 1.0;
        const eventModifier = game.travelSpeedModifier || 1.0;

        //  Apply weather and seasonal modifiers - MUST match TravelSystem 
        let weatherSpeedMod = 1.0;
        let seasonalSpeedMod = 1.0;

        if (typeof WeatherSystem !== 'undefined' && WeatherSystem.getTravelSpeedModifier) {
            weatherSpeedMod = WeatherSystem.getTravelSpeedModifier() || 1.0;
        }

        if (typeof TimeMachine !== 'undefined' && TimeMachine.getSeasonData) {
            const seasonData = TimeMachine.getSeasonData();
            if (seasonData && seasonData.effects && seasonData.effects.travelSpeed) {
                seasonalSpeedMod = seasonData.effects.travelSpeed;
            }
        }

        const combinedMod = speedModifier * eventModifier * weatherSpeedMod * seasonalSpeedMod;
        const finalTime = Math.round(baseTime / combinedMod);
        return Math.max(finalTime, 10);
    },

    travelTo(locationId) {
        const destination = this.locations[locationId];
        if (!destination) {
            addMessage('Invalid destination!');
            return false;
        }

        if (!this.isRegionUnlocked(destination.region)) {
            addMessage('This region is not yet unlocked!');
            return false;
        }

        const travelCost = this.calculateTravelCost(game.currentLocation.id, locationId);
        const travelTime = this.calculateTravelTime(game.currentLocation.id, locationId);

        if (game.player.gold < travelCost) {
            addMessage(`You need ${travelCost} gold to travel to ${destination.name}!`);
            return false;
        }

        game.player.gold -= travelCost;

        const arrivalTime = TimeSystem.getTotalMinutes() + travelTime;
        EventSystem.scheduleEvent('travel_complete', arrivalTime, {
            destination: locationId,
            cost: travelCost
        });

        //  Track journey start for achievements (Start Your Journey!)
        if (typeof AchievementSystem !== 'undefined' && AchievementSystem.trackJourneyStart) {
            AchievementSystem.trackJourneyStart(locationId);
        }

        addMessage(` Traveling to ${destination.name}... (Arrival in ${travelTime} minutes)`);
        updatePlayerInfo();
        return true;
    },

    completeTravel(locationId) {
        const destination = this.locations[locationId];
        if (!destination) return;

        game.currentLocation = {
            id: destination.id,
            name: destination.name,
            description: destination.description
        };

        if (!this.visitedLocations.includes(locationId)) {
            this.visitedLocations.push(locationId);
            addMessage(` First time visiting ${destination.name}!`);
        }

        //  Update map backdrop based on location type (dungeon vs normal)
        if (typeof GameWorldRenderer !== 'undefined' && GameWorldRenderer.updateBackdropForLocation) {
            GameWorldRenderer.updateBackdropForLocation(locationId);
        }

        updateLocationInfo();
        updateLocationPanel();
        addMessage(` Arrived at ${destination.name}!`);
    },

    // ═══════════════════════════════════════════════════════════════
    //  MARKET FUNCTIONS
    // ═══════════════════════════════════════════════════════════════
    getLocationMarket(locationId) {
        const location = this.locations[locationId];
        if (!location) return null;

        return {
            ...location.marketPrices,
            locationInfo: {
                name: location.name,
                type: location.type,
                specialties: location.specialties,
                marketSize: location.marketSize
            }
        };
    },

    updateLocationMarket(locationId) {
        const location = this.locations[locationId];
        if (!location) return;

        Object.keys(location.marketPrices).forEach(itemType => {
            const currentPrice = location.marketPrices[itemType].price;
            const fluctuation = (Math.random() - 0.5) * 0.2;
            location.marketPrices[itemType].price = Math.round(currentPrice * (1 + fluctuation));

            const stockChange = Math.floor((Math.random() - 0.5) * 4);
            location.marketPrices[itemType].stock = Math.max(0,
                location.marketPrices[itemType].stock + stockChange);
        });
    },

    // ═══════════════════════════════════════════════════════════════
    //  TOOL SYSTEM
    // ═══════════════════════════════════════════════════════════════
    tools: {
        //  Basic tools
        axe: { id: 'axe', name: 'Basic Axe', description: 'A simple axe for chopping wood.', type: 'tool', resource: 'wood', efficiency: 1.0, durability: 100, price: 15, requiredSkill: 0 },
        pickaxe: { id: 'pickaxe', name: 'Pickaxe', description: 'For mining stone and minerals.', type: 'tool', resource: 'stone', efficiency: 1.0, durability: 120, price: 20, requiredSkill: 0 },
        hammer: { id: 'hammer', name: 'Hammer', description: 'Basic hammer for construction.', type: 'tool', resource: 'iron', efficiency: 1.0, durability: 80, price: 12, requiredSkill: 0 },
        fishing_rod: { id: 'fishing_rod', name: 'Fishing Rod', description: 'For catching fish.', type: 'tool', resource: 'fish', efficiency: 1.0, durability: 60, price: 18, requiredSkill: 0 },
        cooking_pot: { id: 'cooking_pot', name: 'Cooking Pot', description: 'Basic pot for cooking food.', type: 'tool', resource: 'food', efficiency: 1.0, durability: 90, price: 25, requiredSkill: 0 },
        shovel: { id: 'shovel', name: 'Shovel', description: 'For digging and gathering resources.', type: 'tool', resource: 'stone', efficiency: 1.0, durability: 100, price: 15, requiredSkill: 0 },
        knife: { id: 'knife', name: 'Knife', description: 'Sharp knife for various tasks.', type: 'tool', resource: 'herbs', efficiency: 1.0, durability: 70, price: 10, requiredSkill: 0 },
        saw: { id: 'saw', name: 'Hand Saw', description: 'For cutting wood efficiently.', type: 'tool', resource: 'wood', efficiency: 1.2, durability: 110, price: 30, requiredSkill: 1 },

        //  Upgraded tools
        strong_axe: { id: 'strong_axe', name: 'Strong Axe', description: 'A sturdy axe that chops wood 50% faster.', type: 'upgrade', resource: 'wood', efficiency: 1.5, durability: 200, price: 50, requiredSkill: 2, requires: 'axe' },
        hot_oven: { id: 'hot_oven', name: 'Hot Oven', description: 'Cooks food 30% faster and preserves nutrients.', type: 'upgrade', resource: 'food', efficiency: 1.3, durability: 300, price: 80, requiredSkill: 3, requires: 'cooking_pot' },
        fast_hammer: { id: 'fast_hammer', name: 'Fast Hammer', description: 'Works 40% faster than basic hammer.', type: 'upgrade', resource: 'iron', efficiency: 1.4, durability: 150, price: 35, requiredSkill: 2, requires: 'hammer' },
        sharp_knife: { id: 'sharp_knife', name: 'Sharp Knife', description: 'Gathers herbs 25% more efficiently.', type: 'upgrade', resource: 'herbs', efficiency: 1.25, durability: 120, price: 25, requiredSkill: 1, requires: 'knife' },
        durable_saw: { id: 'durable_saw', name: 'Durable Saw', description: 'Cuts wood 60% faster with less wear.', type: 'upgrade', resource: 'wood', efficiency: 1.6, durability: 250, price: 60, requiredSkill: 3, requires: 'saw' },
        golden_fishing_rod: { id: 'golden_fishing_rod', name: 'Golden Fishing Rod', description: 'Catches fish twice as often.', type: 'upgrade', resource: 'fish', efficiency: 2.0, durability: 180, price: 100, requiredSkill: 4, requires: 'fishing_rod' },
        iron_cooking_pot: { id: 'iron_cooking_pot', name: 'Iron Cooking Pot', description: 'Cooks 20% more food at once.', type: 'upgrade', resource: 'food', efficiency: 1.2, durability: 200, price: 45, requiredSkill: 2, requires: 'cooking_pot' },
        steel_pickaxe: { id: 'steel_pickaxe', name: 'Steel Pickaxe', description: 'Mines minerals 50% faster.', type: 'upgrade', resource: 'minerals', efficiency: 1.5, durability: 220, price: 75, requiredSkill: 3, requires: 'pickaxe' }
    },

    getTool(toolId) {
        return this.tools[toolId] || null;
    },

    getAvailableTools() {
        if (!game.player) return [];

        return Object.values(this.tools).filter(tool => {
            const skillLevel = game.player.skills[tool.resource] || 0;
            if (skillLevel < tool.requiredSkill) return false;
            if (tool.requires && !game.player.ownedTools?.includes(tool.requires)) return false;
            if (game.player.ownedTools?.includes(tool.id)) return false;
            return true;
        });
    },

    getPlayerTools() {
        if (!game.player || !game.player.ownedTools) return [];
        return game.player.ownedTools.map(toolId => this.getTool(toolId)).filter(tool => tool);
    },

    purchaseTool(toolId) {
        const tool = this.getTool(toolId);
        if (!tool) {
            addMessage('Invalid tool!');
            return false;
        }

        if (game.player.gold < tool.price) {
            addMessage(`You need ${tool.price} gold to purchase ${tool.name}!`);
            return false;
        }

        const skillLevel = game.player.skills[tool.resource] || 0;
        if (skillLevel < tool.requiredSkill) {
            addMessage(`You need skill level ${tool.requiredSkill} in ${tool.resource} to use this tool!`);
            return false;
        }

        game.player.gold -= tool.price;

        if (!game.player.ownedTools) {
            game.player.ownedTools = [];
        }
        game.player.ownedTools.push(toolId);

        if (!game.player.toolDurability) {
            game.player.toolDurability = {};
        }
        game.player.toolDurability[toolId] = tool.durability;

        addMessage(`Purchased ${tool.name} for ${tool.price} gold!`);
        updatePlayerInfo();
        return true;
    },

    useTool(toolId, amount = 1) {
        const tool = this.getTool(toolId);
        if (!tool) return null;

        if (!game.player.ownedTools?.includes(toolId)) {
            addMessage(`You don't own a ${tool.name}!`);
            return null;
        }

        const durability = game.player.toolDurability?.[toolId] || 0;
        if (durability <= 0) {
            addMessage(`Your ${tool.name} is broken!`);
            return null;
        }

        const baseAmount = amount * tool.efficiency;
        const skillBonus = 1 + ((game.player.skills[tool.resource] || 0) * 0.1);
        const finalAmount = Math.round(baseAmount * skillBonus);

        game.player.toolDurability[toolId] = Math.max(0, durability - amount);

        return {
            resource: tool.resource,
            amount: finalAmount,
            toolUsed: toolId,
            durabilityRemaining: game.player.toolDurability[toolId]
        };
    },

    repairTool(toolId) {
        const tool = this.getTool(toolId);
        if (!tool) return false;

        const repairCost = Math.round(tool.price * 0.3);

        if (game.player.gold < repairCost) {
            addMessage(`You need ${repairCost} gold to repair ${tool.name}!`);
            return false;
        }

        game.player.gold -= repairCost;
        game.player.toolDurability[toolId] = tool.durability;

        addMessage(`Repaired ${tool.name} for ${repairCost} gold!`);
        updatePlayerInfo();
        return true;
    },

    // ═══════════════════════════════════════════════════════════════
    //  DOOM WORLD VISITED LOCATIONS HELPERS
    // ═══════════════════════════════════════════════════════════════

    //  Get the correct visited locations array based on current world 
    getActiveVisitedLocations() {
        const inDoom = (typeof TravelSystem !== 'undefined' && TravelSystem.isInDoomWorld()) ||
                       (typeof DoomWorldSystem !== 'undefined' && DoomWorldSystem.isActive);
        return inDoom ? this.doomVisitedLocations : this.visitedLocations;
    },

    //  Check if a location is visited in the current world 
    isLocationVisited(locationId) {
        return this.getActiveVisitedLocations().includes(locationId);
    },

    //  Mark a location as visited in the current world 
    markLocationVisited(locationId) {
        const visited = this.getActiveVisitedLocations();
        if (!visited.includes(locationId)) {
            visited.push(locationId);
            return true; // First visit
        }
        return false; // Already visited
    },

    //  Reset doom visited locations for fresh entry 
    resetDoomVisitedLocations(entryLocationId) {
        this.doomVisitedLocations = [entryLocationId];
        console.log(' GameWorld: Doom visited locations reset to:', this.doomVisitedLocations);
    },

    // ═══════════════════════════════════════════════════════════════
    //  SAVE/LOAD
    // ═══════════════════════════════════════════════════════════════
    getSaveData() {
        return {
            unlockedRegions: [...this.unlockedRegions],
            visitedLocations: [...this.visitedLocations],
            doomVisitedLocations: [...this.doomVisitedLocations], //  Save doom progress too!
            currentRegion: this.currentRegion,
            killedNPCs: { ...this.killedNPCs } // Save killed NPCs for respawn tracking
        };
    },

    loadSaveData(data) {
        if (!data) return;
        if (data.unlockedRegions) this.unlockedRegions = [...data.unlockedRegions];
        if (data.visitedLocations) this.visitedLocations = [...data.visitedLocations];
        if (data.doomVisitedLocations) this.doomVisitedLocations = [...data.doomVisitedLocations]; //
        if (data.currentRegion) this.currentRegion = data.currentRegion;
        if (data.killedNPCs) this.killedNPCs = { ...data.killedNPCs };
        // Check for respawns on load
        this.checkNPCRespawns();
        console.log(' GameWorld state restored from the abyss');
    }
};

// ═══════════════════════════════════════════════════════════════
//  EXPOSE GLOBALLY - Let the world spread
// ═══════════════════════════════════════════════════════════════

window.GameWorld = GameWorld;

console.log(' GameWorld loaded - the realm awaits your conquest');
