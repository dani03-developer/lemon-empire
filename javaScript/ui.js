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
const dialogoCliente = document.getElementById('dialogo-clientes');
const textoClientes = document.getElementById('mesaje-cliente');
const dialogoDespedida = document.getElementById('dialogo-despedida');
const textoDespedida = document.getElementById('mensaje-despedida');
const btnPasarDia = document.querySelector('.btnPasarDia');

/****************************************************************** */
/********************FUNCIONES PRINCIPALES **************************** */
/****************************************************************** */
function navegarA(screenId) {
    const screens = document.querySelectorAll('.screens');
    screens.forEach(s => s.classList.add('hidden'));
    const verPantalla = document.getElementById(screenId);
    verPantalla.classList.remove('hidden');
};
let cambiarDia = ()=>{
    navegarA('day-screen');
    arbol.classList.add('hidden');
    cesped.classList.add('hidden'); 
    cielo.classList.add('hidden');
    setTimeout(() =>{
        navegarA('game-screen');
        if(!nombreDelJugador){
            const mainElement = document.querySelector('main');
            mainElement.classList.add('bru');
            cielo.classList.add('bru');
            cesped.classList.add('bru');
            arbol.classList.add('bru');
            popup.classList.remove('hidden');
        }else{
            cambiarMensaje(dialogo,mensajeTexto, 0);
        }
        arbol.classList.remove('hidden');
        cesped.classList.remove('hidden'); 
        cielo.classList.remove('hidden');
        
    }, 2000);
};
function start(){
    cambiarDia();
}
function instrucciones(){
    navegarA('instrucciones-screen');
     cesped.classList.add('ventas-bebidas');
    cesped.src = './img/cespedTres.png';
    arbol.classList.add('vender-bebidas');
}
function salir(){
    window.close();
}
function backInicio(){
    navegarA('main-screen')
    cesped.classList.remove('ventas-bebidas');
    arbol.classList.remove('vender-bebidas');
    cesped.src = './img/cesped.png';  
    arbol.src = './img/arbolDos.png'; 
}
function volverInicio(){
    navegarA('main-screen');
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
    popup.classList.remove('hidden');
    if(inventarioAlmacenado.length>0){
    const grid = popup.querySelector('.grid-inventario'); //quiere decir que cuando abra el popup y se activen los estilos busque la clase gris-inventario que se creó en popup
    inventarioAlmacenado.forEach(i => {
        let nuevoProducto = document.createElement('section');
        nuevoProducto.classList.add('container-producto');
        nuevoProducto.innerHTML = `
                <img class="producto" src="./img/${i.producto.toLowerCase()}.png" alt="">
                    <section class="contador">
                        <p class= "contador-producto">${i.cantidad}</p>
                    </section>
        `;
        grid.append(nuevoProducto);
        });
    }
    
};
function cerrarInventario(){
    popup.classList.add('hidden');
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
        segundaSeccion.classList.remove('hidden');
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
                <img src="./img/${i.producto.toLowerCase()}.png" alt="">
                    <section class="nombre-descripcion-producto">
                        <p>${i.producto}-${i.cantidad}</p>
                        <a id="boton-agregar-carrito" onclick="agregarAlCarrito('${i.producto}','${i.cantidad}','${i.cantidadReal}', ${i.precio})"><img src="./img/moneda.png"> $ ${i.precio}</a>
                    </section>
        `;
        grid.append(nuevoProducto);
        });
    }


};
function cerrarCatalogo(){
        segundaSeccion.classList.add('hidden');
        document.body.classList.remove('modo-distribuidor');
        cesped.src = './img/cesped.png';  
        arbol.src = './img/arbolDos.png';  
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
        if(!segundaSeccion.classList.contains('hidden')){
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
     segundaSeccion.classList.remove('hidden'); 
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
                <img src="./img/${i.producto.toLowerCase()}.png" alt="">
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
            item.cantidadReal += item.unidadReal;
            const cantidadTotal = calcularCantidadesCarrito(carritoActual);
            document.getElementById('cantidad-carrito').innerText = `${cantidadTotal}`; 
        } else if (accion === "menos") {
            item.cantidad--;
            item.cantidadReal -= item.unidadReal;
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
}
const cerrarCarrito=()=>{
    segundaSeccion.classList.remove('carrito');
    verProductosDistribuidor();
}

/****************************************************************** */
/********************VENDER BEBIDAS **************************** */
/****************************************************************** */

const mensajeClientes = (dialogo, texto, pedido) =>{
    const imagenDelPersonaje = dialogo.querySelector('.personaje');
    dialogo.style.visibility = "visible";
    dialogo.style.display = "block";
    imagenDelPersonaje.src = pedido.personaje;
    imagenDelPersonaje.style.left = "4%";
    texto.innerText = pedido.mensaje;
    dialogo.classList.add('scale-up-center');
    audioNotificacion.play();
};
let esNoche = false;
let intervaloPedidos = null;
function venderBebidas(){
    if(esNoche){
        navegarA('vender-bebidas');
        return;
    }
     if(intervaloPedidos) {
        clearInterval(intervaloPedidos);
        intervaloPedidos = null;
    }
    navegarA('vender-bebidas');
    cesped.classList.add('ventas-bebidas');
    cesped.src = './img/cespedTres.png';
    arbol.classList.add('vender-bebidas');
    let pedidoActual = selecionBebidasYCliente();
    mensajeClientes(dialogoCliente,textoClientes,pedidoActual);
    preparandoBebida(pedidoActual.bebida);

    intervaloPedidos = setInterval(()=>{
        pedidoActual = selecionBebidasYCliente();
        const enVentas = !document.getElementById('vender-bebidas').classList.contains('hidden');
        if(enVentas){
            mensajeClientes(dialogoCliente,textoClientes,pedidoActual);
        }
        preparandoBebida(pedidoActual.bebida);
    }, 15000);
    setTimeout(()=>{
        clearInterval(intervaloPedidos);
        intervaloPedidos = null;
        esNoche = true;
        document.body.classList.add('modo-nocturno');
        const tienda = document.getElementById('tienda-jugos-venta');
        const luna = document.querySelector('.luna');
        dialogoCliente.classList.add('hidden');
        dialogoDespedida.classList.remove('hidden');
        btnPasarDia.classList.remove('hidden');
        cambiarMensaje(dialogoDespedida,textoDespedida, 4);
        cielo.style.visibility = "hidden";
        luna.classList.remove('hidden');
        tienda.src = "./img/juice-shop-closed.png";
        tienda.classList.add('closed');
        let diaActual = obtenerDia();
        diaActual++;
        guardarDia(diaActual);
        actualizarDia(diaActual);
    }, 480000);
}
function backHome(){
    cesped.classList.remove('ventas-bebidas');
    arbol.classList.remove('vender-bebidas');
    cesped.src = './img/cesped.png';  
    arbol.src = './img/arbolDos.png';  
    navegarA('game-screen')
}
function pasarDia(){
    esNoche = false; 
    document.body.classList.remove('modo-nocturno');
    cesped.classList.remove('ventas-bebidas');
    arbol.classList.remove('vender-bebidas');
    cesped.src = './img/cesped.png';
    arbol.src = './img/arbolDos.png';
    const tiendaVenta = document.getElementById('tienda-jugos-venta');
    const luna = document.querySelector('.luna');
    if(tiendaVenta){
        tiendaVenta.src = "./img/juice-shop.png";
        tiendaVenta.classList.remove('closed');
    }
    if(luna) luna.classList.add('hidden');
    dialogoCliente.classList.remove('hidden');
    cielo.style.visibility = "visible";
    dialogoDespedida.classList.add('hidden');
    btnPasarDia.classList.add('hidden');
    const nuevoDia = obtenerDia();
    cargarProductosDistribuidor(nuevoDia);
    cambiarDia();
}
