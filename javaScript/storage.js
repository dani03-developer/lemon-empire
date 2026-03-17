const guardarNombre = (nombre) => localStorage.setItem('nombre', nombre);
const obtenerNombre = () => localStorage.getItem('nombre') || "";
const guardarInventario = (inventario) => localStorage.setItem('inventario', JSON.stringify(inventario));
const obtenerInventario = () => JSON.parse(localStorage.getItem('inventario')) || [];