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
	var artistDiv = document.createElement("div");
	artistDiv.classList.add("artist");
	var artistForm = document.getElementById("artistForm");
	var text = "";
	var formIndex = 0;
	
	//Create <p> for artist name
	var namePara = document.createElement("P");
	var artistName = document.createTextNode(artistForm.elements[formIndex++].value);
	namePara.appendChild(artistName);
	namePara.classList.add("name");
	
	//Create <p> for "about" artist
	var aboutPara = document.createElement("P");
	var artistAbout = document.createTextNode(artistForm.elements[formIndex++].value);
	aboutPara.appendChild(artistAbout);
	aboutPara.classList.add("about");
	
	//Create <p> for image url
	var imagePara = document.createElement("P");
	var artistURL = artistForm.elements[formIndex++].value;
	var imageTag = document.createElement("IMG");
	imageTag.src = artistURL;
	imagePara.appendChild(imageTag);
	imagePara.classList.add("photo");
		
	//Create delete button
	var deleteButton = document.createElement("BUTTON");
	deleteButton.id = 'deleteButton';
	var buttonText = document.createTextNode("Delete");
	deleteButton.appendChild(buttonText);
	deleteButton.onclick = function() {
		artistDiv.remove();
	};
	
	aboutPara.appendChild(deleteButton);
	artistDiv.appendChild(imagePara);
	artistDiv.appendChild(namePara);
	artistDiv.appendChild(aboutPara);
	document.getElementById("parent").appendChild(artistDiv);
	
	artistForm.reset();
	artistForm.style.display = "none";
}