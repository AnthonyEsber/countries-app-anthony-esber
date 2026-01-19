export default async function fetchCountries() {
  const url = "https://restcountries.com/v3.1/independent";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No countries found");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();

    if (data && Array.isArray(data)) {
      return data;
    } else {
      throw new Error("Country data not available");
    }
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
}
