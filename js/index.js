function loadCategories(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
};

document.addEventListener('DOMContentLoaded', ()=> {

    let user = localStorage.getItem('email');

    //Si seteamos el usuario en el localStorage se cargan las categorías
    if(user === null) {
        alert('Para navegar por nuestro sitio debes iniciar sesión');
        //redirigimos al login
        window.location.href="login.html";
    }else {
        //cargo categorías
        loadCategories();
    }
})