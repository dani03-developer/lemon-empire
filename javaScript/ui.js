const popup = document.getElementById('popup');
const dias = document.getElementById('dias');
const dialogo = document.getElementById('dialogo');
const mensajeTexto= document.getElementById('mensaje');
const audioNotificacion = document.getElementById('audio-notificacion');
const dinero = document.querySelectorAll('.dinero');
const comprarInsumos = document.getElementById('insumos');
const tienda = document.getElementById('tienda-jugos');
const menu = document.getElementById('menuReal');
const menuHome = document.getElementById('menu-home');
const personajeDialogo = document.querySelector('.personaje');
const cesped = document.querySelector('.cesped');
const arbol = document.getElementById('arbolDos');
const cielo = document.querySelector('.cielo');
const imagenMenu = document.querySelector('.imagen-menu');
const inventarioAlmacenado = obtenerInventario();
const textoTienda = document.getElementById('mensaje-distribuidor');
const cuadroDialogo = document.getElementById('dialogo-distribuidor');
const segundaSeccion = document.getElementById('segundaSeccion');
actualizarCapital();
actualizarDia();
cargarProductosDistribuidor(diaActual);
const cambiarMensaje = (dialogo, texto, i) =>{
    dialogo.style.visibility = "visible";
    dialogo.style.display = "block";
    texto.innerText = mensaje(nombreDelJugador)[i];
    dialogo.classList.add('scale-up-center');
    audioNotificacion.play();
};
function navegarA(screenId) {
    const screens = document.querySelectorAll('.screens');
    screens.forEach(s => s.classList.add('hidden'));
    const verPantalla = document.getElementById(screenId);
    verPantalla.classList.remove('hidden');
};
navegarA('main-screen');
function start(){
    navegarA('day-screen');
    arbol.classList.add('hidden');
    cesped.classList.add('hidden'); 
    cielo.classList.add('hidden');
    setTimeout(() =>{
        navegarA('game-screen');
        arbol.classList.remove('hidden');
        cesped.classList.remove('hidden'); 
        cielo.classList.remove('hidden');
        cambiarMensaje(dialogo,mensajeTexto, 0);
    }, 2000);
}
/*VER INVENTARIO */
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
    if(inventarioAlmacenado.length === 0){
        cambiarMensaje(dialogo,mensajeTexto, 1);
    }else{
        cambiarMensaje(dialogo,mensajeTexto, 3);
    }
};
/*Comprar insumos */
const verProductosDistribuidor = () =>{
    cuadroDialogo.style.visibility = "hidden";
            cuadroDialogo.style.display = "none";
        segundaSeccion.classList.remove('desactive');
         segundaSeccion.innerHTML = `
        <section class="cabeceraInventario border-bottom d-flex justify-content-center align-items-center">
            <h2>Catálogo</h2>
            <button type="button" onclick="cerrarCatalogo()">✕</button>
        </section>
        <section class="grid-Distribuidor"></section>
    `;
    segundaSeccion.style.padding = "0";
    segundaSeccion.style.minHeight = "50%";
    segundaSeccion.style.borderRadius = ".4rem";

};
function cerrarCatalogo(){
        segundaSeccion.classList.add('desactive');
        navegarA('game-screen');
}
const esDesktop = window.matchMedia('(min-width: 992px)');
function ajustarInterfazDistribuidor(pantalla) {
    if(pantalla.matches){
        verProductosDistribuidor();
        cuadroDialogo.style.visibility = "visible";
        cuadroDialogo.style.display = "block";
    }else{
        if(!segundaSeccion.classList.contains('desactive')){
            cuadroDialogo.style.visibility = "hidden";
            cuadroDialogo.style.display = "none";
        }else{
            segundaSeccion.classList.add('desactive');
        }

    }
}
function tiendaDistribuidor(){
   navegarA('tienda-distribuidor');
   document.body.classList.add('modo-distribuidor');
   cesped.src = './img/cespedDos.png';
   arbol.src = './img/arbolUno.png';
   esDesktop.addEventListener('change',ajustarInterfazDistribuidor);
   ajustarInterfazDistribuidor(esDesktop);
   setTimeout(() =>{
        cambiarMensaje(cuadroDialogo,textoTienda, 2);
    },500); 
}