const audioMuted = document.getElementById('audio');
const reproduciendoSonido = document.getElementById('audio-background');
let estadoAudio = 'muted';
audioMuted.addEventListener('click', function(){
    if(estadoAudio === 'muted'){
        reproduciendoSonido.play();
        audioMuted.src = '../img/audio-active.png';
        estadoAudio = 'playing';
    }else{
        reproduciendoSonido.pause();
        audioMuted.src = '../img/audio-muted.png';
        estadoAudio = 'muted';
    }
    
});



/*
Precios del Distribuidor
Limón: $500 (por unidad)

Azúcar: $1.000 (por kg) 1000g

Agua: $2.000 (garrafa pequeña) 6000ml

Vasos: $100 (pack de 10)
/*3. Precios del Distribuidor (Etapa 2 - Expansión)
A medida que pasen los días (ej: día 3 o 4), el distribuidor trae cosas premium.

Hielo: $1.500 (bolsa)

Manzana: $800 (unidad)

Naranja: $700 (unidad)

Ananá: $1.200 (unidad) */
 

/*Precios por vaso de jugo de limon 
Insumo	Costo por Vaso
Limón	$500 unidad
Azúcar	$15 (Cada vaso de jugo de limón lleva 15g (3 cucharaditas de azúcar) de azúcar, por lo que el costo es $1.000/1000g * 15g = $15)
Agua	$100 (Cada vaso de jugo de limón lleva 300ml de agua, por lo que el costo es $2.000/6000ml * 300ml = $100)
Vaso	$10 unidad
TOTAL	$625 esto lo decide el usuario, pero esto cuesta $625 por vaso de jugo de limón
*/


