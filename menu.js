function addToCart(itemId) {


    var itemName = document.getElementById('itemName' + itemId).innerText;
    var itemPrice = parseFloat(document.getElementById('itemPrice' + itemId).innerText.replace('₱', ''));
    var quantity = parseInt(document.getElementsByName('quant[' + itemId + ']')[0].value);
    var temperature = getTemperature(itemId);
    var imageSource = document.getElementById('itemImage' + itemId).src;
  
    var item = {
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: quantity,
        temperature: temperature,
        image: imageSource
    };
  
    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
  
    var existingItemIndex = cartItems.findIndex(function (cartItem) {
        return cartItem.id === itemId && cartItem.temperature === temperature;
    });
  
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        cartItems.push(item);
    }
  
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    alert("Added Successfully");
 
    location.reload(); 
  }


function getImageSource(itemId) {
  var imageElement = document.getElementById('itemImage' + itemId);
  if (imageElement) {
      return imageElement.src;
  } else {
      return ''; 
  }
}

function getTemperature(itemId) {
  // Retrieve the selected radio button value for temperature
  var selectedRadioButton = document.querySelector('input[name="inlineRadioOptions' + itemId + '"]:checked');
  if (selectedRadioButton) {
      return selectedRadioButton.value; // Return the value of the selected radio button
  } else {
      return ''; // Return empty string if no radio button is selected
  }
}
function updateCartBadge() {
    var cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        cartBadge.textContent = countCartItems();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    
    
    var cartItemBadge = document.getElementById('cartItemBadge');
    cartItemBadge.textContent = cartItems.length;
});

