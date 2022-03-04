main()
async function main(){
    let products = await getProducts("http://localhost:3000/api/products");
    for(product of products){
        insertProduct(product)
    }
}

function getProducts(url){
    return fetch(url)
        .then(function(response){
            return response.json()
        })
        .then (function (response){
            return response
        })
        .catch(function(error){
            alert("erreur de chargement des produits")
        })
}

function insertProduct(product){
    document.getElementById("items").innerHTML += `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`
} 