/*et diaActual = 5;
const capitalInicial = 10000;
let capitalActual = capitalInicial;
let CatalogoProveedoresActualizado, nuevoProducto, costoProducto, productoDeseado;
 let productoEncontrado;
 let nuevaBebida;
 let costoTotal = 0, suma = 0;
 
//Catalogo de proveedores
const catalogoProveedores = [
    { //clave : valor
      producto: "Limon", precio: 500}, //unidad
    { producto: "Azucar", precio: 1000}, // 1kg => 1000g
    { producto: "Agua", precio: 2000}, //6000ml => 6L
    { producto: "Vasos", precio: 100},// Pack de 10 unidades
];
CatalogoProveedoresActualizado = [...catalogoProveedores]; //Hacemos una copia del catalogo de proveedores para actualizarlo sin modificar el original 

const catalogoBebidas = [
    {
        tipo: "Limonada Clásica",
        ingredientes:[
           {ingrediente: "Limon", cantidad: 1},
           {ingrediente: "Azucar", cantidad: 15},
           {ingrediente: "Agua", cantidad: 300},
            {ingrediente: "Vaso", cantidad: 1},
        ]
    },
];
let catalogoBebidasActualizado = [...catalogoBebidas];
class Producto {
    constructor(producto, stock){ 
        this.producto = producto;
        this.stock = stock;
    }
}
//Simulamos la llegada de productos nuevos según el día de la semana
switch(diaActual){
    case 1:
        console.log("Día 1: El distribuidor trae los productos básicos.");
        console.table(catalogoProveedores);
    break;
    case 3:
        console.log("Día 3: El distribuidor trae nuevo producto Hielo.");
        nuevoProducto = {producto: "Hielo", precio: 1500}; 
        CatalogoProveedoresActualizado.push(nuevoProducto); 
        nuevaBebida = {tipo: "Limonada con Hielo", ingredientes:[{ingrediente: "Limon", cantidad: 1}, {ingrediente: "Azucar", cantidad: 15}, {ingrediente: "Agua", cantidad: 300}, {ingrediente: "Vaso", cantidad: 1}, {ingrediente: "Hielo", cantidad: 2}]};
        catalogoBebidasActualizado.push(nuevaBebida); 
        console.table(CatalogoProveedoresActualizado);
        console.table(catalogoBebidasActualizado);
    break;
    case 5:
        console.log("Día 5: El distribuidor trae naranja y menta.");
        nuevoProducto = {producto: "Naranja", precio: 700};
        CatalogoProveedoresActualizado.push(nuevoProducto);
        nuevoProducto = {producto: "Menta", precio: 80};
        CatalogoProveedoresActualizado.push(nuevoProducto);
        nuevaBebida = {tipo: "Limonada con Menta", ingredientes:[{ingrediente: "Limon", cantidad: 1}, {ingrediente: "Azucar", cantidad: 15}, {ingrediente: "Agua", cantidad: 300}, {ingrediente: "Vaso", cantidad: 1}, {ingrediente: "Menta", cantidad: 3}]};
        catalogoBebidasActualizado.push(nuevaBebida);
        nuevaBebida = {tipo: "Jugo de Naranja", ingredientes:[{ingrediente: "Azucar", cantidad: 15}, {ingrediente: "Agua", cantidad: 200}, {ingrediente: "Vaso", cantidad: 1}, {ingrediente: "Naranja", cantidad: 2}]};
        catalogoBebidasActualizado.push(nuevaBebida);
        console.table(CatalogoProveedoresActualizado);
        console.table(catalogoBebidasActualizado);
    break;
    case 7:
        console.log("Día 7: El distribuidor trae manzana y ananá.");
        nuevoProducto = {producto: "Manzana", precio: 800};
        CatalogoProveedoresActualizado.push(nuevoProducto);
        nuevoProducto = {producto: "Ananá", precio: 1200};
        CatalogoProveedoresActualizado.push(nuevoProducto);
        nuevaBebida = {tipo: "Jugo de Manzana", ingredientes:[{ingrediente: "Azucar", cantidad: 15}, {ingrediente: "Agua", cantidad: 200}, {ingrediente: "Vaso", cantidad: 1}, {ingrediente: "Manzana", cantidad: 2}]};
        catalogoBebidasActualizado.push(nuevaBebida);
        nuevaBebida = {tipo: "Jugo de Ananá", ingredientes:[{ingrediente: "Azucar", cantidad: 15}, {ingrediente: "Agua", cantidad: 200}, {ingrediente: "Vaso", cantidad: 1}, {ingrediente: "Ananá", cantidad: 2}]};
        catalogoBebidasActualizado.push(nuevaBebida);
        console.table(CatalogoProveedoresActualizado);
        console.table(catalogoBebidasActualizado);
    break;
        default:
             console.table(catalogoProveedores);
}
//Mensaje modificable con el jugador: funcion de proriedad
function mensaje(mensajePersonalizado, nombreJugador, mensajeDespedida){
    return `${mensajePersonalizado} ${nombreJugador} ${mensajeDespedida}`;
}
const name = prompt("Ingrese su nombre para comenzar a jugar");
alert(mensaje("¡Bienvenido al juego de la limonada, ", name, "!\nEn este juego, tu objetivo es administrar un puesto de limonada y ganar dinero. Para eso, tendrás que comprar ingredientes, preparar limonada y venderla a los clientes. ¡Buena suerte!"));
alert("💲 Tu capital inicial es: $" + capitalInicial);

let inventario =[];
let carritoCompra = [];

//Función para comprar insumos al distribuidor
const agregarAlCarrito = (producto, cantidad) =>{
    productoEncontrado = catalogoProveedores.find(item => item.producto.toLowerCase() === producto.toLowerCase());
    if(productoEncontrado){
         costoProducto = cantidad * productoEncontrado.precio; 
         suma = costoTotal + costoProducto;
        if(suma <= capitalActual){ 
            costoTotal= suma; 
            carritoCompra.push({producto: productoEncontrado.producto, cantidad, costoProducto});
            console.table(carritoCompra);
            console.log("Total: $" + costoTotal);
        }else{
            alert("❌ Fondos insuficientes. Te faltan $" + (suma - capitalActual));
        }
    }else{
        alert("🔎 Producto no encontrado en el catalogo de proveedores.");
    }
}
const finalizarCompra = () =>{
    if(carritoCompra.length > 0){
        if(confirm("💰 ¿Desea finalizar la compra? Total a pagar: $" + costoTotal)){
            capitalActual -= costoTotal;
            costoTotal = 0; //reseteamos el costo total para la próxima compra
            carritoCompra.forEach(i => {
                let productoInventarioEncontrado = inventario.find(x => x.producto.toLowerCase() === i.producto.toLowerCase());
            if(productoInventarioEncontrado){
                productoInventarioEncontrado.cantidad += i.cantidad;
            }else inventario.push({producto: i.producto, cantidad: i.cantidad});
            });
            alert("✅ Compra finalizada. Capital actual: $" + capitalActual);
        }
       
    }
    console.table(inventario);
    carritoCompra = []; //reseteamos el carrito de compra para la próxima compra
}


           do{
             productoCompra = prompt("Ingrese el producto que desea comprar: ").toLowerCase();
             cantidadCompra = parseInt(prompt("Ingrese la cantidad que desea comprar: "));
             if(isNaN(cantidadCompra) || cantidadCompra <= 0){
                alert("❌ Por favor, ingrese una cantidad válida.");
                continue; // Volver a solicitar el producto y la cantidad
             }else agregarAlCarrito(productoCompra, cantidadCompra);
           }while((confirm("🤔 ¿Desea agregar otro insumo al carrito?")));
           finalizarCompra();

/* Avisar si algo se agotó o si no hay suficiente stock para preparar la limonada 
let pedidoBebidaCliente; //esta variable se asignará con un math pero dependera del dia y las bebidas disponibles, por eso la dejamos sin implementar por ahora
let cantidadDeBebidas; //math y no dependera del día
//esta funcion será mutable dependiendo del día y las bebidas disponibles, por eso la dejamos sin implementar por ahora
let prepararBebida = (bebida, cantidad) =>{
    if(diaActual >=3){
        catalogoBebidasActualizado.forEach(i => {
            //tengo que comparar entre lo disponible en el inventario y lo que necesito para preparar la bebida, si hay suficiente, resto del inventario y sumo al capitalActual el precio de venta de la bebida * cantidad, si no hay suficiente, aviso que no se puede preparar la bebida por falta de stock
            
        })
    }else{
        catalogoBebidas.forEach(i => {

        });
    }
}*/

/*buscarStock(2, inventario, catalogoBebidasActualizado);

             //      va a ser un math    inventario      catalogoBebidasActualizado o catalogoBebidas dependiendo del día
let buscarStock = (bebidaSelecionada, arrayInventario, cantidadNecesaria) =>{
    const encontrado = cantidadNecesaria.forEach(i => {
        if(bebidaSelecionada === i){
           if(arrayInventario.some(x => x.producto.toLowerCase() === i.ingrediente.toLowerCase() && x.cantidad >= i.cantidad)){
                return true;
           }else return alert("❌ No hay suficiente stock de " + i.ingrediente + " para preparar " + bebidaSelecionada);
        }
    });
}
*/