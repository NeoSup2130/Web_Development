"use strict";

const myCardSet = [
    "duck", "kitten", "piglet", "puppy", "calf", "veal", "lamb", "rooster",
    "horse", "mouse", "dog", "cat", "goose", "goat", "sheep", "pig", "cow", "chick", "hen"
];

const myField = document.getElementById('field');
myField.addEventListener('click', onClickCard);
window.addEventListener('load', populateField);

function onClickCard(event){
    console.log("myField: Card clicked!");
    if (event.target.hasAttribute('animal'))
    {
        console.log(event.target.getAttribute('animal'));
    }
}

function populateField(){
    console.log("Populate field!");
    myCardSet.forEach(createCard);
}

function createCard(value, index, array) {
    // const halfLen = Math.round(array.length / 2);
    let newTile = document.createElement('div');
    let newCard = document.createElement('img');
    const imagePath = "img/", exten = ".jpg";
    const cardImage = imagePath + value + exten;
    newCard.setAttribute('src', cardImage);
    newCard.setAttribute('animal', value);
    
    myField.appendChild(newTile);
    newTile.appendChild(newCard);
}
