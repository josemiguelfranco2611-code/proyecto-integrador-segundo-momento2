
const API_URL = "https://6aef5d8bb9925b27ce16dc3e.mockapi.io/API/V2/REGISTRO";

let datosEnMemoria = []; // Inicia vacío, se llenará con la API

const dataForm = document.getElementById("dataForm");
const inputNombre = document.getElementById("inputNombre");
const selectCategoria = document.getElementById("selectCategoria");
const inputMonto = document.getElementById("inputMonto");
const selectFiltro = document.getElementById("selectFiltro");

const listaResultados = document.getElementById("listaResultados");
const resumenConteo = document.getElementById("resumenConteo");


async function obtenerRegistros() {
  try {
    const respuesta = await fetch(API_URL);
    datosEnMemoria = await respuesta.json();
    

    const filtroActual = selectFiltro.value;
    renderizarEnDOM(buscarPorCategoria(filtroActual));
  } catch (error) {
    console.error("Error al cargar los datos de la API:", error);
  }
}


async function agregarRegistro(nombre, categoria, monto) {
  const nuevoObjeto = {
    nombre: nombre,
    categoria: categoria,
    monto: Number(monto)
  };

  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoObjeto)
    });

    if (respuesta.ok) {
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