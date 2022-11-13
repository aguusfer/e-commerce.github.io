function setearEnLocalStorage(){
    let apellido = document.getElementById('apellido').value;
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('emailPerfil').value;

    //seteamos elementos que sabemos que no estaran vacios
    localStorage.setItem('apellido', apellido);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('email', email);

    //setear elementos no obligatorios pero que se completaron
    let nombre2 = document.getElementById('segundoNombre').value;
    if(nombre2 != ''){
        localStorage.setItem('nombre2', nombre2);
    }else{
        localStorage.setItem('nombre2', '');
    }
    let apellido2 = document.getElementById('segundoApellido').value;
    if(apellido2 != ''){
        localStorage.setItem('apellido2', apellido2);
    }else{
        localStorage.setItem('apellido2', '');
    }
    let telefono = document.getElementById('telefono').value;
    if(telefono != ''){
        localStorage.setItem('telefono', telefono);
    }else{
        localStorage.setItem('telefono', '');
    }
}

function rellenarCampos(nombre, nombre2, apellido, apellido2, telefono){
    if(nombre != null){
        document.getElementById('nombre').value = nombre;
    }
    if(nombre2!= null && nombre2!=''){
        document.getElementById('segundoNombre').value = nombre2;
    }
    if(apellido!= null){
        document.getElementById('apellido').value = apellido;
    }
    if(apellido2!= null && apellido2!=''){
        document.getElementById('segundoApellido').value = apellido2;
    }
    if(telefono!= null && telefono!=''){
        document.getElementById('telefono').value = telefono;
    }
}

// ***********VALIDACIONES***********

(function () {
    'use strict'
  
    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else{
            // CADA VEZ QUE GUARDE LOS CAMBIOS
            setearEnLocalStorage();
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

// ********* FIN VALIDACIONES *********

document.addEventListener('DOMContentLoaded', ()=> {

    let user = localStorage.getItem('email');
    let apellido = localStorage.getItem('apellido');
    let apellido2 = localStorage.getItem('apellido2');
    let nombre = localStorage.getItem('nombre');
    let nombre2 = localStorage.getItem('nombre2');
    let telefono = localStorage.getItem('telefono');

    //Si seteamos el usuario en el localStorage puedo navegar
    if(user === null) {
        alert('Para navegar por nuestro sitio debes iniciar sesión');
        //redirigimos al login
        window.location.href="login.html";
    }else {
        //coloco el valor del email
        document.getElementById('emailPerfil').value = user;
        rellenarCampos(nombre, nombre2, apellido, apellido2, telefono);
    }

})