//Importar clase item y constructor
import {Item} from './modules/card.js';

//Obtener elementos del DOM
const form = document.getElementById('add-new-product');
const productName = document.getElementById('input-name');
const description = document.getElementById('input-description');
const price = document.getElementById('input-price');
const fileInput = document.getElementById('input-img');
const categoryInput = document.getElementById('input-category');
const reset = document.getElementById('reset');//obtenemos el boton reset

//Variable para contener el path de la imagen del nuevo producto
let filePath = "";

//Array para guardar los campos validados
const formIsValid = {
    name: false,
    description: false,
    price: false,
    img: false
}


//Cambia clase a valido
function isValidStyle(element){
    element.classList.add("is-valid")
    element.classList.remove("is-invalid")
}
//Cambia clase a no valido
function isInvalidStyle(element){
    element.classList.remove("is-valid")
    element.classList.add("is-invalid")
}
//Quita ambas clases de validación
function resetValidationStyles(element){
    element.classList.remove("is-valid")
    element.classList.remove("is-invalid")
}
//Resetea los campos y las clases de validación
function resetForm(){
    form.reset();
    resetValidationStyles(productName);
    resetValidationStyles(description);
    resetValidationStyles(price);
    resetValidationStyles(fileInput);
}
function noSpecial(string){
    const noSpecialRegEx = /^[a-zA-Z0-9áéíóúÁÉÍÓÚ.,\s]*$/;
    return noSpecialRegEx.test(string);
}

//Validación para el nombre de producto
productName.addEventListener('change', (e) => {
    if((e.target.value.length > 35) || (e.target.value.length < 7) || (!noSpecial(e.target.value))) {
        isInvalidStyle(e.target);
        formIsValid.name = false;
    } else{
        isValidStyle(e.target);
        formIsValid.name = true;
    }
});

//Validación para la descripción
description.addEventListener('change', (e) => {
    if((e.target.value.length > 50) || (e.target.value.length < 7) || (!noSpecial(e.target.value))) {
        isInvalidStyle(e.target);
        formIsValid.description = false;
    } else{
        isValidStyle(e.target);
        formIsValid.description = true;
    }
});

//Valdiación para el precio
price.addEventListener('change', (e) => {
    if((e.target.value < 0) || (e.target.value > 10000)) {
        isInvalidStyle(e.target);
        formIsValid.price = false;
    }else if (isNaN(e.target==true)){
        isInvalidStyle(e.target);
        formIsValid.price = false;
    }else{
        isValidStyle(e.target);
        formIsValid.price = true;
    }
});


//Cambia el filePath si la imagen cargada es correcta y se modifica la categoría
categoryInput.addEventListener('change', (e) => {
    if(formIsValid.img){
        //Elige la subcarpeta dependiendo de la categoría
        let categoryFolder = "";
        switch(categoryInput.value){
            case "1":
                categoryFolder = "hoodies/";
                break;
            case "2":
                categoryFolder = "tshirts/";
                break;
            case "3":
                categoryFolder = "caps/";
                break;
        }
        filePath = "../src/img/img-products/" + categoryFolder + fileInput.value.split("\\").pop();
    }
    
});

//Detiene el evento submit y evalua si el formulario es válido
form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
})

//Reseta las clases con el botón reset
reset.addEventListener('click', (e) => {
	document.querySelectorAll('.is-invalid').forEach((icono) => {
		icono.classList.remove('is-invalid');
	});
	document.querySelectorAll('.is-valid').forEach((icono) => {
		icono.classList.remove('is-valid');
	});
	Object.keys(formIsValid).forEach(campo => {
		formIsValid[campo] = false;
	})
}
)

