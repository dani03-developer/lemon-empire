const capitalInicial = 10000;
let inventario =[];
let carritoCompra = [];
let nombreDelJugador = obtenerNombre();
let capitalActual = capitalInicial;
let nuevoProducto;
let diaActual = 1;
const mensaje = (nombre) => [
  `¡Hola ${nombre}! ¡Qué bueno que llegaste! Soy Limo 😺, tu socio. El sol está pegando fuerte y la gente tiene sed... tu objetivo es administrar el puesto de limonada y ganar dinero. Para eso, tendrás que comprar ingredientes, preparar limonada y venderla a los clientes. ¡Buena suerte!`,
  `¡Rayos! ⚡ El depósito está vacío, ${nombre}. Si no compramos ingredientes pronto, solo podremos venderles aire fresco a los clientes...¡Vamos a ver qué tiene el proveedor!"`,
 `¡Qué tal, socio! 🐻 Soy Barnaby, el encargado de que a Lemon Empire nunca le falte frescura. Tengo los limones más ácidos y el hielo más frío de la región. Mira el catálogo, ¡hoy todo está de primera calidad! ¿Qué vamos a cargar en el almacén?`,
 `¡Eso es, ${nombre}! 💪 Ya tenemos los insumos en el depósito. ¡Huele a éxito (y a muchos cítricos)! Deja de mirar las cajas y vamos a encender el exprimidor... ¡Es hora de poner a trabajar ese dinero y exprimir las ganancias!`
];

//Catalogo de proveedores
const catalogoDistribuidor = [
    { //clave : valor
      producto: "Limon", precio: 500}, //unidad
    { producto: "Azucar", precio: 1000}, // 1kg => 1000g
    { producto: "Agua", precio: 2000}, //6000ml => 6L
    { producto: "Vasos", precio: 100},// Pack de 10 unidades
];
let catalogoDistribuidorActualizado = [...catalogoDistribuidor]; //Hacemos una copia del catalogo de proveedores para actualizarlo sin modificar el original 

//Simulamos la llegada de productos nuevos según el día de la semana
 function cargarProductosDistribuidor(diaActual) {
    switch(diaActual){
    case 1:
        guardarCatalogoDistribuidor(catalogoDistribuidor);
    break;
    case 3:
        nuevoProducto = {producto: "Hielo", precio: 1500}; 
        catalogoDistribuidorActualizado.push(nuevoProducto); 
        //nuevaBebida = {tipo: "Limonada con Hielo", ingredientes:[{ingrediente: "Limon", cantidad: 1}, {ingrediente: "Azucar", cantidad: 15}, {ingrediente: "Agua", cantidad: 300}, {ingrediente: "Vaso", cantidad: 1}, {ingrediente: "Hielo", cantidad: 2}]};
        //catalogoBebidasActualizado.push(nuevaBebida); 
        guardarCatalogoDistribuidor(catalogoDistribuidorActualizado);
    break;
    case 5:
        nuevoProducto = {producto: "Naranja", precio: 700};
        catalogoDistribuidorActualizado.push(nuevoProducto);
        nuevoProducto = {producto: "Menta", precio: 80};
        catalogoDistribuidorActualizado.push(nuevoProducto);
        guardarCatalogoDistribuidor(catalogoDistribuidorActualizado);
        //nuevaBebida = {tipo: "Limonada con Menta", ingredientes:[{ingrediente: "Limon", cantidad: 1}, {ingrediente: "Azucar", cantidad: 15}, {ingrediente: "Agua", cantidad: 300}, {ingrediente: "Vaso", cantidad: 1}, {ingrediente: "Menta", cantidad: 3}]};
        //catalogoBebidasActualizado.push(nuevaBebida);
        //nuevaBebida = {tipo: "Jugo de Naranja", ingredientes:[{ingrediente: "Azucar", cantidad: 15}, {ingrediente: "Agua", cantidad: 200}, {ingrediente: "Vaso", cantidad: 1}, {ingrediente: "Naranja", cantidad: 2}]};
        //catalogoBebidasActualizado.push(nuevaBebida);
    break;
    case 7:
        nuevoProducto = {producto: "Manzana", precio: 800};
        catalogoDistribuidorActualizado.push(nuevoProducto);
        nuevoProducto = {producto: "Ananá", precio: 1200};
        catalogoDistribuidorActualizado.push(nuevoProducto);
        //nuevaBebida = {tipo: "Jugo de Manzana", ingredientes:[{ingrediente: "Azucar", cantidad: 15}, {ingrediente: "Agua", cantidad: 200}, {ingrediente: "Vaso", cantidad: 1}, {ingrediente: "Manzana", cantidad: 2}]};
        //catalogoBebidasActualizado.push(nuevaBebida);
        //nuevaBebida = {tipo: "Jugo de Ananá", ingredientes:[{ingrediente: "Azucar", cantidad: 15}, {ingrediente: "Agua", cantidad: 200}, {ingrediente: "Vaso", cantidad: 1}, {ingrediente: "Ananá", cantidad: 2}]};
        //catalogoBebidasActualizado.push(nuevaBebida);
        guardarCatalogoDistribuidor(catalogoDistribuidorActualizado);
    break;
        default:
             guardarCatalogoDistribuidor(catalogoDistribuidor);
}
}
/*Actualizar Dias */
let actualizarDia =()=>{
    dias.innerHTML =` <img class="imagen-sol" src="../img/sol.png" alt=""> Día ${diaActual}`;
}
/*Actualizar capital */
let actualizarCapital = () => {
        dinero.forEach(element => {
        element.innerText = `$ ${capitalActual.toLocaleString('es-AR')}`;
    });
};
// Agregar productos al inventario
let agregarInventario = (producto, cantidad) =>{ //agrega
    let inventarioActual = obtenerInventario();
     let productoInventarioEncontrado = inventarioActual.find(x => x.producto === producto);
     if(productoInventarioEncontrado){
        productoInventarioEncontrado.cantidad += cantidad;
     }else{
        inventarioActual.push({producto: producto, cantidad: cantidad});
     }
    guardarInventario(inventarioActual);
};
