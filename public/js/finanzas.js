import axios from "axios";

// Configuración de la API de NocoDB
const options = {
    method: 'GET',
    url: 'https://app.nocodb.com/api/v2/tables/mr7yef8ohuozlhh/records',
    params: { offset: '0', limit: '25', where: '', viewId: 'vwpdf1kmlefi92on' },
    headers: {
        'xc-token': 'QWjPWNlVsWSw4KUgkVsyTzwmsvGRDrYgovy4pyvh' // Token actualizado
    }
};

// Función para cargar los datos en la tabla y el gráfico
async function cargarDatos() {
    try {
        const response = await axios.request(options);
        const datos = response.data.list;

        // Llamar a funciones para actualizar la tabla y el gráfico
        actualizarTabla(datos);
        actualizarGrafico(datos);

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

// Función para actualizar la tabla con los datos de NocoDB
function actualizarTabla(datos) {
    const tabla = document.getElementById("tabla-datos");
    tabla.innerHTML = ""; // Limpiar tabla antes de agregar nuevos datos

    datos.forEach(dato => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${dato.Concepto}</td>
            <td class="${dato.Tipo === 'Ingreso' ? 'ingreso' : 'gasto'}">${dato.Tipo}</td>
            <td>${dato.Monto}</td>
            <td>${dato.Fecha}</td>
        `;
        tabla.appendChild(fila);
    });
}

// Función para actualizar el gráfico de gastos e ingresos
function actualizarGrafico(datos) {
    const ingresos = datos.filter(d => d.Tipo === "Ingreso").reduce((acc, d) => acc + d.Monto, 0);
    const gastos = datos.filter(d => d.Tipo === "Gasto").reduce((acc, d) => acc + d.Monto, 0);

    const ctx = document.getElementById("grafico-finanzas").getContext("2d");

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Ingresos", "Gastos"],
            datasets: [{
                data: [ingresos, gastos],
                backgroundColor: ["#4CAF50", "#F44336"]
            }]
        }
    });
}

// Cargar datos al cargar la página
document.addEventListener("DOMContentLoaded", cargarDatos);
