// routes/dashboard.js

const express = require('express');
const router = express.Router();

// Rota do Dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile('dashboard.html', { root: './src/views' });
});

module.exports = router;
