const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('./website/index');
})

router.get('/findme', (req, res) => {
    res.render('./website/findme');
})

module.exports = router;