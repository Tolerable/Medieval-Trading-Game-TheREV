const fs = require('fs');
const content = fs.readFileSync('src/js/data/game-world.js', 'utf8');

// Extract locations with mapPosition - simpler regex
const locations = [];
const lines = content.split('\n');
let currentId = null;
let currentName = null;
let currentX = null;
let currentY = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for id: 'xxx'
    const idMatch = line.match(/id:\s*'([^']+)'/);
    if (idMatch) currentId = idMatch[1];

    // Look for name: 'xxx'
    const nameMatch = line.match(/name:\s*['"]([^'"]+)['"]/);
    if (nameMatch) currentName = nameMatch[1];

    // Look for mapPosition: { x: NNN, y: NNN }
    const posMatch = line.match(/mapPosition:\s*\{\s*x:\s*(\d+),\s*y:\s*(\d+)/);
    if (posMatch && currentId) {
        locations.push({
            id: currentId,
            name: currentName || currentId,
            x: parseInt(posMatch[1]),
            y: parseInt(posMatch[2])
        });
        currentId = null;
        currentName = null;
    }
}

// Reference data from gameworld.md
const reference = {
    crystal_cave: {x: 140, y: 60},
    silver_mine: {x: 200, y: 100},
    deep_cavern: {x: 300, y: 60},
    iron_mines: {x: 340, y: 100},
    winterwatch_outpost: {x: 480, y: 40},
    frostholm_village: {x: 460, y: 100},
    frozen_cave: {x: 520, y: 40},
    ruins_of_eldoria: {x: 540, y: 60},
    silverkeep: {x: 280, y: 160},
    ironforge_city: {x: 400, y: 160},
    mountain_pass_inn: {x: 220, y: 200},
    northern_outpost: {x: 340, y: 200},
    druid_grove: {x: 60, y: 220},
    forest_dungeon: {x: 80, y: 120},
    hermit_grove: {x: 100, y: 280},
    deep_mine: {x: 100, y: 420},
    ancient_forest: {x: 120, y: 180},
    miners_rest: {x: 140, y: 380},
    darkwood_village: {x: 160, y: 240},
    western_watch: {x: 160, y: 340},
    stone_quarry: {x: 180, y: 420},
    stonebridge: {x: 240, y: 300},
    shadow_dungeon: {x: 60, y: 480},
    jade_harbor: {x: 560, y: 280},
    silk_road_inn: {x: 520, y: 360},
    hillcrest: {x: 620, y: 200},
    eastern_farm: {x: 620, y: 340},
    shepherds_inn: {x: 680, y: 260},
    fishermans_port: {x: 680, y: 340},
    whispering_woods: {x: 680, y: 160},
    fairy_cave: {x: 720, y: 120},
    smugglers_cove: {x: 720, y: 420},
    royal_capital: {x: 400, y: 300},
    kings_inn: {x: 460, y: 360},
    wheat_farm: {x: 340, y: 380},
    orchard_farm: {x: 220, y: 480},
    hunters_wood: {x: 260, y: 520},
    vineyard_village: {x: 320, y: 480},
    riverside_inn: {x: 380, y: 500},
    greendale: {x: 400, y: 440},
    riverwood: {x: 480, y: 500},
    river_cave: {x: 540, y: 540},
    hunting_lodge: {x: 200, y: 560},
    sunhaven: {x: 520, y: 460},
    sunny_farm: {x: 580, y: 520},
    lighthouse_inn: {x: 640, y: 440},
    coastal_cave: {x: 640, y: 500}
};

console.log('=== COORDINATE MISMATCHES ===');
let mismatches = 0;
locations.forEach(loc => {
    const ref = reference[loc.id];
    if (ref) {
        if (loc.x !== ref.x || loc.y !== ref.y) {
            console.log(`${loc.id}: game(${loc.x},${loc.y}) vs ref(${ref.x},${ref.y})`);
            mismatches++;
        }
    }
});
if (mismatches === 0) console.log('All coordinates match reference!');

console.log('\n=== ALL LOCATIONS IN GAME ===');
locations.forEach(l => {
    console.log(`${l.id} "${l.name}" at (${l.x},${l.y})`);
});

// Check for duplicate coordinates
console.log('\n=== DUPLICATE COORDINATES (potential label overlap) ===');
const coordMap = {};
locations.forEach(l => {
    const key = `${l.x},${l.y}`;
    if (!coordMap[key]) coordMap[key] = [];
    coordMap[key].push(l);
});
Object.entries(coordMap).forEach(([key, locs]) => {
    if (locs.length > 1) {
        console.log(`Position (${key}): ${locs.map(l => l.name).join(', ')}`);
    }
});
