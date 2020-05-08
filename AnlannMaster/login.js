//All code provided was written in unison via screen sharing by Natan Trosman & Darragh Ryan
	// Loop through Array of Objects
var objPeople = [
	{ // Object @ 0 index
		username: "John",
		password: "Doe"
	},
	{ // Object @ 1 index
		username: "123",
		password: "123"
	},
	{ // Object @ 2 index
		username: "Michael",
		password: "Duignan"
	}

]

function getInfo() {
	var username = document.getElementById('username').value
	var password = document.getElementById('password').value

	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches username and password of a current index of the objPeople array
		if(username == objPeople[i].username && password == objPeople[i].password) {
			//document.getElementById("login").innerHTML = "My Account";
			alert(username + " is logged in")
			console.log(username + " is logged in")
			window.location.href = "cartPage.html";
			// stop the function if this is found to be true
			return
		}
	}
	// alert if wrong login
	alert("incorrect username or password")
	console.log("incorrect username or password")
}
