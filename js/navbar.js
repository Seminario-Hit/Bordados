const navbarjs = document.getElementById('navbar');

navbarjs.innerHTML=`<div class="container-fluid">
<nav class="row navbar navbar-expand-lg justify-content-between navbar-config">

    <div class="col-lg-3 col-md-6 col-8 p-0"> <!--Logo-->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-label="Toggle navigation" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a href="../index.html" class="navbar-brand">
            <img class="img" src="../src/img/img-logo/LogoEsfera.png" alt="logo">
        </a>
    </div>        <!--Logo-->

    <div class="col-lg-6 col-md-3 col-sm-3 col-5 menu-hamburguer"> <!--contenido-->
        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav mr-auto d-flex justify-content-around" style="width: 100%;">
                <li class="nav-item active">
                    <a class="nav-link active" href="">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class ="nav-link" href="">Producto</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">Contacto</a>
                </li>
            </ul>
        </div> 
    </div> <!--contenido-->

    <div class="col-lg-3 col-md-3 col-4 p-0 d-flex justify-content-around align-items-center">
        <button class="btn-icon hide-admin"> <!--Boton para agregar productos-->
            <a href="../pages/add-new-prodct.html">
                <img class="img-icon" src="" alt="Imagen para agregar productos">
            </a>
        </button>  <!--Boton para agregar productos-->

        <div class="dropdown">
            <button class="btn btn-icon dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img class="img-icon" src="user.png" alt="">
            </button>
            
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Registrarse</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Iniciar sesión</a></li>
            </ul>
        </div> <!--Boton para Login-->
        
        <button class="btn-icon"> <!--Boton para Carrito-->
            <a href="./cart.html">
                <img class="img-icon" src="Carro.png" alt="imagen de carrito">
            </a>
        </button> <!--Boton para Carrito-->
        
        <button class="btn-icon hide-user" id="btn-logOut"> <!--Boton para Cerrar sesion-->
            <a href="#">
                <img class="img-icon" src="" alt="Imagen de deslogeo">
            </a>
        </button> <!--Boton para Cerrar sesion-->
    </div>
</nav>
</div>`;