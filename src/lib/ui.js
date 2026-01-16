import Renderer from "./render.js";
import searchCountries from "./search.js";

export default class UI {
  inputField = undefined;
  searchButton = undefined;
  resultsSection = undefined;

  constructor(inputField, searchButton, resultsSection) {
    this.inputField = inputField;
    this.searchButton = searchButton;
    this.resultsSection = resultsSection;

    this.Renderer = new Renderer(resultsSection);
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
    this.Renderer.renderCountries(countries);
  }
}
