const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Multeri konfiguratsioon: määrame, kuhu failid salvestatakse
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serveeri staatilisi faile ja luba juurdepääs kaustale `uploads`
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Profiilipildi üleslaadimise API
app.post('/upload-profile-picture', upload.single('profilePicture'), (req, res) => {
    if (req.file) {
        res.json({ profilePicture: req.file.filename });
    } else {
        res.status(400).json({ error: 'Faili ei õnnestunud üles laadida' });
    }
});

// Profiilipildi saamise API
app.get('/get-profile-picture', (req, res) => {
    const profilePicture = 'default-profile.png'; // Hangi pilt või määra vaikimisi pilt
    res.json({ profilePicture });
});

// Serveri käivitamine
app.listen(port, () => {
    console.log(`Server töötab aadressil http://localhost:${port}`);
});
