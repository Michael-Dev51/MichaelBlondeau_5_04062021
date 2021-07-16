import {convertPrice} from "./utils.js";
const searchParams = new URLSearchParams(window.location.search);
const cardId = searchParams.get("_id");
// Modification de l'url
const newUrl = `http://localhost:3000/api/teddies/${cardId}`;
//fetch de l'URL
fetch(newUrl)
.then(res => res.json())
.then(response => dataSheet(response))
.catch(error => alert("Erreur : " + error));
console.log(newUrl);

function dataSheet (product) {
    // Recupération de l'élément id dans le html
    const toto = document.getElementById("product");
    //Boucle pour chaque produit
         
      //Convertir le prix
     /* const price = convertPrice(produit.price);*/
      toto.innerHTML += `      
      <article>
      <figure class="d-flex">
        <div>
          <img src="${product.imageUrl}" alt="${product.name}" />
        </div>
        <figcaption class="d-flex">
          <p>
            ${product.description}
          </p>
          <span>${convertPrice(product.price)}</span>
        </figcaption>
      </figure>
      <div id="customization" class="d-flex">
      <label for="customization-select">Personnalisation:</label>
        <select name="customization" id="customization-select">
          <option value="">--Choisissez votre personnalisation--</option>
          <option value ="1">${product.colors}</option>
          <option value ="2">${colors(product.colors)}</option>
          
        </select>
      
        </div>    
      <button id="addToCart">Ajouter au panier</button>
    </article>
    
      `       
    
}