async function validateForm(){
    const formValues = Object.values(formIsValid); // Regresa un arreglo con todos los valores de un objeto.
    
    // Buscamos dentro del arreglo formValues 
    const valid = formValues.findIndex((value) => value == false);
    if(valid === -1){
        // Verificamos si la imagen es válida antes de enviar el formulario
        if (formIsValid.img) {
            const file = fileInput.files[0]; // Obtenemos el archivo seleccionado

            // Verificamos si se seleccionó un archivo
            if (file) {
                const formData = new FormData(); // Creamos un objeto FormData
                formData.append('file', file); // Adjuntamos el archivo al objeto FormData

                console.log('Nombre del archivo:', file.name);

                try {
                    // Enviamos la solicitud para cargar la imagen al servidor
                    const response = await fetch('http://localhost:8080/upload', {
                        method: 'POST',
                        body: formData
                    });

                    // Verificamos si la carga de la imagen fue exitosa
                    if (response.ok) {
                        // Mostramos un mensaje de éxito
                        fileInput.classList.add('is-valid');
                        fileInput.classList.remove('is-invalid');
                    } else {
                        // Mostramos un mensaje de error si la carga falla
                        fileInput.classList.add('is-invalid');
                        fileInput.classList.remove('is-valid');
                        throw new Error('Image upload failed!');
                    }
                } catch (error) {
                    // Mostramos un mensaje de error si ocurre un error durante la carga
                    console.error('Error:', error);
                    alert('An error occurred while uploading the image.');
                    return; // Abortamos el envío del formulario si la carga de la imagen falla
                }
            }
        }

        let productJSON = new Item(productName.value,price.value,description.value,filePath,categoryInput.value);
        let token = JSON.parse(window.sessionStorage.getItem("token")).accessToken;
        fetch("http://localhost:8080/products/",
        {
            method: 'POST',
            body: JSON.stringify(productJSON),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'ESIME ' + token
            }
        })
        .then(res => res.json())
        .then(productValid => {
            if (productValid) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Producto Registrado',
                  });
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Fallido',
                    text: 'El nombre de producto ya existe',
                  });
            }
        })
        .catch(error => console.error('Error:', error));


        resetForm();

		document.querySelectorAll('.is-valid').forEach((icono) => {
			icono.classList.remove('is-valid');
		});

		Object.keys(formIsValid).forEach(campo => {
			formIsValid[campo] = false;
		})
    }else{
        Swal.fire({
            icon: 'error',
            text: 'Favor de completar correctamente el formulario',
          })
    }
}


function handleImageValidation(event) {
    filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        isInvalidStyle(event.target);
        fileInput.value = '';
        filePath = fileInput.value;
        formIsValid.img = false;
    } else {
        isValidStyle(event.target);
        formIsValid.img = true;
        let categoryFolder = "";
        // Elige la subcarpeta dependiendo de la categoría
        switch (categoryInput.value) {
            case "1":
                categoryFolder = "hoodies/";
                break;
            case "2":
                categoryFolder = "tshirts/";
                break;
            case "3":
                categoryFolder = "caps/";
                break;
        }

        filePath = "../src/img/img-products/img-products/" + event.target.value.split("\\").pop();
    }
}
fileInput.addEventListener('change', handleImageValidation);

//Pide a la API las categorías para formar el menú desplegable
fetch("http://localhost:8080/category")
  .then(res => res.json())
  .then(categoriesArray => {
      let tmpHTML ="";
      let categoryHTML = "";
    categoriesArray.forEach(category =>{
        tmpHTML = `
        <option value="${category.idCategory}">${category.categoryName.charAt(0).toUpperCase()+category.categoryName.slice(1)}</option>
        `
        categoryHTML += tmpHTML;
        document.getElementById("input-category").innerHTML = categoryHTML;
    })
    
  })
  .catch(error => console.error('Error:', error));

let userLogged = window.sessionStorage.getItem("userLogged");
let tokenJSON = JSON.parse(window.sessionStorage.getItem("token"));
if (tokenJSON != null && userLogged != null) {
    let token = tokenJSON.accessToken;
    fetch("http://localhost:8080/admin/",
        {
            method: 'POST',
            body: userLogged,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'ESIME ' + token
            }
        })
        .then(res => res.json())
        .then(isAdmin => {
            if (!isAdmin) {
                window.location.href = "../pages/login.html"
            }
        })
        .catch(error => console.error('Error:', error));
}else{
    window.location.href = "../pages/login.html"
}