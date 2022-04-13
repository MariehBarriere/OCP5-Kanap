/************gestion du panier**********/

//Récupération du panier (ligne 56)
let basket = JSON.parse(localStorage.getItem("basket"));
let form = document.querySelector(".cart__order__form");
  //form.addEventListener("click", listenForm);

main(basket);
if (basket && basket.length == 0) {
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
    let index = 0;
    for (product of basket) {
      //on initialise la variable
      let article;
      console.log(product);
      //on récupère les infos d'un seul produit dans product.js
      fetch("http://localhost:3000/api/products/" + product.idProduit)
        .then((response) => response.json())
        //on retourne la réponse qui a été transformée
        .then((response) => {
          article = response;
         console.log(basket[index]);
          cartItems.innerHTML += `<article class="cart__item" data-id="${basket[index].idProduit}" data-color="${basket[index].chosenColor}">
            <div class="cart__item__img">
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${article.name}</h2>
                <p>${basket[index].chosenColor}</p>
                <p>${article.price} €</p> 
              </div>
              <div class="cart__item__content__settings">
               <div class="cart__item__content__settings__quantity">
                  <p>Qté : ${basket[index].chosenQuantity}</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[index].chosenQuantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                 <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
         </article>`;
          total += basket[index].chosenQuantity * article.price;
          let totalPrice = document.getElementById("totalPrice");
          totalPrice.innerHTML = total;
          //parseInt permet de transformer en Int non string
          nbrart += parseInt(basket[index].chosenQuantity);
          let totalQuantity = document.getElementById("totalQuantity");
          totalQuantity.innerHTML = nbrart;
        })
        .then(() => {deleteProduct(index);changeQuantity(index); index++})
    }
  }
}

//Suppression d'un article
function deleteProduct(index) {
  let btnDelete = document.querySelectorAll(".deleteItem");
  let btnDelete2 = document.querySelectorAll(".cart__item__content__settings__delete > .deleteItem" );
  //for (let b = 0; b < basket.length; b++) {
    console.log(index);
    for (let i = 0; i <= index; i ++){
      btnDelete[i].addEventListener('click', (e) => {
        e.preventDefault();
        // Ces deux variables permettent de supprimer un objet via son ID et sa couleur.
        let idDelete = basket[i].idProduit;
        let colorDelete = basket[i].chosenColor;

        // Filtre les objets n'ayant pas la même ID ou même couleur que l'élément cliqué
        basket = basket.filter(
        (el) => el.idProduit !== idDelete || el.chosenColor !== colorDelete);
      localStorage.setItem("basket", JSON.stringify(basket));
        
        // Pop-up alerte indiquant à l'usager que le produit séléctionné a bien été supprimer
        alert("Ce produit a bien été supprimé");
      location.reload();
      })
    }

  //}
}

//Modification du nombre d'articles
function changeQuantity(index) {
  let newItemQuantity = document.querySelectorAll(".itemQuantity");
console.log(newItemQuantity[index]);
console.log(basket[index]);
  //for (let c = 0; c < basket.length; c++) {
    for (let i = 0; i <= index; i ++){
    newItemQuantity[i].addEventListener("input", function() {
     

      //Selection de l'element à modifier en fonction de son id et de sa couleur
      let changeQuantity = basket[i].chosenQuantity;
      console.log(changeQuantity);
      let newQuantityValue = newItemQuantity[i].valueAsNumber;
console.log(newQuantityValue);
      basket[i].chosenQuantity = newQuantityValue;
      localStorage.setItem("basket", JSON.stringify(basket));

      alert("Ce produit a été modifié");
      location.reload();
    })
  }
}


/*******Création du formulaire******/

//Écouter le formulaire et valider la commande
const listenForm = () => {
  form = querySelector("#cart__order__form");
  form.addEventListener("click", listenForm);

  //on créé les expressions régulières
  let nameRegExp = new RegExp("[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+");
  let addressRegExp = new RegExp("^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$");
  let emailRegExp = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

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
    validCityName(this);
  })
  //On écoute l'information du mail
  form.email.addEventListener('input', function(){
    validEmail(this);
  })

  //On vérifie la vailidité des données
  const validFirstName = function(inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
      if(nameRegExp.test(inputFirstName.value)){
        firstNameErrorMsg.innerHTML = "";
      }
      else{
        firstNameErrorMsg.innerHTML = "Veuillez compléter ce champ";
      }
  }
  const validAddress = function(inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;
      if(addressRegExp.test(inputAddress.value)){
        addressErrorMsg.innerHTML = "";
      }
      else{
        addressErrorMsg.innerHTML = "Veuillez compléter votre adresse";
      }
  }
  const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;
      if(emailRegExp.test(inputEmail.value)){
        emailErrorMsg.innerHTML = "";
      }
      else{
        emailErrorMsg.innerHTML = "Veuillez compléter votre adresse mail";
      }
  }
}

//On créé l'objet contact au submit si le formulaire est valide
form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    if (validLastName(form.firstName) && validLastName(form.lastName) && validAddress(form.address) && validLastName(form.city) && validEmail(form.email)){
      //récupérer les valeurs du formulaire
      let contact = {
          firstName : form.firstName.value,
          lastName : form.lastName.value,
          address : form.address.value,
          city : form.city.value,
          email : form.email.value
      }
  }
  listenForm();
})

//On envoie les informations client au panier
function postForm(){
  const btn_order = document.getElementById("order");

  //On écoute le panier
  btn_order.addEventListener("click", (e) => {
    e.preventDefault();

   //On construit un objet tableau 
   let idProducts = [];
   for(let i = 0; i<basket.length;i++) {
     idProducts.push(basket[i].idProduit);
    }
  })
  
  checkBasket(sendOrder);
  function checkBasket(sendOrder) {
    if (cart.length < 1) {
      alert("Votre panier est vide. Revenez à la page Accueil pour commander votre canapé");
    } else {
      sendingOrder(sendOrder);
    }
  } 

// fonction POST commande
  const sendingOrder = (sendOrder) =>{
  //On envoie l'objet contenant le produit et le contact vers le serveur
  const promiseOrder = fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      body: JSON.stringify(sendOrder),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    fetch("http://localhost:3000/api/products/order", postOptions)
    .then((res) => {
      return res.json();
    })
    .then((dataList) => {
      localStorage.setItem("orderId", JSON.stringify(dataList.orderId));
      document.location.href = `confirmation.html?id=${dataList.orderId}`;
    })
    .catch((error) => {
      console.log(`ERREUR requete POST : ${error}`);
    });
  } 
}

