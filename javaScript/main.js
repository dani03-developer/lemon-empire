/****************************************************************** */
/***************PREPARATIVOS PARA EL INCIO ************************ */
/****************************************************************** */
navegarA('main-screen');
actualizarDia();
if(!obtenerDia()){
    guardarDia(diaActual); 
    cargarProductosDistribuidor(diaActual);
}else{
    let dia = obtenerDia();
    actualizarDia(dia);
    cargarProductosDistribuidor(dia);
}
if(!obtenerCapital()){
    guardarCapital(capitalActual); 
}else{
    let capital = obtenerCapital();
    capitalActual = Number(capital); 
    dinero.forEach(element => {
    element.innerText = `$ ${capitalActual.toLocaleString('es-AR')}`;
    });
}
// Pedir y verificar si tenemos el nombre del Usuario/ Jugador
function cerrarPopup(){
    const input = document.getElementById('input-nombre');
    const posibleNombre = input.value.trim(); // trim()  elimina los espacios en blanco al inicio y al final de una cadena
    if(posibleNombre.length === 0){
         Toastify({
            text: "❌ Eror, ingrese un nombre",
            duration: 3000,
            gravity :"top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #b01500, #c9813d)",
            }
        }).showToast();
    }else{
        guardarNombre(posibleNombre);
        nombreDelJugador = posibleNombre;
        popup.classList.add('desactive');
        document.querySelectorAll('.bru').forEach(function(elemento) {
        elemento.classList.remove('bru');
        });
        cambiarMensaje(dialogo,mensajeTexto, 0);
    }
   
};

