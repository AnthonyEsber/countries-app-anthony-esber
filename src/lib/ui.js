import Renderer from "./render.js";
import searchCountries from "./search.js";
import { RecentCountries } from "./recent.js";
import { FavoriteCountries } from "./favorites.js";

export default class UI {
  inputField = undefined;
  searchButton = undefined;
  resultsSection = undefined;
  searchHistorySection = undefined;
  recentButton = undefined;
  favoritesSection = undefined;

  constructor(
    inputField,
    searchButton,
    resultsSection,
    searchHistorySection,
    favoritesSection
  ) {
    this.inputField = inputField;
    this.searchButton = searchButton;
    this.resultsSection = resultsSection;
    this.searchHistorySection = searchHistorySection;
    this.favoritesSection = favoritesSection;

    this.Renderer = new Renderer(
      resultsSection,
      searchHistorySection,
      favoritesSection
    );
  }

  bindEvents() {
    this.searchButton.addEventListener("click", () => {
      this.handleSearch();
    });
    this.inputField.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.handleSearch();
      }
    });
    this.searchHistorySection.addEventListener("click", (event) => {
      if (event.target.classList.contains("recent-country-pill")) {
        const countryName = event.target.textContent.trim();
        this.inputField.value = countryName;
        this.handleSearch();
      }
    });
    this.favoritesSection.addEventListener("click", (event) => {
      if (event.target.classList.contains("favorite-pill")) {
        const countryName = event.target.textContent.trim();
        this.inputField.value = countryName;
        this.handleSearch();
      }
    });
    this.resultsSection.addEventListener("click", (event) => {
      if (event.target.classList.contains("favorite-icon")) {
        const countryName = event.target
          .closest(".country-card")
          .querySelector(".country-name").textContent;
        event.target.classList.toggle("active");
        if (event.target.classList.contains("active")) {
          FavoriteCountries.saveFavorite(countryName);
        } else {
          FavoriteCountries.removeFavorite(countryName);
        }
        this.handleDynamicUI();
      }
    });
  }

  handleDynamicUI() {
    const recentCountries = RecentCountries.getRecent();
    const favoriteCountries = FavoriteCountries.getFavorites();

    this.Renderer.renderRecentCountries(recentCountries);
    this.Renderer.renderFavorites(favoriteCountries);
  }

  updateFavoriteIcons() {
    const favorites = FavoriteCountries.getFavorites();
    const icons = this.resultsSection.querySelectorAll(".favorite-icon");
    icons.forEach((icon) => {
      const countryName = icon
        .closest(".country-card")
        .querySelector(".country-name").textContent;
      if (favorites.includes(countryName)) {
        icon.classList.add("active");
      }
    });
  }

  async handleSearch() {
    const query = this.inputField.value;
    console.log("Searching for:", query);
    let countries;

    try {
      countries = await searchCountries(query);
    } catch (error) {
      this.resultsSection.innerHTML = `<p class="error-message">${error.message}</p>`;
      return;
    }

    this.handleDynamicUI();
    this.Renderer.renderCountries(countries);
    this.updateFavoriteIcons();
  }
}
