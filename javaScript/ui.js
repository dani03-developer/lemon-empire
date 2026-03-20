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
const textoTienda = document.getElementById('mensaje-distribuidor');
const cuadroDialogo = document.getElementById('dialogo-distribuidor');
const segundaSeccion = document.getElementById('segundaSeccion');
const carrito = document.getElementById('carrito');
function navegarA(screenId) {
    const screens = document.querySelectorAll('.screens');
    screens.forEach(s => s.classList.add('hidden'));
    const verPantalla = document.getElementById(screenId);
    verPantalla.classList.remove('hidden');
};
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
const cambiarMensaje = (dialogo, texto, i) =>{
    dialogo.style.visibility = "visible";
    dialogo.style.display = "block";
    texto.innerText = mensaje(nombreDelJugador)[i];
    dialogo.classList.add('scale-up-center');
    audioNotificacion.play();
};
/****************************************************************** */
/********************VER INVENTARIO **************************** */
/****************************************************************** */
function verInventario(){ //solo muestra
    const inventarioAlmacenado = obtenerInventario();
    dialogo.style.visibility = "hidden";
    dialogo.style.display = "none";
    popup.innerHTML = `
        <section class="cabeceraPopup border-bottom d-flex justify-content-center align-items-center">
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
    const inventarioAlmacenado = obtenerInventario();
    if(inventarioAlmacenado.length === 0){
        cambiarMensaje(dialogo,mensajeTexto, 1);
    }else{
        cambiarMensaje(dialogo,mensajeTexto, 3);
    }
};
/****************************************************************** */
/********************MODO DISTRIBUIDOR **************************** */
/****************************************************************** */
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
const verProductosDistribuidor = () =>{
    const catalogoDistribuidorAlmacenado = obtenerCatalogoDistribuidor();
        if (!esDesktop.matches) {
            cuadroDialogo.style.visibility = "hidden";
            cuadroDialogo.style.display = "none";
            document.querySelector('.botonVerCatalogo').style.display = 'none';
        }
        segundaSeccion.classList.remove('desactive');
         segundaSeccion.innerHTML = `
        <section class="cabeceraPopup border-bottom d-flex justify-content-center align-items-center">
            <h2>Catálogo</h2>
            <button type="button" onclick="cerrarCatalogo()">✕</button>
        </section>
        <section class="grid-distribuidor"></section>
    `;
    
    if(catalogoDistribuidorAlmacenado.length>0){
    const grid = segundaSeccion.querySelector('.grid-distribuidor');
    catalogoDistribuidorAlmacenado.forEach(i => {
        let nuevoProducto = document.createElement('section'); //creamos un nuevo section para los productos
        nuevoProducto.classList.add('container-producto-distribuidor');
        nuevoProducto.innerHTML = `
                <img src="./img/${i.producto}.png" alt="">
                    <section class="nombre-descripcion-producto">
                        <p>${i.producto}-${i.cantidad}</p>
                        <a id="boton-agregar-carrito" onclick="agregarAlCarrito('${i.producto}','${i.cantidad}', ${i.precio})"><img src="../img/moneda.png"> $ ${i.precio}</a>
                    </section>
        `;
        grid.append(nuevoProducto);
        });
    }


};
function cerrarCatalogo(){
        segundaSeccion.classList.add('desactive');
        navegarA('game-screen');
}
const esDesktop = window.matchMedia('(min-width: 992px)');
function ajustarInterfazDistribuidor(pantalla) {
    if(pantalla.matches){
        verProductosDistribuidor();
        if (textoTienda.innerText !== "") {
            cuadroDialogo.style.visibility = "visible";
            cuadroDialogo.style.display = "block";
        }
    }else{
        if(!segundaSeccion.classList.contains('desactive')){
            cuadroDialogo.style.visibility = "hidden";
            cuadroDialogo.style.display = "none";
            document.querySelector('.botonVerCatalogo').style.display = 'none';
        }else{
           document.querySelector('.botonVerCatalogo').style.display = 'flex';
            if (textoTienda.innerText !== "") {
                cuadroDialogo.style.visibility = 'visible';
                cuadroDialogo.style.display = 'block';
            }
        }

    }
}
/****************************************************************** */
/********************CARRITO **************************** */
/****************************************************************** */

const abrirCarrito = ()=>{
    const carritoActual = obtenerItemCarrito();
    const totalCompra = calcularTotalCarrito(carritoActual);
     segundaSeccion.classList.remove('desactive'); 
    segundaSeccion.classList.add('carrito');
        segundaSeccion.innerHTML = `
        <section class="cabeceraPopup border-bottom d-flex justify-content-center align-items-center">
            <h2>Carrito</h2>
            <button type="button" onclick="cerrarCarrito()">✕</button>
        </section>
        <section class="grid-carrito"></section>
           <section class="container-total">
                    <section class="total">
                        <p>TOTAL</p>
                        <p id=resultado-suma>$ ${totalCompra.toLocaleString('es-AR')}</p>
                    </section>       
                    <a id="boton-comprar" onclick="comprar()">Comprar</a>
            </section>
       
    `;

    if(carritoActual.length>0){
    const grid = segundaSeccion.querySelector('.grid-carrito');
    carritoActual.forEach(i => {
        let nuevoProducto = document.createElement('section'); //creamos un nuevo section para los productos
        nuevoProducto.classList.add('container-producto-carrito');
        nuevoProducto.innerHTML = `
                <img src="./img/${i.producto}.png" alt="">
                    <section class="producto-cantidad">
                        <p>${i.producto} - ${i.tipoCantidad}</p>
                            <section onclick = "actualizarCantidad('${i.producto}', 'menos')" class="btn-mas-menos"><p>-</p></section>
                            <p>${i.cantidad}</p>
                            <section onclick = "actualizarCantidad('${i.producto}', 'mas')" class="btn-mas-menos"><p>+</p></section>
                    </section>
        `;
        grid.append(nuevoProducto);
        });
    }
}
carrito.addEventListener('click',abrirCarrito)
function actualizarCantidad(nombreProducto,accion){
    let carritoActual = obtenerItemCarrito();
    const item = carritoActual.find(i => i.producto === nombreProducto);
    if (item) {
        if (accion === "mas") {
            item.cantidad++;
            const cantidadTotal = calcularCantidadesCarrito(carritoActual);
            document.getElementById('cantidad-carrito').innerText = `${cantidadTotal}`; 
        } else if (accion === "menos") {
            item.cantidad--;
            const cantidadTotal = calcularCantidadesCarrito(carritoActual);
            document.getElementById('cantidad-carrito').innerText = `${cantidadTotal}`; 
        }
        if (item.cantidad <= 0) {
            carritoActual = carritoActual.filter(i => i.producto !== nombreProducto);
        } else {
            item.total = item.cantidad * Number(item.precioUnitario);
        }
        
    }
    enviarItemAlCarrio(carritoActual);
    abrirCarrito(); //actualizo
    console.log(sumaDeTotales(carritoActual));
}
const cerrarCarrito=()=>{
    segundaSeccion.classList.remove('carrito');
    verProductosDistribuidor();
}