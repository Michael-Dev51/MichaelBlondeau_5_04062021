
//RECUPERATION DES DONNEES DE L URL
let paramsUrl = new URL(window.location).searchParams;

let orderId = paramsUrl.get("orderId");

//RECUPERATION DES DONNEES CONTACT
let contact = JSON.parse(localStorage.getItem("contact"));

// RECUPERATION DU PRIX TOTAL
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));


// AFFICHAGE HTML


document.getElementById("price_TTC").innerHTML +=` ${prixTotal}€`;
document.getElementById("order_reference").innerHTML +=` ${orderId} `;
console.log(orderId);
console.log(prixTotal);
console.log(contact);
/*function display (){
    cartConfirmation.innerHTML += `
        <p>
        Merci  ${data.contact.firstName } ${data.contact.email} 
        </p>
        <hr>
        <p>Nous avons bien reçu votre commande N° ${data.orderId} </br>
        D'un montant de :${prixTotal}  </br>
        </p>
        Un email vous sera envoyer à l'adresse : </br> ${data.contact.email} a l'envoi de votre commande  
    `
};
console.log(cartConfirmation);
display();*/
const returnIndex = document.getElementById("return");
returnIndex.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.href = `${window.location.origin}/index.html`;
  });