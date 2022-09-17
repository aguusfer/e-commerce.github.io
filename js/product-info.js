let id = localStorage.getItem('id');
URL = PRODUCT_INFO_URL + id + EXT_TYPE;
console.log(URL);
URLCOMMENTS = PRODUCT_INFO_COMMENTS_URL + id + EXT_TYPE;

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
    <h1>Categoría ${producto.category}</h1>
  </div>
    <div class="text-center p-4">
      <h3>${producto.name}</h3>
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

    for (let i=0; i<comentarios.length; i++){
        score = comentarios[i].score;
        description = comentarios[i].description;
        user = comentarios[i].user;
        date = comentarios[i].dateTime;
        comentariosParaAgregar += `
        <div class="card-body">
          <div class="d-flex flex-start">
            <div class="w-100">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-primary fw-bold mb-0">
                  ${user}  -  ${date} <br><br>
                  <span class="text-dark ms-2">${description}</span>
                </h6>
                
              </div>
              <div class="d-flex justify-content-between align-items-center">   
                <div id="estrellas" class="d-flex flex-row">
                    ${ponerEstrellas(score)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr/>`;
    }
    document.getElementById('comentariosAgregar').innerHTML = comentariosParaAgregar;
}

document.addEventListener("DOMContentLoaded", function(){

    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            //json con la info del producto
            let productData = resultObj.data;
            //arreglo con todos los productos de la categoría
            mostrarProducto(productData);
        }
    });
    getJSONData(URLCOMMENTS).then(function(resultObj){
        if (resultObj.status === "ok"){
            //json con la info del producto
            let commentsData = resultObj.data;
            //arreglo con todos los productos de la categoría
            mostrarComentarios(commentsData);
        }
    });
});