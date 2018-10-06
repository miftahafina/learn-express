var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('GET route on things.');
});

router.post('/', (req, res) => {
    res.send('POST route on things.');
});

// export to use in index.js
module.exports = router;