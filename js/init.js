const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function cerrarSesion(){
  //pido confirmacion al usuario
  let confirmacion = confirm('¿Estás seguro de que quieres cerrar sesión?');

  if(confirmacion === true) {
    localStorage.removeItem('email');
    localStorage.removeItem('carrito');
    localStorage.removeItem('catId');
    localStorage.removeItem('subtotal');
    localStorage.removeItem('id');
    localStorage.removeItem('costoEnvio');
    localStorage.removeItem('productosAgregadosAlCarrito');
    localStorage.removeItem('tipoDeEnvio');
    localStorage.removeItem('nombre');
    localStorage.removeItem('nombre2');
    localStorage.removeItem('apellido');
    localStorage.removeItem('apellido2');
    localStorage.removeItem('telefono');
    window.location.href="login.html";
    alert('Debes ingresar nuevamente para navegar en el sitio');
  }else {
    alert('Tu sesión no se ha cerrado, puedes seguir navegando');
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  
  let user = localStorage.getItem('email');

  //Se agrega al usuario en la barra
  //document.getElementById('user').innerHTML = `Hola ${user}`;
  document.getElementById('user').innerHTML = `<div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    ${user}
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li class="dropdown-item" style="cursor: pointer" onclick="cerrarSesion()">Cerrar sesión</li>
  </ul>
</div>`;
  // const imageUser = document.createElement('img');
  // imageUser.src = 'https://raw.githubusercontent.com/aguusfer/e-commerce.github.io/main/img/img_perfil.png';
  // //estilos de la imagen para que entre en la barra
  // imageUser.style.width = '55px';
  // imageUser.style.paddingLeft = '10%';
  // document.querySelector('#user').appendChild(imageUser);
})