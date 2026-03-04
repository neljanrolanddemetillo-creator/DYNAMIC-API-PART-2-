# 🎬 Rick & Morty Character Explorer

A dynamic, interactive web application that fetches and showcases characters from the **Rick and Morty API**. Explore 100+ characters with detailed information, smooth animations, and immersive sound effects!

![Made with](https://img.shields.io/badge/Made%20with-HTML%20%7C%20CSS%20%7C%20JavaScript-blue) ![API](https://img.shields.io/badge/API-Rick%20and%20Morty-green) ![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## ✨ Features

### Core Features
- ✅ **100+ Characters Loaded** – Auto-loads 5 pages on startup (20 characters per page)
- ✅ **Character Modal** – Click any character to view detailed information in a beautiful modal popup
- ✅ **Smart Search** – Filter characters in real-time by name (search results stay filtered when loading more)
- ✅ **Pagination** – Load more characters dynamically with the "Load more" button
- ✅ **Horizontal Slider** – Navigate through characters with next/previous buttons
- ✅ **Responsive Design** – Works perfectly on mobile, tablet, and desktop

### Interactive Audio
- 🔊 **Click Sounds** – Satisfying click effects on buttons and search input
- 👏 **Clapping Sound** – Applaud each character when you click their card
- 🎵 **Web Audio API** – All sounds generated in-browser (no external files needed)

### Technical Features
- ⚡ **LAN Accessible** – Access from any device on your network (mobile, laptop, PC)
- 🔄 **Error Handling** – Graceful error messages if API fails
- ⏳ **Loading Spinner** – Visual feedback while fetching data
- 🎨 **Gradient Animation** – Stunning animated background
- 📱 **Mobile Optimized** – Touch-friendly interface

---

## 🚀 Quick Start

### Option 1: Local Server (Recommended)
```powershell
cd "C:\Users\GRACE\Desktop\DYNAMIC-API(PART 2)"
npx http-server -a 0.0.0.0 -p 8000
```
Then open: **http://localhost:8000**

### Option 2: Access from Another Device (LAN)
After starting the server, get your machine's IP:
```powershell
ipconfig
```
Look for **IPv4 Address** (e.g., `192.168.100.6`), then from another device:
```
http://192.168.100.6:8000
```

### Option 3: Open Directly
Simply double-click `index.html` in the project folder.

---

## 📋 How to Use

1. **View Characters** – The app loads 100+ characters automatically on startup
2. **Search** – Type a character name in the search box to filter results in real-time
3. **View Details** – Click on any character card to see their full information:
   - Image, name, status, species, gender
   - Origin and current location
   - Number of episodes appeared in
4. **Load More** – Click the "Load more characters" button to fetch additional pages
5. **Navigate** – Use the arrow buttons to scroll through the character carousel

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic structure & modal markup |
| **CSS3** | Styling, animations, gradient backgrounds |
| **JavaScript (ES6+)** | API integration, DOM manipulation, audio synthesis |
| **Web Audio API** | Procedural sound effects (clicks, claps) |
| **Fetch API** | HTTP requests to Rick and Morty API |

---

## 📁 File Structure

```
DYNAMIC-API(PART 2)/
├── index.html          # HTML structure with modal element
├── script.js           # JavaScript logic (fetch, render, sounds, modal)
├── style.css           # Styling and animations
└── README.md           # This file
```

### Key Script Functions
- `fetchPage(page)` – Fetches characters from the API
- `render(list)` – Renders character cards
- `applySearch()` – Filters characters by search term
- `openModal(character)` – Opens detail modal with clapping sound
- `playClickSound()` – Generates click sound effect
- `playClappingSound()` – Generates clapping sound effect

---

## 🌐 API Details

**Endpoint:** `https://rickandmortyapi.com/api/character`

The app fetches character data including:
- Name, image, status (Alive/Dead/Unknown)
- Species, gender, origin
- Current location, episode list

Each page returns up to 20 characters. The app loads **5 pages (100 characters) by default**.

---

## 🎯 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome/Chromium | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Edge | ✅ Full support |
| IE 11 | ❌ Not supported |

> **Note:** Web Audio API (for sound effects) requires modern browsers.

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (optional, for `npx http-server`)
- Modern web browser
- Internet connection (to fetch from the API)

### Setup Steps

1. **Clone or download the project:**
   ```powershell
   git clone https://github.com/neljanrolanddemetillo-creator/DYNAMIC-API-PART-2-.git
   cd "DYNAMIC-API(PART 2)"
   ```

2. **Start the server:**
   ```powershell
   npx http-server -a 0.0.0.0 -p 8000
   ```

3. **Open in browser:**
   - Local: `http://localhost:8000`
   - Network: `http://192.168.x.x:8000` (replace with your IP)

4. **Access from mobile/other devices** on the same Wi-Fi network using the network IP.

---

## 🎨 Customization

### Change Port
```powershell
npx http-server -a 0.0.0.0 -p 3000  # Use port 3000 instead
```

### Modify Sound Effects
Edit `playClickSound()` or `playClappingSound()` in `script.js`:
- `osc.frequency` – Adjust pitch
- `gain.gain` – Adjust volume
- Duration parameters – Change sound length

### Adjust Colors
Update CSS variables in `style.css`:
- `background: linear-gradient(...)` – Background gradient
- `.card { background: ... }` – Card colors
- `.modal-info strong { color: ... }` – Highlight colors

### Load Different Number of Pages
In `script.js`, change the `initLoad()` function:
```javascript
for (let i = 1; i <= 10; i++) {  // Load 10 pages instead of 5
```

---

## ⚠️ Troubleshooting

### "Failed to fetch" Error
- ✅ Check internet connection
- ✅ Verify the Rick and Morty API is accessible: https://rickandmortyapi.com/api/character
- ✅ If using network access, ensure firewall allows port 8000

### No Sound Effects
- ✅ Check browser audio settings
- ✅ Enable Web Audio API (usually on by default)
- ✅ Refresh the page after granting audio permissions

### Page Not Loading
- ✅ Ensure `npx http-server` is running
- ✅ Clear browser cache (Ctrl+Shift+Delete)
- ✅ Try a different browser

---

## 📈 Future Enhancements

- [ ] Add season/episode filtering
- [ ] Character favorites/bookmarking
- [ ] Dark/light mode toggle
- [ ] Advanced filters (status, species, gender)
- [ ] Export character data as CSV
- [ ] PWA support for offline access
- [ ] Sorting options (A-Z, by status, etc.)

---

## 📝 Learning Outcomes

This project demonstrates:
- ✅ RESTful API integration with `fetch()`
- ✅ Asynchronous JavaScript (async/await)
- ✅ DOM manipulation and rendering
- ✅ Event handling and listeners
- ✅ CSS animations and responsive design
- ✅ Advanced audio synthesis (Web Audio API)
- ✅ Error handling and user feedback
- ✅ Modal/dialog patterns
- ✅ Real-time search/filtering
- ✅ Network accessibility (LAN exposure)

---

## 💡 Tips for Best Experience

- **Sound On** – Enable sound for the full interactive experience 🔊
- **Full Screen** – Use full-screen mode for a cinema-like view 🎬
- **Multiple Devices** – Access from your phone while sitting on your PC
- **Slow Network** – Initial load takes a few seconds (patience required ⏳)

---

## 📜 License

This project uses the **Rick and Morty API** (free to use, fan-made).
No license restrictions apply to this implementation.

---

## 👤 Author

**GRACE** – Developer & Creator

**GitHub:** [neljanrolanddemetillo-creator](https://github.com/neljanrolanddemetillo-creator)

**Repository:** [DYNAMIC-API-PART-2](https://github.com/neljanrolanddemetillo-creator/DYNAMIC-API-PART-2-)

---

## 🙏 Acknowledgments

- **Rick and Morty API** – For the character data
- **Planet Scale** – Inspiration for the project structure
- **Web Audio API** – For procedural sound generation

---

**Enjoy exploring the Rick and Morty universe!** 🚀👽  
*"Wubba Lubba Dub Dub!"*
