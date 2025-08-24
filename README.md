# 🐹 Hamster Tap - Tap to Earn Game

A modern web-based tap-to-earn game inspired by Hamster Kombat, featuring beautiful UI, engaging gameplay mechanics, and progressive rewards.

## 🚀 Features

### Core Gameplay
- **Tap-to-Earn Mechanics**: Click the hamster to earn coins and experience
- **Energy System**: Limited energy that regenerates over time
- **Level Progression**: Unlock new levels with increasing XP requirements
- **Auto-Save**: Game progress automatically saves to localStorage

### Upgrades & Progression
- **Stronger Tap**: Increase coins per tap
- **Energy Boost**: Expand maximum energy capacity
- **Auto Clicker**: Passive coin generation over time
- **Dynamic Pricing**: Upgrade costs increase with each purchase

### Achievements
- **First Click**: Unlock by clicking the hamster for the first time
- **Century**: Earn 100 coins total
- **Lightning Fast**: Click 100 times within 10 seconds

### Modern UI/UX
- **Dark Gaming Theme**: Neon blue color scheme with gradient backgrounds
- **Responsive Design**: Optimized for mobile and desktop
- **Floating Animations**: Visual feedback for clicks and achievements
- **Sound Effects**: Audio feedback for interactions
- **Progressive Enhancement**: Works without JavaScript (basic functionality)

## 🎮 How to Play

1. **Click the Hamster**: Tap or click the hamster emoji to earn coins
2. **Manage Energy**: Each click consumes 1 energy point (regenerates over time)
3. **Purchase Upgrades**: Spend coins to improve your tapping power
4. **Level Up**: Gain experience to unlock higher levels with better rewards
5. **Unlock Achievements**: Complete various challenges for bragging rights

### Controls
- **Mouse/Touch**: Click or tap the hamster
- **Spacebar**: Alternative way to "click" the hamster
- **Navigation**: Use bottom tabs (Game, Leaderboard, Shop, Profile)

## 🛠️ Technical Features

### Built With
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with animations and transitions
- **Vanilla JavaScript**: No frameworks, pure ES6+ code
- **Local Storage**: Persistent game saves
- **Font Awesome**: Icons for UI elements
- **Google Fonts**: Orbitron font for gaming aesthetic

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

### Performance Optimizations
- Efficient DOM manipulation
- Throttled save operations
- Optimized animations with CSS transforms
- Minimal memory footprint

## 📱 Mobile Experience

The game is designed mobile-first with:
- Touch-optimized controls
- Responsive layout (max-width: 400px centered)
- Prevented context menus and selection
- Optimized touch events
- Fast tap response times

## 🎯 Game Balance

### Energy System
- Starting energy: 1000
- Energy cost per click: 1
- Regeneration rate: 1 energy per 2 seconds
- Energy capacity increases: +50 per level, +100 per upgrade

### Level Progression
- Starting XP requirement: 100
- XP growth: 1.5x multiplier per level
- Energy fully restored on level up
- Max energy bonus: +50 per level

### Upgrade Costs
- **Tap Power**: Base cost 10, multiplier 1.5x
- **Energy Capacity**: Base cost 50, multiplier 2x
- **Auto Clicker**: Base cost 100, multiplier 3x

## 🔧 Setup & Installation

1. **Clone or Download** the project files
2. **Serve the files** through a web server (required for some features):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or simply open index.html in a modern browser
   ```
3. **Open in browser**: Navigate to `http://localhost:8000` or open `index.html`

## 📁 Project Structure

```
hamster-tap-game/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── script.js           # Game logic and mechanics
└── README.md           # Project documentation
```

## 🎨 Customization

### Colors & Theme
Edit the CSS variables for easy theme customization:
```css
:root {
    --primary-color: #40e0ff;
    --secondary-color: #00ff88;
    --background-dark: #1a1a2e;
    --card-background: rgba(30, 30, 62, 0.8);
}
```

### Game Balance
Modify the GameState class constructor in `script.js`:
```javascript
this.coinsPerTap = 1;        // Starting coins per tap
this.maxEnergy = 1000;       // Starting energy
this.tapUpgradeCost = 10;    // Upgrade costs
```

## 🔮 Future Enhancements

- **Leaderboard System**: Compare scores with other players
- **Daily Rewards**: Login bonuses and streak rewards
- **More Achievements**: Extended achievement system
- **Sound Settings**: Volume controls and sound toggles
- **Themes**: Multiple color themes and hamster characters
- **Prestige System**: Reset progress for permanent bonuses
- **Multiplayer Features**: Social interactions and competitions

## 🐛 Known Issues

- Audio may not play on some mobile browsers due to autoplay policies
- Very rapid clicking might cause minor visual lag on older devices
- Achievement notifications might overlap on very small screens

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for:
- Bug fixes
- Performance improvements
- New features
- UI/UX enhancements
- Mobile optimizations

---

**Enjoy tapping your way to hamster fortune! 🐹💰**