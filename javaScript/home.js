 const popup = document.getElementById('popup');
 const dialogo = document.getElementById('dialogo');
 const mensajeTexto= document.getElementById('mensaje');
let nombreDelJugador = localStorage.getItem('nombre') || "";
const mensaje = (nombre) => [
  `¡Hola ${nombre}! ¡Qué bueno que llegaste! Soy Limo 😺, tu socio. El sol está pegando fuerte y la gente tiene sed... ¡Es el momento perfecto para construir nuestro imperio! ¿Por dónde empezamos?`,
  `¡Rayos! ⚡ El depósito está vacío, ${nombre}. Si no compramos ingredientes pronto, solo podremos venderles aire fresco a los clientes...¡Vamos a ver qué tiene el proveedor!"`,
 `¡Qué tal, socio! 🐻 Soy Barnaby, el encargado de que a Lemon Empire nunca le falte frescura. Tengo los limones más ácidos y el hielo más frío de la región. Mira el catálogo, ¡hoy todo está de primera calidad! ¿Qué vamos a cargar en el almacén?`,
 `¡Eso es, ${nombre}! 💪 Ya tenemos los insumos en el depósito. ¡Huele a éxito (y a muchos cítricos)! Deja de mirar las cajas y vamos a encender el exprimidor... ¡Es hora de poner a trabajar ese dinero y exprimir las ganancias!`
];
const cambiarMensaje = (i) =>{
    dialogo.style.visibility = "visible";
    dialogo.style.display = "block";
    mensajeTexto.innerText = mensaje(nombreDelJugador)[i];
    dialogo.classList.add('scale-up-center');
};
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
    const posibleNombre = input.value
    posibleNombre.trim(); // trim()  elimina los espacios en blanco al inicio y al final de una cadena
    if(posibleNombre.length === 0){
        alert("❌ Error, ingrese un nombre.");
    }else{
        nombreDelJugador = localStorage.setItem('nombre', posibleNombre);
        popup.classList.add('desactive');
        document.querySelectorAll('.bru').forEach(function(elemento) {
        elemento.classList.remove('bru');
        nombreDelJugador = localStorage.getItem('nombre');
        cambiarMensaje(0);
    });
    }
   
};

function verInventario(){

};