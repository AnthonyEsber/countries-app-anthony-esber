import Renderer from "./render.js";
import searchCountries from "./search.js";
import { RecentCountries } from "./recent.js";
import { FavoriteCountries } from "./favorites.js";
import fetchCountries from "./api.js";

export default class UI {
  inputField = undefined;
  searchButton = undefined;
  resultsSection = undefined;
  searchHistorySection = undefined;
  recentButton = undefined;
  favoritesSection = undefined;
  showAllButton = undefined;
  selectedIndex = -1;

  constructor(
    inputField,
    searchButton,
    resultsSection,
    searchHistorySection,
    favoritesSection,
    showAllButton
  ) {
    this.inputField = inputField;
    this.searchButton = searchButton;
    this.resultsSection = resultsSection;
    this.searchHistorySection = searchHistorySection;
    this.favoritesSection = favoritesSection;
    this.showAllButton = showAllButton;

    this.Renderer = new Renderer(
      resultsSection,
      searchHistorySection,
      favoritesSection
    );
  }
  bindEvents() {
    this.inputField.addEventListener("input", (e) => {
      const query = e.target.value.trim();

      if (query.length > 3) {
        setTimeout(() => this.handleSearch(), 500);
      } else if (query.length === 0) {
        this.resultsSection.innerHTML = "";
      }
    });
    this.showAllButton.addEventListener("click", () => {
      this.handleAllCountries();
    });
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
    document.addEventListener("keydown", (event) => {
      const listItems = this.resultsSection.querySelectorAll(".country-card");
      if (event.key == "ArrowDown") {
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % listItems.length;
        this.updateSelection(listItems);
      } else if (event.key == "ArrowUp") {
        event.preventDefault();
        this.selectedIndex =
          (this.selectedIndex - 1 + listItems.length) % listItems.length;
        this.updateSelection(listItems);
      } else if (event.key == "Enter") {
        if (this.selectedIndex >= 0 && this.selectedIndex < listItems.length) {
          listItems[this.selectedIndex].click();
        }
      }
    });
  }

  updateSelection(listItems) {
    listItems.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.setAttribute("data-active", "true");
        item.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        item.removeAttribute("data-active");
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

  async handleAllCountries() {
    let countries;

    try {
      countries = await fetchCountries();
    } catch (error) {
      this.resultsSection.innerHTML = `<p class="error-message">${error.message}</p>`;
      return;
    }
    this.handleDynamicUI();
    this.Renderer.renderCountries(countries);
    this.updateFavoriteIcons();
  }
}
