var express = require('express');
var router = express.Router();

let openai = require('@openai/agents');

router.post('/', async function(req, res, next) {
    let sessions = req.app.locals.listSessions;

    sessions[req.body.session].chat.push(req.body.chat);

    if (sessions[req.body.session].chat.length === 1) {
        sessions[req.body.session]["agent"] = new openai.Agent({
            name: 'Assistant',
            instructions: createInitPrompt(sessions[req.body.session].persona),
        });
    }
    //sessions[req.body.session].chat.push(Math.random().toString());

    let prompt = sessions[req.body.session].chat.at(-1);
    let resp = await openai.run(
        sessions[req.body.session].agent,
        prompt
    )

    sessions[req.body.session].chat.push(resp.finalOutput);

    res.send({
        'type': "success",
        'message': sessions[req.body.session].chat
    });
});

function createInitPrompt(persona) {
    const knowledge = {
        "1": "Your immediate family have always been Christians but you've drifted away",
        "2": "Some of your grandparents and your cousins are Christians and have mentioned their faith at family gatherings",
        "3": "Your best friend is a Christian and has mentioned his faith once or twice",
        "4": "Some friends you hang out with on a monthly basis are Christians and feel different to you",
        "5": "You've heard about Christianity but you haven't really experienced anything for yourself",
        "6": "You've never heard about Christianity before"
    };
    return `Imagine that your name is ${persona.name} and you are ${persona.age}. ${persona.interests}. You have ${knowledge[persona.experience]}. I want to try sharing my testimony with you.`;
}

module.exports = router;