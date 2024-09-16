let boton = document.getElementById("boton-activo");
let body = document.body;
let darkMode = localStorage.getItem("dark-mode");

function enableDarkMode() {
  boton.classList.replace("fa-moon", "fa-sun");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
}

function disableDarkMode() {
  boton.classList.replace("fa-sun", "fa-moon");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
}

if (darkMode === "enabled") {
  enableDarkMode();
} else {
  disableDarkMode();
}

boton.onclick = (e) => {
  let darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};
