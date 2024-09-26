fetch("https://dolarapi.com/v1/dolares")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const dolar = data[i];

      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");

      const subtitulo = document.createElement("h5");
      subtitulo.classList.add("subtitulo", "tipo-moneda");
      subtitulo.innerText = dolar.nombre;

      const tipoCompra = document.createElement("p");
      tipoCompra.classList.add("tipo-precio");
      tipoCompra.innerText = "Compra";

      const valorCompra = document.createElement("p");
      valorCompra.id = `compra-${dolar.nombre.toLowerCase().replace(/\s/g, "-")}`;
      valorCompra.classList.add("precio");
      valorCompra.innerText = `$${dolar.compra}`;

      const tipoVenta = document.createElement("p");
      tipoVenta.classList.add("tipo-precio");
      tipoVenta.innerText = "Venta";

      const valorVenta = document.createElement("p");
      valorVenta.id = `venta-${dolar.nombre.toLowerCase().replace(/\s/g, "-")}`;
      valorVenta.classList.add("precio");
      valorVenta.innerText = `$${dolar.venta}`;

      const contenedorTarjetas = document.getElementById("contenedor-tarjetas");

      tarjeta.appendChild(subtitulo);
      tarjeta.appendChild(tipoCompra);
      tarjeta.appendChild(valorCompra);
      tarjeta.appendChild(tipoVenta);
      tarjeta.appendChild(valorVenta);

      contenedorTarjetas.appendChild(tarjeta);
    }
  })
  .catch((error) => {
    console.error(error);
  });
