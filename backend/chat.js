var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    req.app.locals.listSessions[req.body.session].chat.push(req.body.chat);
    req.app.locals.listSessions[req.body.session].chat.push(Math.random().toString());

    res.send({
        'type': "success",
        'message': req.app.locals.listSessions[req.body.session].chat
    });
});

module.exports = router;