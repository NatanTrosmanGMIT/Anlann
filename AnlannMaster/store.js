//All code provided was written in unison via screen sharing by Natan Trosman & Darragh Ryan
//Make sure that everything is loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
// to remove cart items
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
//to change quantities
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
//to add to cart
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
// update cart total
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
//to remove cart items
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
//to change quantities
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
// update cart total
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
// to make sure you cant add twice, instead change quantities
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

//coupon
let coupons = [
	["Anlann15", 15, false],
	["Anlann25", 25, false]
];

//  add a coupon to the cart Function
function addCoupon() {
	// Hide invalid coupon warning
	$("#invalidCoupon").hide();
	// Get coupon code from the input box 
	let theCode = $("#couponInput").val();
	// Boolean if coupon code is found in array
	let foundCoupon = false;
	// go through through coupons array 
	for (let i = 0; i < coupons.length; i++) {
		// Check that the code matches the 0th item in array
		if (theCode == coupons[i][0]) {
			// Set 2nd array item to true, showing that the coupon is active
			coupons[i][2] = true;
			// Flip our boolean
			foundCoupon = true;
			// activate function to update the totals
			updateCoupons();
		}
	}
	// If coupon code not found in array, warn user
	if (foundCoupon == false) {
		$("#invalidCoupon").show();
	}
}

//  update coupon display in cart Function
function updateCoupons() {
	// Clear coupon list div
	$("#couponDetailsHolder").html("");
	// make the total the total before the coupon code was applied
	total = cartPreTotal;
	// go through through coupons array 
	for (let i = 0; i < coupons.length; i++) {
		// If coupon is active
		if (coupons[i][2]) {
			// Add coupon badge to display div 
			$("#couponDetailsHolder").append("<p class='badge badge-primary mr-2'>" + coupons[i][0] + ": " + coupons[i][1] + "&percnt; off</p>");
			// Calculate new total 
			total *= 1 - ((coupons[i][1]) / 100);
		}
	}
	// Display new total after coupon has been applied below cart
	$("#cartPostTotalHolder").html("Total after coupons: &euro;" + total);
}


//display total
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total
}











