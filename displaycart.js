document.addEventListener('DOMContentLoaded', function () {
    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    var cartContainer = document.querySelector('.cart-items');
    
    console.log('Cart Items:', cartItems);

    cartItems.forEach(function (item, index) {
        var itemHtml = `
            <div class="row mb-4 d-flex justify-content-between align-items-center">
                <hr my="2">
                <div class="col-md-2 col-lg-2 col-xl-2">
                    <img src="${item.image}" class="img-fluid rounded-3" alt="..." style="width: 100%; height: 50px; object-fit: cover;">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="text-muted" style="width: 150px;">${getCategory(item.temperature)} ${getCategory(item.name)}</h6>
                    <h6 class="text-black mb-0" style="width: 150px;">${item.name}</h6>
                </div>
                <div class="col-md-2 col-lg-2 col-xl-2">
                    <div class="text-end">${item.quantity}</div> 
                </div>
                <div class="col-md-2 col-lg-2 col-xl-2 offset-lg-1">
                    <h6 class="mb-0">₱${(item.price * item.quantity).toFixed(2)}</h6>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                    <button class="btn btn-remove" onclick="removeItem(${index})"><i class="fas fa-times"></i></button>
                </div>
            </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', itemHtml);
    });

    var cartItemCountElement = document.getElementById('cartItemCount');
    cartItemCountElement.textContent = cartItems.length + (cartItems.length === 1 ? ' item' : ' items');

    var cartItemBadge = document.getElementById('cartItemBadge');
    cartItemBadge.textContent = cartItems.length;

    var totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    var totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = '₱' + totalPrice.toFixed(2);

    var sellingPriceElement = document.getElementById('sellingPrice');
    sellingPriceElement.textContent = '₱' + totalPrice.toFixed(2);

  
    var orderIdElement = document.getElementById('orderId');
    var orderId = sessionStorage.getItem('orderId');
    if (!orderId) {
        orderId = generateOrderId();
        sessionStorage.setItem('orderId', orderId);
    }
    orderIdElement.textContent = orderId;

    console.log('Order ID:', orderId);

    document.getElementById('okayBtn').addEventListener('click', function() {
        var newOrderId = generateOrderId();
        sessionStorage.setItem('orderId', newOrderId);
        console.log('New Order ID:', newOrderId);
    });
});

function getCategory(itemName) {
    return itemName.split(' ')[0];
}

function removeItem(index) {
    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload();
}

function updateBadgeCount() {
    var cartItemCount = getCartItemCount();
    var badgeElement = document.getElementById('cartItemCount');
    if (badgeElement) {
        badgeElement.textContent = cartItemCount.toString();
    }
}

function clearCartItems() {
    sessionStorage.removeItem('cartItems');
    sessionStorage.removeItem('orderId'); 
}

function generateOrderId() {
    var orderIdLength = 5;
    var orderId = '';
    for (var i = 0; i < orderIdLength; i++) {
        var randomDigit = Math.floor(Math.random() * 10);
        orderId += randomDigit;
    }
    return orderId;
}
