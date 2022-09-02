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

function startQuiz()
{
    alert("Welcome to Quiz Ninja!");

    const questions = ["What is Superman's real name?", "Is he from DC or Marvel?"];
    const answer = prompt(questions[0]);
    alert(`You answered ${answer}`);
}