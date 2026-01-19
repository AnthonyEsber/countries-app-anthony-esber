import UI from "./lib/ui.js";
export const App = () => {
  const inputField = document.querySelector(".search-bar");
  const searchButton = document.querySelector(".search-button");
  const resultsSection = document.querySelector(".results");
  const searchHistorySection = document.querySelector(".search-history");
  const favoritesSection = document.querySelector(".favorites-section");

  const ui = new UI(
    inputField,
    searchButton,
    resultsSection,
    searchHistorySection,
    favoritesSection
  );
  ui.handleDynamicUI();
  ui.bindEvents();
};
