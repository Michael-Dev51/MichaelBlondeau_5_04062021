import {convertPrice} from "./utils.js";
// Récupération des données du localStorage
let retrievedList = JSON.parse(localStorage.getItem("list"));

//fetch de l'URL
fetch("http://localhost:3000/api/teddies")
.then(res => res.json())
.then(response => displayProduct(response))
.catch(error => alert("Erreur : " + error));

// Fonction pour la création des produits
function displayProduct (product) {
    // Recupération de l'élément id dans le html
    const card = document.getElementById("listing");
    //Boucle pour chaque produit
    for (const produit of product) {      
      //Convertir le prix
      const price = convertPrice(produit.price);
      //Affichage des produits
      card.innerHTML += `
      <a href="./pages/product.html?_id=${produit._id}">
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
    }console.log(card);
}


