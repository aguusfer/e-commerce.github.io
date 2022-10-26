let id = localStorage.getItem('id');
URL = PRODUCT_INFO_URL + id + EXT_TYPE;
console.log(URL);
URLCOMMENTS = PRODUCT_INFO_COMMENTS_URL + id + EXT_TYPE;
let puntajeComentarioAgregar = '';
let commentsData= [];

// function agregarAlCarrito(producto){
//   let carrito = localStorage.getItem('carrito');
//   let idProduct = producto.id;
//   let nombre = producto.name;
//   let costo = producto.cost;
//   let moneda = producto.currency;
//   let imagen = producto.images[0];

//   let agregar = {
//     id: idProduct,
//     name: nombre,
//     count: 1,
//     unitCost: costo,
//     currency: moneda,
//     image: imagen
//   }
//   console.log(agregar);

//   let carritoNuevo = carrito.push(agregar);
//   console.log(carritoNuevo);
//   localStorage.setItem('carrito', carrito);
//   window.location = "cart.html";
// }

function moverARelacionado(idRelacionado){
  localStorage.setItem("id", idRelacionado);
  window.location = "product-info.html"
}

function mostrarRelacionados(producto){
  let relacionados = producto.relatedProducts;
  let relacionadosAgregar = '';
  let idRelacionado;
  for(i=0; i<relacionados.length; i++){
    idRelacionado = relacionados[i].id;
    relacionadosAgregar += `    
    <div class="col-md-3" onclick="moverARelacionado(${idRelacionado})" style="cursor: pointer">
        <div class="card p-1">
            <div class="d-flex justify-content-between align-items-center p-2">
                <div> 
                  <img src=${relacionados[i].image} class="row mt-2 g-4" height="150"/><br>
                  <span> ${relacionados[i].name}<span>
                </div>
            </div>
        </div>
    </div>`
  }
  document.getElementById('productos-relacionados').innerHTML = relacionadosAgregar;
}

function mostrarProducto(producto){
    let imagenes=``;
    let contenidoParaAgregar=``;
    for(let i=0; i<producto.images.length; i++) {
        imagenes +=
    `<div class="col-md-3">
        <div class="card p-1">
            <div class="d-flex justify-content-between align-items-center p-2">
                <div> <img src=${producto.images[i]} height="150"/> 
                </div>
            </div>
        </div>
    </div>`;
    }
    contenidoParaAgregar = 
    `<div class="text-center p-4">
    <h1>${producto.name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <button type="button" class="btn btn-success">Comprar</button></h1>
  </div>
    <div class="d-flex justify-content-center mt-3"> <span class="text text-center"><b>Descripción:</b> ${producto.description}</span> </div>
    <div class="d-flex justify-content-center mt-3"> <span class="text text-center"><b>Costo:</b> ${producto.cost} ${producto.currency}</span> </div>
    <div class="d-flex justify-content-center mt-3"> <span class="text text-center"><b>Cantidad vendida:</b> ${producto.soldCount}</span> </div>`

    document.getElementById('imagenesAgregar').innerHTML = imagenes;
    document.getElementById('product-info').innerHTML = contenidoParaAgregar;
}

function ponerEstrellas(score){
    //agregar estrellas
    let estrellas=``;
    for(let i=1; i<=score; i++) {
        estrellas += `<span class="fa fa-star checked"></span>`;
    }
    console.log(estrellas);
    return estrellas;
    
}

function mostrarComentarios(comentarios){
    let comentariosParaAgregar = '';
     let score;
     let description;
     let user;
     let date;
    console.log(comentarios.length);
    console.log(comentarios[comentarios.length-1]);
    console.log(comentarios[comentarios.length-1].score);
    console.log(comentarios[comentarios.length-1].description);
    console.log(comentarios[comentarios.length-1].user);
    console.log(comentarios[comentarios.length-1].date);

    for (let i=0; i<comentarios.length; i++){
        score = comentarios[i].score;
        description = comentarios[i].description;
        user = comentarios[i].user;
        date = comentarios[i].dateTime;
        // console.log(score);
        // console.log(description);
        // console.log(user);
        // console.log(date);
        comentariosParaAgregar += `
        <li class="list-group-item">
          <div>
            <h5 class="mb-1">${user}  -  ${date}</h5>
          </div>
        <p class="mb-1">${description}</p>
        <small>${ponerEstrellas(score)}</small>
      </li>`;
        // comentariosParaAgregar += `
        // <div class="card-body">
        //   <div class="d-flex flex-start">
        //     <div class="w-100">
        //       <div class="d-flex justify-content-between align-items-center mb-3">
        //         <h6 class="text-primary fw-bold mb-0">
        //           ${user}  -  ${date} <br><br>
        //           <span class="text-dark ms-2">${description}</span>
        //         </h6>
                
        //       </div>
        //       <div class="d-flex justify-content-between align-items-center">   
        //         <div class="d-flex flex-row">
        //             ${ponerEstrellas(score)}
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        // <hr/>`;
    }
    //console.log(comentariosParaAgregar);
    document.getElementById('comentariosAgregar').innerHTML = comentariosParaAgregar;
}

function agregarComentario(puntaje, contenido){
  let usuario = localStorage.getItem('email');
  console.log(usuario);
  let hoy = new Date;
  let idProduct = localStorage.getItem('id');
  let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() + ' ' +  hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  let comentario = {
    product: idProduct,
    score: puntaje,
    description: contenido,
    user: usuario,
    dateTime: fecha
  }
  console.log(comentario.product);
  console.log(comentario.dateTime);
  let nuevosComentarios = commentsData.push(comentario);
  console.log(commentsData.length);
  console.log(nuevosComentarios.length);
  // console.log(nuevosComentarios);
  // console.log(comentario);
  // console.log(commentsData);
  mostrarComentarios(commentsData);
}

document.addEventListener("DOMContentLoaded", function(){

    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            //json con la info del producto
            let productData = resultObj.data;
            //arreglo con todos los productos de la categoría
            mostrarProducto(productData);
            mostrarRelacionados(productData);
        }
    });
    getJSONData(URLCOMMENTS).then(function(resultObj){
        if (resultObj.status === "ok"){
            //json con la info del producto
            commentsData = resultObj.data;
            //arreglo con todos los productos de la categoría
            mostrarComentarios(commentsData);
        }
    });
    document.getElementById('borrar').addEventListener('click', ()=> {
      document.getElementById('textAreaExample').value = '';
    });
    //LEER PUNTAJE POR ESTRELLAS
    document.getElementById('radio1').addEventListener('click', ()=>{
      puntajeComentarioAgregar = document.getElementById('radio1').value;
    });
    document.getElementById('radio2').addEventListener('click', ()=>{
      puntajeComentarioAgregar =document.getElementById('radio2').value;
    });
    document.getElementById('radio3').addEventListener('click', ()=>{
      puntajeComentarioAgregar =document.getElementById('radio3').value;
    });
    document.getElementById('radio4').addEventListener('click', ()=>{
      puntajeComentarioAgregar =document.getElementById('radio4').value;
    });
    document.getElementById('radio5').addEventListener('click', ()=>{
      puntajeComentarioAgregar =document.getElementById('radio5').value;
    });
    document.getElementById('enviarComentario').addEventListener('click', ()=>{
      let contenido = document.getElementById('textAreaExample').value;
      if(puntajeComentarioAgregar != ''){
        agregarComentario(puntajeComentarioAgregar, contenido);
      }else{
        alert('Debes ingresar el puntaje');
      }
    })
});