// Récupération des données du localStorage
let retrievedList = JSON.parse(localStorage.getItem("list"));
console.log(retrievedList);

// Création du recapitulatif du panier
const cartArticle = document.getElementById("product");

const cartH2 = document.createElement("h2");
cartArticle.appendChild(cartH2);
cartH2.textContent = "Vos articles";

const cartFigure = document.createElement("figure");
cartArticle.appendChild(cartFigure);




const cartFigcaption = document.createElement("figcaption");
cartFigure.appendChild(cartFigcaption);

if(retrievedList == null || retrievedList.length === 0){
  // si le panier est vide 
  const emptyCart = document.createElement('p');
  cartFigcaption.appendChild(emptyCart);
  emptyCart.className = "empty_cart";
  emptyCart.textContent = "Votre panier est tristement vide !"
} else {
  // si des éléments sont présents dans le panier : récupération des éléments du panier
  let i = 0;
  for (retrievedList of retrievedList) {
      const eachArticle = document.createElement('div');
      cartFigcaption.appendChild(eachArticle);
      eachArticle.className = 'container_teddies';
      
      const cartImage = document.createElement('div');
      eachArticle.appendChild(cartImage);
      cartImage.innerHTML = `
      <img id="images" src="${retrievedList.image}" alt="${retrievedList.name}" />`;
      cartImage.className = "Container_image"

      const teddiesResume = document.createElement('div');
      eachArticle.appendChild(teddiesResume);
      teddiesResume.className = "container_summary";

      const teddiesName = document.createElement('div');
      teddiesResume.appendChild(teddiesName);
      teddiesName.textContent = retrievedList.name;
      teddiesName.className = "name";

      const teddiesColor = document.createElement('div');
      teddiesResume.appendChild(teddiesColor);
      teddiesColor.textContent = "Couleur : " + retrievedList.colors;
      teddiesColor.className = "color";

      const teddiesQuantity = document.createElement('div');
      teddiesResume.appendChild(teddiesQuantity);
      teddiesQuantity.textContent = "Quantité : " + retrievedList.quantity;
      teddiesQuantity.className = "quantity";

      const teddyPrice = document.createElement('div');
      teddiesResume.appendChild(teddyPrice);
      teddyPrice.className = 'price';
      teddyPrice.id = i++;

      const price = document.createElement('p');
      teddyPrice.appendChild(price);
      price.textContent = retrievedList.price;

  };





}
