// Game State
class GameState {
    constructor() {
        this.coins = 0;
        this.energy = 1000;
        this.maxEnergy = 1000;
        this.level = 1;
        this.experience = 0;
        this.requiredXP = 100;
        this.coinsPerTap = 1;
        this.autoClickerRate = 0;
        this.totalClicks = 0;
        
        // Upgrade costs
        this.tapUpgradeCost = 10;
        this.energyUpgradeCost = 50;
        this.autoUpgradeCost = 100;
        
        // Achievement tracking
        this.achievements = {
            firstClick: false,
            century: false,
            lightningFast: false
        };
        
        // Click tracking for achievements
        this.clickHistory = [];
        
        this.loadGameState();
    }
    
    saveGameState() {
        const gameData = {
            coins: this.coins,
            energy: this.energy,
            maxEnergy: this.maxEnergy,
            level: this.level,
            experience: this.experience,
            requiredXP: this.requiredXP,
            coinsPerTap: this.coinsPerTap,
            autoClickerRate: this.autoClickerRate,
            totalClicks: this.totalClicks,
            tapUpgradeCost: this.tapUpgradeCost,
            energyUpgradeCost: this.energyUpgradeCost,
            autoUpgradeCost: this.autoUpgradeCost,
            achievements: this.achievements
        };
        localStorage.setItem('hamsterTapGame', JSON.stringify(gameData));
    }
    
    loadGameState() {
        const savedData = localStorage.getItem('hamsterTapGame');
        if (savedData) {
            const gameData = JSON.parse(savedData);
            Object.assign(this, gameData);
        }
    }
}

// Game instance
const game = new GameState();

// DOM Elements
const hamsterImage = document.getElementById('hamster');
const coinsDisplay = document.getElementById('coins');
const energyDisplay = document.getElementById('energy');
const levelDisplay = document.getElementById('level');
const progressFill = document.getElementById('progressFill');
const currentXPDisplay = document.getElementById('currentXP');
const requiredXPDisplay = document.getElementById('requiredXP');
const coinsPerTapDisplay = document.getElementById('coinsPerTap');
const floatingCoins = document.getElementById('floatingCoins');
const clickSound = document.getElementById('clickSound');

// Upgrade elements
const tapUpgradeCard = document.getElementById('upgrade-tap');
const energyUpgradeCard = document.getElementById('upgrade-energy');
const autoUpgradeCard = document.getElementById('upgrade-auto');
const tapUpgradeCostDisplay = document.getElementById('tapUpgradeCost');
const energyUpgradeCostDisplay = document.getElementById('energyUpgradeCost');
const autoUpgradeCostDisplay = document.getElementById('autoUpgradeCost');

// Achievement elements
const achievement1 = document.getElementById('achievement-1');
const achievement2 = document.getElementById('achievement-2');
const achievement3 = document.getElementById('achievement-3');

// Navigation elements
const navItems = document.querySelectorAll('.nav-item');

// Game Functions
function updateDisplay() {
    coinsDisplay.textContent = formatNumber(game.coins);
    energyDisplay.textContent = `${game.energy}/${game.maxEnergy}`;
    levelDisplay.textContent = game.level;
    
    const progressPercent = (game.experience / game.requiredXP) * 100;
    progressFill.style.width = `${progressPercent}%`;
    currentXPDisplay.textContent = game.experience;
    requiredXPDisplay.textContent = game.requiredXP;
    coinsPerTapDisplay.textContent = game.coinsPerTap;
    
    // Update upgrade costs
    tapUpgradeCostDisplay.textContent = formatNumber(game.tapUpgradeCost);
    energyUpgradeCostDisplay.textContent = formatNumber(game.energyUpgradeCost);
    autoUpgradeCostDisplay.textContent = formatNumber(game.autoUpgradeCost);
    
    // Update upgrade affordability
    updateUpgradeAffordability();
    
    // Update achievements
    updateAchievements();
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return Math.floor(num).toString();
}

function updateUpgradeAffordability() {
    tapUpgradeCard.classList.toggle('affordable', game.coins >= game.tapUpgradeCost);
    energyUpgradeCard.classList.toggle('affordable', game.coins >= game.energyUpgradeCost);
    autoUpgradeCard.classList.toggle('affordable', game.coins >= game.autoUpgradeCost);
}

function updateAchievements() {
    // First Click achievement
    if (!game.achievements.firstClick && game.totalClicks > 0) {
        game.achievements.firstClick = true;
        unlockAchievement(achievement1, 'First Click Unlocked! 🏆');
    }
    
    // Century achievement
    if (!game.achievements.century && game.coins >= 100) {
        game.achievements.century = true;
        unlockAchievement(achievement2, 'Century Achieved! 💯');
    }
    
    // Lightning Fast achievement
    if (!game.achievements.lightningFast) {
        const now = Date.now();
        game.clickHistory = game.clickHistory.filter(time => now - time < 10000);
        if (game.clickHistory.length >= 100) {
            game.achievements.lightningFast = true;
            unlockAchievement(achievement3, 'Lightning Fast! ⚡');
        }
    }
}

function unlockAchievement(element, message) {
    element.classList.add('unlocked');
    showFloatingText(message, element.getBoundingClientRect().left + 50, element.getBoundingClientRect().top, '#00ff88');
    playClickSound();
}

