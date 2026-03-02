 const popup = document.getElementById('popup');
 const dialogo = document.getElementById('dialogo');
 const mensajeTexto= document.getElementById('mensaje');
let nombreDelJugador = localStorage.getItem('nombre') || "";
const audioNotificacion = document.getElementById('audio-notificacion');
const dinero = document.getElementById('dinero');

const capitalInicial = 10000;
let capitalActual = capitalInicial;
let inventario =[];
let carritoCompra = [];
// Definir los mensajes que aparecerán y su muestra
const mensaje = (nombre) => [
  `¡Hola ${nombre}! ¡Qué bueno que llegaste! Soy Limo 😺, tu socio. El sol está pegando fuerte y la gente tiene sed... tu objetivo es administrar el puesto de limonada y ganar dinero. Para eso, tendrás que comprar ingredientes, preparar limonada y venderla a los clientes. ¡Buena suerte!`,
  `¡Rayos! ⚡ El depósito está vacío, ${nombre}. Si no compramos ingredientes pronto, solo podremos venderles aire fresco a los clientes...¡Vamos a ver qué tiene el proveedor!"`,
 `¡Qué tal, socio! 🐻 Soy Barnaby, el encargado de que a Lemon Empire nunca le falte frescura. Tengo los limones más ácidos y el hielo más frío de la región. Mira el catálogo, ¡hoy todo está de primera calidad! ¿Qué vamos a cargar en el almacén?`,
 `¡Eso es, ${nombre}! 💪 Ya tenemos los insumos en el depósito. ¡Huele a éxito (y a muchos cítricos)! Deja de mirar las cajas y vamos a encender el exprimidor... ¡Es hora de poner a trabajar ese dinero y exprimir las ganancias!`
];
const cambiarMensaje = (i) =>{
    dialogo.style.visibility = "visible";
    dialogo.style.display = "block";
    mensajeTexto.innerText = mensaje(nombreDelJugador)[i];
    dialogo.classList.add('scale-up-center');
    audioNotificacion.play();
};
// Pedir y verificar si tenemos el nombre del Usuario/ Jugador
if(localStorage.getItem('nombre')){
    popup.classList.add('desactive');
        document.querySelectorAll('.bru').forEach(function(elemento) {
        elemento.classList.remove('bru');
    });
    setTimeout(function() {
        cambiarMensaje(0);
    }, 2000); // 6000ms = 3 segundos
};
function cerrarPopup(){
    const input = document.getElementById('input-nombre');
    const posibleNombre = input.value.trim(); // trim()  elimina los espacios en blanco al inicio y al final de una cadena
    if(posibleNombre.length === 0){
        alert("❌ Error, ingrese un nombre.");
    }else{
        nombreDelJugador = localStorage.setItem('nombre', posibleNombre);
        popup.classList.add('desactive');
        document.querySelectorAll('.bru').forEach(function(elemento) {
        elemento.classList.remove('bru');
        });
        nombreDelJugador = localStorage.getItem('nombre');
        cambiarMensaje(0);
    }
   
};
/*Actualizar capital */
let actualizarCapital = () => {
    dinero.innerHTML = `$ ${capitalActual.toLocaleString('es-AR')}`;
};
actualizarCapital();

// Agregar productos al inventario
let agregarInventario = (producto, cantidad) =>{ //agrega
     let productoInventarioEncontrado = inventario.find(x => x.producto === producto);
     if(productoInventarioEncontrado){
        productoInventarioEncontrado.cantidad += cantidad;
     }else{
        inventario.push({producto: producto, cantidad: cantidad});
     }
    localStorage.setItem('inventario', JSON.stringify(inventario));
};
agregarInventario("manzana", 2);
/*Ver INVENTARIO */
const inventarioAlmacenado = JSON.parse(localStorage.getItem('inventario'));
function verInventario(){ //solo muestra
    dialogo.style.visibility = "hidden";
    dialogo.style.display = "none";
    popup.innerHTML = `
        <section class="cabeceraInventario border-bottom d-flex justify-content-center align-items-center">
            <h2>Inventario</h2>
            <button type="button" onclick="cerrarInventario()">✕</button>
        </section>
        <section class="grid-inventario"></section>
    `;
     popup.style.padding = "0";
    popup.style.minHeight = "50%";
    popup.style.borderRadius = ".4rem";
    popup.classList.remove('desactive');
    if(inventarioAlmacenado.length>0){
    const grid = popup.querySelector('.grid-inventario'); //quiere decir que cuando abra el popup y se activen los estilos busque la clase gris-inventario que se creó en popup
    inventarioAlmacenado.forEach(i => {
        let nuevoProducto = document.createElement('section');
        nuevoProducto.classList.add('container-producto');
        nuevoProducto.innerHTML = `
                <img class="producto" src="../img/${i.producto}.png" alt="">
                    <section class="contador">
                        <p class= "contador-producto">${i.cantidad}</p>
                    </section>
        `;
        grid.append(nuevoProducto);
        });
    }
    
};
function cerrarInventario(){
    popup.classList.add('desactive');
    if(!inventarioAlmacenado){
        cambiarMensaje(1);
    }else{
        cambiarMensaje(3)
    }
};