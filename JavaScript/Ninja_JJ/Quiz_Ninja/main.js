// var intervalID = 0;

// checkDocumentState();

// function checkDocumentState()
// {
//     console.log("Check document...");

//     if(document.readyState == "complete")
//     {
//         clearInterval(intervalID);
//         console.log("document is loaded... Start quiz!");
//         // startQuiz();
//     }
//     else  
//     {
//         console.log("wait...");
//         intervalID = setInterval(checkDocumentState, 100);
//     }
// }

const view = {
    score : document.querySelector('#score strong'),
    question : document.getElementById('question'),
    result : document.getElementById('result'),
    info : document.getElementById('info'),
    start : document.getElementById('start'),
    render(target, content, attributes) 
    {
        for (const key in attributes)
        {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },
    show(element) 
    {
        element.style.display = 'block';
    },
    hide(element) 
    {
        element.style.display = 'none';
    }
}

const game = {

    play(quiz) 
    {
        this.score = 0;
        this.questions = [...quiz];
        for (const question of this.questions)
        {
            this.question = question;
            this.ask();
        }
        this.gameOver();
    },

    ask() 
    {
        const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question, question);
        
        const response = prompt(question);
        this.check(response);
    },
    
    check(input) 
    {
        if (input == this.question.realName)
        {
            this.score++;
            view.render(view.result, 'This is correct!', {'class' : 'correct'});

        } else {
            this.score--;
            const info = `This is wrong! The answer is ${this.question.realName}`;
            view.render(view.result, info, {'class' : 'wrong'});
        }
        view.render(view.score, this.score);

    },
    
    gameOver() 
    {
        const gameOverText = `Game over Crash, you scored ${this.score} point${this.score != 1 ? 's' : ''}`;
        view.render(view.info, gameOverText);
        view.show(view.start);
    }
}

const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonder Woman",realName: "Diana Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
    ];

function startQuiz()
{
    alert("Welcome to Quiz Ninja!");

    const questions = [
                        ["What is Superman's real name?", "Clark Kent"],
                        ["Is he from DC or Marvel?", "DC"],
                        ["What is Wonder Woman's real name?", "Diana Prince"],
                        ["What is Batmans's real name?", "Bruce Wayne"]];
    view.hide(view.start);
    game.play(quiz);
}

view.start.addEventListener('click', startQuiz, false);