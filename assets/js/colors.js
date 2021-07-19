  export function productColors(productColor) {
  let optionColor = [];
  const select = `${productColor}`;
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
    selectOption.innerHTML += `                
        <option value ="">${optionColor}</option>        
        `
  }
  
}