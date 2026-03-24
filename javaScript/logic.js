/****************************************************************** */
/********************VARIABLES********************************** */
/****************************************************************** */
const capitalInicial = 10000;
let inventario =[];
let carritoCompra = [];
let nombreDelJugador = obtenerNombre();
let capitalActual = capitalInicial;
let diaActual = 1;
let cantidadItem = 1, total=0;
/****************************************************************** */
/********************PREPARATIVOS********************************** */
/****************************************************************** */
const mensaje = (nombre) => [
  `¡Hola ${nombre}! ¡Qué bueno que llegaste! Soy Limo 😺, tu socio. El sol está pegando fuerte y la gente tiene sed... tu objetivo es administrar el puesto de limonada y ganar dinero. Para eso, tendrás que comprar ingredientes, preparar limonada y venderla a los clientes. ¡Buena suerte!`,
  `¡Rayos! ⚡ El depósito está vacío, ${nombre}. Si no compramos ingredientes pronto, solo podremos venderles aire fresco a los clientes...¡Vamos a ver qué tiene el proveedor!"`,
 `¡Qué tal, socio! 🐻 Soy Barnaby, el encargado de que a Lemon Empire nunca le falte frescura. Tengo los limones más ácidos y el hielo más frío de la región. Mira el catálogo, ¡hoy todo está de primera calidad! ¿Qué vamos a cargar en el almacén?`,
 `¡Eso es, ${nombre}! 💪 Ya tenemos los insumos en el depósito. ¡Huele a éxito (y a muchos cítricos)! Deja de mirar las cajas y vamos a encender el exprimidor... ¡Es hora de poner a trabajar ese dinero y exprimir las ganancias!`,
 `¡Vaya día, jefe! Mis gajos ya no dan más, pero esas monedas brillan increíble. Mañana volvemos a exprimir el éxito. ¡A descansar!`
];
const catalogoDistribuidor = [
    { //clave : valor
      producto: "Limon", cantidad: "c/u",cantidadReal: 1,precio: 500}, 
    { producto: "Azucar",cantidad: "1kg",cantidadReal: 1000, precio: 1000}, 
    { producto: "Agua",cantidad: "4Lts",cantidadReal: 4000, precio: 2000}, 
    { producto: "Vasos",cantidad: "c/u", cantidadReal: 1,precio: 100},
    {producto: "Hielo",cantidad: "4kg", cantidadReal: 4000,precio: 1500},
    {producto: "Naranja",cantidad: "c/u",cantidadReal: 1, precio: 700},
    {producto: "Menta", cantidad: "c/u",cantidadReal: 1,precio: 80},
    {producto: "Manzana",cantidad: "c/u",cantidadReal: 1, precio: 800},
    {producto: "Anana",cantidad: "c/u",cantidadReal: 1, precio: 1200},

];
let catalogoDistribuidorActualizado = []; 

 function cargarProductosDistribuidor(diaActual) {
     catalogoDistribuidorActualizado = []; 
    if(diaActual < 3){
        for(let i = 0; i <= 3; i++){
            catalogoDistribuidorActualizado.push(catalogoDistribuidor[i]);
        }
    } else if(diaActual < 5){
        for(let i = 0; i <= 4; i++){
            catalogoDistribuidorActualizado.push(catalogoDistribuidor[i]);
        }
    } else if(diaActual < 7){
        for(let i = 0; i <= 6; i++){
            catalogoDistribuidorActualizado.push(catalogoDistribuidor[i]);
        }
    } else {
        catalogoDistribuidorActualizado = [...catalogoDistribuidor];
    }
    guardarCatalogoDistribuidor(catalogoDistribuidorActualizado);
}
let actualizarDia =(dia)=>{
    dias.innerHTML =` <img class="imagen-sol" src="/img/sol.png" alt=""> Día ${dia}`;
}
/****************************************************************** */
/********************INVENTARIO********************************** */
/****************************************************************** */
// Agregar productos al inventario
let agregarInventario = (producto, cantidad, cantidadReal) =>{ //agrega
    inventario = obtenerInventario();
     let productoInventarioEncontrado = inventario.find(x => x.producto === producto);
     if(productoInventarioEncontrado){
        productoInventarioEncontrado.cantidad += cantidad;
        productoInventarioEncontrado.cantidadReal += cantidadReal;
     }else{
        inventario.push({producto: producto, cantidad: cantidad, cantidadReal: cantidadReal});
     }
    guardarInventario(inventario);
};
/****************************************************************** */
/********************MODO DISTRIBUIDOR **************************** */
/****************************************************************** */
const agregarAlCarrito = (producto, tipoCantidad, cantRealUnitario, precio) =>{
    carritoCompra = obtenerItemCarrito();
    let precioNumerico = Number(precio);
    let cantidadRealNum = Number(cantRealUnitario);
    let productoEncontrado = carritoCompra.find(x => x.producto === producto);
    if(productoEncontrado){
         productoEncontrado.cantidad+=cantidadItem;
         productoEncontrado.cantidadReal+=cantidadRealNum;
         productoEncontrado.total = productoEncontrado.cantidad * productoEncontrado.precioUnitario;
    }else{
       carritoCompra.push({producto: producto, tipoCantidad: tipoCantidad, cantidad: cantidadItem, cantidadReal: cantidadRealNum, unidadReal: cantidadRealNum,precioUnitario: precioNumerico ,total: precioNumerico});
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
            agregarInventario(i.producto, i.cantidad, i.cantidadReal);
            });
            carritoCompra = [];
            sessionStorage.removeItem('productosCarrito');
            document.querySelector('.grid-carrito').classList.add('hidden');
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
/****************************************************************** */
/******************** VENDER BEBIDAS **************************** */
/****************************************************************** */

