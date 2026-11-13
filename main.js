
const URL_REGISTROS  = "https://6aef5d8bb9925b27ce16dc3e.mockapi.io/API/V2/REGISTRO";
const URL_CATEGORIAS = "https://6aef5cb9b9925b27ce16db60.mockapi.io/api/v1/Categoria";
const URL_RESUMEN    = "https://6aef5cb9b9925b27ce16db60.mockapi.io/api/v1/Resumen";
const URL_OTRO       = "https://tu-id-4.mockapi.io/api/v1/otro-recurso";

let datosEnMemoria = [];

const dataForm = document.getElementById("dataForm");
const inputNombre = document.getElementById("inputNombre");
const selectCategoria = document.getElementById("selectCategoria");
const inputMonto = document.getElementById("inputMonto");
const selectFiltro = document.getElementById("selectFiltro");
const listaResultados = document.getElementById("listaResultados");
const resumenConteo = document.getElementById("resumenConteo");

async function obtenerRegistros() {
  try {
    const respuesta = await fetch(URL_REGISTROS);
    datosEnMemoria = await respuesta.json();
    
    const filtroActual = selectFiltro.value;
    const datosFiltrados = buscarPorCategoria(filtroActual);
    renderizarEnDOM(datosFiltrados);
  } catch (error) {
    console.error("Error al cargar los datos desde la API:", error);
  }
}

async function consultarCategoriasAPI() {
  try {
    const respuesta = await fetch(URL_CATEGORIAS);
    const datos = await respuesta.json();
    console.log("Datos de Categorías (MockAPI 2):", datos);
  } catch (error) {
    console.error("Error al consultar categorías:", error);
  }
}

async function consultarResumenAPI() {
  try {
    const respuesta = await fetch(URL_RESUMEN);
    const datos = await respuesta.json();
    console.log("Datos de Resumen (MockAPI 3):", datos);
  } catch (error) {
    console.error("Error al consultar resumen:", error);
  }
}

async function agregarRegistro(nombre, categoria, monto) {
  const nuevoObjeto = {
    nombre: nombre,
    categoria: categoria,
    monto: Number(monto)
  };

  try {
    const respuesta = await fetch(URL_REGISTROS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoObjeto)
    });

    if (respuesta.ok) {
      // Si se guardó con éxito, recargamos la lista desde la nube
      await obtenerRegistros();
    } else {
      console.error("No se pudo guardar el registro en la API.");
    }
  } catch (error) {
    console.error("Error de red al agregar:", error);
  }
}

function buscarPorCategoria(categoriaSeleccionada) {
  if (categoriaSeleccionada === "Todas") {
    return datosEnMemoria;
  }
  return datosEnMemoria.filter(item => item.categoria === categoriaSeleccionada);
}

dataForm.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const valorNombre = inputNombre.value.trim();
  const valorCategoria = selectCategoria.value;
  const valorMonto = inputMonto.value;

  if (valorNombre && valorCategoria && valorMonto) {
    await agregarRegistro(valorNombre, valorCategoria, valorMonto);
    dataForm.reset();
  }
});

selectFiltro.addEventListener("change", function () {
  const categoria = selectFiltro.value;
  const resultadosFiltrados = buscarPorCategoria(categoria);
  renderizarEnDOM(resultadosFiltrados);
});

function renderizarEnDOM(lista) {
  listaResultados.innerHTML = ""; 
  
  resumenConteo.textContent = `Total de registros: ${lista.length}`;

  if (lista.length === 0) {
    const mensajeVacio = document.createElement("li");
    mensajeVacio.textContent = "No hay registros para mostrar en esta categoría.";
    mensajeVacio.style.color = "#6b7280";
    mensajeVacio.style.padding = "10px 0";
    listaResultados.appendChild(mensajeVacio);
    return;
  }

  lista.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("item-tarjeta");

    const divInfo = document.createElement("div");
    divInfo.classList.add("item-info");

    const spanNombre = document.createElement("span");
    spanNombre.classList.add("item-titulo");
    spanNombre.textContent = item.nombre;

    const spanCategoria = document.createElement("span");
    spanCategoria.classList.add("item-categoria");
    spanCategoria.textContent = `Categoría: ${item.categoria}`;

    divInfo.appendChild(spanNombre);
    divInfo.appendChild(spanCategoria);

    const spanMonto = document.createElement("span");
    spanMonto.classList.add("item-monto");
    spanMonto.textContent = `$${Number(item.monto).toLocaleString('es-CO')}`;

    li.appendChild(divInfo);
    li.appendChild(spanMonto);

    listaResultados.appendChild(li);
  });
}

obtenerRegistros();
consultarCategoriasAPI();
consultarResumenAPI();