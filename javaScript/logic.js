const capitalInicial = 10000;
let inventario =[];
let carritoCompra = [];
let nombreDelJugador = obtenerNombre();
let capitalActual = capitalInicial;
const mensaje = (nombre) => [
  `¡Hola ${nombre}! ¡Qué bueno que llegaste! Soy Limo 😺, tu socio. El sol está pegando fuerte y la gente tiene sed... tu objetivo es administrar el puesto de limonada y ganar dinero. Para eso, tendrás que comprar ingredientes, preparar limonada y venderla a los clientes. ¡Buena suerte!`,
  `¡Rayos! ⚡ El depósito está vacío, ${nombre}. Si no compramos ingredientes pronto, solo podremos venderles aire fresco a los clientes...¡Vamos a ver qué tiene el proveedor!"`,
 `¡Qué tal, socio! 🐻 Soy Barnaby, el encargado de que a Lemon Empire nunca le falte frescura. Tengo los limones más ácidos y el hielo más frío de la región. Mira el catálogo, ¡hoy todo está de primera calidad! ¿Qué vamos a cargar en el almacén?`,
 `¡Eso es, ${nombre}! 💪 Ya tenemos los insumos en el depósito. ¡Huele a éxito (y a muchos cítricos)! Deja de mirar las cajas y vamos a encender el exprimidor... ¡Es hora de poner a trabajar ese dinero y exprimir las ganancias!`
];
/*Actualizar capital */
let actualizarCapital = () => {
    dinero.innerHTML = `$ ${capitalActual.toLocaleString('es-AR')}`;
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
