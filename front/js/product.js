//Récupération de l'URL des produits /newURL: sous forme de tableau.Searchparams=permet d'accéder aux paramètres
const idProduit = new URL(location.href).searchParams.get("id");

window.onload = getItem(idProduit)

//on crée la fonction avec fetch pour l'interpréter on récupère l'URL + l'idProduit
function getItem (idProduit){
    fetch("http://localhost:3000/api/products/" + idProduit) //then et catch pour traiter la réponse

    //on veut récupérer la réponse en json
    .then(response => response.json())
    //on retourne la réponse qui a été transformée
        .then(response => {
            insertProduct(response)
        })
    .catch(function(error){
        alert("erreur de chargement du produit")
    })
}

//on intègre les détails dans la page du produit
function insertProduct(product){
    let img = document.getElementsByClassName("item__img")
    //img[0] pour sélectionner le premier élément. + remplace $[] car ne sont pas interprétés par éditeur
    img[0].innerHTML += "<img src=" + product.imageUrl + "alt=" + product.altTxt + "></img>"
    let title = document.getElementById("title")
    title.innerHTML += product.name
    let price = document.getElementById("price")
    price.innerHTML += product.price
    let description = document.getElementById("description")
    description.innerHTML += product.description
    let colors = document.getElementById("colors") 
    //boucle for pour afficher les options de couleur
    for(let e = 0; product.colors.length > e ; e ++){
        colors.innerHTML += '<option value = "'+ product.colors[e]+'" >'+ product.colors[e] + ' </option>'
    }
} 



