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
      <img id="images" src="${retrievedList.image}" alt="${retrievedList.name}" />`
      ;

      const teddiesResume = document.createElement('div');
      eachArticle.appendChild(teddiesResume);

      const teddiesName = document.createElement('div');
      teddiesResume.appendChild(teddiesName);
      teddiesName.textContent = retrievedList.name;

      const teddiesColor = document.createElement('div');
      teddiesResume.appendChild(teddiesColor);
      teddiesColor.textContent = "Couleur : " + retrievedList.colors;

      const teddiesQuantity = document.createElement('div');
      teddiesResume.appendChild(teddiesQuantity);
      teddiesQuantity.textContent = "Quantité : " + retrievedList.quantity;

      const teddyPrice = document.createElement('div');
      teddiesResume.appendChild(teddyPrice);
      teddyPrice.className = 'teddy_price';
      teddyPrice.id = i++;

      const price = document.createElement('p');
      teddyPrice.appendChild(price);
      price.textContent = retrievedList.price + " €"
  };




function resume (article) {
 
cartArticle.innerHTML += `
<h2>Vos articles</h2>
<figure class="d-flex">
  <i class="fas fa-trash-alt"></i>
  <div>
    <img id="images" src="${product.imageUrl}" alt="${product.name}" />
  </div>
  <figcaption class="d-flex">
    <p>
    ${article.description}
    </p>
    <p>couleur : Marron</p>
    <div id="item-number" class="d-flex">
      <label for="quantity">Quantité:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value="1"
        required
        min="1"
      />
    </div>
    <span>${convertPrice(product.price)}</span>
  </figcaption>
</figure>
`
} 
}
