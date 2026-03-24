const guardarNombre = (nombre) => localStorage.setItem('nombre', nombre);
const obtenerNombre = () => localStorage.getItem('nombre') || "";
const guardarCapital = (capital) => localStorage.setItem('capitalActual', capital);
const obtenerCapital = () => localStorage.getItem('capitalActual') || "";
const guardarDia = (dia) => localStorage.setItem('diaActual', dia);
const obtenerDia = () => {
    const dia = localStorage.getItem('diaActual');
    return dia ? Number(dia) : 1;
};
const guardarInventario = (inventario) => localStorage.setItem('inventario', JSON.stringify(inventario));
const obtenerInventario = () => JSON.parse(localStorage.getItem('inventario')) || [];
const guardarCatalogoDistribuidor = (catalogoDistribuidorActualizado) => localStorage.setItem('catalogoDistribuidor', JSON.stringify(catalogoDistribuidorActualizado));
const obtenerCatalogoDistribuidor = () => JSON.parse(localStorage.getItem('catalogoDistribuidor')) || [];
const enviarItemAlCarrio = (carritoCompra) => sessionStorage.setItem('productosCarrito', JSON.stringify(carritoCompra));
const obtenerItemCarrito = () => JSON.parse(sessionStorage.getItem('productosCarrito')) || [];