// Récupération des données du localStorage
let retrievedList = JSON.parse(localStorage.getItem("list"));


const cartArticle = document.getElementById("product");
let structureProduitPanier = [];
let i ="";

if(retrievedList === null){
  const panierVide = `
    <div class="">
      <p>Le panier est vide</p>
    </div>
  `;
    cartArticle.innerHTML = panierVide;
} else{
  
  for(i = 0; i < retrievedList.length; i++){
    
    structureProduitPanier = structureProduitPanier + `
    <h2>Vos articles</h2>
    <figure>
      <figcaption>
        <div class="container_teddies">
          <div>
          <img id="images" src="${retrievedList[i].image}" alt="${retrievedList.name}" /> 
          </div>
          <div class="container_summary">
            <h3 class="name">${retrievedList[i].name}</h3>
            <p class="color">${retrievedList[i].colors}</p>
            <p class="quantity">${retrievedList[i].quantity}</p>
            
          </div>
        </div>
        <p id="prix" class="price">${parseInt(retrievedList[i].price)* parseInt(retrievedList[i].quantity)}</p>
      </figcaption>
    
    </figure> 
    `;
    
    
  }
    if(i === retrievedList.length){
    cartArticle.innerHTML = structureProduitPanier;
    
  }
  
  
}
let calculTotal = [];
let articleTotal = [];
let calculTva = [];
console.log(retrievedList);
for(let j = 0; j < retrievedList.length; j++){  
  let itemPrice = parseInt(retrievedList[j].price, 10);
  let numberArticle = parseInt(retrievedList[j].quantity,10);
  //Calcul du prix
  let totalPriceItems = itemPrice * numberArticle;
  //Calcul du nombre d'article
  let totalNumberItems = numberArticle;
  
  //Envoyer les variables leurs tableaux respectif 
  calculTotal.push(totalPriceItems);  
  articleTotal.push(totalNumberItems);
  console.log(totalPriceItems);
  
}

//Additionner les prix 
const prixTotal = calculTotal.reduce((accumulator,currentValue) => {
return accumulator + currentValue;
}, 0);
//Additionner les articles
const nombreArticle = articleTotal.reduce((accumulator,currentValue) => {
return accumulator + currentValue;
}, 0);
//Calcule tva
let horsTaxe = (prixTotal/120)*20;
horsTaxe = horsTaxe.toFixed(2);
console.log("prix tva :"+horsTaxe);
const totalPriceExcludingTax = prixTotal - horsTaxe;
console.log(totalPriceExcludingTax);


//------------------------------Résumé commande et Formulaire de commande--------------------------

const cartSummary = document.getElementById("recap");
cartSummary.innerHTML += `
  <article id="basket-summary">
    <h2>Résumé de votre panier</h2>
    <div class="summary">
      <p>Article : ${nombreArticle}</p>
      <p>Total HT : ${totalPriceExcludingTax + " € "}</p>
      <p>Total TTC : ${prixTotal+" € "}</p>
      <p>Livraison : Offerte</p>
    </div>
  </article>
  
  <article id="order-form">
  <h2>Passer votre commande</h2>
  <div class="information">
  <form action="" method="post" name="formContact" id="customer">
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
  <span class="error id="errorLastName"></span>
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
  <span class="error id="errorLastName"></span>
  <div class="form-group">
    <label for="Email"> Adresse email </label>
    <input
      type="email"
      id="Email"
      name="Email"
      class="form-control"
      required
      placeholder="Entrez une adresse mail valide"
    />    
  </div>
  <span class="error id="errorForeName"></span>
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
  <span class="error id="errorForeName"></span>
  <button id="order" class="btn" type="submit" name="order">
    Commander
  </button>
  </form>
  </div>
  </article>

`;
//************************Formulaire de contact********************************/


 
  


  
  /*let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');*/

  



