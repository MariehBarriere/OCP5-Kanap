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
const btn_basket= document.getElementById("addToCart");

// on écoute le bouton et on empêche la réactualisation de la page au click
    btn_basket.addEventListener('click', (e) => {
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
        let basket = JSON.parse(localStorage.getItem("basket"));
        if (basket==null){basket=[]}
        else {let findProduct = basket.find(b =>b.idProduit==article.idProduit && b.chosenColor==article.chosenColor)
            if(findProduct !=undefined){
                let addQuantity=parseInt(article.chosenQuantity)+parseInt(findProduct.chosenQuantity) 
                findProduct.chosenQuantity=addQuantity      
            } else{article.chosenQuantity=chosenQuantity
                basket.push (article)
            }
        }
        localStorage.setItem ("basket", JSON.stringify(basket))
        window.alert("Produit ajouté au panier") 
        }
//message d'erreur si conditions non remplies
       else {
         window.alert("Veuillez choisir une couleur ainsi qu'une quantité") 
    } 
})
     

