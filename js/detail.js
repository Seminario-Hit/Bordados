import { addCart} from './modules/addCart.js';

function crearTarjeta(product){
    let ancla = document.getElementById("product-container");
    let cardProduct = `<section class="container mt-5">
    <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center">
            <img src="${product.productPicture}" alt="patineta" class="img-skate">
        </div>
    </div>
</section>

<section class="container">
    <div class="row">
        <div class="col-12 d-flex flex-column justify-content-center align-items-center">
            <h2 class="skate-name">${product.nameProduct}</h2>
            <div class="skate-desc">${product.descriptionProduct}</div>
            <div class="skate-price">$${product.priceProduct.toLocaleString()}</div>
        </div>
    </div>
</section>

<section class="container">
    <div class="row">
        <div class="col-12 d-flex justify-content-center">
            <div class="shop text-center pstn-btn-cart">
                <a href="./cart.html?id=${product.idProduct}">
                    <img src="../src/img/img-card/Carrito.png" class="btn-cart img-cart" id="img-cart" alt="cart">
                </a>
            </div>
        </div>
    </div>
</section>
`
    ancla.innerHTML = cardProduct
}

let urlWindow = window.location.search;
const urlParams = new URLSearchParams(urlWindow);
const idProduct = urlParams.get("id");

fetch(`http://localhost:8080/products/${idProduct}`)
  .then(res => res.json())
  .then(product => {
    crearTarjeta(product);
    addCart();
  })
  .catch(error => console.error('Error:', error));