function handleTap(event) {
    if (game.energy <= 0) {
        showFloatingText('No Energy!', event.clientX, event.clientY, '#ff4444');
        return;
    }
    
    // Add coins and experience
    game.coins += game.coinsPerTap;
    game.experience += 1;
    game.energy -= 1;
    game.totalClicks++;
    
    // Track clicks for achievements
    game.clickHistory.push(Date.now());
    
    // Visual effects
    hamsterImage.classList.add('click-pulse');
    setTimeout(() => hamsterImage.classList.remove('click-pulse'), 200);
    
    // Floating coin animation
    showFloatingText(`+${game.coinsPerTap}`, event.clientX, event.clientY, '#40e0ff');
    
    // Play sound
    playClickSound();
    
    // Check for level up
    checkLevelUp();
    
    // Update display
    updateDisplay();
    
    // Save game state
    game.saveGameState();
}

function checkLevelUp() {
    if (game.experience >= game.requiredXP) {
        game.level++;
        game.experience = 0;
        game.requiredXP = Math.floor(game.requiredXP * 1.5);
        game.maxEnergy += 50;
        game.energy = game.maxEnergy; // Restore energy on level up
        
        showFloatingText(`LEVEL UP! ${game.level}`, 200, 300, '#00ff88');
        hamsterImage.classList.add('glow');
        setTimeout(() => hamsterImage.classList.remove('glow'), 1000);
    }
}

function showFloatingText(text, x, y, color = '#40e0ff') {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.className = 'floating-coin';
    floatingText.style.left = x + 'px';
    floatingText.style.top = y + 'px';
    floatingText.style.color = color;
    
    floatingCoins.appendChild(floatingText);
    
    setTimeout(() => {
        floatingCoins.removeChild(floatingText);
    }, 1500);
}

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {
        // Sound play failed, ignore
    });
}

function buyUpgrade(type) {
    let cost = 0;
    let success = false;
    
    switch(type) {
        case 'tap':
            cost = game.tapUpgradeCost;
            if (game.coins >= cost) {
                game.coins -= cost;
                game.coinsPerTap += 1;
                game.tapUpgradeCost = Math.floor(game.tapUpgradeCost * 1.5);
                success = true;
            }
            break;
            
        case 'energy':
            cost = game.energyUpgradeCost;
            if (game.coins >= cost) {
                game.coins -= cost;
                game.maxEnergy += 100;
                game.energy += 100;
                game.energyUpgradeCost = Math.floor(game.energyUpgradeCost * 2);
                success = true;
            }
            break;
            
        case 'auto':
            cost = game.autoUpgradeCost;
            if (game.coins >= cost) {
                game.coins -= cost;
                game.autoClickerRate += 1;
                game.autoUpgradeCost = Math.floor(game.autoUpgradeCost * 3);
                success = true;
            }
            break;
    }
    
    if (success) {
        showFloatingText('Upgrade Purchased!', 200, 400, '#00ff88');
        playClickSound();
        updateDisplay();
        game.saveGameState();
    } else {
        showFloatingText('Not Enough Coins!', 200, 400, '#ff4444');
    }
}

function startAutoClicker() {
    setInterval(() => {
        if (game.autoClickerRate > 0) {
            game.coins += game.autoClickerRate;
            updateDisplay();
            
            if (Math.random() < 0.1) { // 10% chance to show animation
                showFloatingText(`+${game.autoClickerRate}`, 200, 350, '#40e0ff');
            }
        }
    }, 1000);
}

function startEnergyRegeneration() {
    setInterval(() => {
        if (game.energy < game.maxEnergy) {
            game.energy += 1;
            updateDisplay();
        }
    }, 2000); // Regenerate 1 energy every 2 seconds
}

function handleNavigation(tabName) {
    navItems.forEach(item => item.classList.remove('active'));
    event.target.closest('.nav-item').classList.add('active');
    
    // For now, all tabs show the same content
    // In a full implementation, you'd switch between different views
    switch(tabName) {
        case 'game':
            // Show game content (already visible)
            break;
        case 'leaderboard':
            showFloatingText('Leaderboard Coming Soon!', 200, 300, '#40e0ff');
            break;
        case 'shop':
            showFloatingText('Shop Coming Soon!', 200, 300, '#40e0ff');
            break;
        case 'profile':
            showFloatingText('Profile Coming Soon!', 200, 300, '#40e0ff');
            break;
    }
}

// Event Listeners
hamsterImage.addEventListener('click', handleTap);

// Upgrade event listeners
tapUpgradeCard.addEventListener('click', () => buyUpgrade('tap'));
energyUpgradeCard.addEventListener('click', () => buyUpgrade('energy'));
autoUpgradeCard.addEventListener('click', () => buyUpgrade('auto'));

// Navigation event listeners
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const tabName = item.getAttribute('data-tab');
        handleNavigation(tabName);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        // Simulate click at center of hamster
        const rect = hamsterImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mockEvent = {
            clientX: centerX,
            clientY: centerY
        };
        handleTap(mockEvent);
    }
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Touch events for mobile
let touchStartTime = 0;
hamsterImage.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchStartTime = Date.now();
});

hamsterImage.addEventListener('touchend', (e) => {
    e.preventDefault();
    const touchDuration = Date.now() - touchStartTime;
    
    if (touchDuration < 500) { // Only count as tap if less than 500ms
        const touch = e.changedTouches[0];
        const mockEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY
        };
        handleTap(mockEvent);
    }
});

// Initialize game
function initGame() {
    updateDisplay();
    startAutoClicker();
    startEnergyRegeneration();
    
    // Welcome message
    setTimeout(() => {
        showFloatingText('Welcome to Hamster Tap!', 200, 200, '#40e0ff');
    }, 500);
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Save game state periodically
setInterval(() => {
    game.saveGameState();
}, 10000); // Save every 10 seconds

// Save on page unload
window.addEventListener('beforeunload', () => {
    game.saveGameState();
});