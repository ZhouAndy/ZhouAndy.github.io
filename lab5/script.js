async function getArtistList() {
	const res = await fetch('/artists');
	const artistData = await res.json();

	return artistData;
}

function onloadFunction() {
	var artistString = [];
	artistString = getArtistList();
	
	artistString.then(function(artistList) {
		for (let i = 0; i < artistList.length; i++) {
			appendArtist(artistList[i].name, artistList[i].about, artistList[i].url, artistList[i].timestamp);
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
	var artistTime = new Date().getTime();
	
	appendArtist(artistName, artistAbout, artistURL, artistTime);
	let artist = {name: artistName, about: artistAbout, url: artistURL, timestamp: artistTime};
	
	saveArtist(artist);
	
	artistForm.reset();
	artistForm.style.display = "none";
}

function saveArtist(artist) {
	let artistJSON = JSON.stringify(artist);
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: artistJSON
	};
	fetch('/artistlist', options)
	.then(res => {console.log(res)});
}

function appendArtist(name, about, url, timestamp) {
	var artistDiv = document.createElement("div");
	artistDiv.classList.add("artist");
	artistDiv.id = timestamp;

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
	console.log(parentDiv.id);
	var deleteStamp = {timestamp: parentDiv.id};
	var timeJSON = JSON.stringify(deleteStamp);
	parentDiv.remove();

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: timeJSON
		
	};
	fetch('/deleteArtist', options)
	.then(res => {console.log(res)});
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