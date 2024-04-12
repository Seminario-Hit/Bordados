const inputs=document.querySelectorAll('input');



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

