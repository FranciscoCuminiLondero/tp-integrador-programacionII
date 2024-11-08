document.getElementById('contacto').addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('message').value;

  const data = {
    name: nombre,
    email: email,
    message: mensaje,
  };

  fetch('http://localhost:5000/enviar-mensaje', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'success') {
        alert('Mensaje enviado correctamente');
      } else {
        alert('Error al enviar el mensaje: ' + result.message);
      }
    })
    .catch((error) => {
      alert('Ocurrió un error: ' + error);
    });
});
