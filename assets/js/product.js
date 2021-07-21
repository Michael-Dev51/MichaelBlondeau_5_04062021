// Importation de la fonction convertPrice
import { convertPrice } from "./utils.js";
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

function dataSheet(product) {
  // Recupération de l'élément id dans le html
  const productCard = document.getElementById("product");
  //Boucle pour chaque produit  
  productCard.innerHTML += `
    <h1>${product.name}</h1> 
     <article>
      <figure id="prod" class="d-flex">               
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
        <select name="customization" id="customization-select"></select>
      </div>
      <div id="item-quantity" class="d-flex">
       <label for="quantity">Quantité:</label>
       <input type="number" id="quantity" name="quantity" min="0">
      </div>

          <button id="addToCart">Ajouter au panier</button>
        </article>       
      `
  // Ajout d'un tableau qui récupère les couleurs
  let optionColor = [];
  const select = product.colors;
  const selectOption = document.getElementById("customization-select");
  selectOption.innerHTML += `
      <div id="customization" class="d-flex">
      <label for="customization-select">Personnalisation:</label>
        <select name="customization" id="customization-select">
          <option value="">--Choisissez votre personnalisation--</option>          
        </select>      
      </div>    
      `
  // Boucle qui récupère les valeurs du tableau puis l'affiche    
  for (optionColor of select) {
    selectOption.innerHTML += `                
        <option value ="">${optionColor}</option>        
        `
        }  
}

