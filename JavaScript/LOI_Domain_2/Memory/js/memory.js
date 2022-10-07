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
    boardSelect : document.getElementById('boardSelection'),
    boardSizes: ["board4", "board5", "board6"],

    getBoardIndex : function()
    {
        return this.boardSelect.selectedIndex - 1;
    },
    getBoardClass : function() 
    {
        const index = this.getBoardIndex();
        return this.boardSizes[index];
    },
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
view.boardSelect.addEventListener('change', onSelectFieldSize);

function onSelectFieldSize() 
{
    view.btnGenerate.disabled = false;
}

function onClickCard(event)
{
    const targetClass = event.target.classList;

    if (targetClass.contains("covered"))
    {
        targetClass.remove("covered");
        targetClass.add("uncovered");
    } 
    
    if (targetClass.contains('uncovered'))
    {
        const animalCard = event.target.previousElementSibling;
        if (animalCard.hasAttribute('animal'))
        {
            console.log(animalCard.getAttribute('animal'));
        }
    }
}

function populateField()
{
    view.clearField();
    arrayUtils.yatesShuffle.call(this, myCardArray);

    // Bereken de helft van de set. Ex. 5^2 = 25 dus de helft is 25 / 2 = 12
    const arrayEnd = Math.floor(Math.pow(4 + view.getBoardIndex(), 2) / 2);

    let myDblCardArray = myCardArray.slice(0, arrayEnd);
    myDblCardArray = myDblCardArray.concat(myDblCardArray);
    arrayUtils.yatesShuffle.call(this, myDblCardArray);
    
    myCardSet = myDblCardArray.map(animal => new Card(animal));
    myCardSet.forEach(card => createCard(card.card1));
}

function createCard(value, index, array) 
{
    let newTile = document.createElement('div');
    let newCard = document.createElement('img');
    let coverCard = document.createElement('img');

    const imagePath = "img/", exten = ".jpg";
    const cardImage = imagePath + value + exten;

    newCard.setAttribute('src', cardImage);
    newCard.setAttribute('animal', value);

    coverCard.setAttribute('src', imagePath + "cover.png");
    coverCard.setAttribute('class', 'covered');

    newTile.setAttribute('class', view.getBoardClass());

    view.myField.appendChild(newTile);
    newTile.appendChild(newCard);
    newTile.appendChild(coverCard);
}
