const BASE_URL = "https://witzapi.de/";

export async function getJoke() {
  const response = await fetch(BASE_URL + "/api/joke/");
  return await response.json();
}
