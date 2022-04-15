//On s'assure que le DOM est chargé
window.onload = () => {
  // Exécuté après le chargement de la page

  //Récupération des articles de l'API
  main();
  async function main() {
    let products = await getProducts("http://localhost:3000/api/products");
    for (product of products) {
      insertProduct(product);
    }
  }

  function getProducts(url) {
    return fetch(url)
      .then(function (response) {
        // on recupere la réponse en JSON
        return response.json();
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        alert("erreur de chargement des produits");
      });
  }

  //On insère les produits dans la page d'accueil
  function insertProduct(product) {
    document.getElementById(
      "items"
    ).innerHTML += `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`;
  }
};
