async function getArtistList() {
	const res = await fetch('/artist');
	const artistData = await res.json();

	return artistData;
}

function onloadFunction() {
	var artistString = getArtistList();
	
	artistString.then(function(artistList) {
		for (var artist in artistList) {
			appendArtist(artist.name, artist.about, artist.url)
		}
	}) 

}

function showForm() {
	var x = document.getElementById('artistForm');
	var display = x.style.display;
	if (display == "none" || display == "") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
	
}

function addArtist() {
	var artistForm = document.getElementById("artistForm");
	
	var artistName = artistForm.elements[0].value;
	var artistAbout = artistForm.elements[1].value;
	var artistURL = artistForm.elements[2].value;
	
	appendArtist(artistName, artistAbout, artistURL);
	let artist = {name: artistName, about: artistAbout, url: artistURL};
	
	saveArtist(artist);
	
	artistForm.reset();
	artistForm.style.display = "none";
}

function saveArtist(artist) {
	let artistJSON = JSON.stringify(artist);
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: artistJSON
	};
	fetch('/artistlist', options)
	.then(res => {});
}

function appendArtist(name, about, url) {
	var artistDiv = document.createElement("div");
	artistDiv.classList.add("artist");
	
	//Create <p> for artist name
	var namePara = document.createElement("P");
	var artistName = document.createTextNode(name);
	namePara.appendChild(artistName);
	namePara.classList.add("name");
	
	//Create <p> for "about" artist
	var aboutPara = document.createElement("P");
	var artistAbout = document.createTextNode(about);
	aboutPara.appendChild(artistAbout);
	aboutPara.classList.add("about");
	
	//Create <p> for image url
	var imagePara = document.createElement("P");
	var imageTag = document.createElement("IMG");
	imageTag.src = url;
	imagePara.appendChild(imageTag);
	imagePara.classList.add("photo");
	
	//Create delete button
	var deleteButton = document.createElement("BUTTON");
	deleteButton.id = 'deleteButton';
	var buttonText = document.createTextNode("Delete");
	deleteButton.appendChild(buttonText);
	deleteButton.onclick = function() {
		deleteArtist(artistDiv);
	};
	
	aboutPara.appendChild(deleteButton);
	
	artistDiv.appendChild(imagePara);
	artistDiv.appendChild(namePara);
	artistDiv.appendChild(aboutPara);
	document.getElementById("parent").appendChild(artistDiv);
}

function deleteArtist(parentDiv) {
	parentDiv.remove();
	var deleteStamp = parentDiv.id;
	var artistString = [];
		artistString = JSON.parse(localStorage.getItem("artists"));
		if(!!artistString) {
			for(i = 0; i < artistString.length; i++) {
				if(artistString[i].timestamp == deleteStamp) {
					artistString.splice(i,1);
				}
			}
			
		}
	artistString = JSON.stringify(artistString);
	localStorage.setItem("artists", artistString);
}

function findArtist() {
	var input, filter, nameParas, txtValue;
	input = document.getElementById('searchInput');
	filter = input.value.toUpperCase();
	nameParas = document.getElementsByClassName("name")
	
	for (i = 0; i < nameParas.length; i++) {
		txtValue = nameParas[i].textContent || nameParas[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			nameParas[i].parentNode.style.display = "";
		} else {
			nameParas[i].parentNode.style.display = "none";
		}
	}
}