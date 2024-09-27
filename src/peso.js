const icono = document.getElementById('icono-peso');
        let rotacionY = 0; 

        function rotarIcono() {
            
            rotacionY += 1; 
            icono.style.transform = `rotateY(${rotacionY}deg)`; 

            
            requestAnimationFrame(rotarIcono);
        }

        rotarIcono(); 