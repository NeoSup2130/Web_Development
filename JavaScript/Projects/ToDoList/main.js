
const form = document.forms[0];
const todoList = document.getElementById('todo-list');
form.addEventListener('submit', callbackFunc, false);

function setInputInvalid(element)
{
    resetInput(element);
    // Without a timeout css animation won't be played.
    setTimeout(() => element.classList.add('invalid'), 5);
}

function resetInput(element)
{
    element.classList.remove('invalid');
}

function isInputValid()
{
    const inputTask = form["task"];
    const inputValue = inputTask.value;
    const regexCase = /<+|>+|\/+|\\+/;

    if (inputValue != '')
    {
        const words = inputValue.split(' ');
        for (let i = 0; i < words.length; i++)
        {
            if (regexCase.test(words[0]))
            {
                setInputInvalid(inputTask);
                return false;
            }
        }
        resetInput(inputTask);
        return true;
    } 
    else 
    {
        setInputInvalid(inputTask);
        return false;
    }
}

function createTask(taskName)
{
    let newItem = document.createElement('li');
    newItem.classList.add('task-container');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    newItem.appendChild(checkbox);

    let taskP = document.createElement('p');
    taskP.innerText = taskName;
    newItem.appendChild(taskP);

    let delBtn = document.createElement('button');
    delBtn.addEventListener('click', deleteTask, false);
    delBtn.innerText = "Delete";
    newItem.appendChild(delBtn);

    todoList.firstElementChild.appendChild(newItem);
}

function deleteTask(event)
{
    todoList.firstElementChild.removeChild(event.target.parentElement);
}

function callbackFunc(event)
{
    event.preventDefault();
    if (!isInputValid())
    {
        return;
    }

    createTask(form["task"].value);
    form["task"].value = '';
}