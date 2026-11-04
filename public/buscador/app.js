// 1. Tipamos los elementos del DOM y aseguramos que TypeScript sepa que son inputs, botones y divs específicos.
const inputBusqueda = document.getElementById('inputBusqueda');
const btnBuscar = document.getElementById('btnBuscar');
const resultadoContainer = document.getElementById('resultadoContainer');
const API_KEY = 'trilogy';
// Función asíncrona para consultar la API
async function consultarAPI(termino) {
    if (!resultadoContainer)
        return;
    resultadoContainer.innerHTML = '<p>Cargando películas...</p>';
    try {
        const respuesta = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(termino)}`);
        if (!respuesta.ok) {
            throw new Error('Error al conectar con la API');
        }
        const datos = await respuesta.json();
        if (datos.Response === "True") {
            mostrarResultados(datos.Search);
        }
        else {
            resultadoContainer.innerHTML = `<p>No se encontraron resultados: ${datos.Error}</p>`;
        }
    }
    catch (error) {
        console.error(error);
        resultadoContainer.innerHTML = '<p>Ocurrió un error al realizar la búsqueda.</p>';
    }
}
// Función para pintar los resultados
function mostrarResultados(peliculas) {
    if (!resultadoContainer)
        return;
    resultadoContainer.innerHTML = '';
    peliculas.forEach((pelicula) => {
        const contenedorPeli = document.createElement('div');
        const titulo = document.createElement('h3');
        const anio = document.createElement('p');
        const tipo = document.createElement('p');
        const poster = document.createElement('img');
        titulo.textContent = pelicula.Title;
        anio.textContent = 'Año: ' + pelicula.Year;
        tipo.textContent = 'Tipo: ' + pelicula.Type;
        if (pelicula.Poster !== 'N/A') {
            poster.src = pelicula.Poster;
            poster.alt = pelicula.Title;
            poster.width = 100;
        }
        contenedorPeli.appendChild(titulo);
        contenedorPeli.appendChild(anio);
        contenedorPeli.appendChild(tipo);
        if (pelicula.Poster !== 'N/A') {
            contenedorPeli.appendChild(poster);
        }
        const hr = document.createElement('hr');
        contenedorPeli.appendChild(hr);
        resultadoContainer.appendChild(contenedorPeli);
    });
}
// Evento del botón buscar
if (btnBuscar && inputBusqueda) {
    btnBuscar.addEventListener('click', () => {
        const texto = inputBusqueda.value.trim();
        if (texto !== '') {
            consultarAPI(texto);
        }
    });
    // Evento de la tecla Enter
    inputBusqueda.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnBuscar.click();
        }
    });
}
export {};
//# sourceMappingURL=app.js.map