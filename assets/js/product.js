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
    const toto = document.getElementById("prod");
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
      `       
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
      for (optionColor of select) {
        selectOption.innerHTML +=`                
        <option value ="">${optionColor}</option>
        
        `
        console.log(optionColor);
      }
}
function selectColor(color){
let optionColor = [];
      const select = product.colors;
      const selectOption = document.getElementById("customization");
      selectOption.innerHTML += `
      <div id="customization" class="d-flex">
            <label for="customization-select">Personnalisation:</label>
            <select name="customization" id="customization-select">
            <option value="">--Choisissez votre personnalisation--</option>
            <option value=""></option> 
              
            </select>
          </div>
      `        
      for (optionColor of select) {
        selectOption.innerHTML +=`                
        <option value ="">${optionColor}</option>
        
        `
        console.log(optionColor);
      }
    }

