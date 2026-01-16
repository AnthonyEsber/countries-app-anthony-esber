import fetchCountries from "./data.js";
export default async function searchCountries(query) {
  const q = query.trim();

  if (!q) {
    throw new Error("Search query cannot be empty");
  }

  try {
    const countries = await fetchCountries();
    const lowerQ = q.toLowerCase();
    const filtered = countries.filter((country) => {
      const name = country.name?.common?.toLowerCase() || "";
      return name.includes(lowerQ);
    });

    if (filtered.length === 0) {
      throw new Error("No countries match your search query");
    }
    return filtered;
  } catch (error) {
    throw new Error(`Search error: ${error.message}`);
  }
}
