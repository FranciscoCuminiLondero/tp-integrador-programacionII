fetch('http://127.0.0.1:5000/historico')
  .then((response) => response.json())
  .then((data) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthData = data.filter((item) => {
      const itemDate = new Date(item.fecha);
      return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    });

    const bestCompraItem = currentMonthData.reduce((prev, curr) => (curr.compra < prev.compra ? curr : prev));
    const worstCompraItem = currentMonthData.reduce((prev, curr) => (curr.compra > prev.compra ? curr : prev));
    const bestVentaItem = currentMonthData.reduce((prev, curr) => (curr.venta > prev.venta ? curr : prev));
    const worstVentaItem = currentMonthData.reduce((prev, curr) => (curr.venta < prev.venta ? curr : prev));

    document.querySelector('.grid-may-cot-1 .date').textContent = formatDate(bestCompraItem.fecha);
    document.querySelector('.grid-may-cot-1 .precio').textContent = `$${bestCompraItem.compra}`;

    document.querySelector('.grid-may-cot-2 .date').textContent = formatDate(worstCompraItem.fecha);
    document.querySelector('.grid-may-cot-2 .precio').textContent = `$${worstCompraItem.compra}`;

    document.querySelector('.grid-may-pro .date').textContent = formatDate(bestVentaItem.fecha);
    document.querySelector('.grid-may-pro .precio').textContent = `$${bestVentaItem.venta}`;

    document.querySelector('.grid-p-pro .date').textContent = formatDate(worstVentaItem.fecha);
    document.querySelector('.grid-p-pro .precio').textContent = `$${worstVentaItem.venta}`;

    function formatDate(dateString) {
      const date = new Date(dateString);
      const options = { weekday: 'short', day: 'numeric', month: 'long' };
      return date.toLocaleDateString('es-ES', options);
    }

    const oficialData = data.filter((item) => {
      const itemDate = new Date(item.fecha);
      return item.casa === 'oficial' && itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    });

    const xValues = [];
    const compraValues = [];
    const ventaValues = [];

    oficialData.forEach((item) => {
      xValues.push(new Date(item.fecha).toLocaleDateString());
      compraValues.push(item.compra);
      ventaValues.push(item.venta);
    });

    // Crear el gráfico
    new Chart('myChart', {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [
          {
            label: 'Compra',
            data: compraValues,
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Venta',
            data: ventaValues,
            borderColor: 'green',
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: true },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  })
  .catch((error) => console.error('Error al obtener los datos:', error));
