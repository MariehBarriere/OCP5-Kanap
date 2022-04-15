/************gestion du panier**********/

//Récupération du panier
let basket = JSON.parse(localStorage.getItem("basket"));
let form = document.querySelector(".cart__order__form");

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
    let nbrart = 0;
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
        .then(() => {
          deleteProduct(index);
          changeQuantity(index);
          index++;
        });
    }
  }
}

//Suppression d'un article
function deleteProduct(index) {
  let btnDelete = document.querySelectorAll(".deleteItem");
  let btnDelete2 = document.querySelectorAll(
    ".cart__item__content__settings__delete > .deleteItem"
  );
  //for (let b = 0; b < basket.length; b++) {
  console.log(index);
  for (let i = 0; i <= index; i++) {
    btnDelete[i].addEventListener("click", (e) => {
      e.preventDefault();
      // Ces deux variables permettent de supprimer un objet via son ID et sa couleur.
      let idDelete = basket[i].idProduit;
      let colorDelete = basket[i].chosenColor;

      // Filtre les objets n'ayant pas la même ID ou même couleur que l'élément cliqué
      basket = basket.filter(
        (el) => el.idProduit !== idDelete || el.chosenColor !== colorDelete
      );
      localStorage.setItem("basket", JSON.stringify(basket));

      // Pop-up alerte indiquant à l'usager que le produit séléctionné a bien été supprimer
      alert("Ce produit a bien été supprimé");
      location.reload();
    });
  }
}

//Modification du nombre d'articles
function changeQuantity(index) {
  let newItemQuantity = document.querySelectorAll(".itemQuantity");
  console.log(newItemQuantity[index]);
  console.log(basket[index]);

  for (let i = 0; i <= index; i++) {
    newItemQuantity[i].addEventListener("input", function () {
      //Selection de l'element à modifier en fonction de son id et de sa couleur
      let changeQuantity = basket[i].chosenQuantity;
      console.log(changeQuantity);
      let newQuantityValue = newItemQuantity[i].valueAsNumber;
      console.log(newQuantityValue);
      basket[i].chosenQuantity = newQuantityValue;
      localStorage.setItem("basket", JSON.stringify(basket));

      alert("Ce produit a été modifié");
      location.reload();
    });
  }
}

/*******Création du formulaire******/

//On créé des variables qui vont correspondre aux différents champs en dehors de la fonction pour une portée globale
let firstName = false;
let lastName = false;
let address = false;
let city = false;
let email = false;

//Écouter le formulaire et valider la commande
const listenForm = () => {
  console.log("ok");
  form = document.querySelectorAll(".cart__order__form");
  form = form[0];

  //on créé les expressions régulières
  console.log(form);
  let nameRegExp =
    /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/;
  let addressRegExp =
    /^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/;
  let emailRegExp =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  //On appelle la fonction, on vérifie la validité des données
  const validFirstName = function (inputFirstName) {
    console.log(inputFirstName);
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    if (inputFirstName.value.match(nameRegExp)) {
      firstNameErrorMsg.innerHTML = "";
      firstName = true;
      console.log("success");
      console.log(inputFirstName.value);
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez compléter ce champ";
      firstName = false;
      console.log("echec");
      console.log(inputFirstName.value);
    }
  };
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (inputLastName.value.match(nameRegExp)) {
      lastNameErrorMsg.innerHTML = "";
      lastName = true;
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez compléter ce champ";
      lastName = false;
    }
  };
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (inputAddress.value.match(addressRegExp)) {
      addressErrorMsg.innerHTML = "";
      address = true;
    } else {
      addressErrorMsg.innerHTML = "Veuillez compléter votre adresse";
      address = false;
    }
  };
  const validCityName = function (inputCityName) {
    let cityNameErrorMsg = inputCityName.nextElementSibling;
    if (inputCityName.value.match(nameRegExp)) {
      cityNameErrorMsg.innerHTML = "";
      city = true;
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez compléter ce champ";
      city = false;
    }
  };
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (inputEmail.value.match(emailRegExp)) {
      //if(emailRegExp.test(inputEmail.value)){
      emailErrorMsg.innerHTML = "";
      email = true;
    } else {
      emailErrorMsg.innerHTML = "Veuillez compléter votre adresse mail";
      email = false;
    }
  };

  //On écoute l'information du prénom, du nom, de l'adresse, de la ville et du mail
  validFirstName(form.firstName);
  validLastName(form.lastName);
  validAddress(form.address);
  validCityName(form.city);
  validEmail(form.email);
};

//On créé l'objet contact au submit si le formulaire est valide
form.addEventListener("submit", (e) => {
  e.preventDefault();
  listenForm();
  console.log(lastName);
  if (firstName && lastName && address && city && email) {
    //On récupère les valeurs du formulaire
    let contact = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value,
    };
    postForm(contact);
  }
});

//On envoie les informations client au panier
function postForm(contact) {
  //On construit un objet tableau
  let idProducts = [];
  for (let i = 0; i < basket.length; i++) {
    //On gère plusieurs quantités
    for (let j = 0; j < basket[i].chosenQuantity; j++) {
      idProducts.push(basket[i].idProduit);
    }
  }
  //On définit la variable sendOrder
  let sendOrder = {
    contact: contact,
    products: idProducts,
  };

  // fonction POST commande
  const sendingOrder = (sendOrder) => {
    //On envoie l'objet contenant le produit et le contact vers le serveur
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(sendOrder),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
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
  };
  sendingOrder(sendOrder);
}