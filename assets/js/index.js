//fetch de l'URL
fetch("http://localhost:3000/api/teddies")
.then(res => res.json())
.then(response => displayProduct(response))
.catch(error => alert("Erreur : " + error));

// Fonction pour la création des produits
function displayProduct (product) {
    //Boucle pour chaque produit
    for (const produit of product) {
      // Recupération de l'élément id dans le html
      const card = document.getElementById("listing");
      //Convertir le prix
      const price = convertPrice(produit.price);
      card.innerHTML += `
      <a href="./pages/product.html?_id=${produit.id}">
      <article>
        <figure>
          <p>${price}</p>
          <img src="${produit.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${produit.name}"/>     
          <figcaption>
            <h3>${produit.name}</h3>
          </figcaption>
        </figure>
      </article>
    </a>
      ` 
      console.log(product);  
    }
    

}

// convertisseur pour le prix en euro
function convertPrice(productPrice) {
  let price = `${productPrice}`;
  price = Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
  }).format(price / 100);
  return price;
}