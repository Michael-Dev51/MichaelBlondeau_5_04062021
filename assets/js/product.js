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
       <input type="number" id="quantity" name="quantity" min="0" placeholder="0">
      </div>
          <button id="addToCart">Ajouter au panier</button>
        </article>       
      `
    teddiesColor(product);
    btnCart(product);
    
 
}
// Ajout d'un tableau qui récupère les couleurs
function teddiesColor(product){
  let optionColor = [];
  const select = product.colors;
  const selectOption = document.getElementById("customization-select"); 
  // Boucle qui récupère les valeurs du tableau puis l'affiche    
  for (optionColor of select) {
    selectOption.innerHTML += `                
        <option id="colors" value ="${optionColor}">${optionColor}</option>        
        `
        }
  }
   // Ajout de l'évenement sur le bouton addToCart
   function btnCart(product) {
    const btnAddToCart = document.getElementById("addToCart");
    
    btnAddToCart.addEventListener("click", function (e) {
      e.preventDefault();
      let quantityProduct = document.getElementById("quantity");
      let liste = document.getElementById("customization-select");
      let colorSelect = liste.options[liste.selectedIndex].text;
      let article = {
        image : product.imageUrl,
        name :product.name,
        descriptif : product.description,
        price : convertPrice(product.price),
        colors : colorSelect,        
        quantity: quantityProduct.value,        
      }     
      // Enregistrement des données du produit
      
      let retrievedList = JSON.parse(localStorage.getItem("list"));
      const colors = colorSelect;
      if (retrievedList){
        retrievedList.push(article);
        localStorage.setItem("list",JSON.stringify(retrievedList));
        console.log(retrievedList);
        if (window.confirm(product.name + " " + colorSelect + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
          window.location.href = "cart.html";
      } else {
          window.location.href = "../index.html";
      }
      } else {
        retrievedList = [];
        retrievedList.push(article);
        localStorage.setItem("list",JSON.stringify(retrievedList));
        console.log(retrievedList);
        if (window.confirm(product.name + " " + colorSelect + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
          location.href = "cart.html";
      } else {
          
          location.href = "../index.html";
      }
      }         
    });  
  }  
  