const catalogoBebidas = {
    "Limonada Clásica":{ //aqui hacemos un objeto para poder acceder más rápido sobre su clave
        precio: 1800,
        ingredientes:[
           {ingrediente: "Limon", cantidad: 1},
           {ingrediente: "Azucar", cantidad: 15},
           {ingrediente: "Agua", cantidad: 300},
            {ingrediente: "Vasos", cantidad: 1},
        ]
    },
    "Limonada con Hielo":{
        precio: 2000,
        ingredientes:[
            {ingrediente: "Limon", cantidad: 1},
            {ingrediente: "Azucar", cantidad: 15}, 
            {ingrediente: "Agua", cantidad: 300}, 
            {ingrediente: "Vasos", cantidad: 1}, 
            {ingrediente: "Hielo", cantidad: 2}
        ]
    },
     "Limonada con Menta":{ 
        precio: 2500,
        ingredientes:[
            {ingrediente: "Limon", cantidad: 1}, 
            {ingrediente: "Azucar", cantidad: 15}, 
            {ingrediente: "Agua", cantidad: 300}, 
            {ingrediente: "Vasos", cantidad: 1}, 
            {ingrediente: "Menta", cantidad: 3}
        ]
    },
    "Jugo de Naranja":{
        precio: 3500,
        ingredientes:[
            {ingrediente: "Azucar", cantidad: 15}, 
            {ingrediente: "Agua", cantidad: 200}, 
            {ingrediente: "Vasos", cantidad: 1}, 
            {ingrediente: "Naranja", cantidad: 2}
        ] 
    },
   "Jugo de Manzana": {
        precio: 4000,
        ingredientes:[
            {ingrediente: "Azucar", cantidad: 15}, 
            {ingrediente: "Agua", cantidad: 200}, 
            {ingrediente: "Vasos", cantidad: 1}, 
            {ingrediente: "Manzana", cantidad: 2}
        ],
      
    },
    "Jugo de Ananá":{
        precio: 5500,
        ingredientes:[
            {ingrediente: "Azucar", cantidad: 15}, 
            {ingrediente: "Agua", cantidad: 200}, 
            {ingrediente: "Vasos", cantidad: 1}, 
            {ingrediente: "Anana", cantidad: 2}
        ],
        
    }
};

