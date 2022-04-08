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
    let img= document.getElementsByClassName("item__img")
    //img[0] pour sélectionner le premier élément. + remplace $[] car ne sont pas interprétés par éditeur
    img[0].innerHTML += "<img src=" +product.imageUrl + " alt=" +product.altTxt +"></img>"
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

//Sélection de l'utilisateur: par couleur, quantité de 1 à 100
const btn_addBasket= document.getElementById("addToCart");

// on écoute le bouton et on empêche la réactualisation de la page au click
    btn_addBasket.addEventListener('click', (e) => {
       e.preventDefault();
        console.log("yes");
// on choisit la couleur et la quantité
    let chosenColor= document.querySelector("#colors").value;
    let chosenQuantity = document.querySelector("#quantity").value;
        if(chosenColor && chosenQuantity > 0 && chosenQuantity <= 100){
        let article = {
        idProduit,
        chosenColor,
        chosenQuantity
        }
        //analyse: on regarde si il y a déjà un produit dans le panier
        let basket = JSON.parse(localStorage.getItem("basket"));
        //S'il n'y a pas d'élément dans le panier, on fera juste un tableau vide et donc ajout au panier
        if (basket==null){basket=[]; basket.push(article)}
        //S'il y a un produit, on le compare, on vérifie la couleur 
        else {let findProduct = basket.find(b =>b.idProduit==article.idProduit && b.chosenColor==article.chosenColor)
            //cherche s'il est présent***parsInt=transforme en chiffre
            if(findProduct !=undefined){
                let addQuantity=parseInt(article.chosenQuantity)+parseInt(findProduct.chosenQuantity) 
                findProduct.chosenQuantity=addQuantity   
            //on ajoute le produit dans le panier   
            } else {article.chosenQuantity = chosenQuantity
                basket.push(article)
            }
        }
        //On ajoute les produits dans le panier et on transforme le tableau au format JSON
        localStorage.setItem ("basket", JSON.stringify(basket))
        window.alert("Produit ajouté au panier") 
        }

    //message d'erreur si conditions non remplies
       else {
         window.alert("Veuillez choisir une couleur ainsi qu'une quantité") 
    } 
})
     //On teste sur le navigateur: Application, Local Storage, file, basket 
     //on ajoute un produit pour vérifier que le précédent n'est pas écrasé mais ajouté

