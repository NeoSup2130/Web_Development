var intervalID = 0;

checkDocumentState();

function checkDocumentState()
{
    console.log("Check document...");

    if(document.readyState == "complete")
    {
        clearInterval(intervalID);
        console.log("document is loaded... Start quiz!");
        startQuiz();
    }
    else  
    {
        console.log("wait...");
        intervalID = setInterval(checkDocumentState, 100);
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
        const response = prompt(question);
        this.check(response);
    },
    
    check(input) 
    {
        if (input == this.question.realName)
        {
            this.score++;
            alert('This is correct!');
        } else {
            this.score--;
            alert(`This is wrong! The answer is ${this.question.realName}`);
        }
    },
    
    gameOver() 
    {
        alert(`Game over Crash, you scored ${this.score} point${this.score != 1 ? 's' : ''}`);
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
    game.play(quiz);
}

