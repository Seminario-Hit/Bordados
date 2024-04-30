const inputs=document.querySelectorAll('input');
const formulario = document.getElementById('login');
const email = document.getElementById('email');
const pass = document.getElementById('password');

const expresiones ={
    email: /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/,
    password: /^.{8,10}$/
}

const campos = {
    email: false,
    password: false
}

const validarFormularioLogin = (e) => {
    switch (e.target.name) {
        case "email":
            validarCampo(expresiones.email, e.target,"email");
            break;

        case "password":
            validarCampo(expresiones.password, e.target, "password");
            break;
    }
}

function validarCampo(expresion,input,campo){
    if(expresion.test(input.value)){
        document.getElementById(`${campo}`).classList.remove('is-invalid');
        document.getElementById(`${campo}`).classList.add('is-valid');
        campos[campo]=true;
    }
    else{
        document.getElementById(`${campo}`).classList.add('is-invalid');
        document.getElementById(`${campo}`).classList.remove('is-valid');
        campos[campo]=false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup',validarFormularioLogin);
    input.addEventListener('blur',validarFormularioLogin);

})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    var url ='http://localhost:8080/login/';

    if(campos.email && campos.password){
        fetch( url,{
            method: 'POST',
            body:
            JSON.stringify({
                userEmail: email.value,
                password: pass.value
            }),
            headers: {
                'Content-Type': 'application/json',
            }
            
        }).then(response => response.json())

            .then(respuesta => {
                if(respuesta.accessToken.length!==0) 
                {
                    console.log(respuesta);
                    Swal.fire({
                        icon:'success',
                        title: 'Éxito',
                        text: 'Inicio de sesión exitoso'
                    });
                window.sessionStorage.setItem("token", JSON.stringify(respuesta));
                window.sessionStorage.setItem("userLogged", JSON.stringify({ userEmail: email.value }));
                    formulario.reset();
                    setTimeout(()=>{window.location.href = "../index.html"},2000);
                }
                else{
                    Swal.fire({
                        icon:'error',
                        title: 'Registro Fallido',
                        text: 'Usuario y/o contraseña no validos',
                    })
                    formulario.reset();
                }
            })
        .catch(error => {
            console.error('Error', error);
        });

        document.querySelectorAll('.is-valid').forEach((icono) => {
            icono.classList.remove('is-valid');
        });
    
            Object.keys(campos).forEach(campo => {
                campos[campo] = false;
            })
       
            
        } else {
            document.getElementById('alert-danger').classList.add('form--mensaje-activo');
            setTimeout(() => {
                document.getElementById('alert-danger').classList.remove('form--mensaje-activo');
            }, 5000);
        
    }

        
    }
);