"use strict";

class Card 
{
    constructor(cardObject) 
    {
        this.card1 = cardObject.card1;
        this.card2 = cardObject.card2;
        this.set = cardObject.set;
        this.sound = cardObject.card1 + ".wav";
    }
}

const utilities = {
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
    },

    removeAllChildren(target) 
    {
        while(target.firstChild) 
        {
            target.removeChild(target.firstChild);
        }
    },

    getCookie(key) 
    {
        return document.cookie.split('; ').find((row) => row.startsWith(`${key}=`))?.split('=')[1];
    },
    
    setCookie(key, value, days)
    {
        const expire = new Date();
        expire.setTime(expire.getTime() + days * 24 * 60 * 60 * 1000);
        const newNameCookie = `${key}=${value};expires=${expire.toUTCString()};`;
        console.log(newNameCookie + " current data: " + new Date().toUTCString());
        document.cookie = newNameCookie;
    },

    updateElement(target, value) 
    {
        target.innerText = value;
    },

    // Returns undefined if it's not a number
    getIntFromElement(target) 
    {
        return Number(target.innerText);
    }
}

function fetchCards() 
{
    const path = './assets/cards.json';
    return fetch(path).then
        (response => response.json()).then
            (cards => cards.map(card => new Card(card)));
}

let myCardArray = fetchCards().then(result => myCardArray = result);
let myCardSet = [];

const view = 
{
    myField : document.getElementById('field'),
    btnGenerate : document.getElementById('generate'),
    boardSelect : document.getElementById('boardSelection'),
    score : document.getElementById('score'),
    attempts : document.getElementById('attempts'),
    successes : document.getElementById('successes'),
    gameTime : document.getElementById('gameTime'),
    timer : document.getElementById('timer'),
    maxGameTime : 60 * 2.0,
    gameTimeLeft : 60 * 2.0,
    boardSizes: ["board4", "board5", "board6"],
    cardSetsLeft : 0,

    getBoardIndex : function()
    {
        return this.boardSelect.selectedIndex - 1;
    },
    getBoardClass : function() 
    {
        const index = this.getBoardIndex();
        return this.boardSizes[index];
    },
    restartGame : function() 
    {
        utilities.removeAllChildren(this.myField);
        utilities.updateElement(score, 0);
        utilities.updateElement(attempts, 0);
        utilities.updateElement(successes, 0);
        this.gameTimeLeft = this.maxGameTime;
        utilities.updateElement(this.gameTime, this.getGameTimeString());

        playerController.gameOver = false;
    },
    isCardCovered : function(card) 
    {
        const targetClass = card.lastChild.classList;
        return targetClass.contains('covered');
    },
    flipCard : function(card)
    {
        const targetClass = card.lastChild.classList;
        targetClass.toggle("covered");
        targetClass.toggle("uncovered");
    },
    getAnimalType : function(card)
    {
        const animalCard = card.firstChild;
        if (animalCard.hasAttribute('animal'))
            return animalCard.getAttribute('animal');
        else return undefined;
    },
    playAnimalSound : (function()
    {
        let sound = new Audio(undefined);
        function playSound(card) 
        {
            const index = Array.prototype.indexOf.call(card.parentNode.children, card);
            sound.pause();
            sound = new Audio("./assets/snd/" + myCardSet[index].sound);
            sound.play();
        }
        return playSound;
    })(),

    getGameTimeString()
    {
        function getValidNotation(i) {
            return (i < 10) ? "0" + i : i;
        }
        const m = Math.floor(this.gameTimeLeft / 60);
        const s = this.gameTimeLeft - m * 60;
        return getValidNotation(m) + ':' + getValidNotation(s);
    }
}

