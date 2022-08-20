function ingresar () {

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let form = document.getElementsByClassName('form-control');

    if(email=="") {
        alert('Debe ingresar su email');
        for(let i=0; i<form.length; i++) {
            form[i].className = 'error';
        }
    } else if (password=="") {
        alert('Debe ingresar su contraseña');
        for(let i=0; i<form.length; i++) {
            form[i].className = 'error';
        }
    } else {
        localStorage.setItem("email", email);
        window.location.href = "index.html";
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('ingresar').addEventListener("click", ()=>{
        ingresar();
    })
})