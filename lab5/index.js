let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let fs = require('fs');

let http = require('http');
const PORT = 3000;

app.listen(3000, () => console.log('Server ready at 3000'))

const artistDir = './artistlist.json'

app.use(express.static('COMP4711'));
app.use(express.json({limit: '2mb'}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.post('/artistlist', (req, res)=> {
    console.log("received a POST req from client");

    var artist = req.body;
    
    if (fs.existsSync(artistDir)) {
        addToArtistList(artist);
    } else {
        var artistList = [];
        artistList.push(req.body);
        saveArtistToFile(artistList);
    }

    res.json({
        name: artist.name,
        about: artist.about,
        url: artist.url,
        timestamp: artist.timestamp
    });
});

app.post('/deleteArtist', (req,res) => {
    console.log("received request to delete artist from client");

    var artists = [];
    artists = getFileContents();

    for (var i = 0; i < artists.length; i++) {
        if (artists[i].timestamp == req.body.timestamp) {
            artists.splice(i,1);
        }
    }
   
    saveArtistToFile(artists);
});

app.get('/artists', (req, res) => {
    if (fs.existsSync(artistDir)) {
        artists = getFileContents();
        res.json(artists);
    }
  
});

function saveArtistToFile(data) {
    fs.writeFile('artistlist.json', JSON.stringify(data), err => {
        if (err) {
            console.log("error writing to artistlist");
            throw err;
        }
        console.log("artist(s) successfully written to artistlist");
    });
}

function addToArtistList(data) {
    var artistList = [];
    artistList = getFileContents();
    console.log(artistList);
    artistList.push(data);
    saveArtistToFile(artistList);
}

function getFileContents() {
    var fileData = [];
    fileData = JSON.parse(fs.readFileSync('artistlist.json', 'utf8'));

    return fileData;
}