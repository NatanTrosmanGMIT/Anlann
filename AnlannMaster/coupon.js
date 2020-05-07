


let coupons = [
	["Anlann15", 15, false],
	["Anlann25", 25, false]
];

// Function to add a coupon to the cart (PC)
function addCoupon() {
	// Hide the invalid coupon warning (PC)
	$("#invalidCoupon").hide();
	// Get coupon code from input box (PC)
	let theCode = $("#couponInput").val();
	// Boolean if coupon code is found in array (PC)
	let foundCoupon = false;
	// Iterate through coupons array (PC)
	for (let i = 0; i < coupons.length; i++) {
		// Check if the code matches the 0th item in array (PC)
		if (theCode == coupons[i][0]) {
			// Set 2nd array item to true, indicating coupon is active (PC)
			coupons[i][2] = true;
			// Flip our boolean (PC) 
			foundCoupon = true;
			// Trigger function to update the totals etc (PC)
			updateCoupons();
		}
	}
	// If we didn't find coupon code in array, warn user (PC)
	if (foundCoupon == false) {
		$("#invalidCoupon").show();
	}
}

// Function to update coupon display in cart (PC)
function updateCoupons() {
	// Clear the coupon list div (PC)
	$("#couponDetailsHolder").html("");
	// Set our total to the pre-coupon total (PC)
	cartPostTotal = cartPreTotal;
	// Tterate through coupons array (PC)
	for (let i = 0; i < coupons.length; i++) {
		// If coupon is active (PC)
		if (coupons[i][2]) {
			// Add coupon badge to display div (PC)
			$("#couponDetailsHolder").append("<p class='badge badge-primary mr-2'>" + coupons[i][0] + ": " + coupons[i][1] + "&percnt; off</p>");
			// Calculate new total (PC)
			cartPostTotal *= 1 - ((coupons[i][1]) / 100);
		}
	}
	// Display new post-coupon total below cart (PC)
	$("#cartPostTotalHolder").html("Total after coupons: &euro;" + cartPostTotal);
}



