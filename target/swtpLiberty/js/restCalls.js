window.addEventListener("load", loadPois );
window.addEventListener("load", () => {
	document.querySelector("#createPoiBtn").addEventListener("click", createPoi);
});


function createPoi() {
	let title = document.querySelector("#createPoiInput").value;
	let longitude = currentCreatingMarker._latlng.lng;
	let latitude = currentCreatingMarker._latlng.lat;

	let poiDto = {
		'latitude': latitude,
		'longitude': longitude,
		'title': title
	};

	console.log(poiDto);
	fetch('./map/pois', {
		method: 'post',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(poiDto)
	})
		.then(response => {
			if (response.ok) {
				hideInteraction();
				loadPois();
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}


function loadPois() {
	fetch('./map/pois')
		.then(response => response.json())
		.then(pois => {
			markers.clearLayers();
			for (let poi of pois) {
				console.log(poi);
				addPoiToMap(poi);
			}
		})
		.catch(error => console.error('Error:', error));
}

function addPoiToMap(poi) {
	let marker = L.marker([poi.latitude, poi.longitude], { icon: blueIcon })
		.on("click", (event) => {
			console.log(poi);
			showDescription(poi);
			if (currentSelectedMarker) {
				currentSelectedMarker.setIcon(blueIcon);
			}
			currentSelectedMarker = event.target.setIcon(redIcon);
		});
	markers.addLayer(marker);

	return marker;
}