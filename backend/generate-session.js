var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    let session = generateRandomSession(8);
    res.send({
        'type': "success",
        'message': session
    });
});

function generateRandomSession(digits) {
    return Math.round((Math.random()*(Math.pow(16,digits)))).toString(16);
}

module.exports = router;