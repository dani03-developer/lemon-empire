// Pedir y verificar si tenemos el nombre del Usuario/ Jugador
if(nombreDelJugador){
    popup.classList.add('desactive');
        document.querySelectorAll('.bru').forEach(function(elemento) {
        elemento.classList.remove('bru');
    });
};
function cerrarPopup(){
    const input = document.getElementById('input-nombre');
    const posibleNombre = input.value.trim(); // trim()  elimina los espacios en blanco al inicio y al final de una cadena
    if(posibleNombre.length === 0){
        alert("❌ Error, ingrese un nombre.");
    }else{
        guardarNombre(posibleNombre);
        nombreDelJugador = posibleNombre;
        
        popup.classList.add('desactive');
        document.querySelectorAll('.bru').forEach(function(elemento) {
        elemento.classList.remove('bru');
        });
    }
   
};

