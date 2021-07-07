// javascript dark mode implementation 


var darkcounter = 1;
var cookieconsent = -1;
var darkcookie = getCookie("darkcookie");

var modal = document.getElementById("consent-modal-outer");

//checks current cookies and updates accordingly
if(getCookie("darkcookie") == "-1"){

	darkcounter = -1;
	
}

if(getCookie("CookieConsent")=="yes"){
	cookieconsent = 1;
	modal.style.display = "none";
}
if(getCookie("CookieConsent")=="no"){
	modal.style.display = "none";
}


checkchange();

document.getElementById("darkmode").onclick = function() {darkmode()};
document.getElementById("consent-yes").onclick = function() {consentYes()};
document.getElementById("consent-no").onclick = function() {consentNo()};


function darkmode(){
	//Switches screen element colours between a dark and light scheme
	darkcounter = darkcounter * (-1);
	console.log("entered darkmode function");

	checkchange();
	
	assigncolorcookie();
}

function consentYes(){
	//Confirms consent is given to store cookies on local browser
	modal.style.display = "none";
	cookieconsent = 1;
	setCookie("CookieConsent","yes",365);
	
	return;
}

function consentNo(){

	modal.style.display = "none";
	cookieconsent = -1
	setCookie("CookieConsent","no",0);
	
	return;
	
}


function checkchange(){
	if(darkcounter < 0){
		//darkmode color change

		
		//document.getElementById("demo").style.color = "red"; via w3schools
		
		document.getElementById("headertag").style.backgroundColor = "#202020";	//black
		document.getElementById("footertag").style.backgroundColor = "#202020";	//black	
		document.getElementById("headertag").style.borderColor = "#7b0f1a";	
		document.getElementById("bodytag").style.backgroundColor = "black";		//#383838	
		document.getElementById("main").style.backgroundColor = "#202020";		//black
		document.getElementById("main").style.color = "white";
		document.getElementById("maintitle").style.color = "#7b0f1a";
		
		document.getElementById("consent-modal").style.backgroundColor = "#202020";	//black
		document.getElementById("modaltitle").style.color = "#7b0f1a";
		document.getElementById("consent-modal-outer").style.backgroundColor = "rgba(255,255,255,.4)";
		
		document.getElementById("consent-yes").style.backgroundColor = "#7b0f1a";
		document.getElementById("consent-no").style.backgroundColor = "#7b0f1a";
		
		//home colour change
		if(document.getElementById("featured")!= null && document.getElementById("featured") != undefined){
			document.getElementById("featured").style.backgroundColor = "#202020";
			document.getElementById("featuredtitle").style.color = "#7b0f1a";
			document.getElementById("featureddiv").style.backgroundColor = "black";
			document.getElementById("featureddiv").style.color = "white";
			
		}
		//linkedin
		if(document.getElementsByClassName("LI-profile-badge")[0]!= null && document.getElementsByClassName("LI-profile-badge") != undefined){
		var linkedinLight = document.getElementsByClassName("LI-profile-badge")[0];
		var linkedinDark = document.getElementsByClassName("LI-profile-badge")[1];
		linkedinLight.style.display = "none";
		linkedinDark.style.display = "inline";
		}

		
		var x = document.getElementsByClassName("button");
		var i;
		for (i = 0; i < x.length; i++) {
			x[i].style.backgroundColor = "#202020"; //black
		}
		
		
	}
	if(darkcounter > 0){
		//lightmode color change

		
		document.getElementById("headertag").style.backgroundColor = "#293a7a";
		document.getElementById("footertag").style.backgroundColor = "#293a7a";
		document.getElementById("headertag").style.borderColor = "#5e8c61";
		document.getElementById("bodytag").style.backgroundColor = "lightgrey";	
		document.getElementById("main").style.backgroundColor = "white";	
		document.getElementById("main").style.color = "black";
		document.getElementById("maintitle").style.color = "#5e8c61";
		
		document.getElementById("consent-modal").style.backgroundColor = "#293a7a";
		document.getElementById("modaltitle").style.color = "#5e8c61";
		document.getElementById("consent-modal-outer").style.backgroundColor = "rgba(255,255,255,.4)";
		
		document.getElementById("consent-yes").style.backgroundColor = "#5e8c61";
		document.getElementById("consent-no").style.backgroundColor = "#5e8c61";
		
		//home colour change
		if(document.getElementById("featured") != null && document.getElementById("featured") != undefined){
			document.getElementById("featured").style.backgroundColor = "white";
			document.getElementById("featuredtitle").style.color = "#5e8c61";
			document.getElementById("featureddiv").style.backgroundColor = "lightgrey";
			document.getElementById("featureddiv").style.color = "black";
			
		}
		//linkedin
		if(document.getElementsByClassName("LI-profile-badge")[0]!= null && document.getElementsByClassName("LI-profile-badge") != undefined){
		var linkedinLight = document.getElementsByClassName("LI-profile-badge")[0];
		var linkedinDark = document.getElementsByClassName("LI-profile-badge")[1];
		linkedinLight.style.display = "inline";
		linkedinDark.style.display = "none";
		}

		
		
		
		
		
		var x = document.getElementsByClassName("button");
		var i;
		for (i = 0; i < x.length; i++) {
			x[i].style.backgroundColor = "#293a7a";
		}
		
	}
}

function assigncolorcookie(){
	if (cookieconsent == 1){
	setCookie("darkcookie", darkcounter,365);
	}
	else{
	setCookie("darkcookie", darkcounter,0);
	}
	console.log("document.cookie=" + document.cookie);
}

	
	
	//via w3schools
	function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  if(exdays == 0){ // my own addition to the w3 code
	  expires = "";
  }
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
	function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
