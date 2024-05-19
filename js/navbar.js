const navbarjs = document.getElementById('navbar');

navbarjs.innerHTML=`<div class="container-fluid navbar-config">
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <div class="col-lg-3 col-md-6 col-8 p-0">
        <!--Logo-->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a href="../index.html" class="navbar-brand">
            <img class="img" src="../src/img/img-logo/LogoEsfera.png" alt="logo" >
        </a>
    </div> <!--Logo-->

    <div class="col-lg-6 col-md-3 col-sm-3 col-5 menu-hamburguer">
        <!--contenido-->
        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav d-flex justify-content-around" style="width: 100%;">
                <li class="nav-item">
                    <a class="nav-link active" href="../index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../pages/hoodies.html">Productos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../pages/contact.html">Contacto</a>
                </li>
            </ul>
        </div>
    </div> <!--contenido-->

    <div class="col-lg-3 col-md-3 col-4 p-0 d-flex justify-content-around align-items-center">
        <button class="btn-icon hide-admin">
            <!--Boton para agregar productos-->
            <a href="../pages/add_new_product.html">
                <img class="img-icon" src="../src/img/img-icons/Nuevo_producto.jpg" alt="Imagen para agregar productos">
            </a>
        </button> <!--Boton para agregar productos-->

        <div class="dropdown">
            <button class="btn btn-icon dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img class="img-icon-login" src="../src/img/img-icons/login.svg" alt="">
            </button>
            
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="../pages/register.html">Registrarse</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="../pages/login.html">Iniciar sesión</a></li>
            </ul>
        </div> <!--Boton para Login-->
        
        <button class="btn-icon">
            <!--Boton para Carrito-->
            <a href="../pages/cart.html">
                <img class="img-icon-cart hide-cart" src="../src/img/img-icons/cart.svg" alt="imagen de carrito">
            </a>
        </button> <!--Boton para Carrito-->
        
        <button class="btn-icon hide-user" id="btn-logOut">
            <!--Boton para Cerrar sesion-->
            <a href="#">
                <img class="img-icon" src="../src/img/img-icons/LogOut.jpg" alt="Imagen de deslogeo">
            </a>
        </button> <!--Boton para Cerrar sesion-->
    </div>
  </div>
</nav>
</div>`;


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
            document.getElementsByClassName("hide-user")[0].classList.remove("hide-user");
            if (isAdmin) {
                document.getElementsByClassName("hide-admin")[0].classList.remove("hide-admin");
            }
        })
        .catch(error => console.error('Error:', error));
}

let btnLogout = document.getElementById("btn-logOut");
btnLogout.addEventListener("click",(e)=>{
    sessionStorage.removeItem("userLogged");
    sessionStorage.removeItem("token");
    location.reload();
})