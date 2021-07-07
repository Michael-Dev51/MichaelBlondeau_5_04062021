fetch("http://localhost:3000/api/teddies")
.then(res => res.json())
.then(response => displayProduct(response))
.catch(error => alert("Erreur : " + error));

function displayProduct (product) {
    //Boucle pour chaque produit
    for (produit of product) {
        
      console.log(produit);  
    }
    console.log(product)

}