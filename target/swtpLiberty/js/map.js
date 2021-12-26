
window.addEventListener("load", initMap);
window.addEventListener("load", initIcons);

// --- globale Variable -------------------------------------

var myMap;
var redIcon;
var blueIcon;

// Array für die gesetzten Markierungen
var markers;

// Marker für die Info-Anzeige
var currentSelectedMarker;

// Marker für das Einfügen
var currentCreatingMarker;
// -----------------------------------------------------------



// Initialisiert die Icons
function initIcons() {
	redIcon = new L.Icon({
		iconUrl: './images/marker-icon-red.png',
		shadowUrl: './images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

	blueIcon = new L.Icon({
		iconUrl: './images/marker-icon-blue.png',
		shadowUrl: './images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});
}


// Initialisierung der Karte
function initMap() {
	myMap = L.map('map').setView([49.250723, 7.377122], 13);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 20, // max. possible 23
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
	}).addTo(myMap);

	// registriere Callback-Methode auf der Karte
	myMap.on("click", mapClicked);
	markers = L.layerGroup().addTo(myMap);


	var pas=document.querySelector("#reg_password");

pas.addEventListener('keyup',function(){
checkpassword(pas.value)
})




}

// Callback-Methode. Wird aufgerufen, wenn auf die Karte
// "ge-clicked" wird
function mapClicked(event) {

    // Lösche Einfügemarkierung (rotes Icon), falls gesetzt
	if (currentCreatingMarker) {
		markers.removeLayer(currentCreatingMarker);
	}
	
	// Setze neue Markierung (rotes Icon)
	currentCreatingMarker = L.marker([event.latlng.lat, event.latlng.lng], { icon: redIcon });
	markers.addLayer(currentCreatingMarker);

	console.log(event);
	// Eingabemöglichkeit für den Poi-Titel anzeigen
	showTitleInput();
	
}
/* Password-----Password----- Password----- Password----- Password-----  */
/* Password-----Password----- Password----- Password----- Password-----  */

function checkpassword(password){
	var passlength=password.length;

	var cap=false;
	var sonderz=false;
	var zif=false;

	var capitalletter=/[A-ZÄÜÖ]/;
	var smalllletter=/[a-zäöü]/;
	var sonderzeichen= /[!?§$%&#*+-.]/;
	var ziffer=/[0-9]/;

	var cap=capitalletter.test(password);
	var sonderz=sonderzeichen.test(password);
	var zif=ziffer.test(password);
	var smalll=smalllletter.test(password);

	var size=0;
	if(password.length>5){
		passwordOk=true;
		if(cap)
		size+=10;
		if(sonderz)
		size+=10;
		if(zif)size+=5;
		if(smalll)
		size+=5;
		if(passlength>7&&cap&&sonderz&&zif&&smalll)
		size+=20;

	}
	else {
		passwordOk=false;
	}
	
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	// Create gradient
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(10,10,150,180);
	var grd = ctx.createLinearGradient(0,0,size*10,0);
	grd.addColorStop(0,"green");
	grd.addColorStop(1,"red");
	// Fill with gradient
	ctx.fillStyle = grd;
	ctx.fillRect(10,10,150,80);
	
	checkIfAllOk();
	
}


