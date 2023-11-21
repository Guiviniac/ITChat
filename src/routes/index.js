// routes/index.js

const express = require('express');
const router = express.Router();

// Rota principal (index)
router.get('/', (req, res) => {
    res.sendFile('login.html', { root: './src/public/' }); // Altere para login.html
});

module.exports = router;