const dialogoClientes =  {
    "abuela":{
        "imagen":"./img/abuela.png",
        "Limonada Clásica": "¡Hola, corazon! Una limonada clásica, como las que hacía yo, por favor.",
        "Limonada con Hielo": "Ay, qué calor... ponle un hielito a mi limonada, no me quiero insolar.",
        "Limonada con Menta": "¿Menta fresca? Qué bien hace para la digestión. Dame una de esas.",
        "Jugo de Naranja": "Un juguito de naranja para la vitamina C, hay que cuidarse del resfrío.",
        "Jugo de Manzana": "Manzana dulce... qué rico. Dame uno para recordar viejos tiempos.",
        "Jugo de Ananá": "¡Ananá! Qué fruta tan exótica, dame uno para probar algo nuevo."
    },
    "mujer":{
        "imagen":"./img/mujer.png",
        "Limonada Clásica": "Una clásica rápida, por favor, tengo una reunión en 5 minutos.",
        "Limonada con Hielo": "¡Uff! Necesito algo helado ahora mismo, dame una con hielo.",
        "Limonada con Menta": "¿Tienen menta? ¡Genial! Me encanta el toque refrescante que le da.",
        "Jugo de Naranja": "Un jugo de naranja natural, por favor. Nada de cosas artificiales.",
        "Jugo de Manzana": "Manzana... dulce pero suave. Prepárame uno, por favor.",
        "Jugo de Ananá": "Hoy me merezco un gusto tropical. ¡Dame el de Ananá!"
    },
    "niña":{
        "imagen":"./img/nina.png",
        "Limonada Clásica": "¡Hola gato! ¿Me das una limonada? ¡Pero que no sea ácida!",
        "Limonada con Hielo": "¡Quiero una con hielos que hagan ruido al batir! ¡Porfiiis!",
        "Limonada con Menta": "¿Esa tiene hojitas verdes? ¡Qué gracioso! Quiero una.",
        "Jugo de Naranja": "¡Naranja! ¡El color de mi juguete favorito! ¡Dame uno!",
        "Jugo de Manzana": "¡Manzana dulce! ¡Es mi favorita del mundo mundial! ¡Quiero uno!",
        "Jugo de Ananá": "Jugo de piña?...¡Esa es la más cara! ¡Debe ser super rica! ¡Papi me la compra!"
    },
    "hombre":{
        "imagen":"./img/hombre.png",
        "Limonada Clásica": "¡Hola! Una limonada clásica, corta y al pie, por favor.",
        "Limonada con Hielo": "Dame una con hielo. Si no sale humo del frío, no sirve.",
        "Limonada con Menta": "¿Menta? Suena interesante. Dame una para probar.",
        "Jugo de Naranja": "¡Naranja pura! Necesito energía para seguir el día.",
        "Jugo de Manzana": "Un jugo de manzana, rápido. ¡Tengo mucha sed!",
        "Jugo de Ananá": "El más potente que tengas... Ananá, ¡ese es!"
    }
};

const bebidasDisponibles= (dia)=>{
    const bebidas = Object.keys(catalogoBebidas);
    if(dia<3){
        return bebidas.slice(0,1);
    }else if(dia<5){
        return bebidas.slice(0,3);
    }else{
        return bebidas;
    }
}
const mensajeCliente = () =>{
    const dialogo = Object.keys(dialogoClientes); 
    const personajeAlazar = Math.floor(Math.random()*dialogo.length);
    const itemElegido = dialogo[personajeAlazar];
    return itemElegido;
}

const preparandoBebida = (nombrebebida)=>{
    const receta = catalogoBebidas[nombrebebida];
    const inventarioActual = obtenerInventario();
    let tieneTodo = true;
    receta.ingredientes.forEach(ing =>{
        let enStock = inventarioActual.find(x => x.producto === ing.ingrediente);
        if(!enStock || enStock.cantidadReal < ing.cantidad){
            tieneTodo = false;
            let texto = enStock ? `❌ Falta ${enStock.producto}` : `❌ Falta ${ing.ingrediente}`;
            Toastify({
            text: texto,
            duration: 3000,
            gravity :"top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #b01500, #c9813d)",
            }
            }).showToast();
        }
    });
    if(tieneTodo){
        receta.ingredientes.forEach(ing =>{
        let enStock = inventarioActual.find(x => x.producto === ing.ingrediente);
            if(enStock.producto === "Limon" || enStock.producto === "Vasos" ||enStock.producto === "Naranja" || enStock.producto === "Menta" || enStock.producto === "Manzana" || enStock.producto === "Anana"){
                enStock.cantidadReal -= ing.cantidad;
                enStock.cantidad -= ing.cantidad;
            }else{
                 enStock.cantidadReal -= ing.cantidad;
            }
             if(enStock.cantidadReal<=0){
                    enStock.cantidadReal = 0;
                    enStock.cantidad = 0;
            }
        });
        guardarInventario(inventarioActual);
        const capitalActual = obtenerCapital();
        let agregarGanancia = Number(capitalActual) + receta.precio; //actualizar el capital cuando la venta es exitosa
        guardarCapital(agregarGanancia);
        dinero.forEach(element => {
             element.innerText = `$ ${agregarGanancia.toLocaleString('es-AR')}`;
        });
        let venta = `✅ Venta Exitosa! + $${receta.precio}`;
        Toastify({
            text: venta,
            duration: 3000,
            gravity :"top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b046, #c2c93d)",
            }
        }).showToast();
        return true;
    }else{
        return false;
    }
};
const selecionBebidasYCliente =()=>{
    const cliente = mensajeCliente();
    const dia = obtenerDia();
    const bebidasPermitidas = bebidasDisponibles(dia);
    const indiceAlazar = Math.floor(Math.random()*bebidasPermitidas.length);
    const bebidaElegida = bebidasPermitidas[indiceAlazar];
    return {
        personaje: dialogoClientes[cliente].imagen, 
        mensaje: dialogoClientes[cliente][bebidaElegida], //así se interactua con objetos con otros objetos de forma directa
        bebida: bebidaElegida
    };
};


