window.addEventListener('load', function() {
    
    const msgSuccess = this.document.getElementById('msgSuccess');
    const btnLogout = this.document.getElementById('btnLogout');

   
    const result = JSON.parse(this.localStorage.getItem('result'));

   
    if (result) {
       
        mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

      
        btnLogout.addEventListener('click', function() {
           
            const logoutRequest = {
                tipoDocumento: result.tipoDocumento, 
                numeroDocumento: result.numeroDocumento 
            };

           
            logout(logoutRequest);
        });
         
          btnLogout.addEventListener('mouseover', function() {
            btnLogout.style.backgroundColor = 'red'; 
        });

        
        btnLogout.addEventListener('mouseout', function() {
            btnLogout.style.backgroundColor = 'white'; 
        });
    } else {
        mostrarAlerta('Error: No se encontró información del usuario.');
    }
});

function mostrarAlerta(mensaje) {
    const msgSuccess = document.getElementById('msgSuccess'); 
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

async function logout(logoutRequest) {
    console.log(logoutRequest)
    const url = 'http://localhost:8082/login/logout-async';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logoutRequest)
        });

        if (!response.ok) {
            mostrarAlerta('Error: Ocurrió un problema con el cierre de sesión');
            throw new Error(`Error: ${response.statusText}`);
        }

        
        const result = await response.json();
        console.log('Respuesta del servidor: ', result);

        if (result.resultado) {
            
            localStorage.removeItem('result'); 
            window.location.replace('index.html'); 
        } else {
            mostrarAlerta(result.mensajeError);
        }

    } catch (error) {
        console.log('Error: Ocurrió un problema con el cierre de sesión', error);
        mostrarAlerta('Error: Ocurrió un problema con el cierre de sesión');
    }
}
