const toggle = document.querySelector(".theme-toggle");

toggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("theme-light");
  toggle.textContent = isLight ? "Dark mode" : "Light mode";
});
