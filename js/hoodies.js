const products = document.getElementById('product');
const url= "http://localhost:8080/products/category/1";

fetch(url)
    .then(response => {
        if(response.ok)
        {
            return response.json();
        }
        throw new Error('Error de la solicitud');
    })
    .then(response => {
        // Hacemos algo con los datos obtenidos
        console.log(response);
        let array = response;
        console.log(array[0].descriptionProduct);
        const tarjeta = document.createElement("div");
        tarjeta.innerHTML = `<div class="col-6 mt-4 d-flex justify-content-center">
                <div class="card " style="width: 18rem;">
                    <img src="${array[0].productPicture}" class="card-img-top" alt="...">
                    <img src="../src/img/img-card/Carrito.png" class="position-absolute top-0 start-100 translate-middle"
                        alt="...">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h6 class="card-title">${array[0].nameProduct}</h6>
                            </div>
                            <div class="col">
                                <h4 class="card-text">Precio:${array[0].priceProduct}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            products.append(tarjeta);
    })
    .catch(error => {
        // Capturamos cualquier error ocurrido durante la solicitud
        console.error('Error:', error);
    });