// your code goes here ...
var form = document.getElementsByTagName('form')[0];

var debug = document.getElementsByClassName('debug')[0];
var householdElem = document.getElementsByClassName('household')[0];

document.getElementById('age').setAttribute("required", "required");
document.getElementById('rel').setAttribute("required", "required");

var addButton = document.getElementsByClassName('add')[0];
var submitButton = document.querySelectorAll('[type="submit"')[0]

addButton.setAttribute("type", "submit");
submitButton.setAttribute("type", "button");

var households = [];
function addHousehold() {
    var formData = new FormData(form);
    households.push({
        id: new Date().getTime()+"",
        age: formData.get("age"),
        relationship: formData.get("rel"),
        smoker: formData.get('smoker') === 'on',
    });
}
function updateHouseholdList() {
    var innerHtml = households.map((item) => `<li>${item.relationship}, Age: ${item.age}, Smoker: ${item.smoker} <button data-id="${item.id}">Remove</button></li>`).join('')
    householdElem.innerHTML = innerHtml;
}
submitButton.onclick = function(ev) {
    var formData = new FormData(form);
    let flag = false;
    for (const k of formData.keys()) {
        if (formData.get(k)) {
            flag = true;
        }
    }
    // if form has some data
    if (flag) {
        if (form.reportValidity()) {
            addHousehold();
        } else {
            return;
        }
    }

    if (households.length == 0) {
        debug.style.display='block';
        debug.textContent = "Please add household info";
    } else {
        debug.style.display='block';
        debug.textContent = JSON.stringify(households);
    }
    // updateHouseholdList();
    
    households = [];
}

form.onsubmit = function(ev) {
    addHousehold();
    updateHouseholdList();
    ev.stopPropagation();
    form.reset();
    return false;
}

householdElem.onclick=function(ev) {
    if (ev.target.tagName.toLowerCase() === 'button') {
        var id = ev.target.dataset.id;
        households = households.filter(item => item.id !== id);
        updateHouseholdList();
    }
}