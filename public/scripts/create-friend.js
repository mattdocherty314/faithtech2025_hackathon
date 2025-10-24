const HOSTNAME = "http://localhost:3000"

window.addEventListener("load", loadPage);
let formElements = {}

function loadPage() {
    formElements = {
        'name': document.getElementById('name'),
        'age': document.getElementById('age'),
        'experience': document.getElementById('experience'),
        'interests': document.getElementById('interests') 
    };
    let createButton = document.getElementById('create');

    createButton.addEventListener('click', createPersona);
}

function createPersona() {
    let formValues = getFormValues(formElements);

    fetch(`${HOSTNAME}/session`, {
        method: 'POST',
        body: JSON.stringify(formValues)
    })
    .then(response => response.json())
    .then((data) => {
        createPersonaCookie(formValues, data.message, 7);
    })
}

function getFormValues(form) {
    let values = {};
    Object.keys(form).forEach((k, i) => {values[k] = form[k].value});

    return values;
}

function createPersonaCookie(values, session, expDays) {
    const d = new Date();
    let expiryStr = `expires=${d.toUTCString(d.setTime(d.getTime() + (expDays*24*60*60*1000)))}`;
    let formStr = `value=${JSON.stringify(values)}`
    document.cookie = `${formStr};${expiryStr};path='/'`;
}