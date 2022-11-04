let urlCarrito = CART_INFO_URL + '25801' + EXT_TYPE;
let arrayCarrito = [];

function actualizarSubTotal(i, cantidad, subtotal){
    let array =JSON.parse(localStorage.getItem('carrito'));
    let cantidadNueva = parseInt(cantidad.value);
    let precio = parseInt(array[i].unitCost);
    let moneda = array[i].currency;
    let total = cantidadNueva*precio;
    let agregar;
    if(cantidadNueva >=0){
        agregar = moneda + ' ' + total;
        subtotal.innerHTML = agregar;
    }else {
        cantidad.value = 0;
        subtotal.innerHTML = 'USD ' + 0;
        alert('Ingresa una cantidad mayor que 0 por favor');
    }
    modificarSubtotal();
    modificarCostoEnvio();
}

function mostrarEnCarrito(){
    let compras = JSON.parse(localStorage.getItem('carrito'));
    let contenidoParaAgregar = '';
    let nombre;
    let precio;
    let moneda;
    let costo;
    let imagen;
    let cantidad;
    let productosAgregados = [];

    for (let i=0; i<compras.length; i++){
        nombre = compras[i].name;
        precio = compras[i].unitCost;
        moneda = compras[i].currency;
        costo = moneda + ' ' + precio;
        imagen = compras[i].image;
        cantidad = compras[i].count;
        productosAgregados.push(compras[i].id);

        let idCantidad = 'cantidad' + i;
        let idSubtotal = 'subtotal' + i;
        console.log(idCantidad);

        contenidoParaAgregar += `
        <tr>
          <td><img src="${imagen}" width="150" style="padding-left: 10%;"></td>
          <td>${nombre}</td>
          <td id="precio">${costo}</td>
          <td><input class="form-control" id="${idCantidad}" type="number" value="${cantidad}" placeholder="cant" style="width: 80px;" onchange="actualizarSubTotal(${i}, ${idCantidad}, ${idSubtotal})"></td>
          <td scope="row" class="subtotales" id="${idSubtotal}">${costo}</td>
        </tr>
        `;
    }
    modificarSubtotal();
    localStorage.setItem('productosAgregadosAlCarrito', productosAgregados);
    document.getElementById('carrito').innerHTML = contenidoParaAgregar;
};

function modificarCostoEnvio(){
    let tipoDeEnvio = localStorage.getItem('tipoDeEnvio');
    let costoEnvio = 0 ;
    let subtotal = localStorage.getItem('subtotal');
    if(tipoDeEnvio === 'premium'){
        costoEnvio = Math.round(subtotal*0.15);
        console.log(subtotal);
    }else if(tipoDeEnvio ==='express'){
        costoEnvio =Math.round(subtotal*0.07);
    }else{ // tipoDeEnvio = standard
        costoEnvio = Math.round(subtotal*0.05);
    }
    localStorage.setItem('costoEnvio', costoEnvio);
    modificarTotal();
    document.getElementById('costo-envio').innerHTML = 'USD' + ' ' + costoEnvio;
}

function modificarTotal(){
    let total = parseInt(localStorage.getItem('costoEnvio')) + parseInt(localStorage.getItem('subtotal'));
    document.getElementById('costo-total').innerHTML = 'USD ' + total;
}

function modificarSubtotal(){
    let moneda;
    let subtotalAux;
    let subtotalFinal = 0;
    let subtotales = document.getElementsByClassName('subtotales');
    // console.log(subtotales[0].textContent);
    for(let i=0; i<subtotales.length; i++){
        moneda = subtotales[i].textContent.substring(0, 3);
        subtotalAux = parseFloat(subtotales[i].textContent.substring(4, undefined));
        console.log(subtotalAux);
       if(moneda === 'UYU'){
        subtotalAux = subtotalAux/40;
        moneda = 'USD';
       }
       subtotalFinal+=subtotalAux;
    }
    localStorage.setItem('subtotal', subtotalFinal);
    modificarCostoEnvio();
    document.getElementById('costo-subtotal').innerHTML = moneda + ' ' + subtotalFinal;
};

