const btnAudios = document.querySelectorAll('.audio');
const reproduciendoSonido = document.querySelector('#audio-background');
let estadoAudio = 'muted';
//Musica background
btnAudios.forEach(boton => {
boton.addEventListener('click', function(){ //a cada boton de audio se le aplica el eventlistener
    if(estadoAudio === 'muted'){
        reproduciendoSonido.play();
        btnAudios.forEach(element => {
                element.src = '../img/audio-active.png';
            });
            estadoAudio = 'playing';
        
    }else{
        reproduciendoSonido.pause();
        btnAudios.forEach(element => {
                element.src = '../img/audio-muted.png';
        });
        estadoAudio = 'muted';
    }
    
});
});

