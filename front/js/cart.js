//Récupération du panier (ligne 56)
let basket = JSON.parse(localStorage.getItem("basket"));
main(basket)
if(basket.length == 0){
    alert("Votre panier est vide")
}
//function main va générer le panier
function main(basket){
    let cartItems=document.getElementById("cart__items");
   
    //On vérifie que le panier n'est pas vide
        if (basket && basket.length>0){
           //Calcul du total en commençant à 0
          let total=0;
          let nbart = 0;
            for(product of basket){
              let article
              fetch("http://localhost:3000/api/products/" + product.idProduit) //then et catch pour traiter la réponse
          
  
    .then(response => response.json())
    //on retourne la réponse qui a été transformée
        .then(response => {
            article = response
            cartItems.innerHTML +=
            `<article class="cart__item" data-id="${product.idProduit}" data-color="${product.chosenColor}">
            <div class="cart__item__img">
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${article.name}</h2>
                <p>${product.chosenColor}</p>
                <p>${article.price}</p>
              </div>
              <div class="cart__item__content__settings">
               <div class="cart__item__content__settings__quantity">
                  <p>Qté : ${product.chosenQuantity}</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.chosenQuantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                 <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
         </article>`
  total += product.chosenQuantity*article.price
  let totalPrice=document.getElementById("totalPrice");
            totalPrice.innerHTML=total;
            nbart += parseInt(product.chosenQuantity);
  let totalQuantity=document.getElementById("totalQuantity");
            totalQuantity.innerHTML=nbart;
        })
    .catch(function(error){
        alert("erreur de chargement du produit")
    })
              
            }
            
        }
}

//Suppression d'article
const btnDelete = document.querySelectorAll(".deleteItem");
btnDelete.forEach(item => item.addEventListener("click",(e) =>{
  let deleteItem = e.target;
}
))

//Modification de quantité d'articles: sur chaque btn itemQuantity, cible l'article le plus proche
const btnModifyQuantity = document.querySelectorAll(".itemQuantity");
btnModifyQuantity.forEach((btn) => {
  const closeArticle = btn.closest("article")
  const id=closeArticle
})

//Récupération du prix total et de la quantité


//Formulaire identification

