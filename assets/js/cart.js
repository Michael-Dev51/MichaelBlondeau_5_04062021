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

      const teddiesPrice = document.createElement('div');
      teddiesResume.appendChild(teddiesPrice);
      teddiesPrice.className = 'price';
      teddiesPrice.id = i++;

      const price = document.createElement('p');
      teddiesPrice.appendChild(price);
      price.textContent = retrievedList.price;

  };





}

const cartSummary = document.getElementById("recap");
const totalBasket = document.createElement("article");
cartSummary.appendChild(totalBasket);
totalBasket.id = "basket-summary";

const cartTitle2 = document.createElement("h2");
totalBasket.appendChild(cartTitle2);
cartTitle2.textContent = "Résumé de votre panier";

const summaryContainer = document.createElement("div");
totalBasket.appendChild(summaryContainer);
summaryContainer.className = "summary";

const summaryArticle = document.createElement("p");
summaryContainer.appendChild(summaryArticle);
summaryArticle.textContent = "Article : " + retrievedList.value;

const delivery = document.createElement("p");
summaryContainer.appendChild(delivery);
delivery.textContent = "Livraison : ";

const totalExcludingTax = document.createElement("p");
summaryContainer.appendChild(totalExcludingTax);
totalExcludingTax.textContent = "Total HT : " ;

const tva = document.createElement("p");
summaryContainer.appendChild(tva);
tva.textContent = "Tva : " ;

// Affichage du formulaire
const orderForm = document.createElement("article");
cartSummary.appendChild(orderForm);
orderForm.id = "order-form";

const titleForm = document.createElement("h2");
orderForm.appendChild(titleForm);
titleForm.textContent = "Passer votre commande";

const customerInformation = document.createElement("div");
orderForm.appendChild(customerInformation);
customerInformation.className = "information";
customerInformation.innerHTML = `
<form method="post" name="formContact" id="customer">
<div class="form-group">
  <label for="last_name"> Nom de famille </label>
  <input
    type="text"
    id="last_name"
    name="last_name"
    class="form-control"
    required
    autofocus
    placeholder="Votre nom de famille"
  />
</div>
<div class="form-group">
  <label for="first_name"> Prénom </label>
  <input
    type="text"
    id="first_name"
    name="first_name"
    class="form-control"
    required
    placeholder="Votre prénom"
  />
</div>
<div class="form-group">
  <label for="E-mail"> Adresse email </label>
  <input
    type="email"
    id="E-mail"
    name="E-mail"
    class="form-control"
    required
    placeholder="Entrez une adresse mail valide"
  />
</div>
<div class="form-group">
  <label for="address"> Adresse postale </label>
  <input
    type="text"
    id="address"
    name="address"
    class="form-control"
    required
    placeholder="Ex: 4 rue des crayères "
  />
</div>
<div class="form-group">
  <label for="city"> Ville </label>
  <input
    type="text"
    id="city"
    name="city"
    class="form-control"
    required
    placeholder="Ex: Reims"
  />
</div>
<button id="order" class="btn" type="submit" name="order">
  Commander
</button>
</form>
`



/*<article id="basket-summary">
          
          <div class="summary">
            <p>Articles<span>1</span></p>
            <p>Livraison<span>Offerte</span></p>
            <p>Total HT<span>15€</span></p>
            <p>TVA<span>20%</span></p>
            <p>Total TTC<span>18€</span></p>
          </div>
        </article>
        <article id="order-form">
          <h2>Passer votre commande</h2>
          <div class="information">
            <form method="post" name="formContact" id="customer">
              <div class="form-group">
                <label for="last_name"> Nom de famille </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  class="form-control"
                  required
                  autofocus
                  placeholder="Votre nom de famille"
                />
              </div>
              <div class="form-group">
                <label for="first_name"> Prénom </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  class="form-control"
                  required
                  placeholder="Votre prénom"
                />
              </div>
              <div class="form-group">
                <label for="E-mail"> Adresse email </label>
                <input
                  type="email"
                  id="E-mail"
                  name="E-mail"
                  class="form-control"
                  required
                  placeholder="Entrez une adresse mail valide"
                />
              </div>
              <div class="form-group">
                <label for="address"> Adresse postale </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  class="form-control"
                  required
                  placeholder="Ex: 4 rue des crayères "
                />
              </div>
              <div class="form-group">
                <label for="city"> Ville </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  class="form-control"
                  required
                  placeholder="Ex: Reims"
                />
              </div>
              <button id="order" class="btn" type="submit" name="order">
                Commander
              </button>
            </form>
          </div>
        </article>*/