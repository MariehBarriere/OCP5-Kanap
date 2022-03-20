//Récupération du panier (ligne 56)
let basket = JSON.parse(localStorage.getItem("basket"));
main(basket)
if(basket.lenght == 0){
    alert("Votre panier est vide")
}
function main(basket){
    let cartItems=document.getElementById("cart__items");
    //Calcul du total en commençant à 0
    let total=0
    //On vérifie que le panier n'est pas vide
        if (basket && basket.length>0){
            for(product of basket){
                cartItems.innerHTML+=
                `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                   <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${article.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                     <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
             </article>`
            }
        }
}