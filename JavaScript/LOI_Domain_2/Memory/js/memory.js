"use strict";

const myCardArray = [
    "duck", "kitten", "piglet", "puppy", "calf", "veal", "lamb", "rooster",
    "horse", "mouse", "dog", "cat", "goose", "goat", "sheep", "pig", "cow", "chick", "hen"
];

let myCardSet = [];

class Card 
{
    constructor(card1, card2 = card1, set = card1, sound = card1) 
    {
        this.card1 = card1;
        this.card2 = card2;
        this.set = set;
        this.sound = sound;
    }
}

const arrayUtils = {
    yatesShuffle : function(args) 
    {
        var m = args.length, i;
    
        while (m) 
        {
            i = Math.floor(Math.random() * m--);
            let t = args[m];
            args[m] = args[i];
            args[i] = t;
        }
        return args;
    }
}

const view = 
{
    myField : document.getElementById('field'),
    btnGenerate : document.getElementById('generate'),
    clearField : function() 
    {
        while(this.myField.firstChild) 
        {
            this.myField.removeChild(this.myField.firstChild);
        }
    }
}

view.myField.addEventListener('click', onClickCard);
view.btnGenerate.addEventListener('click', populateField);

function onClickCard(event)
{
    console.log("myField: Card clicked!");
    if (event.target.hasAttribute('animal'))
    {
        console.log(event.target.getAttribute('animal'));
    }
}

function populateField()
{
    console.log("Populate field!");
    view.clearField();
    arrayUtils.yatesShuffle.call(this, myCardArray);
    const myDblCardArray = myCardArray.concat(myCardArray);
    myCardSet = myDblCardArray.map(animal => new Card(animal));
    myCardSet.forEach(card => createCard(card.card1));
}

function createCard(value, index, array) 
{
    let newTile = document.createElement('div');
    let newCard = document.createElement('img');
    const imagePath = "img/", exten = ".jpg";
    const cardImage = imagePath + value + exten;
    newCard.setAttribute('src', cardImage);
    newCard.setAttribute('animal', value);
    
    view.myField.appendChild(newTile);
    newTile.appendChild(newCard);
}
