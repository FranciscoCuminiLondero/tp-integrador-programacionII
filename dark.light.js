let boton = document.getElementById("boton-cambio-modo");
let body = document.body;
let modoOscuro = localStorage.getItem("dark-mode");

function habilitarModoOscuro() {
  boton.classList.replace("fa-moon", "fa-sun");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
}

function deshabilitarModoOscuro() {
  boton.classList.replace("fa-sun", "fa-moon");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
}

if (modoOscuro === "enabled") {
  habilitarModoOscuro();
} else {
  deshabilitarModoOscuro();
}

boton.onclick = (e) => {
  let modoOscuro = localStorage.getItem("dark-mode");
  if (modoOscuro === "disabled") {
    habilitarModoOscuro();
  } else {
    deshabilitarModoOscuro();
  }
};
