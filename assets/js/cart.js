// Récupération des données du localStorage
let retrievedList = JSON.parse(localStorage.getItem("list"));

// Affichage des articles du panier ou message panier vide si aucun article
const cartArticle = document.getElementById("product");
let structureProduitPanier = [];
let i = "";

if (retrievedList === null) {
  const panierVide = `
    <div class="empty_basket">
      <p>Le panier est vide</p>
    </div>
  `;
  cartArticle.innerHTML = panierVide;
} else {
  structureProduitPanier += `<h2>Vos articles</h2>`;
  for (i = 0; i < retrievedList.length; i++) {
    structureProduitPanier += `
    
    <span class="empty_basket"></span>
    <figure id="cart_${retrievedList[i].id}">
    <a href=# class="delete" data-id="${retrievedList[i].id}" data-colors="${
      retrievedList[i].colors
    }">Supprimer</a>
      <figcaption>
        <div class="container_teddies">
          <div>
          <img id="images" src="${retrievedList[i].image}" alt="${
      retrievedList.name
    }" /> 
          </div>
          <div class="container_summary">
            <h3 class="name">${retrievedList[i].name}</h3>
            <p class="color">${retrievedList[i].colors}</p>
            <button  class="delQty" data-index="${i}">-</button>            
            <p class="quantity">${retrievedList[i].quantity}</p>
            <button class="addQty" data-index="${i}">+</button>
            
          </div>
        </div>
        <p id="prix" class="price">${
          parseInt(retrievedList[i].price) * parseInt(retrievedList[i].quantity)
        }</p>
      </figcaption>
    
    </figure> 
    `;
  }
  if (i === retrievedList.length) {
    cartArticle.innerHTML = structureProduitPanier;
  }
}
// Déclaration des variables pour le calcul du panier
let calculTotal = [];
let articleTotal = [];
let calculTva = [];
console.log(retrievedList);
for (let j = 0; j < retrievedList.length; j++) {
  let itemPrice = parseInt(retrievedList[j].price, 10);
  let numberArticle = parseInt(retrievedList[j].quantity, 10);
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
const prixTotal = calculTotal.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

//Additionner les articles
const nombreArticle = articleTotal.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
//Calcule tva
let horsTaxe = (prixTotal / 120) * 20;
horsTaxe = horsTaxe.toFixed(2);
console.log("prix tva :" + horsTaxe);
const totalPriceExcludingTax = prixTotal - horsTaxe;
console.log(totalPriceExcludingTax);

//Suppression d'un article

// SUPPRIMER 1 PRODUIT DU PANIER
document.querySelectorAll(".delete").forEach((deleteButton) => {
  console.log(deleteButton);
  const articleId = deleteButton.dataset.id;
  const colors = deleteButton.dataset.colors;
  deleteButton.addEventListener("click", () => {
    console.log(articleId);
    deleteArticle(articleId, colors);
  });
});

/**
 * localstorage = [
 *  {id: sfsf, color: "black", quantity: 5....},
 *  {id: sfsf, color: "white", quantity: 3....}
 * ]
 * */

function deleteArticle(articleId, colors) {
  // Retirer articleId du retrievedList
  const index = retrievedList.findIndex(
    (product) => product.id == articleId && product.colors == colors
  );
  retrievedList.splice(index, 1);

  // Mettre a jour le localstorage
  if (retrievedList.length == 0) {
    localStorage.setItem("list", null);
  } else {
    localStorage.setItem("list", JSON.stringify(retrievedList));
  }
  // Retirer l'article de notre page (rafraichir la page completement)
  // document.getElementById(`cart_${articleId}`).remove();
  window.location.reload();
}

function addQty(index, choiceQty) {
  const articleActu = retrievedList[index];
  let quantity;
  if (choiceQty == true) {
    quantity = parseInt(articleActu.quantity) + 1;
  } else {
    quantity = parseInt(articleActu.quantity) - 1;
  }
  retrievedList.splice(index, 1, {
    ...articleActu,
    quantity,
  });
  localStorage.setItem("list", JSON.stringify(retrievedList));
  window.location.reload();
}

document.querySelectorAll(".addQty").forEach((addQtyButton) => {
  const index = addQtyButton.dataset.index;
  addQtyButton.addEventListener("click", () => {
    addQty(index, true);
  });
});

document.querySelectorAll(".delQty").forEach((delQtyButton) => {
  const index = delQtyButton.dataset.index;
  delQtyButton.addEventListener("click", () => {
    addQty(index, false);
  });
});

//------------------------------Résumé commande et Formulaire de commande--------------------------
document.getElementById("nombreArticle").innerHTML += ` ${nombreArticle}`;
document.getElementById(
  "totalPriceExcludingTax"
).innerHTML += ` ${totalPriceExcludingTax} €`;
document.getElementById("prixTotal").innerHTML += ` ${prixTotal} €`;

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
let addressError = document.getElementById("errorAddress");
let cityError = document.getElementById("errorCity");
//Expression régulière
const onlyCaractere =
  /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêîïàç]+([-'\s][a-zA-ZéèîïÈÉÎÏ][a-zéèêàçîï]+)?/;
const emailFormat =
  /^[a-zA-Z0-9_-][.a-z0-9]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
const addressFormat = /^[0-9]+([\s][a-zA-ZéèîïÈÉÎÏ][a-zéèêàçîï]+)?/;
const cityFormat =
  /^[a-zA-ZéèîïÉÈÎÏ][a-zA-ZéèîïÉÈÎÏ]+([-'\s][a-zA-ZéèîïÈÉÎÏ]+)?/;
//Déclenchement de la fonction validation au click sur le bouton commander
validate.addEventListener("click", async (e) => {
  e.preventDefault();
  const isValid = validation(e);
  console.log(
    "🚀 ~ file: cart.js ~ line 191 ~ validate.addEventListener ~ isValid",
    isValid
  );
  if (isValid) {
    await envoiServeur(e);
  } else {
   /* window.alert("Veuillez remplir le formulaire");*/
  }
  /* await envoiServeur(e);*/
});

async function envoiServeur() {
  // Recuperer et structurer les infos comme ci-dessus

  /* const products = []; // ["sff", "sdfsf", "2424"]
  for (let f=0; f<retrievedList.length; f++){
    // Recuperer le id de l'objet et le mettre dans le tableau products
    products.push(retrievedList[f].id);
  } */
  const products = retrievedList.map((order) => order.id);
  const finalObject = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      address: address.value,
      city: city.value,
    },
    products,
  };
  console.log("contact : " + finalObject.contact);
  console.log("Final : ");
  console.log(finalObject);
  const url = `http://localhost:3000/api/teddies/order`;

  // Faire un fetch ayant pour methode POST vers l'api
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalObject),
  });
  console.log("resultat ", finalObject);
  // Recupere la reponse du fetch
  const data = await response.json();
  console.log("data : " + data);
  // On envoi cette reponse la a la page de confirmation
  /*  fetch(url)
    .then((response) => response.json())
    .then((response) => alert(JSON.stringify(data)))
    .catch((error) => alert("Erreur : " + error)); */

  localStorage.removeItem("list");
  window.location.href = `${window.location.origin}/pages/confirmation.html?orderId=${data.orderId}&firstName=${data.contact.firstName}&email=${data.contact.email}`;
}

