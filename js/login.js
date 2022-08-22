function ingresar () {

    let email = document.getElementById('emailId').value;
    let password = document.getElementById('passwordId').value;
    //array con los campos para ingresar email y contraseña
    let error = document.getElementsByClassName('form-control');

    if(email==="" && password===""){
        alert('Debe ingresar email y contraseña');

        //recorremos ambos campos para agregar la clase 'error' y sombrear en rojo los campos a completar
        for(let i=0; i<error.length; i++){
            error[i].classList.add('error');
        }
    
    }

    //Si solo 1 de los campos no se completó
    else if(email==="") {

        //Solo cambio clase a la barra de email
        error[0].classList.add('error');
        alert('Debe ingresar su email');
        //Si completó el campo contraseña y había dado error, le cambio la clase para que no se vea en rojo
        if(error[1].className=='form-control error') {
            error[1].classList.remove('error');
        }
        
    } else if (password==="") {

        //Solo cambio clase a la barra password
        alert('Debe ingresar su contraseña');
        error[1].classList.add('error');
        //Si completó el email y anteriormente había dado error, saco el borde rojo
        if(error[0].className==='form-control error') {
            error[0].classList.remove('error');
        }
    
    //Ambos campos completados---> dejo acceder
    } else {
        
        //guardo el email en el localStorage
        //se utilizará para acceder en el index
        localStorage.setItem("email", email);
        //Redireccionamos a la página principal
        window.location.href = "index.html";
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('ingresar').addEventListener("click", ()=>{
        ingresar();
    })
})