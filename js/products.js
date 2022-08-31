let autos = []; 
let autosArray = [];
let AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function listaAutos(){

    let htmlContentToAppend = "";
    for(let i = 0; i < autosArray.length; i++){
        let auto = autosArray[i];

            htmlContentToAppend += `
                <div class="row">
                    <div class="col-3">
                        <img src="${auto.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${auto.name} - ${auto.currency} ${auto.cost} </h4>
                            <small class="text-muted">${auto.soldCount} vendidos</small>
                        </div>
                    <p class="mb-1">${auto.description}</p>
                    </div>
                </div>
            `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(AUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            autos = resultObj.data;
            autosArray = autos.products;
            listaAutos();
        }
    });
});