function validation(e) {
  return (
    lastNamevalidation(e) &&
    firstNameValidation(e) &&
    emailValidation(e) &&
    addressValidation(e) &&
    cityValidation(e)
  );
}

function lastNamevalidation(e) {
  if (lastName.validity.valueMissing) {
    e.preventDefault();
    formatError.textContent = "Remplir";
    formatError.style.color = "red";
    return false;
  } else if (onlyCaractere.test(lastName.value) == false) {
    e.preventDefault();
    formatError.textContent = "Format incorrect";
    formatError.style.color = "orange";
    return false;
  } else {
    formatError.textContent = "Correct";
    formatError.style.color = "green";
    return true;
  }
}

function firstNameValidation(e) {
  if (firstName.validity.valueMissing) {
    e.preventDefault();
    fNameError.textContent = "Remplir";
    fNameError.style.color = "red";
  } else if (onlyCaractere.test(firstName.value) == false) {
    e.preventDefault();
    fNameError.textContent = "Format incorrect";
    fNameError.style.color = "orange";
  } else {
    fNameError.textContent = "Correct";
    fNameError.style.color = "green";
    return true;
  }
}

function emailValidation(e) {
  if (email.validity.valueMissing) {
    e.preventDefault();
    emailError.textContent = "Remplir";
    emailError.style.color = "red";
  } else if (emailFormat.test(email.value) == false) {
    e.preventDefault();
    emailError.textContent = "Format incorrect";
    emailError.style.color = "orange";
  } else {
    emailError.textContent = "Correct";
    emailError.style.color = "green";
    return true;
  }
}

function addressValidation(e) {
  if (address.validity.valueMissing) {
    e.preventDefault();
    addressError.textContent = "Remplir";
    addressError.style.color = "red";
  } else if (addressFormat.test(address.value) == false) {
    e.preventDefault();
    addressError.textContent = "Format incorrect";
    addressError.style.color = "red";
  } else {
    addressError.textContent = "Correct";
    addressError.style.color = "green";
    return true;
  }
}

function cityValidation(e) {
  if (city.validity.valueMissing) {
    e.preventDefault();
    cityError.textContent = "Remplir";
    cityError.style.color = "red";
  } else if (onlyCaractere.test(city.value) == false) {
    e.preventDefault();
    cityError.textContent = "Format incorrect";
    cityError.style.color = "red";
  } else {
    cityError.textContent = "Correct";
    cityError.style.color = "green";
    return true;
  }
}

/*let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');*/
