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
    if(user == null) {
        alert('Para navegar por nuestro sitio debes iniciar sesión');
        location.href="login.html";
    }else {
        loadCategories();
        document.getElementById('user').innerHTML += user;
    }

    document.getElementById("cerrar").addEventListener('click', ()=> {
        let confirmacion = confirm('¿Estás seguro de que quieres cerrar sesión?');
        if(confirmacion === true) {
            alert('Debes ingresar nuevamente para navegar en el sitio');
            localStorage.removeItem('email');
            window.location.href="login.html";
        }else {
            alert('Tu sesión no se ha cerrado, puedes seguir navegando');
        }
    })
})