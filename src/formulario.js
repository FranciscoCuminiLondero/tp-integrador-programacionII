const form = document.getElementById('formulario-contacto');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  // Obtener los valores de los campos
  const nombre = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('message').value;

  // Validar los campos (opcional, ya que 'required' ya lo hace)
  if (nombre === '' || email === '' || mensaje === '') {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Mostrar los datos ingresados (puedes hacer otra cosa, como enviar a un servidor)
  alert(`Nombre: ${nombre}\nCorreo: ${email}\nMensaje: ${mensaje}`);

  // Limpiar el formulario
  form.reset();
});
