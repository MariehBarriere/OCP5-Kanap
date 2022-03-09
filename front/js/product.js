//Récupération l'URL des produits 
const idProduit = new URL(location.href).searchParams.get("id");

window.onload = getItem(idProduit)

function getItem (idProduit){
    fetch("http://localhost:3000/api/products/" + idProduit)
    .then(response => response.json())
        .then(response => {
            insertProduct(response);
        })

    .catch(function(error){
        alert("erreur de chargement du produit")
    })
}

function insertProduct(product){
    let img= document.getElementsByClassName("item__img")
    img[0].innerHTML += "<img src=" +product.imageUrl + " alt=" +product.altTxt +"></img>"
    let title = document.getElementById("title")
    title.innerHTML += product.name
    let description = document.getElementById("description")
    description.innerHTML += product.description
    let colors = document.getElementById("colors")
    for(let e=0; product.colors.length>e;e++){
        colors.innerHTML += '<option value="'+product.colors[e]+'">'+product.colors[e]+'</option>'
    }
} 



