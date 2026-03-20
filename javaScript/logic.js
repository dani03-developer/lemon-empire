const capitalInicial = 10000;
let inventario =[];
let carritoCompra = [];
let nombreDelJugador = obtenerNombre();
let capitalActual = capitalInicial;
let diaActual = 1;
let cantidadItem = 1, total=0;
const mensaje = (nombre) => [
  `¡Hola ${nombre}! ¡Qué bueno que llegaste! Soy Limo 😺, tu socio. El sol está pegando fuerte y la gente tiene sed... tu objetivo es administrar el puesto de limonada y ganar dinero. Para eso, tendrás que comprar ingredientes, preparar limonada y venderla a los clientes. ¡Buena suerte!`,
  `¡Rayos! ⚡ El depósito está vacío, ${nombre}. Si no compramos ingredientes pronto, solo podremos venderles aire fresco a los clientes...¡Vamos a ver qué tiene el proveedor!"`,
 `¡Qué tal, socio! 🐻 Soy Barnaby, el encargado de que a Lemon Empire nunca le falte frescura. Tengo los limones más ácidos y el hielo más frío de la región. Mira el catálogo, ¡hoy todo está de primera calidad! ¿Qué vamos a cargar en el almacén?`,
 `¡Eso es, ${nombre}! 💪 Ya tenemos los insumos en el depósito. ¡Huele a éxito (y a muchos cítricos)! Deja de mirar las cajas y vamos a encender el exprimidor... ¡Es hora de poner a trabajar ese dinero y exprimir las ganancias!`
];

//Catalogo de proveedores
const catalogoDistribuidor = [
    { //clave : valor
      producto: "Limon", cantidad: "c/u",precio: 500}, 
    { producto: "Azucar",cantidad: "1kg", precio: 1000}, 
    { producto: "Agua",cantidad: "4Lts", precio: 2000}, 
    { producto: "Vasos",cantidad: "c/u", precio: 100},
    {producto: "Hielo",cantidad: "4kg", precio: 1500},
    {producto: "Naranja",cantidad: "c/u", precio: 700},
    {producto: "Menta", cantidad: "c/u",precio: 80},
    {producto: "Manzana",cantidad: "c/u", precio: 800},
    {producto: "Anana",cantidad: "c/u", precio: 1200},

];
let catalogoDistribuidorActualizado = []; 

//Simulamos la llegada de productos nuevos según el día de la semana al 
 function cargarProductosDistribuidor(diaActual) {
    switch(diaActual){
    case 1:
        for(i =0; i<=3; i++){
            catalogoDistribuidorActualizado.push(catalogoDistribuidor[i]); 
        }
        guardarCatalogoDistribuidor(catalogoDistribuidorActualizado);
    break;
    case 3:
        for(i =0; i<=4; i++){
            catalogoDistribuidorActualizado.push(catalogoDistribuidor[i]); 
        }
        guardarCatalogoDistribuidor(catalogoDistribuidorActualizado);
    break;
    case 5:
       for(i =0; i<=6; i++){
            catalogoDistribuidorActualizado.push(catalogoDistribuidor[i]); 
        }
        guardarCatalogoDistribuidor(catalogoDistribuidorActualizado);
    break;
    case 7:
        for(i =0; i<catalogoDistribuidor.length; i++){
            catalogoDistribuidorActualizado.push(catalogoDistribuidor[i]); 
        }
        guardarCatalogoDistribuidor(catalogoDistribuidorActualizado);
    break;
        default:
            catalogoDistribuidorActualizado = [...catalogoDistribuidor];
             guardarCatalogoDistribuidor(catalogoDistribuidorActualizado);
}
}
/*Actualizar Dias */
let actualizarDia =()=>{
    dias.innerHTML =` <img class="imagen-sol" src="../img/sol.png" alt=""> Día ${diaActual}`;
}
/*Actualizar capital */

// Agregar productos al inventario
let agregarInventario = (producto, cantidad) =>{ //agrega
    inventario = obtenerInventario();
     let productoInventarioEncontrado = inventario.find(x => x.producto === producto);
     if(productoInventarioEncontrado){
        productoInventarioEncontrado.cantidad += cantidad;
     }else{
        inventario.push({producto: producto, cantidad: cantidad});
     }
    guardarInventario(inventario);
};
/****************************************************************** */
/********************MODO DISTRIBUIDOR **************************** */
/****************************************************************** */
const agregarAlCarrito = (producto, tipoCantidad, precio) =>{
    carritoCompra = obtenerItemCarrito();
    let precioNumerico = Number(precio);
    let productoEncontrado = carritoCompra.find(x => x.producto === producto);
    if(productoEncontrado){
         productoEncontrado.cantidad+=cantidadItem;
         productoEncontrado.total = productoEncontrado.cantidad * productoEncontrado.precioUnitario;
    }else{
       carritoCompra.push({producto: producto, tipoCantidad: tipoCantidad, cantidad: cantidadItem, precioUnitario: precioNumerico ,total: precioNumerico});
    }
    enviarItemAlCarrio(carritoCompra);
    const cantidadTotal = calcularCantidadesCarrito(carritoCompra);
    document.getElementById('cantidad-carrito').innerText = `${cantidadTotal}`; 
}
const calcularCantidadesCarrito = (carrito) =>{
    let cantidades = carrito.reduce((acc,cur)=>acc + cur.cantidad, 0);
    return cantidades;
}
const calcularTotalCarrito = (carrito) =>{
    let subtotal = carrito.reduce((acc,cur)=>acc + cur.total, 0); //reduce ayuda a sumar todo y reducirlo en un solo valor en este caso sumamos todos los total de cada producto
    return subtotal;
}
let finalizarCompra = (carrito,total,capital) => {
         let capitalActual = capital-total;
        if (capitalActual<0) {
            Toastify({
            text: "❌ Eror, dinero insuficiente",
            duration: 5000,
            gravity :"top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #b01500, #c9813d)",
            }
            }).showToast();
        }else{
            Toastify({
            text: "✅ Compra Exitosa!",
            duration: 5000,
            gravity :"top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b046, #c2c93d)",
            }
            }).showToast();
            guardarCapital(capitalActual);
            let capital = obtenerCapital();
             dinero.forEach(element => {
             element.innerText = `$ ${capital.toLocaleString('es-AR')}`;
            });
            carrito.forEach(i =>{
            agregarInventario(i.producto, i.cantidad);
            });
            carritoCompra = [];
            sessionStorage.removeItem('productosCarrito');
            document.querySelector('.grid-carrito').classList.add('desactive');
            document.getElementById('cantidad-carrito').innerText = "0";
            document.getElementById('resultado-suma').innerText = "$ 0";;
        }    
};
 function comprar(){
    carritoActual = obtenerItemCarrito();
    const totalCompra = calcularTotalCarrito(carritoActual);
    let capital = obtenerCapital();
    if(carritoActual.length>0){
        finalizarCompra(carritoActual,totalCompra,capital);
    }else{
        Toastify({

            text: "❌ Eror, carrito vacío",
            duration: 3000,
            gravity :"top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #b01500, #c9813d)",
            }
        }).showToast();
    }
    
 }
