//
// EXPLORATION PANEL - choose your fate at each location
//
// Version: 0.90.01 | Unity AI Lab
// This panel shows available explorations based on current location type
// Connects to ExplorationConfig and DungeonExplorationSystem
//

console.log('Exploration panel emerging from the shadows...');

const ExplorationPanel = {
    panelId: 'exploration-panel',
    isOpen: false,
    currentLocation: null,
    currentLocationType: null,
    selectedExploration: null,
    explorationCooldowns: {}, // track cooldowns per exploration
    explorationHistory: [],    // track recent exploration history

    // panel state
    isDragging: false,
    dragOffset: { x: 0, y: 0 },

    init() {
        this.createPanelHTML();
        this.setupEventListeners();
        this.loadCooldowns();
        this.loadCompletedExplorations();
        this.loadExplorationHistory();
        console.log('Exploration panel ready to guide lost souls...');
    },

    createPanelHTML() {
        if (document.getElementById(this.panelId)) {
            return;
        }

        const overlayContainer = document.getElementById('overlay-container');
        if (!overlayContainer) {
            console.warn('ExplorationPanel: overlay-container not found');
            return;
        }

        const panel = document.createElement('section');
        panel.id = this.panelId;
        panel.className = 'panel overlay-panel hidden';
        panel.innerHTML = `
            <button class="panel-close-x" data-close-overlay="${this.panelId}" title="Close">×</button>

            <div class="exploration-display">
                <div class="panel-header exploration-header">
                    <span id="exploration-location-icon" class="exploration-icon-large">🔍</span>
                    <div class="exploration-header-text">
                        <h2 id="exploration-title">Explore Location</h2>
                        <span id="exploration-subtitle" class="exploration-subtitle">Choose your adventure...</span>
                    </div>
                </div>

                <div class="panel-content exploration-content">
                    <!-- Location Info -->
                    <div class="exploration-location-info" id="exploration-location-info">
                        <span id="exploration-location-name">Unknown Location</span>
                        <span id="exploration-location-type" class="location-type-badge">unknown</span>
                    </div>

                    <!-- Exploration Progress Bar -->
                    <div class="exploration-progress-container" id="exploration-progress-container">
                        <div class="exploration-progress-header">
                            <span class="exploration-progress-label">Location Explored</span>
                            <span class="exploration-progress-percent" id="exploration-progress-percent">0%</span>
                        </div>
                        <div class="exploration-progress-bar">
                            <div class="exploration-progress-fill" id="exploration-progress-fill" style="width: 0%"></div>
                        </div>
                    </div>

                    <!-- Available Explorations List -->
                    <div class="exploration-options-container" id="exploration-options-container">
                        <h3 class="exploration-section-title">Available Explorations</h3>
                        <div class="exploration-options-list" id="exploration-options-list">
                            <!-- Populated dynamically -->
                            <div class="exploration-loading">Loading explorations...</div>
                        </div>
                    </div>

                    <!-- Quest Explorations (if any) -->
                    <div class="exploration-quest-container hidden" id="exploration-quest-container">
                        <h3 class="exploration-section-title">Quest Explorations</h3>
                        <div class="exploration-quest-list" id="exploration-quest-list">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <!-- NPC Explorations (if any) -->
                    <div class="exploration-npc-container hidden" id="exploration-npc-container">
                        <h3 class="exploration-section-title">NPC Opportunities</h3>
                        <div class="exploration-npc-list" id="exploration-npc-list">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <!-- Exploration History -->
                    <div class="exploration-history-container" id="exploration-history-container">
                        <h3 class="exploration-section-title" onclick="ExplorationPanel.toggleHistory()">
                            Recent History <span class="history-toggle">[+]</span>
                        </h3>
                        <div class="exploration-history-list hidden" id="exploration-history-list">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <!-- Selected Exploration Preview -->
                    <div class="exploration-preview hidden" id="exploration-preview">
                        <h3 class="exploration-section-title">Selected: <span id="preview-name">None</span></h3>
                        <p id="preview-description">Select an exploration to see details...</p>
                        <div class="exploration-preview-stats" id="preview-stats">
                            <!-- Stats populated here -->
                        </div>
                        <button class="exploration-btn primary" id="start-exploration-btn" onclick="ExplorationPanel.startExploration()">
                            Begin Exploration
                        </button>
                    </div>
                </div>
            </div>
        `;

        overlayContainer.appendChild(panel);
        this.addStyles();
        console.log('ExplorationPanel: Panel created');
    },

    addStyles() {
        if (document.getElementById('exploration-panel-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'exploration-panel-styles';
        styles.textContent = `
            /* Exploration Panel Styles */
            #exploration-panel {
                min-width: 420px;
                max-width: 500px;
                max-height: 80vh;
                display: flex;
                flex-direction: column;
                animation: explorationPanelSlideIn 0.3s ease-out;
            }

            @keyframes explorationPanelSlideIn {
                from { opacity: 0; transform: translateY(-20px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }

            .exploration-display {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .exploration-header {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px 20px;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                background: linear-gradient(180deg, rgba(139, 69, 19, 0.3) 0%, transparent 100%);
            }

            .exploration-icon-large {
                font-size: 2.5em;
                filter: drop-shadow(0 0 8px rgba(139, 69, 19, 0.6));
            }

            .exploration-header-text h2 {
                margin: 0 0 4px 0;
                font-size: 1.3em;
                color: #fff;
            }

            .exploration-subtitle {
                font-size: 0.85em;
                color: rgba(255,255,255,0.6);
                font-style: italic;
            }

            .exploration-content {
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                overflow-y: auto;
                max-height: calc(80vh - 100px);
            }

            .exploration-location-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 14px;
                background: rgba(0,0,0,0.3);
                border-radius: 8px;
                border: 1px solid rgba(255,255,255,0.1);
            }

            #exploration-location-name {
                font-weight: bold;
                color: #f5deb3;
            }

            .location-type-badge {
                background: rgba(139, 69, 19, 0.4);
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 0.8em;
                text-transform: capitalize;
                border: 1px solid rgba(139, 69, 19, 0.6);
            }

            .exploration-section-title {
                font-size: 0.95em;
                color: #d4af37;
                margin: 0 0 10px 0;
                padding-bottom: 6px;
                border-bottom: 1px solid rgba(212, 175, 55, 0.3);
            }

            .exploration-options-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
                max-height: 250px;
                overflow-y: auto;
            }

            .exploration-option {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: rgba(0,0,0,0.25);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .exploration-option:hover:not(.disabled):not(.on-cooldown) {
                background: rgba(139, 69, 19, 0.25);
                border-color: rgba(139, 69, 19, 0.5);
                transform: translateX(4px);
            }

            .exploration-option.selected {
                background: rgba(139, 69, 19, 0.35);
                border-color: #8b4513;
                box-shadow: 0 0 10px rgba(139, 69, 19, 0.4);
            }

            .exploration-option.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .exploration-option.on-cooldown {
                opacity: 0.6;
                cursor: not-allowed;
                background: rgba(50,50,50,0.3);
            }

            .exploration-option-icon {
                font-size: 1.8em;
                width: 40px;
                text-align: center;
            }

            .exploration-option-info {
                flex: 1;
            }

            .exploration-option-name {
                font-weight: bold;
                color: #f5deb3;
                margin-bottom: 2px;
            }

            .exploration-option-desc {
                font-size: 0.8em;
                color: rgba(255,255,255,0.6);
            }

            .exploration-option-status {
                font-size: 0.75em;
                padding: 3px 8px;
                border-radius: 10px;
            }

            .exploration-option-status.available {
                background: rgba(34, 197, 94, 0.3);
                color: #4ade80;
            }

            .exploration-option-status.cooldown {
                background: rgba(239, 68, 68, 0.3);
                color: #f87171;
                font-family: monospace;
                min-width: 50px;
                text-align: center;
            }

            .cooldown-timer {
                display: inline-flex;
                align-items: center;
                gap: 4px;
            }

            .cooldown-timer::before {
                content: '';
            }

            /* Progress bar for location completion */
            .exploration-progress-container {
                margin-bottom: 12px;
                padding: 8px 12px;
                background: rgba(0,0,0,0.3);
                border-radius: 8px;
            }

            .exploration-progress-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 6px;
                font-size: 0.85em;
            }

            .exploration-progress-label {
                color: rgba(255,255,255,0.7);
            }

            .exploration-progress-percent {
                color: #4ade80;
                font-weight: bold;
            }

            .exploration-progress-bar {
                height: 6px;
                background: rgba(0,0,0,0.4);
                border-radius: 3px;
                overflow: hidden;
            }

            .exploration-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #8b4513 0%, #d4af37 100%);
                border-radius: 3px;
                transition: width 0.3s ease;
            }

            /* Completed badge on exploration options */
            .exploration-option.completed {
                border-left: 3px solid #4ade80;
            }

            .exploration-option-status.completed {
                background: rgba(34, 197, 94, 0.2);
                color: #4ade80;
            }

            .exploration-option-status.locked {
                background: rgba(107, 114, 128, 0.3);
                color: #9ca3af;
            }

            .exploration-preview {
                background: rgba(0,0,0,0.3);
                border: 1px solid rgba(139, 69, 19, 0.4);
                border-radius: 8px;
                padding: 14px;
            }

            #preview-description {
                font-size: 0.9em;
                color: rgba(255,255,255,0.8);
                margin: 8px 0;
                font-style: italic;
            }

            .exploration-preview-stats {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin: 10px 0;
            }

            .preview-stat {
                background: rgba(0,0,0,0.3);
                padding: 4px 10px;
                border-radius: 6px;
                font-size: 0.8em;
            }

            .preview-stat.cost {
                border: 1px solid rgba(239, 68, 68, 0.4);
                color: #f87171;
            }

            .preview-stat.difficulty {
                border: 1px solid rgba(234, 179, 8, 0.4);
                color: #fbbf24;
            }

            .preview-stat.reward {
                border: 1px solid rgba(34, 197, 94, 0.4);
                color: #4ade80;
            }

            .exploration-btn {
                width: 100%;
                padding: 12px;
                border: none;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 1em;
            }

            .exploration-btn.primary {
                background: linear-gradient(180deg, #8b4513 0%, #5c2d0e 100%);
                color: #f5deb3;
                border: 1px solid rgba(139, 69, 19, 0.6);
            }

            .exploration-btn.primary:hover {
                background: linear-gradient(180deg, #a0522d 0%, #6b3a0f 100%);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(139, 69, 19, 0.4);
            }

            .exploration-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none !important;
            }

            .exploration-loading {
                text-align: center;
                padding: 20px;
                color: rgba(255,255,255,0.5);
                font-style: italic;
            }

            .exploration-quest-container {
                border-top: 1px solid rgba(212, 175, 55, 0.3);
                padding-top: 12px;
            }

            .quest-exploration-badge {
                background: linear-gradient(90deg, rgba(212, 175, 55, 0.3), transparent);
                border-left: 3px solid #d4af37;
            }

            /* NPC Explorations section */
            .exploration-npc-container {
                border-top: 1px solid rgba(100, 149, 237, 0.3);
                padding-top: 12px;
            }

            .npc-exploration-badge {
                background: linear-gradient(90deg, rgba(100, 149, 237, 0.2), transparent);
                border-left: 3px solid #6495ed;
            }

            /* History section */
            .exploration-history-container {
                border-top: 1px solid rgba(255,255,255,0.1);
                margin-top: 12px;
                padding-top: 8px;
            }

            .exploration-history-container .exploration-section-title {
                cursor: pointer;
                user-select: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .exploration-history-container .exploration-section-title:hover {
                color: #d4af37;
            }

            .history-toggle {
                font-size: 0.8em;
                color: rgba(255,255,255,0.5);
            }

            .exploration-history-list {
                max-height: 200px;
                overflow-y: auto;
                padding: 8px 0;
            }

            .history-entry {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 6px 10px;
                margin-bottom: 4px;
                background: rgba(0,0,0,0.2);
                border-radius: 6px;
                font-size: 0.85em;
            }

            .history-entry-icon {
                font-size: 1.1em;
            }

            .history-entry-info {
                flex: 1;
            }

            .history-entry-name {
                color: #f5deb3;
            }

            .history-entry-location {
                color: rgba(255,255,255,0.5);
                font-size: 0.9em;
            }

            .history-entry-time {
                color: rgba(255,255,255,0.4);
                font-size: 0.8em;
            }

            .history-entry.success {
                border-left: 2px solid #4ade80;
            }

            .history-entry.failure {
                border-left: 2px solid #f87171;
            }
        `;
        document.head.appendChild(styles);
    },

    setupEventListeners() {
        // close button
        document.addEventListener('click', (e) => {
            if (e.target.matches(`[data-close-overlay="${this.panelId}"]`)) {
                this.close();
            }
        });

        // listen for location changes
        document.addEventListener('location-changed', (e) => {
            if (this.isOpen) {
                this.updateForLocation(e.detail?.locationId);
            }
        });

        // keyboard shortcut - E for explore
        document.addEventListener('keydown', (e) => {
            if (e.key === 'e' || e.key === 'E') {
                // don't trigger if typing in input
                if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
                    return;
                }
                // toggle panel
                if (this.isOpen) {
                    this.close();
                } else {
                    this.open();
                }
            }
        });
    },

    loadCooldowns() {
        // load from localStorage
        try {
            const saved = localStorage.getItem('explorationCooldowns');
            if (saved) {
                this.explorationCooldowns = JSON.parse(saved);
                // clean up expired cooldowns
                const now = Date.now();
                for (const [key, expiry] of Object.entries(this.explorationCooldowns)) {
                    if (expiry < now) {
                        delete this.explorationCooldowns[key];
                    }
                }
            }
        } catch (e) {
            console.warn('Failed to load exploration cooldowns:', e);
        }
    },

    saveCooldowns() {
        try {
            localStorage.setItem('explorationCooldowns', JSON.stringify(this.explorationCooldowns));
        } catch (e) {
            console.warn('Failed to save exploration cooldowns:', e);
        }
    },

    // Load completed explorations tracking
    loadCompletedExplorations() {
        try {
            const saved = localStorage.getItem('explorationCompleted');
            if (saved) {
                this.completedExplorations = JSON.parse(saved);
            } else {
                this.completedExplorations = {};
            }
        } catch (e) {
            console.warn('Failed to load completed explorations:', e);
            this.completedExplorations = {};
        }
    },

    // Save completed explorations
    saveCompletedExplorations() {
        try {
            localStorage.setItem('explorationCompleted', JSON.stringify(this.completedExplorations));
        } catch (e) {
            console.warn('Failed to save completed explorations:', e);
        }
    },

    // Mark an exploration as completed at a location
    markExplorationCompleted(locationId, explorationId) {
        if (!this.completedExplorations[locationId]) {
            this.completedExplorations[locationId] = [];
        }
        if (!this.completedExplorations[locationId].includes(explorationId)) {
            this.completedExplorations[locationId].push(explorationId);
            this.saveCompletedExplorations();
        }
    },

    // Get completion percentage for a location
    getLocationCompletionPercent(locationId, locationType) {
        // Get total available explorations for this location
        let totalExplorations = [];
        if (typeof ExplorationConfig !== 'undefined') {
            totalExplorations = ExplorationConfig.getExplorationsForLocation(locationId, locationType);
        }

        if (totalExplorations.length === 0) return 0;

        // Get completed ones
        const completed = this.completedExplorations[locationId] || [];
        const completedCount = completed.filter(exp => totalExplorations.includes(exp)).length;

        return Math.round((completedCount / totalExplorations.length) * 100);
    },

    // Check if exploration was completed at location
    isExplorationCompleted(locationId, explorationId) {
        return this.completedExplorations[locationId]?.includes(explorationId) || false;
    },

    open(locationId = null) {
        const panel = document.getElementById(this.panelId);
        if (!panel) {
            this.init();
        }

        // get current location if not provided
        if (!locationId && typeof game !== 'undefined') {
            locationId = typeof game.currentLocation === 'string' ? game.currentLocation : game.currentLocation?.id;
        }

        if (!locationId) {
            console.warn('ExplorationPanel: No location to explore');
            return;
        }

        this.currentLocation = locationId;
        this.updateForLocation(locationId);

        const panelEl = document.getElementById(this.panelId);
        if (panelEl) {
            panelEl.classList.remove('hidden');
            this.isOpen = true;
            // Start live cooldown timer updates
            this.startCooldownTimer();
        }
    },

    close() {
        const panel = document.getElementById(this.panelId);
        if (panel) {
            panel.classList.add('hidden');
        }
        this.isOpen = false;
        this.selectedExploration = null;
        // Stop cooldown timer when panel closes
        this.stopCooldownTimer();
    },

    updateForLocation(locationId) {
        if (!locationId) return;

        // get location data
        let location = null;
        if (typeof GameWorld !== 'undefined' && GameWorld.locations) {
            location = GameWorld.locations[locationId];
        }

        if (!location) {
            console.warn('ExplorationPanel: Location not found:', locationId);
            return;
        }

        this.currentLocation = locationId;
        this.currentLocationType = location.type;

        // update header
        const typeConfig = ExplorationConfig?.LOCATION_EXPLORATIONS?.[location.type];
        const icon = typeConfig?.icon || '🔍';
        const typeName = typeConfig?.name || location.type;

        document.getElementById('exploration-location-icon').textContent = icon;
        document.getElementById('exploration-title').textContent = 'Explore ' + (location.name || locationId);
        document.getElementById('exploration-subtitle').textContent = typeConfig?.description || 'Choose your adventure...';
        document.getElementById('exploration-location-name').textContent = location.name || locationId;
        document.getElementById('exploration-location-type').textContent = typeName;

        // Update progress bar
        const completionPercent = this.getLocationCompletionPercent(locationId, location.type);
        document.getElementById('exploration-progress-percent').textContent = `${completionPercent}%`;
        document.getElementById('exploration-progress-fill').style.width = `${completionPercent}%`;

        // get available explorations
        this.populateExplorations(locationId, location.type);
    },

    populateExplorations(locationId, locationType) {
        const listContainer = document.getElementById('exploration-options-list');
        const questContainer = document.getElementById('exploration-quest-container');
        const questList = document.getElementById('exploration-quest-list');
        const npcContainer = document.getElementById('exploration-npc-container');
        const npcList = document.getElementById('exploration-npc-list');

        if (!listContainer) return;

        // get explorations from config
        let explorations = [];
        if (typeof ExplorationConfig !== 'undefined') {
            explorations = ExplorationConfig.getExplorationsForLocation(locationId, locationType);
        }

        // get quest explorations
        let questExplorations = [];
        if (typeof ExplorationConfig !== 'undefined' && typeof QuestSystem !== 'undefined') {
            const activeQuestIds = Object.keys(QuestSystem.activeQuests || {});
            questExplorations = ExplorationConfig.getQuestExplorations(activeQuestIds);
        }

        // get NPC-unlocked explorations
        let npcExplorations = [];
        if (typeof ExplorationConfig !== 'undefined') {
            npcExplorations = ExplorationConfig.getNPCExplorations(locationId);
        }

        // build HTML for regular explorations
        if (explorations.length === 0) {
            listContainer.innerHTML = `<div class="exploration-loading">No explorations available at this location.</div>`;
        } else {
            listContainer.innerHTML = explorations.map(expId => this.renderExplorationOption(expId, false)).join('');
        }

        // build HTML for quest explorations
        if (questExplorations.length > 0) {
            questContainer.classList.remove('hidden');
            questList.innerHTML = questExplorations.map(expId => this.renderExplorationOption(expId, true)).join('');
        } else {
            questContainer.classList.add('hidden');
        }

        // build HTML for NPC explorations
        if (npcExplorations.length > 0 && npcContainer && npcList) {
            npcContainer.classList.remove('hidden');
            npcList.innerHTML = npcExplorations.map(npcExp =>
                this.renderExplorationOption(npcExp.id, false, 'npc', npcExp.npcId)
            ).join('');
        } else if (npcContainer) {
            npcContainer.classList.add('hidden');
        }

        // populate history
        this.populateHistory();

        // hide preview until selection
        document.getElementById('exploration-preview')?.classList.add('hidden');
    },

    renderExplorationOption(explorationId, isQuest = false, source = 'location', sourceId = null) {
        // get exploration event data from DungeonExplorationSystem
        let eventData = null;
        if (typeof DungeonExplorationSystem !== 'undefined') {
            eventData = DungeonExplorationSystem.EXPLORATION_EVENTS?.[explorationId];
        }

        // fallback for explorations not yet defined
        if (!eventData) {
            eventData = {
                id: explorationId,
                name: this.formatExplorationName(explorationId),
                description: 'An unexplored opportunity awaits...',
                icon: '❓',
                difficulty: 'unknown'
            };
        }

        // For NPC explorations, add the NPC name to description
        if (source === 'npc' && sourceId) {
            const npcName = this.formatExplorationName(sourceId);
            eventData = {
                ...eventData,
                description: `[${npcName}] ${eventData.description || 'Special opportunity...'}`
            };
        }

        // check cooldown
        const cooldownKey = `${this.currentLocation}_${explorationId}`;
        const cooldownExpiry = this.explorationCooldowns[cooldownKey];
        const isOnCooldown = cooldownExpiry && cooldownExpiry > Date.now();
        let cooldownText = '';
        if (isOnCooldown) {
            cooldownText = this.formatCooldownTime(cooldownExpiry - Date.now());
        }

        // check requirements (pass locationId for NPC guide checks)
        let canDo = { canDo: true, reason: null };
        if (typeof ExplorationConfig !== 'undefined' && typeof game !== 'undefined') {
            canDo = ExplorationConfig.canDoExploration(explorationId, game.player || {}, this.currentLocation);
        }

        // check if completed before
        const isCompleted = this.isExplorationCompleted(this.currentLocation, explorationId);

        // determine status display (priority: cooldown > locked > completed > ready)
        let statusClass, statusText;
        if (isOnCooldown) {
            statusClass = 'cooldown';
            statusText = cooldownText;
        } else if (!canDo.canDo) {
            statusClass = 'locked';
            statusText = canDo.reason;
        } else if (isCompleted) {
            statusClass = 'completed';
            statusText = 'Done';
        } else {
            statusClass = 'available';
            statusText = 'Ready';
        }

        const optionClass = isOnCooldown ? 'on-cooldown' : (!canDo.canDo ? 'disabled' : (isCompleted ? 'completed' : ''));
        const badgeClass = isQuest ? 'quest-exploration-badge' : (source === 'npc' ? 'npc-exploration-badge' : '');

        return `
            <div class="exploration-option ${optionClass} ${badgeClass}"
                 data-exploration-id="${explorationId}"
                 onclick="ExplorationPanel.selectExploration('${explorationId}')">
                <span class="exploration-option-icon">${eventData.icon || '🔍'}</span>
                <div class="exploration-option-info">
                    <div class="exploration-option-name">${eventData.name}</div>
                    <div class="exploration-option-desc">${eventData.description?.substring(0, 60) || 'Explore this area...'}${eventData.description?.length > 60 ? '...' : ''}</div>
                </div>
                <span class="exploration-option-status ${statusClass}">${statusText}</span>
            </div>
        `;
    },

    formatExplorationName(id) {
        // convert snake_case to Title Case
        return id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },

    // Format cooldown time as h:mm or mm:ss
    formatCooldownTime(ms) {
        const totalSeconds = Math.ceil(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}`;
        } else if (minutes > 0) {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `0:${seconds.toString().padStart(2, '0')}`;
        }
    },

    // Start cooldown timer updates when panel is open
    startCooldownTimer() {
        // Clear any existing timer
        this.stopCooldownTimer();

        // Update every second
        this.cooldownTimerInterval = setInterval(() => {
            if (!this.isOpen) {
                this.stopCooldownTimer();
                return;
            }

            // Update all cooldown displays
            const cooldownElements = document.querySelectorAll('.exploration-option-status.cooldown');
            cooldownElements.forEach(el => {
                const option = el.closest('.exploration-option');
                if (!option) return;

                const expId = option.dataset.explorationId;
                const cooldownKey = `${this.currentLocation}_${expId}`;
                const cooldownExpiry = this.explorationCooldowns[cooldownKey];

                if (cooldownExpiry && cooldownExpiry > Date.now()) {
                    el.textContent = this.formatCooldownTime(cooldownExpiry - Date.now());
                } else {
                    // Cooldown expired - refresh the list
                    this.updateForLocation(this.currentLocation);
                }
            });
        }, 1000);
    },

    stopCooldownTimer() {
        if (this.cooldownTimerInterval) {
            clearInterval(this.cooldownTimerInterval);
            this.cooldownTimerInterval = null;
        }
    },

    selectExploration(explorationId) {
        // check if selectable
        const cooldownKey = `${this.currentLocation}_${explorationId}`;
        const isOnCooldown = this.explorationCooldowns[cooldownKey] && this.explorationCooldowns[cooldownKey] > Date.now();
        if (isOnCooldown) {
            console.log('Exploration on cooldown');
            return;
        }

        let canDo = { canDo: true };
        if (typeof ExplorationConfig !== 'undefined' && typeof game !== 'undefined') {
            canDo = ExplorationConfig.canDoExploration(explorationId, game.player || {});
        }
        if (!canDo.canDo) {
            if (typeof game !== 'undefined' && game.addMessage) {
                game.addMessage(`Cannot explore: ${canDo.reason}`, 'warning');
            }
            return;
        }

        this.selectedExploration = explorationId;

        // update selection visual
        document.querySelectorAll('.exploration-option').forEach(el => {
            el.classList.remove('selected');
        });
        document.querySelector(`[data-exploration-id="${explorationId}"]`)?.classList.add('selected');

        // show preview
        this.showPreview(explorationId);
    },

    showPreview(explorationId) {
        const preview = document.getElementById('exploration-preview');
        if (!preview) return;

        // get event data
        let eventData = null;
        if (typeof DungeonExplorationSystem !== 'undefined') {
            eventData = DungeonExplorationSystem.EXPLORATION_EVENTS?.[explorationId];
        }

        if (!eventData) {
            eventData = {
                name: this.formatExplorationName(explorationId),
                description: 'Venture into the unknown...',
                difficulty: 'unknown',
                choices: []
            };
        }

        document.getElementById('preview-name').textContent = eventData.name;
        document.getElementById('preview-description').textContent = eventData.description;

        // build stats
        const statsContainer = document.getElementById('preview-stats');
        let statsHtml = '';

        // difficulty
        const difficultyColors = { easy: '#4ade80', medium: '#fbbf24', hard: '#f87171', unknown: '#9ca3af' };
        statsHtml += `<span class="preview-stat difficulty" style="border-color: ${difficultyColors[eventData.difficulty] || difficultyColors.unknown}40; color: ${difficultyColors[eventData.difficulty] || difficultyColors.unknown}">
            Difficulty: ${eventData.difficulty || 'Unknown'}
        </span>`;

        // number of choices
        if (eventData.choices) {
            statsHtml += `<span class="preview-stat reward">${eventData.choices.length} choices available</span>`;
        }

        statsContainer.innerHTML = statsHtml;
        preview.classList.remove('hidden');
    },

    startExploration() {
        if (!this.selectedExploration) {
            console.warn('No exploration selected');
            return;
        }

        console.log('Starting exploration:', this.selectedExploration);

        // close this panel
        this.close();

        // trigger the exploration event through DungeonExplorationSystem
        if (typeof DungeonExplorationSystem !== 'undefined') {
            // check if the event exists
            const eventData = DungeonExplorationSystem.EXPLORATION_EVENTS?.[this.selectedExploration];
            if (eventData) {
                // trigger the exploration event
                DungeonExplorationSystem.triggerExplorationEvent(this.selectedExploration, this.currentLocation);

                // mark exploration as completed for progress tracking
                this.markExplorationCompleted(this.currentLocation, this.selectedExploration);

                // add to history
                this.addToHistory(this.selectedExploration, this.currentLocation, this.currentLocationType, eventData);

                // set cooldown
                const cooldownMinutes = ExplorationConfig?.getCooldown(this.currentLocationType) || 60;
                const cooldownKey = `${this.currentLocation}_${this.selectedExploration}`;
                this.explorationCooldowns[cooldownKey] = Date.now() + (cooldownMinutes * 60 * 1000);
                this.saveCooldowns();
            } else {
                // event not implemented yet
                if (typeof game !== 'undefined' && game.addMessage) {
                    game.addMessage(`This exploration (${this.formatExplorationName(this.selectedExploration)}) is not yet available.`, 'info');
                }
            }
        }

        this.selectedExploration = null;
    },

    // History management
    loadExplorationHistory() {
        try {
            const saved = localStorage.getItem('explorationHistory');
            if (saved) {
                this.explorationHistory = JSON.parse(saved);
                // Keep only last 50 entries
                if (this.explorationHistory.length > 50) {
                    this.explorationHistory = this.explorationHistory.slice(-50);
                }
            }
        } catch (e) {
            console.warn('Failed to load exploration history:', e);
            this.explorationHistory = [];
        }
    },

    saveExplorationHistory() {
        try {
            localStorage.setItem('explorationHistory', JSON.stringify(this.explorationHistory));
        } catch (e) {
            console.warn('Failed to save exploration history:', e);
        }
    },

    addToHistory(explorationId, locationId, locationType, eventData) {
        // Get location name
        let locationName = locationId;
        if (typeof GameWorld !== 'undefined' && GameWorld.locations?.[locationId]) {
            locationName = GameWorld.locations[locationId].name || locationId;
        }

        const entry = {
            id: explorationId,
            name: eventData?.name || this.formatExplorationName(explorationId),
            icon: eventData?.icon || '🔍',
            locationId: locationId,
            locationName: locationName,
            locationType: locationType,
            timestamp: Date.now(),
            success: true // We mark as success when triggered; could be updated later based on outcome
        };

        this.explorationHistory.push(entry);

        // Keep only last 50
        if (this.explorationHistory.length > 50) {
            this.explorationHistory.shift();
        }

        this.saveExplorationHistory();
    },

    toggleHistory() {
        const historyList = document.getElementById('exploration-history-list');
        const toggleSpan = document.querySelector('.history-toggle');
        if (historyList) {
            historyList.classList.toggle('hidden');
            if (toggleSpan) {
                toggleSpan.textContent = historyList.classList.contains('hidden') ? '[+]' : '[-]';
            }
        }
    },

    populateHistory() {
        const historyList = document.getElementById('exploration-history-list');
        if (!historyList) return;

        // Show last 10 entries, newest first
        const recentHistory = this.explorationHistory.slice(-10).reverse();

        if (recentHistory.length === 0) {
            historyList.innerHTML = '<div class="exploration-loading">No exploration history yet.</div>';
            return;
        }

        historyList.innerHTML = recentHistory.map(entry => {
            const timeAgo = this.formatTimeAgo(entry.timestamp);
            return `
                <div class="history-entry ${entry.success ? 'success' : 'failure'}">
                    <span class="history-entry-icon">${entry.icon}</span>
                    <div class="history-entry-info">
                        <div class="history-entry-name">${entry.name}</div>
                        <div class="history-entry-location">${entry.locationName}</div>
                    </div>
                    <span class="history-entry-time">${timeAgo}</span>
                </div>
            `;
        }).join('');
    },

    formatTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
};

// auto-init when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ExplorationPanel.init());
} else {
    ExplorationPanel.init();
}

// expose globally
if (typeof window !== 'undefined') {
    window.ExplorationPanel = ExplorationPanel;
}

console.log('Exploration panel loaded - press E to explore');
