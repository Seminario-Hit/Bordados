//Udate the value in the Sub-total column
function updateSubtotal(element) {

    //Get the price unit as a float
    let pu = element.getElementsByClassName("pu")[0].textContent;
    pu = pu.replace(/\s+/g, "");
    pu = pu.replace("$", "");
    pu = pu.replace(",", "");
    pu = pu.replace("MXN", "");
    pu = parseFloat(pu);

    //Get the quantity from the input
    let qty = element.getElementsByClassName("qty")[0].getElementsByTagName("input")[0].value;

    let subtot = pu * qty; //Get the subtotal

    //Change subtotal cell value
    let subtotal = element.getElementsByClassName("subtotal")[0];
    subtotal.textContent = `$${subtot.toLocaleString()}`;

    return subtot;

};//updateSubtotal

//Click action on the "Calculate prices" button
function calcAll() {

    let elements = document.getElementsByClassName("product-cart"); //Get an HTML with all products
    let totalElement = document.getElementById("total-value"); //Get total HTML element
    let total = 0;

    //Loop through all products
    for (let product of elements) {
        let subtotal = updateSubtotal(product);
        total += subtotal
    };//for

    //Imprime en el DOM el precio total
    totalElement.textContent = total.toLocaleString();

};//calcAll

// Add a listener to the table body to catch all the clicks on the delete buttons
function removeButton() {
    let body = document.getElementById("table-body"); // Get the body element

    body.addEventListener("click", function (e) {
        if (e.target && e.target.nodeName === "BUTTON") { // Verify that the click is from a button
            let tableRow = e.target.closest('.row.first-row.product-cart'); // Find the closest parent row with the class 'first-row product-cart'
            
            if (tableRow) {
                tableRow.remove(); // Remove the row

                let productId = tableRow.querySelector(".hide").textContent;

                let productosStorage = localStorage.getItem("productosCarrito");
                if (productosStorage != null) {
                    let productosCarrito = JSON.parse(productosStorage);
                    productosCarrito = productosCarrito.filter(producto => {
                        return producto.idProduct != productId;
                    });
                    let jsonProductos = JSON.stringify(productosCarrito);
                    localStorage.setItem("productosCarrito", jsonProductos);
                } else {
                    localStorage.setItem("productosCarrito", []); // Prevent a bug when deleting LocalStorage and then using the delete button
                }

                calcAll();
            }
        }
    }); // addEventListener
} // removeButton


//Creates a new row with the product name and price given by the client
function createProduct(productosCarrito) {

    productosCarrito.forEach(product => {
        //Creates the string for the new product in HTML
        newProductString = ` <div class="row first-row product-cart">
        <div class="col-12 col-md-3 d-flex justify-content-center">
            <img src="${product.productPicture}" alt="producto" class="img-cart">
        </div>
        <div class="col-12 col-md-9">
            <div class="row second-row">
                <div class="col-6 col-md-3 d-flex justify-content-center align-items-center product-cart-name">
                    ${product.nameProduct}
                </div>
                <div class="col-6 col-md-3 d-flex justify-content-center align-items-center pu">
                    $${product.priceProduct.toLocaleString()} MXN
                </div>
                <div class="col-6 col-md-1 d-flex justify-content-center align-items-center qty">
                    <label>
                        <input type="number" value="1" min="1" class="form-control input-qty" step="1">
                    </label>
                    <div class="hide">${product.idProduct}</div>
                </div>
                <div class="col-6 col-md-3 d-flex justify-content-center align-items-center">
                    <span class="show-mobile">Subtotal: </span> <span class="subtotal"> </span> MXN
                </div>
                <div class="col-12 col-md-2 d-flex justify-content-center align-items-center">
                    <button class="btn button-delete-cart">Borrar artículo</button>
                </div>
            </div>
        </div>
        <div class="col-12">
            <img src="../src/img/img-bg/fondo_productos_2560x325.png" alt="fondo" class="bg-cart">
        </div>
    </div>`
        //Add the new element to the HTML
        let body = document.getElementById("table-body");
        body.innerHTML += newProductString;



    });//forEach



};//createProduct

