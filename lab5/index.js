let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let fs = require('fs');

let http = require('http');
const PORT = 3000;

app.listen(3000, () => console.log('Server ready at 3000'))

const artistDir = './artistlist.json'

app.use(express.static('public'));
app.use(express.json({limit: '2mb'}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.post('/artistlist', (req, res)=> {
    console.log("received a POST req from client");

    let artist = req.body;

    if (fs.existsSync(artistDir)) {
        addToArtistList(artist);
    } else {
        saveArtistToFile(artist);
    }

    res.json({
        name: artist.name,
        about: artist.about,
        url: artist.url
    });
});

app.get('/artists', (req, res) => {
    artistList = [];
    if (fs.existsSync(artistDir)) {
        artistList = JSON.parse(fs.readFileSync('artistlist.json', 'utf8'));
    }
    res.json(artistList);
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
    let artistList = [];

    artistList = JSON.parse(fs.readFileSync('artistlist.json', 'utf8'));
    artistList.push(data);
    saveArtistToFile(artistList);
}