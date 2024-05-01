import { user , addUser} from './user.js';

const inputs=document.querySelectorAll('input');
const formulario = document.getElementById('create-account');
const nombre = document.getElementById('name'); 
const correo = document.getElementById('email');  
const telefono = document.getElementById('phone'); 
const contra = document.getElementById('password'); 
const resetform = document.getElementById('reset');

const expresiones ={
    email: /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/,
    password: /^.{8,10}$/,
    phone: /^\d{10}$/,
    name:  /^[a-zA-ZÀ-ÿ\s]{2,40}$/
}

const campos = {
    email: false,
    password: false,
    phone: false,
    name: false
}

const validarFormularioRegister = (e) => {
    switch (e.target.name) {
        case "name":
            validarCampo(expresiones.name, e.target,"name");
            break;
        case "phone":
            validarCampo(expresiones.phone, e.target, "phone");
            break;
        case "email":
            validarCampo(expresiones.email, e.target, "email");
            break;
        case "password":
            validarCampo(expresiones.password, e.target, "password");
            validarpassword();
            break;
        case "confirm":
            validarpassword(); 
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
    input.addEventListener('keyup',validarFormularioRegister);
    input.addEventListener('blur',validarFormularioRegister);

})
const validarpassword = () => { 
const contrasena = document.getElementById ("password");
const valid = document.getElementById ("confirm");
if (contrasena.value !== valid.value || contrasena.value === '' || valid.value === '')
{
    document.getElementById("confirm").classList.add('is-invalid');
    document.getElementById("confirm").classList.remove('is-valid');
    campos["password"]=false;   
}
else{
    document.getElementById("confirm").classList.add('is-valid');
    document.getElementById("confirm").classList.remove('is-invalid');
    campos["password"]=true; 
}
}

let usuarios = [];

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.name && campos.phone && campos.password && campos.email){

        addUser(usuarios, nombre.value, telefono.value, contra.value, correo.value);

    var url ='http://localhost:8080/user';

        fetch( url,{
            method: 'POST',
            body:
            JSON.stringify({
                userName: nombre.value,
                userEmail: correo.value,
                userPhone: telefono.value,
                password: contra.value
            }),
            headers: {
                'Content-Type': 'application/json',
            }
            
        }).then(response => response.json())

            .then(respuesta => {
                if(respuesta) 
                {
                    Swal.fire({
                        icon:'success',
                        title: 'Exito',
                        text: 'Registro exitoso',
                    });
                    setTimeout(()=>{window.location.href = "../pages/login.html"},2000);
            }
                else{
                    Swal.fire({
                        icon:'error',
                        title: 'Registro Fallido',
                        text: 'La direccion de email ya esta registrada',
                    })
                }
            })
        .catch(error => {
            console.log('Datos incorrectos', error);
        });
    }
});

resetform.addEventListener('click', (e)  =>{
    var inputs = document.getElementsByClassName('form-control');
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('is-invalid');
        inputs[i].classList.remove('is-valid');
    }
});