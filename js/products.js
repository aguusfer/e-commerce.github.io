let precioMin = undefined; 
let precioMax = undefined;
let productos = [];
let idCat = localStorage.getItem('catID');
//Obtenemos 101 en caso de autos, 102 si son juguetes, 103 muebles, 104 herramientas, hasta 109
let PRODUCTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/" + idCat + ".json";

function listaProductos(){

    let htmlContentToAppend = "";
    //Si la cantidad de productos es 0 => productos.length = 0 y no se ejecuta el for
    for(let i = 0; i < productos.length; i++){
        let product = productos[i];

        //verifico si cumple condicion de precioMin y precioMax
        //si se encuentra entre esos valores lo agrego
        if( ((precioMin == undefined) || ((precioMin != undefined) && (product.cost >= precioMin))) && ((precioMax == undefined) || ((precioMax != undefined) && (product.cost <= precioMax)))) {
            htmlContentToAppend += `
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
            listaProductos();
            //Pegar nombre de la categoría debajo del título
            let nombreCategoria = catData.catName;
            document.getElementById('catName').innerHTML += nombreCategoria;
        }
    });

    document.getElementById('filtrarPrecio').addEventListener('click', ()=> {
        precioMin = document.getElementById('precioMin').value;
        precioMax = document.getElementById('precioMax').value;

        if ((precioMin != undefined) && (precioMin != "") && (parseInt(precioMin)) >= 0){
            precioMin = parseInt(precioMin);
        }
        else{
            precioMin = undefined;
        }

        if ((precioMax != undefined) && (precioMax != "") && (parseInt(precioMax)) >= 0){
            precioMax = parseInt(precioMax);
        }
        else{
            precioMax = undefined;
        }

        listaProductos();
    })

    document.getElementById('limpiarFiltro').addEventListener('click', ()=> {
        precioMin = undefined;
        precioMax = undefined;
        document.getElementById('precioMin').value = '';
        document.getElementById('precioMax').value = '';
        listaProductos();
    })

});