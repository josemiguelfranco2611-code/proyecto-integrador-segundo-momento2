let datosEnMemoria = [
  { id: 1, nombre: "Plastico", categoria: "100% Reciclable", monto: 120000 },
  { id: 2, nombre: "Cobre", categoria: "75% Reciclable", monto: 45000 }
];

function agregarRegistro(nombre, categoria, monto) {
  const nuevoObjeto = {
    id: Date.now(),
    nombre: nombre,
    categoria: categoria,
    monto: Number(monto)
  };
  
  datosEnMemoria.push(nuevoObjeto);
}

function buscarPorCategoria(categoriaSeleccionada) {
  if (categoriaSeleccionada === "Todas") {
    return datosEnMemoria;
  }

  return datosEnMemoria.filter(item => item.categoria === categoriaSeleccionada);
}

const dataForm = document.getElementById("dataForm");
const inputNombre = document.getElementById("inputNombre");
const selectCategoria = document.getElementById("selectCategoria");
const inputMonto = document.getElementById("inputMonto");
const selectFiltro = document.getElementById("selectFiltro");

const listaResultados = document.getElementById("listaResultados");
const resumenConteo = document.getElementById("resumenConteo");

dataForm.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const valorNombre = inputNombre.value.trim();
  const valorCategoria = selectCategoria.value;
  const valorMonto = inputMonto.value;

  if (valorNombre && valorCategoria && valorMonto) {
    agregarRegistro(valorNombre, valorCategoria, valorMonto);

    dataForm.reset();

    const filtroActual = selectFiltro.value;
    const datosAmostrar = buscarPorCategoria(filtroActual);
    renderizarEnDOM(datosAmostrar);
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
    spanMonto.textContent = `$${item.monto.toLocaleString('es-CO')}`;

    li.appendChild(divInfo);
    li.appendChild(spanMonto);

    listaResultados.appendChild(li);
  });
}
renderizarEnDOM(datosEnMemoria);