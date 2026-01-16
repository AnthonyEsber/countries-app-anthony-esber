import UI from "./lib/ui.js";
export const App = () => {
  const inputField = document.querySelector(".search-bar");
  const searchButton = document.querySelector(".search-button");
  const resultsSection = document.querySelector(".results");

  const ui = new UI(inputField, searchButton, resultsSection);
  ui.bindEvents();
};
