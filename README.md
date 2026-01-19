# Countries App

A web application for searching and exploring countries worldwide with detailed information about capitals, populations, languages, currencies, and geographic locations.

## Features

- 🔍 **Smart Search** - Search countries by name (minimum 3 characters to trigger search)
- ⭐ **Favorites** - Save and access your favorite countries instantly
- 📋 **Recent Searches** - Automatically tracks your last 10 searches
- 📍 **Maps Integration** - View country locations on Google Maps
- 💾 **Local Storage** - All preferences saved in your browser

## How to Use

1. Open `index.html` in your browser
2. Type a country name (search starts after 3 characters)
3. Click the star icon to add countries to favorites
4. Access recent searches and favorites from the sidebar

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (ES6 modules)
- **API**: [REST Countries API](https://restcountries.com)
- **Storage**: Browser LocalStorage for favorites and recent searches

## Project Structure

```
src/
├── app.js              # Application entry point
├── main.js             # Main logic
├── style.css           # Styling
└── lib/
    ├── data.js         # API calls and data management
    ├── search.js       # Search functionality
    ├── render.js       # UI rendering
    ├── ui.js           # UI interactions
    ├── favorites.js    # Favorites management
    ├── recent.js       # Recent searches tracking
    └── localStorageHelper.js  # Storage utilities
```

## Getting Started

Simply open `index.html` in your web browser - no installation or build process required!
