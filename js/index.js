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
        //redirigimos al login
        window.location.href="login.html";
        alert('Para navegar por nuestro sitio debes iniciar sesión');
    }else {
        //cargo categorías
        loadCategories();
        //Se agrega al usuario en la barra
        document.getElementById('user').innerHTML = `Hola ${user}`;
        const imageUser = document.createElement('img');
        imageUser.src = '/img/img_perfil.png';
        //estilos de la imagen para que entre en la barra
        imageUser.style.width = '55px';
        imageUser.style.paddingLeft = '10%';
        document.querySelector('#user').appendChild(imageUser);
    }

    //Boton para cerrar sesión
    document.getElementById("cerrar").addEventListener('click', ()=> {
        //pido confirmacion al usuario
        let confirmacion = confirm('¿Estás seguro de que quieres cerrar sesión?');

        if(confirmacion === true) {
            localStorage.removeItem('email');
            window.location.href="login.html";
            alert('Debes ingresar nuevamente para navegar en el sitio');
        }else {
            alert('Tu sesión no se ha cerrado, puedes seguir navegando');
        }
    })
})