const playerController = 
{
    selectedCards : [],
    maxTimeOut : 1000,
    allowMove : true,
    gameOver : false,
    scores : ['4x4', '5x5', '6x6'],
    playerName : '',
    addSelected : function(card) 
    {
        this.selectedCards.push(card);
        if (this.selectedCards.length == 2)
        {
            this.resolveMatch(this.selectedCards);
            this.selectedCards = [];
            this.allowMove = false;
        }
    },
    
    resolveMatch : function(cards) 
    {
        let score = utilities.getIntFromElement(view.score);

        let attempts = utilities.getIntFromElement(view.attempts);
        utilities.updateElement(view.attempts, ++attempts);

        const doMatch = view.getAnimalType(cards[0]) == view.getAnimalType(cards[1]);
        if (doMatch)
        {
            let successes = utilities.getIntFromElement(view.successes);
            utilities.updateElement(view.successes, ++successes);

            utilities.updateElement(view.score, score + 50);
            setTimeout(this.correctMatch.bind(this), this.maxTimeOut, cards);
        }
        else 
        {
            score -= 5;
            utilities.updateElement(view.score, (score < 0) ? 0 : score);
            setTimeout(this.wrongMatch.bind(this), this.maxTimeOut, cards);
        }        
    },

    resolveNextMove : function(matched)
    {
        if (matched && --view.cardSetsLeft == 0) 
        {
            handleTimer.stop();
            this.resolveWin();
        }
        this.allowMove = true;
    },

    correctMatch(cards) 
    {
        cards.forEach(target => utilities.removeAllChildren(target));
        this.resolveNextMove(true);
    },

    wrongMatch(cards)
    {
        cards.forEach(target => view.flipCard(target));
        this.resolveNextMove(false);
    },

    resolveWin()
    {
        const startTxt = `Congratulations ${this.playerName}! You have won!`;
        const scoreKey = this.scores[view.getBoardIndex()];
        let lastScore = utilities.getCookie(scoreKey);
        // Als lastScore undefined is (false) dan willen we 0 ipv undefined.
        lastScore = lastScore ? lastScore : 0;
        const score = view.score.innerText;

        if (Number(lastScore) < Number(score))
        {
            alert(startTxt + `\nYou have a new highscore for ${scoreKey} board!\nYour last score was ${lastScore}. New highscore is ${score}!`);
            utilities.setCookie(scoreKey, score, 1);
        } else {
            alert(startTxt + `\nYou haven't reached a new highscore for ${scoreKey} board!\nYour last score was ${lastScore}. Your score is ${score}!`);
        }
    },
    timeOut()
    {
        alert('Time has run out!');
        this.gameOver = true;
    }
}

function greetPlayer()
{
    let value = utilities.getCookie('playerName');
    if (value == undefined)
    {
        value = encodeURIComponent(prompt("Wat is jouw naam nieuwe speler?"));
        utilities.setCookie('playerName', value, 1);
    }
    let scores = '';
    playerController.scores.forEach(size => 
        {
            const score = utilities.getCookie(size);
            if (score != undefined)
                scores += `board ${size} = ${score}\n`;
        })
    alert(`Welcome ${value}! You can play my memory game now :)\nYour last scores were\n` + scores);
    playerController.playerName = value;
}

greetPlayer();

view.myField.addEventListener('click', onClickCard);
view.btnGenerate.addEventListener('click', startGame);
view.boardSelect.addEventListener('change', onSelectFieldSize);

function onSelectFieldSize() 
{
    view.btnGenerate.disabled = false;
}

function startGame()
{
    handleTimer.stop();
    utilities.yatesShuffle.call(this, myCardArray);

    // Bereken de helft van de set. Ex. 5^2 = 25 dus de helft is 25 / 2 = 12
    const arrayEnd = Math.floor(Math.pow(4 + view.getBoardIndex(), 2) / 2);

    view.cardSetsLeft = arrayEnd;
    view.timer.style.visibility = 'visible';

    myCardSet = myCardArray.slice(0, arrayEnd);
    myCardSet = myCardSet.concat(myCardSet);
    utilities.yatesShuffle.call(this, myCardSet);

    populateField(myCardSet);
    handleTimer.start();
}

const handleTimer = (function()
{
    let timerID = 0;

    function startTimer()
    {
        if (--view.gameTimeLeft > 0)
        {
            utilities.updateElement(view.gameTime, view.getGameTimeString());
            timerID = setTimeout(startTimer, 1000);
        } else {
            utilities.updateElement(view.gameTime, '00:00');
            setTimeout(playerController.timeOut.bind(playerController), 50);
        } 
    }

    return {
        start() {
            startTimer();
        },
        getTimerID() {
            return timerID;
        },
        stop() {
            clearTimeout(timerID);
        }
    };
})();


function onClickCard(event)
{
    const card = event.target.parentElement;
    
    if (view.isCardCovered(card) && playerController.allowMove && !playerController.gameOver)
    {
        view.flipCard(card);
        const animal = view.getAnimalType(card);

        if (animal)
        {
            console.log(animal);
            view.playAnimalSound(card);
            playerController.addSelected(card);
        }
    } 
}

function populateField(cardDeck)
{
    view.restartGame();
    cardDeck.forEach(card => createCard(card.card1));
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
