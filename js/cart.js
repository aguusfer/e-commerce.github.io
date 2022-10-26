let urlCarrito = CART_INFO_URL + '25801' + EXT_TYPE;
let arrayCarrito = [];

function actualizarSubTotal(i, cantidad, subtotal){
    let array =JSON.parse(localStorage.getItem('carrito'));
    let cantidadNueva = parseInt(cantidad.value);
    let precio = parseInt(array[i].unitCost);
    let moneda = array[i].currency;
    let total = cantidadNueva*precio;
    if(cantidadNueva >=0){
        subtotal.innerHTML = moneda + ' ' + total;
    }else {
        cantidad.value = 0;
        subtotal.innerHTML = 0;
        alert('Ingresa una cantidad mayor que 0 por favor');
    }
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
          <td scope="row" id="${idSubtotal}">${costo}</td>
        </tr>
        `;
    }
    
    localStorage.setItem('productosAgregadosAlCarrito', productosAgregados);
    document.getElementById('carrito').innerHTML = contenidoParaAgregar;
    
};

document.addEventListener('DOMContentLoaded', ()=>{
    

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
        }
      })

})