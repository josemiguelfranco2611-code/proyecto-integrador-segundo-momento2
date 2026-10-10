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
