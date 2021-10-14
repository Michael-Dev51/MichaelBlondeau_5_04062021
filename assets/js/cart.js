// Récupération des données du localStorage
let retrievedList = JSON.parse(localStorage.getItem("list"));

// Affichage des articles du panier ou message panier vide si aucun article 
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
    <a href=# id="delete" data-id="${i}">Supprimer</a>
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
// Déclaration des variables pour le calcul du panier
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
  
  //Envoyer les variables à leurs tableaux respectif 
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

//Suppression d'un article

// SUPPRIMER 1 PRODUIT DU PANIER


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
      placeholder="Votre nom de famille"
    />
    <span class="error" id="errorName"></span><br>
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
    <span class="error" id="errorFirstName"></span>
  </div>
  
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
    <span class="error" id="errorEmail"></span>    
  </div>
  <span class="error id="errorEmail"></span>
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
    <span class="error" id="errorAddress"></span>    
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
    <span class="error" id="errorCity"></span>
  </div>
  <span class="error id="errorForeName"></span>
  <button id="order" class="btn" type="submit" name="order">
    Commander
  </button>
  </form>
  </div>
  </article>

`
//************************Formulaire de contact********************************/
//déclaration des variables pour la validation du formulaire
const validate = document.getElementById("order");
let lastName = document.getElementById("last_name");
let firstName = document.getElementById("first_name");
let email = document.getElementById("Email");
let address = document.getElementById("address");
let city = document.getElementById("city");
//Déclaration des variables si il y a une erreur dans les champs input
let formatError = document.getElementById("errorName");
let fNameError = document.getElementById("errorFirstName");
let emailError = document.getElementById("errorEmail");
let addressError = document.getElementById("errorAddress")
let cityError = document.getElementById("errorCity");
//Expression régulière
const onlyCaractere = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêîïàç]+([-'\s][a-zA-ZéèîïÈÉÎÏ][a-zéèêàçîï]+)?/;
const emailFormat = /^[a-zA-Z0-9_-][.a-z0-9]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
const addressFormat = /^[0-9]+([\s][a-zA-ZéèîïÈÉÎÏ][a-zéèêàçîï]+)?/;
const cityFormat = /^[a-zA-ZéèîïÉÈÎÏ][a-zA-ZéèîïÉÈÎÏ]+([-'\s][a-zA-ZéèîïÈÉÎÏ]+)?/;
//Déclenchement de la fonction validation au click sur le bouton commander
validate.addEventListener("click", validation);


function validation(e){
  lastNamevalidation(e);
  firstNameValidation(e);
  emailValidation(e);
  addressValidation(e);
  cityValidation(e);
  
}

function lastNamevalidation(e){
  if(lastName.validity.valueMissing) {
    e.preventDefault();
    formatError.textContent = "Remplir";
    formatError.style.color = "red";
  } else if(onlyCaractere.test(lastName.value) == false) {
    e.preventDefault();
    formatError.textContent = "Format incorrect";
    formatError.style.color = "orange";
  } else {
    formatError.textContent = "Correct";
    formatError.style.color = "green";
  }
  firstNameValidation(e);
  emailValidation(e);
  
}

function firstNameValidation(e){

  if(firstName.validity.valueMissing) {
    e.preventDefault();
    fNameError.textContent = "Remplir";
    fNameError.style.color = "red";
    
  } else if(onlyCaractere.test(firstName.value) == false) {
    e.preventDefault();
    fNameError.textContent = "Format incorrect";
    fNameError.style.color = "orange";
  } else {
    fNameError.textContent = "Correct";
    fNameError.style.color = "green";
  }

}

function emailValidation(e){

  if(email.validity.valueMissing) {
    e.preventDefault();
    emailError.textContent = "Remplir";
    emailError.style.color = "red";
    
  } else if(emailFormat.test(email.value) == false) {
    e.preventDefault();
    emailError.textContent = "Format incorrect";
    emailError.style.color = "orange";
  } else {
    emailError.textContent = "Correct";
    emailError.style.color = "green";
  }

}

function addressValidation(e){

  if(address.validity.valueMissing){
    e.preventDefault();
    addressError.textContent = "Remplir";
    addressError.style.color = "red";
  } else if(addressFormat.test(address.value) == false) {
    e.preventDefault();
    addressError.textContent = "Format incorrect";
    addressError.style.color = "red";
  } else {
    addressError.textContent = "Correct";
    addressError.style.color = "green";
  }
}

function cityValidation(e){

  if(city.validity.valueMissing){
    e.preventDefault();
    cityError.textContent = "Remplir";
    cityError.style.color = "red";
  } else if(onlyCaractere.test(city.value) == false) {
    e.preventDefault();
    cityError.textContent = "Format incorrect";
    cityError.style.color = "red";
  } else {
    cityError.textContent = "Correct";
    cityError.style.color = "green";
  }
}



 
  


 
  


  
  /*let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');*/

  



