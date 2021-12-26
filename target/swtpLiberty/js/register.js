


var vname=false;
var nname=false;
var plzOk=false;
var emailOk=false;
var strnrOk=false;
var streetOk=false;
var str=false;
var passwordOk=false;
var useridOk=false;
function checkname(el)
{	
	let nameInput;
	
	if(el=="vname"){
		nameInput = document.querySelector("#vname").value;
	}
	else{nameInput = document.querySelector("#nname").value;}
	
if (nameInput.length === 0)
    return;

let nameRegEx = /^[A-ZÄÖÜ][a-zäöüßA-ZÄÖÜ]*[a-zäöüß]$/;
if (nameRegEx.test(nameInput) == false) {
	if(el=="vname"){   vname = false; }
 else
	nname=false;
}
else {
	if(el=="vname"){vname=true;}
	nname=true;
	
	
 
}
checkIfAllOk();

  
  
}


function checkIfAllOk() {
	
	let allOk = vname & nname&emailOk&plzOk&strnrOk&passwordOk&useridOk&streetOk;

	if (allOk) {
		document.querySelector("#reg_btn").disabled = false;
	}
	else {
		document.querySelector("#reg_btn").disabled = true;
	}
}
/* Vname---- Vname----Vname----Vname----Vname----Vname----Vname----*/
function checkvnameformat(){
	if(document.querySelector("#vname").value.length==0)
	return;
	if(vname==false)
	document.querySelector("#errorvname").innerHTML=" Vorname Format is wrong";
	if(vname)
	document.querySelector("#errorvname").innerHTML="";
}

function chekvnameonfocus(){
	document.querySelector("#errorvname").innerHTML="";
}

/*Nname----Nname----Nname----Nname----Nname----Nname----Nname----*/
function checknnameformat(){
	if(document.querySelector("#nname").value.length==0)
	return;
	if(nname==false)
	document.querySelector("#errornname").innerHTML="Nachname Format is wrong";
	if(nname)
	document.querySelector("#errornname").innerHTML="";
}

function cheknnameonfocus(){
	document.querySelector("#errornname").innerHTML="";
}

function show_register(){

	document.querySelector("#register").style.display="block";
	document.querySelector("#login").style.display="none";
}
function hide_register(){

	document.querySelector("#register").style.display="none";
	document.querySelector("#login").style.display="block";
}
function show_info(){
	document.querySelector("#kneipe_info").style.display="block";

}
function hide_info(){
	document.querySelector("#kneipe_info").style.display="none";
}
function CheckStreet(){


	let value=document.querySelector('#str').value;

}
/*Street-----Street-----Street-----Street-----Street-----Street----- */
function CheckStreet(){
	let street=document.querySelector("#str").value;
	if(street.length===0)
	return ;
	let streetform=/^[a-zäöüßA-ZÄÖÜ]{3,}/;
	if(streetform.test(street))
	streetOk=true;
	else streetOk=false;
	checkIfAllOk();
}
function checkstreetonblur(){

	if(document.querySelector("#str").value.length==0)
	return;
	if(streetOk==false)
	document.querySelector("#errorstreet").innerHTML="Street Format is wrong";
}
function checkstreetonfocus(){
	document.querySelector("#errorstreet").innerHTML="";
}
/*StraßeNr----StraßeNr----StraßeNr----StraßeNr----StraßeNr----StraßeNr----*/
function CheckStrNrOnFocus(){
	document.querySelector('#errorstreetNr').innerHTML="";
}
function CheckStrNrOnBlur(){
	if(document.querySelector('#strnr').value.length==0)
	return;
	if(strnrOk==false)
	document.querySelector('#errorstreetNr').innerHTML=" StreetNr Format is wrong";
}
function CheckStreetNr(){
	let strnr=document.querySelector('#strnr').value;
	if(strnr.length===0)
	return;
	
	///^[0-9]{1,}[0-9a-zäöüßA-ZÄÖÜ]$/;
	let strnrform=/^[0-9]{1,}[0-9a-zäöüßA-ZÄÖÜ]{0,1}$/;
	if(strnrform.test(strnr)==false){strnrOk=false;}
	else{
		strnrOk=true;
	}
	checkIfAllOk();
	
}
/*PLZ PLZ PLZ PLZ PLZ PLZ PLZ PLZ PLZ PLZ PLZ*/
function getPlzFromEscher() {
	plzOk = false;

	let value = document.querySelector('#plz').value;

	if (value.length != 5) {
		let divElement = document.querySelector("#ort");
		while (divElement.firstChild) {
			divElement.removeChild(divElement.firstChild);
		}

	}
	if (value.length == 5) {



		
		let url = 'http://escher.informatik.hs-kl.de/PlzService/ort?plz=' + value;

		fetch(url)
			.then((response) => response.text())
			.then((data) => {


				data.trim().slice(0, -1).split(";").forEach(ort => {
					console.log(ort);
					let liElement = document.createElement("option");
					console.log(ort.slice(6));
					liElement.innerHTML = ort.slice(6);
			
					console.log(liElement);
					
					window.ort.value=ort.slice(6);
					document.querySelector("#ort").append(liElement);
			
				});

				if (document.querySelector("#ort").value.length != 0) plzOk = true;
			})
			.catch((error) => console.error(error));


	}

	// if (document.querySelector('#plz').value.length == 5 &&  plzOk = true;

	checkIfAllOk();

}
function checkPlzOnFocus() {
	document.querySelector("#errorPlz").innerHTML = "";
}

