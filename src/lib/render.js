export default class Renderer {
  constructor(resultsSection, searchHistorySection) {
    this.resultsSection = resultsSection;
    this.searchHistorySection = searchHistorySection;
  }

  createCountryCard({
    name,
    capital,
    population,
    flagUrl,
    altText,
    languages,
    currencies,
    mapUrl,
  }) {
    const flagImg = flagUrl
      ? `<img src="${flagUrl}" alt="${altText}" class="country-flag" />`
      : "";
    const mapLink = mapUrl ? `<a href ="${mapUrl}">Google Maps</a>` : "N/A";

    return `<div class="country-card">
        ${flagImg}
        <div class="country-body">
            <h2 class="country-name">${name}</h2>
            <div class="country-details">
                <p class="country-capital"><strong>Capital:</strong> ${capital}</p>
            <p class="country-languages"><strong>Languages:</strong> ${languages}</p>
                <p class="country-map"><strong>Map:</strong> ${mapLink}</p>
            </div>
        </div>
         <div class="country-additional-details">
            <p class="country-population"><strong>Population:</strong> ${population}</p>
            <p class="country-currencies"><strong>Currencies:</strong> ${currencies}</p>
        </div>
      </div>`;
  }

  countryCard(country) {
    const flag = country?.flags?.png || country?.flags?.svg || "";
    const altText =
      country?.flags?.alt || `Flag of ${country?.name?.common || "N/A"}`;
    const name = country?.name?.common || "N/A";
    const capital = country.capital.join(", \n") || "N/A";
    const population = country?.population?.toLocaleString() || "N/A";
    const languages = country?.languages
      ? Object.values(country.languages).join(", \n")
      : "N/A";
    const currencies = country?.currencies
      ? Object.values(country.currencies)
          .map((currency) => currency.name)
          .join(", \n")
      : "N/A";
    const mapUrl = country?.maps?.googleMaps || "";

    return this.createCountryCard({
      name,
      capital,
      population,
      flagUrl: flag,
      languages,
      currencies,
      mapUrl,
      altText,
    });
  }

  recentCountryPill(countryName) {
    return `<button class="recent-country-pill">${countryName}</button>`;
  }

  renderCountries(countries) {
    const countriesHTML = countries
      .map((country) => this.countryCard(country))
      .join("");
    this.resultsSection.innerHTML = countriesHTML;
  }

  renderRecentCountries(countries) {
    if (countries.length === 0) {
      return;
    } else {
      const recentCountriesHTML = countries
        .map((country) => this.recentCountryPill(country))
        .join("");
      this.searchHistorySection.innerHTML = recentCountriesHTML;
    }
  }
}
