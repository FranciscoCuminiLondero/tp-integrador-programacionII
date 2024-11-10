const form = document.getElementById("contacto");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nombre = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("message").value;

  if (nombre === "" || email === "" || mensaje === "") {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/enviar-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nombre,
        email: email,
        message: mensaje,
      }),
    });

    if (response.ok) {
      console.log("¡Correo enviado exitosamente!");
      alert("Correo enviado exitosamente.");
    } else {
      console.error("Error al enviar el correo:", response.status);
      alert("Error al enviar el correo.");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Hubo un problema al intentar enviar el correo.");
  }

  form.reset();
});