// function cartelParaFormaDePago(){
//     //si alguna de las 2 paso la validacion
//     //entonces estan bien la forma de pago
//     if((document.getElementById('transferencia').checked && document.getElementById('numCuenta').checkValidity()) || (document.getElementById('credito').checked && document.getElementById('codigoSeg').checkValidity() && document.getElementById('vencimiento').checkValidity() &&  document.getElementById('numTarjeta').checkValidity())){
//         document.getElementById('mensajeFormaDePago').innerHTML = '';
//     }else{
//         document.getElementById('mensajeFormaDePago').innerHTML = 'Debes seleccionar una forma de pago';
//     }
// }

document.addEventListener('DOMContentLoaded', ()=>{

    (function () {
        'use strict'
      
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')
      
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                //añado cartel para forma de pago
                // cartelParaFormaDePago();
                event.preventDefault()
                event.stopPropagation()
              }else{
                alert('Ha comprado con éxito!');
                // swal("Good job!", "You clicked the button!", "success")
                // let agregar= `<div class="alert alert-success d-flex align-items-center" role="alert">
                //                 <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                //                 <div>
                //                     An example success alert with an icon
                //                 </div>
                //             </div>`
                // document.getElementById
              }
      
              form.classList.add('was-validated')
            }, false)
          })
      })()
    

    getJSONData(urlCarrito).then(function(resultObj){
        if (resultObj.status === 'ok') {
            let carrito = resultObj.data;
            arrayCarrito = carrito.articles;
            //si todavia no agregamos nada al carrito
            if(localStorage.getItem('carrito')==null){
                localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
            }
            localStorage.removeItem('productosAgregadosAlCarrito');
            mostrarEnCarrito();
            modificarSubtotal();
        }
    })
    //cada vez que el documento se cargue, calculamos el costo de envio con el tipo premium
    localStorage.setItem('tipoDeEnvio', 'premium');
    modificarCostoEnvio();
    modificarTotal();

    //si apretamos opcion premium
    document.getElementById('premium').addEventListener('click', ()=>{
        localStorage.setItem('tipoDeEnvio', 'premium');
        modificarCostoEnvio();
    });

    //si apretamos opcion Express
    document.getElementById('express').addEventListener('click', ()=>{
        localStorage.setItem('tipoDeEnvio', 'express');
        modificarCostoEnvio();
    });

    //si apretamos opcion standard
    document.getElementById('standard').addEventListener('click', ()=>{
        localStorage.setItem('tipoDeEnvio', 'standard');
        modificarCostoEnvio();
    });

    //tenemos checkeada la opcion de tarjeta de credito como prederteminada
    //desahibilitamos para realizar transferencia
    if(document.getElementById('credito').checked){
        document.getElementById('numCuenta').disabled = true;
    };

    //al seleccionar tarjeta de crédito
    //se deshabilita para llenar trasferencia bancaria
    document.getElementById('credito').addEventListener('click', ()=>{
        document.getElementById('numCuenta').value = '';

        document.getElementById('numCuenta').disabled = true;
        
        //habilito nuevamente para completar campos de tarjeta de credito
        document.getElementById('codigoSeg').disabled = false;
        document.getElementById('vencimiento').disabled = false;
        document.getElementById('numTarjeta').disabled = false;
    });

    //si apretamos en trasferencia bancaria
    //se deshabilita para llenar tarjeta de credito
    document.getElementById('transferencia').addEventListener('click', ()=>{
        document.getElementById('codigoSeg').value = '';
        document.getElementById('vencimiento').value = '';
        document.getElementById('numTarjeta').value = '';

        document.getElementById('codigoSeg').disabled = true;
        document.getElementById('vencimiento').disabled = true;
        document.getElementById('numTarjeta').disabled = true;
        
        //habilito nuevamente para completar la transferencia
        document.getElementById('numCuenta').disabled = false;
    })
});

