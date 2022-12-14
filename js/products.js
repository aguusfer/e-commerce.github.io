let precioMin = undefined; 
let precioMax = undefined;
let productos = [];
let idCat = localStorage.getItem('catID');
//Obtenemos 101 en caso de autos, 102 si son juguetes, 103 muebles, 104 herramientas, hasta 109
let PRODUCTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/" + idCat + ".json";

function setProductID(id) {
    localStorage.setItem("id", id);
    window.location = "product-info.html"
}

function ordenarMenorAMayor(productosArray){
    let arrayRetornar = productosArray;
    arrayRetornar.sort(function(a, b) {
        //orden ascendente
        return a.cost - b.cost;
    });
    return arrayRetornar;
}

function ordenarMayorAMenor(productosArray){
    let arrayRetornar = productosArray;
    arrayRetornar.sort(function(a, b) {
        //orden descendente
        return b.cost - a.cost;
    });
    return arrayRetornar;
}

function ordenarPorRelevancia(productosArray){
    let arrayRetornar = productosArray;
    arrayRetornar.sort(function(a, b) {
        //orden descendente, desde el mas vendido al menos vendido
        return b.soldCount - a.soldCount;
    });
    return arrayRetornar;
}

function listaProductos(productosArray){

    let htmlContentToAppend = "";
    //Si la cantidad de productos es 0 => productos.length = 0 y no se ejecuta el for
    for(let i = 0; i < productosArray.length; i++){
        let product = productosArray[i];

        //verifico si cumple condicion de precioMin y precioMax
        //si se encuentra entre esos valores lo agrego
        //si precioMin o Max son vacíos, la evaluacion con el costo del producto va a dar false
        //y no es necesario evaluar el caso en que estén indefinidos
        if(!(product.cost<parseInt(precioMin)) && !(product.cost>parseInt(precioMax))) {
            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost} </h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                    <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        }
    }

    document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(){

    getJSONData(PRODUCTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            //json con la info de la categoría
            let catData = resultObj.data;
            //arreglo con todos los productos de la categoría
            productos = catData.products;
            listaProductos(productos);
            //Pegar nombre de la categoría debajo del título
            let nombreCategoria = catData.catName;
            document.getElementById('catName').innerHTML += nombreCategoria;
        }
    });

    document.getElementById('sortMenorPrecio').addEventListener('click', ()=>{
        listaProductos(ordenarMenorAMayor(productos));
    })

    document.getElementById('sortMayorPrecio').addEventListener('click', ()=>{
        listaProductos(ordenarMayorAMenor(productos));
    })

    document.getElementById('sortRelevancia').addEventListener('click', ()=>{
        listaProductos(ordenarPorRelevancia(productos));
    })

    document.getElementById('filtrarPrecio').addEventListener('click', ()=> {
        precioMin = document.getElementById('precioMin').value;
        precioMax = document.getElementById('precioMax').value;

        listaProductos(productos);
    })

    document.getElementById('limpiarFiltro').addEventListener('click', ()=> {
        precioMin = undefined;
        precioMax = undefined;
        document.getElementById('precioMin').value = '';
        document.getElementById('precioMax').value = '';
        listaProductos(productos);
    })


});