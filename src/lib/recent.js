import { localStorageHelper } from "./localStorageHelper.js";

export const RecentCountries = {
  saveRecent(countries) {
    let tempCountries = this.getRecent();
    countries.forEach((country) => {
      tempCountries = tempCountries.filter((c) => c !== country);
      tempCountries.unshift(country);
    });

    tempCountries = tempCountries.slice(0, 10);
    console.log("Recent Countries:", tempCountries);

    localStorageHelper.saveToStorage("recentCountries", tempCountries);
  },

  getRecent() {
    return localStorageHelper.getFromStorage("recentCountries") || [];
  },
};
