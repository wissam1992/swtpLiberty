/*
* Methoden für die Anzeige der Infoausgaben und
* Eingabe der Daten eines neuen Poi
*/

// Alle Anzeigen werden beim Laden der Seite ausgeblendet
window.addEventListener("load", hideInteraction);

function hideInteraction() {
	let divShowPoi = document.querySelector("#showPoi");
	let divCreatePoi = document.querySelector("#createPoi");

	divShowPoi.style.display = 'none';
	divCreatePoi.style.display = 'none';
}

function showDescription(poi) {

	if (currentCreatingMarker) {
		markers.removeLayer(currentCreatingMarker);
	}

	let divShowPoi = document.querySelector("#showPoi");
	let divCreatePoi = document.querySelector("#createPoi");
	let label = document.querySelector("#showPoitext");

	divShowPoi.style.display = 'inline';
	divCreatePoi.style.display = 'none';

	label.innerHTML = [poi.title, ' at lat :', poi.latitude, ', longitite ', poi.longitude].join('');
}

function showTitleInput() {

	let divShowPoi = document.querySelector("#showPoi");
	let divCreatePoi = document.querySelector("#createPoi");
	document.querySelector("#createPoiInput").value ="";
	

	divShowPoi.style.display = 'none';
	divCreatePoi.style.display = 'inline';
}

