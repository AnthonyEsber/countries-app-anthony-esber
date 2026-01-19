import { localStorageHelper } from "./localStorageHelper.js";

export const FavoriteCountries = {
  saveFavorite(country) {
    let favorites = this.getFavorites();
    favorites = favorites.filter((c) => c !== country);
    favorites.unshift(country);
    localStorageHelper.saveToStorage("favoriteCountries", favorites);
  },

  removeFavorite(country) {
    let favorites = this.getFavorites();
    favorites = favorites.filter((c) => c !== country);
    localStorageHelper.saveToStorage("favoriteCountries", favorites);
  },

  getFavorites() {
    return localStorageHelper.getFromStorage("favoriteCountries") || [];
  },
};
