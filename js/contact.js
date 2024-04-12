const inputs=document.querySelectorAll('input');
const resetform=document.getElementById('borrar');


const expresiones ={
    email: /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/,
    message:/^.{1,500}$/,
    phone: /^\d{10}$/,
    name: /^[A-Z][a-z]+(?: [A-Z][a-z]+)?$/
}

const campos = {
    email: false,
    phone: false,
    message: false,
    name: false
}

const validarFormularioContacto = (e) => {
    switch (e.target.name) {
        case "email":
            validarCampo(expresiones.email, e.target,"email");
            break;

        case "message":
            validarCampo(expresiones.message, e.target, "message");
            break;

        case "name":
              validarCampo(expresiones.name, e.target, "name");
                break;

        case "phone":
                validarCampo(expresiones.phone, e.target, "phone");
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
    input.addEventListener('keyup',validarFormularioContacto);
    input.addEventListener('blur',validarFormularioContacto);

})

resetform.addEventListener('click', (e)  =>{
    var inputs = document.getElementsByClassName('form-control');
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('is-invalid');
        inputs[i].classList.remove('is-valid');
    }
})