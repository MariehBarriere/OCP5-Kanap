//Récupération du panier (ligne 56)
let basket = JSON.parse(localStorage.getItem("basket"));
main(basket);
if (basket.length == 0) {
  alert("Votre panier est vide");
}
//function main va générer le panier
function main(basket) {
  let cartItems = document.getElementById("cart__items");

  //On vérifie que le panier n'est pas vide
  if (basket && basket.length > 0) {
    //Calcul du total en commençant à 0
    let total = 0;
    let nbrart = 0; //nbrart=nombre d'articles
    for (product of basket) {
      //on initialise la variable
      let article;

      //on récupère les infos d'un seul produit dans product.js
      fetch("http://localhost:3000/api/products/" + product.idProduit)
        .then((response) => response.json())
        //on retourne la réponse qui a été transformée
        .then((response) => {
          article = response;
          cartItems.innerHTML += `<article class="cart__item" data-id="${product.idProduit}" data-color="${product.chosenColor}">
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
         </article>`;
          total += product.chosenQuantity * article.price;
          let totalPrice = document.getElementById("totalPrice");
          totalPrice.innerHTML = total;
          //parseInt permet de transformer en Int non string
          nbrart += parseInt(product.chosenQuantity);
          let totalQuantity = document.getElementById("totalQuantity");
          totalQuantity.innerHTML = nbrart;
        })
        .then(() => {deleteProduct();changeQuantity();})
        
        .catch(function (error) {
          console.log("Erreur de chargement du produit");
        });
    }
  }
}

//Suppression d'un article
function deleteProduct() {
  let btnDelete = document.getElementsByClassName("deleteItem");
  let btnDelete2 = document.querySelectorAll(".cart__item__content__settings__delete > .deleteItem" );
console.log(btnDelete2);
console.log(btnDelete);
  for (let b = 0; b < basket.length; b++) {
    console.log(btnDelete[0]);
    btnDelete[b].addEventListener('click', (e) => {
      e.preventDefault();
console.log(btnDelete[b]);
      //Sélection de l'id du produit et de sa couleur qui seront supprimés en cliquant dessus
      let idDelete = basket[b].idProduit;
      let colorDelete = basket[b].chosenColor;

      basket = basket.filter(
        (el) => el.idProduit !== idDelete || el.chosenColor !== colorDelete);
      localStorage.setItem("basket", JSON.stringify(basket));

      alert("Ce produit a bien été supprimé");
      location.reload();
    })
  }
}

//Modification du nombre d'articles
function changeQuantity() {
  let newItemQuantity = document.querySelectorAll(".itemQuantity");

  for (let c = 0; c < basket.length; c++) {
    newItemQuantity[c].addEventListener("change", (e) => {
      e.preventDefault();

      //Selection de l'element à modifier en fonction de son id et de sa couleur
      let changeQuantity = basket[c].chosenQuantity;
      let newQuantityValue = newItemQuantity[c].valueAsNumber;
console.log(newQuantityValue);
      basket[c].chosenQuantity = newQuantityValue;
      /*const resultFind = basket.find(
        (el) => el.newQuantityValue !== changeQuantity);
console.log(resultFind);
      resultFind.chosenQuantity = newQuantityValue;
      basket[c].chosenQuantity = resultFind.chosenQuantity;*/
      localStorage.setItem("basket", JSON.stringify(basket));

      alert("Ce produit a été modifié");
      location.reload();
    })
  }
}


//On écoute le formulaire et valider la commande

const listenForm = () => {
  const form = querySelector("cart__order__form");

  //On écoute l'information du prénom
  form.fistName.addEventListener('input', function(){
    validFirstName(this);
  })
  //On écoute l'information du nom
  form.lastName.addEventListener('input', function(){
    validLastName(this);
  })
  //On écoute l'information de l'adresse
  form.address.addEventListener('input', function(){
    validAddress(this);
  })
  //On écoute l'information de la ville
  form.city.addEventListener('input', function(){
    validNameCity(this);
  })
}
