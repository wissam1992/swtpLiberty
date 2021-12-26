"using strict";

window.onload = function()
{
	changeVisibility();
}

function changeVisibility()
{
	  var x = document.querySelector("#access");
	  if (x.style.display === "block") {
	    x.style.display = "none";
	  } else {
	    x.style.display = "block";
	  }
	  
	  var x = document.querySelector("#note");
	  if (x.style.display === "none") {
	    x.style.display = "block";
	  } else {
	    x.style.display = "none";
	  }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Functions accessing LoginController
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function login()
{
	let data = { username : document.querySelector("#username").value, 
		         password : document.querySelector("#password").value 
		   };

	fetch('app/login',   {
	    method: 'post',
	    headers: {
	    	'Content-type': 'application/json' 
	    },
	    body: JSON.stringify(data)
	  })
	  .then( response => {
		    document.querySelector("#username").value = "";
		    document.querySelector("#password").value = "";
			if( !response.ok )
			{
				document.querySelector("#accessError").innerHTML = "Benutzerdaten sind fehlerhaft!";
				throw Error(response.statusText);
			}
			else
			{
				changeVisibility();
				getNotes();
			}
		} )
	 .catch( error => console.error('Error:', error));
}


function logout()
{
	fetch('app/login',   {
	    method: 'delete'
	  })
	  .then( response => {
		  if( response.ok )
	      {
			  changeVisibility();
		  }  
	  } )
	  .catch( error => console.error('Error:', error) );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Functions accessing RegisterController
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function register()
{
	let data = { username : document.querySelector("#username").value, 
			     password : document.querySelector("#password").value 
			   };

	fetch('app/register',   {
	    method: 'post',
	    headers: {
	    	'Content-type': 'application/json' 
	    },
	    body: JSON.stringify(data)
	  })
	.then( response => {
		document.querySelector("#username").value = "";
	    document.querySelector("#password").value = "";
		if( !response.ok )
		{
			document.querySelector("#accessError").innerHTML = "Benutzer existiert bereits!";
			throw Error(response.statusText);
		}
		else
		{
			changeVisibility();
			getNotes();
		}
	} )
	.catch( error => console.error('Error:', error));
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Functions accessing NoteController
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function getNotes()
{
	fetch('app/notes')
	.then( response => response.json() )
	.then( data => printListe(data) )
	.catch( error => console.error('Error:', error) );
}

function clearNotes()
{
	fetch('app/notes', { method: 'DELETE'})
	 .then( response => fetch('app/notes') )
	 .then( response => response.json() )
	 .then( data => printListe(data) )
	 .catch( error => console.error('Error:', error) );
}

function addNote()
{
	let data = { subject : document.querySelector("#subject").value, 
			     content : document.querySelector("#content").value 
			   };

	fetch('app/notes',   {
	    method: 'post',
	    headers: {
	    	'Content-type': 'application/json' 
	    },
	    body: JSON.stringify(data)
	  })
	.then( response => fetch('app/notes') )
	.then( response => response.json() )
	.then( data => printListe(data) )
	.catch( error => console.error('Error:', error) );
}



function printListe(data)
{
	document.querySelector("#subject").value = "";
	document.querySelector("#content").value = "";
	
	let div = document.querySelector("#notelist");
	div.innerHTML = "";
	let ul = document.createElement("ul");
	div.append( ul );
	
	console.log( data );
	
	data.notes.forEach( item => { 
		let li = document.createElement("li");
		li.append( item.creationDate + " : " + item.subject  + " => " + item.content );
		ul.append(li);
	} );
}

function clearErrorMessage()
{
	document.querySelector("#accessError").innerHTML = "";
}