let productosStorage = localStorage.getItem("productosCarrito");
let productosCarrito = JSON.parse(productosStorage);
if (productosCarrito != null) {
    createProduct(productosCarrito);
}
//Actualiza la propiedad de quantity del producto afectado en el LocalStorage
function updateQuantity(element, newQuantity) {
    let productosStorage = localStorage.getItem("productosCarrito");
    if (productosStorage != null) {
        let idProduct = element.parentNode.parentNode.getElementsByClassName("hide")[0].textContent;
        let productosCarrito = JSON.parse(productosStorage);
        let prodIndex = productosCarrito.findIndex(prod => prod.idProduct == idProduct);
        productosCarrito[prodIndex].quantity = newQuantity;
        let newProductosStorage = JSON.stringify(productosCarrito);
        localStorage.setItem("productosCarrito", newProductosStorage);
    }
}

let body = document.getElementById("table-body");//Get the body element
body.addEventListener("change", function (e) {
    let tmpQty = e.target.value
    if (tmpQty >= 1) {
        e.target.value = Math.round(tmpQty)
        let newQuantity = Math.round(tmpQty)

        updateQuantity(e.target, newQuantity)

    } else {
        e.target.value = 1;
        let newQuantity = 1;

        updateQuantity(e.target, newQuantity)
    }
    calcAll();
});//addEventListener change inputs



////////

//Se agrega funcionalidades al botón de "Hacer Pedido"
let buyBtn = document.getElementsByClassName("button-buy-cart")[0];
buyBtn.addEventListener("click", (e) => {
    //Se extren variables del local storage
    let userLoggedStr = sessionStorage.getItem("userLogged");
    let userLogged = JSON.parse(userLoggedStr);
    let productsCartStr = localStorage.getItem("productosCarrito");
    let productsCart = JSON.parse(productsCartStr);
    let tokenJSON = JSON.parse(window.sessionStorage.getItem("token"));

    if (productsCart == null || productsCart.length === 0) {
        Swal.fire({
            icon: 'error',
            text: 'Favor de agregar productos al carrito',
        })
    } else if (tokenJSON == null || userLogged == null) {
        Swal.fire({
            icon: 'error',
            text: 'Favor de iniciar sesión',
        })
    } else {
        let token = tokenJSON.accessToken;



        //Se deshabilitan inputs
        let inputArray = document.getElementsByTagName("input")
        for (let input of inputArray) {
            input.disabled = true;
        }

        //Se deshabilitan botones
        let buttonArray = document.getElementsByTagName("button")
        for (let button of buttonArray) {
            button.disabled = true;
        }
        //Fetch para crear una nueva orden
        fetch("http://localhost:8080/iduser/", {
            method: "POST",
            body: userLoggedStr,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'ESIME ' + token
            }
        }).then(res => res.json())
            .then(idUser => {
                fetch("http://localhost:8080/orderProducts/", {
                    method: "POST",
                    body: JSON.stringify({ "user_idUser": idUser }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'ESIME ' + token
                    }
                })
                    .then(res => res.json())
                    .then(userOrder => {
                        let title = document.getElementById("title-cart");
                        let orderNumber = `Orden #${userOrder.idUserOrder}`;
                        title.innerText = orderNumber;
                        Swal.fire({
                            icon: 'success',
                            title: '¡Gracias por tu pedido!',
                            text: 'Tu orden fue generada con éxito'
                        })
                        productsCart.forEach((product) => {
                            let orderProductQuantity = {
                                "orderProductQuantityId": {
                                    "userOrder_idUserOrder": userOrder.idUserOrder,
                                    "product_idProduct": product.idProduct
                                },
                                "quantity": product.quantity
                            }
                            fetch("http://localhost:8080/orderProductQuantity/", {
                                method: "POST",
                                body: JSON.stringify(orderProductQuantity),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'ESIME ' + token
                                }
                            })
                        })
                        localStorage.removeItem("productosCarrito")
                    })
            })


            .catch(error => console.error('Error:', error));
    }//if null
});//addEventListener click buy button


removeButton(); //Se agrega evento para borrar artículo
calcAll();//Se calcula los subtotales y totales al cargar la página