function checkPlzOnBlur() {
	if (document.querySelector("#plz").value.length == 0)
		return;

	if (document.querySelector("#plz").value.length != 0 && document.querySelector("#ort").value.length == 0) {
		document.querySelector("#errorPlz").innerHTML = "Format der PLZ ist falsch";
		//  plzOk = false;		
	}

	// else plzOk = true;
}
/* Email----Email----Email----Email----Email----Email----Email---- */
function checkEmail() {
	emailOk = false;

	let emailInput = document.querySelector("#email").value;
	if (emailInput.length === 0)
		return;

	let emailRegEx = /^\w{4}\d{4,}@stud\.(hs-kl|fh-kl)\.de$/;
	if (emailRegEx.test(emailInput) == false) {
		emailOk = false;
	}
	else {
		emailOk = true;
	}

	checkIfAllOk();
}

function checkEmailOnFocus() {
	document.querySelector("#errorEmail").innerHTML = "";
}

function checkEmailOnBlur() {
	if (document.querySelector("#email").value.length == 0)
		return;

	if (emailOk == false) {
		document.querySelector("#errorEmail").innerHTML = "Format der E-Mail-Adresse ist falsch";
	}
}
function checkuserid(){
	let userid=document.querySelector("#userid").value;
	if(userid.length===0)
	return;
	let idform= /^[a-zäöüßA-ZÄÖÜ][a-zäöüßA-ZÄÖÜ1-9]{4,}$/;
	if(idform.test(userid))
	useridOk=true;
	else useridOk=false;
	checkIfAllOk();

}
function checkuseridonblur(){
	if(document.querySelector("#userid").value.length==0)
	return;
	if(useridOk==false)
	document.querySelector("#erroruserid").innerHTML="Userid Format is wrong";



}
function checkuseridonfocus(){
	document.querySelector("#erroruserid").innerHTML="";
}
/* ---------------------- Register---------------------- */
function register(){
	console.log("in Register");
	let user={
		username: document.querySelector("#userid").value,
		email: document.querySelector("#email").value,
		firstname: document.querySelector("#vname").value,
		lastname: document.querySelector("#nname").value,
		street: document.querySelector("#str").value,
		streetNr: document.querySelector("#strnr").value,
		zip: document.querySelector("#plz").value,
		city: document.querySelector("#ort").value,
		password: document.querySelector("#reg_password").value

	};
	console.log(user.username);
	console.log("in Register");
	fetch('http://localhost:9080/swtpLiberty/app/register', {
		method: 'post',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(response => {
		document.querySelector("#welcome").innerHTML="Herzlich willkommen"+user.username;
		if(!response.ok){
			console.log("in response");
		document.querySelector("#errorbenutzer").innerHTML="Benutzer Exstiert";
		console.log("in response");
		throw Error(response.statusText)}
		else{
			console.log("Success");
		}
	}).catch(error => console.error('Error:', error));
}

function login(){
	console.log("in login");
let data={
	username:document.querySelector("#username").value,
	password:document.querySelector("#password").value
};
fetch('http://localhost:9080/swtpLiberty/app/login', {
	method:'post',
	headers:{'Content-type': 'application/json'},
	body:JSON.stringify(data)

}).then(response=>
{
	document.querySelector("#welcome").value="Herzlich willkommen "+data.username;
	if(!response.ok){
		document.querySelector("#accessError").innerHTML="Daten sind fehlerhaft!";
	}
	else{
		//changeVisibility();
		//getMyKommentare();
	}

}).catch(error=>console.error('Error',error));
}



