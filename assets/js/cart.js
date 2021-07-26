let retrievedList = JSON.parse(localStorage.getItem("listProduct"));
localStorage.setItem("listProduct", JSON.stringify(retrievedList));
console.log(retrievedList);