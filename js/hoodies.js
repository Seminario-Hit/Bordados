// import config from './config.js';

// const url = config.apiUrl + "/products/category/1";

// const products = document.getElementById('product');

// fetch(url)
//     .then(response => {
//         if(response.ok)
//         {
//             return response.json();
//         }
//         throw new Error('Error de la solicitud');
//     })
//     .then(response => {
//         // Hacemos algo con los datos obtenidos
//         console.log(response);
//         let array = response;
//         let tarjetas = "";
//         array.forEach(element => {
            
//             console.log(element.nameProduct);
//             tarjetas += `<div class="col-6 mt-4 mb-4 d-flex justify-content-center">
//             <div class="card " style="width: 18rem;">
//                 <img src="${element.productPicture}" class="card-img-top" alt="...">
//                 <img src="../src/img/img-card/Carrito.png" class="position-absolute top-0 start-100 translate-middle"
//                     alt="...">
//                 <div class="card-body">
//                     <div class="row">
//                         <div class="col">
//                             <h6 class="card-title">${element.nameProduct}</h6>
//                         </div>
//                         <div class="col">
//                             <h4 class="card-text">Precio:${element.priceProduct}</h4>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>`;
//         });
//         products.innerHTML = tarjetas;
//     })
//     .catch(error => {
//         // Capturamos cualquier error ocurrido durante la solicitud
//         console.error('Error:', error);
//     });

 //importar funciones del modulo card
import { card, showProducts} from './modules/card.js';
import { addCart} from './modules/addCart.js';

fetch("http://localhost:8080/products/category/1")
  .then(res => res.json())
  .then(productsArray => {

    showProducts(productsArray, 'list-items');
    addCart();
  })
  .catch(error => console.error('Error:', error)); 