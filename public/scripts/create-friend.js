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
}

function getFormValues(form) {
    let values = {};
    Object.keys(form).forEach((k, i) => {values[k] = form[k].value});

    return values;
}