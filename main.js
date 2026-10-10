let datosEnMemoria = [
  { id: 1, nombre: "Planificación del Sprint", categoria: "Trabajo", monto: 120000 },
  { id: 2, nombre: "Repaso de JavaScript DOM", categoria: "Estudio", monto: 45000 }
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

