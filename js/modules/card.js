//modulo card, donde pondremos los recursos necesarios para agregar un item y crear una tarjeta dinamica

export class Item{
    nameProduct= "";
    priceProduct= "";
    descriptionProduct=0;
    productPicture="";
    idCategory=1

    constructor(name, price, description, img, category){
        this.nameProduct= name;
        this.priceProduct=price; 
        this.descriptionProduct=description;
        this.productPicture=img;
        this.idCategory=category;
    }
}

// Crea una nueva instancia de item y la agrega a un arreglo
export function addItem(array, name, price, description, img, category){

    let object = new Item( name, price, description, img, category);
    array.push(object);
}

//Crea una tarjeta dinamica solo de presentacion, con la imagen de muestra
export function card(product){

    let card =  `<div class="col-6 mt-4 mb-4 d-flex justify-content-center">
        <div class="card " style="width: 18rem;">
            <img src="${product.productPicture}" class="card-img-top" alt="...">
            <a href="./cart.html?id=${product.idProduct}" class="position-relative">
                <img src="../src/img/img-card/Carrito.png" class="position-absolute top-0 start-100 translate-middle img-cart" alt="...">
            </a>

            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <a href="./detail.html?id=${product.idProduct}">
                        <h5 class="card-title">${product.nameProduct}</h5>
                        </a>
                        <h6 class="card-title">${product.descriptionProduct}</h6>
                    </div>
                    <div class="col">
                        <h4 class="card-text">Precio:${product.priceProduct}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    return card;
}

export function cardIndex(product){

    let card =  `<div class="col-4 mt-4 mb-4 d-flex justify-content-center">
    <div class="card " style="width: 18rem;">
        <img src="${product.productPicture}" class="card-img-top" alt="...">
        <img src="../src/img/img-card/Carrito.png" class="position-absolute top-0 start-100 translate-middle img-cart"
            alt="...">
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <h5 class="card-title">${product.nameProduct}</h5>
                    <h6 class="card-title">${product.descriptionProduct}</h6>
                </div>
                <div class="col">
                    <h4 class="card-text">Precio:${product.priceProduct}</h4>
                </div>
            </div>
        </div>
    </div>
</div>`;

    return card;
}

//Muestra los productos alojados en el array en el id que se indique
export function showProducts(array, id){

    let html = '';
    const wrapper = document.getElementById(id);

    array.forEach((item) => {
        html += card(item);
    });

    wrapper.innerHTML = html;
}

export function showProductsIndex(array, id){

    let html = '';
    const wrapper = document.getElementById(id);

    array.forEach((item) => {
        html += cardIndex(item);
    });

    wrapper.innerHTML = html;
}

