import { getJoke } from "./fetch";

const newJokeButton = document.getElementById("joke__load");
const newJokeText = document.getElementById("joke__text");

const saveCurrentJokeButton = document.getElementById("joke__save");
const savedJokesList = document.getElementById("saved-jokes__list");

let savedJokes = [];

loadFromLocalStorage();
renderFromLocalStorage();

async function loadNewJoke() {
  const joke = await getJoke();

  saveCurrentJokeButton.classList.remove("joke__save--disabled");
  newJokeText.textContent = joke[0].text;
}

function saveCurrentJoke() {
  const joke = newJokeText.textContent;

  if (!joke || savedJokes.includes(joke)) return;

  savedJokes.push(joke);
  saveToLocalStorage();
  renderSavedJoke(joke);
}

function loadFromLocalStorage() {
  try {
    const parsed = JSON.parse(localStorage.getItem("savedJokes"));
    savedJokes = Array.isArray(parsed) ? parsed : [];
  } catch {
    savedJokes = [];
  }
}

function saveToLocalStorage() {
  localStorage.setItem("savedJokes", JSON.stringify(savedJokes));
}

function renderFromLocalStorage() {
  savedJokes.forEach(renderSavedJoke);
}

function deleteJokeFromStorage(joke, element) {
  savedJokes = savedJokes.filter((j) => j !== joke);
  saveToLocalStorage();
  element.remove();
}

function renderSavedJoke(joke) {
  const savedJoke = document.createElement("div");
  savedJoke.classList.add("saved-jokes__joke");

  const jokeText = document.createElement("p");
  jokeText.innerHTML = joke;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("saved-jokes__remove");

  let deleteIcon = `<svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="saved-jokes__remove-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                />
              </svg>`;

  deleteButton.innerHTML = deleteIcon;
  deleteButton.addEventListener("click", () =>
    deleteJokeFromStorage(joke, savedJoke),
  );

  savedJoke.appendChild(jokeText);
  savedJoke.appendChild(deleteButton);

  savedJokesList.appendChild(savedJoke);
}

newJokeButton.addEventListener("click", loadNewJoke);
saveCurrentJokeButton.addEventListener("click", saveCurrentJoke);
