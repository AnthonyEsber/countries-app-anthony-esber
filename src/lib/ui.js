import Renderer from "./render.js";
import searchCountries from "./search.js";
import { RecentCountries } from "./recent.js";

export default class UI {
  inputField = undefined;
  searchButton = undefined;
  resultsSection = undefined;
  searchHistorySection = undefined;
  recentButton = undefined;

  constructor(
    inputField,
    searchButton,
    resultsSection,
    searchHistorySection,
    recentButton
  ) {
    this.inputField = inputField;
    this.searchButton = searchButton;
    this.resultsSection = resultsSection;
    this.searchHistorySection = searchHistorySection;
    this.recentButton = recentButton;

    this.Renderer = new Renderer(resultsSection, searchHistorySection);
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
  }

  handleRecent() {
    const recentCountries = RecentCountries.getRecent();
    this.Renderer.renderRecentCountries(recentCountries);
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

    this.handleRecent();
    this.Renderer.renderCountries(countries);
  }
}
