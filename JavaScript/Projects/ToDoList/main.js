"use-strict";

function getCookie(key) 
{
    return document.cookie.split('; ').find((row) => row.startsWith(`${key}=`))?.split('=')[1];
}

function setCookie(key, value, days)
{
    const expire = new Date();
    expire.setTime(expire.getTime() + days * 24 * 60 * 60 * 1000);
    const newNameCookie = `${key}=${value};expires=${expire.toUTCString()};`;
    console.log(newNameCookie + " current data: " + new Date().toUTCString());
    document.cookie = newNameCookie;
}

class taskItem {
    constructor(name, checked = false)
    {
        this.name = name;
        this.checked = checked;
    }
}

const model = {
    createTask : function()
    {
        let nextID = 0;
        function create(taskName, checked = false)
        {
            const id = nextID++;
            this.tasks.set(id, new taskItem(taskName, checked));
            return id;
        }
        return create;
    }(),
    getTaskID : function(event)
    {
        const id = event.target.parentElement.taskID;
        console.log(id);
        return id;
    },
    updateChecked : function(event)
    {
        this.tasks.get(this.getTaskID(event)).checked = event.target.checked;
        this.saveTasks();
    },
    deleteTask : function (event)
    {
        const id = this.getTaskID(event);
        this.tasks.delete(id);                                                                                                                                                          
        this.saveTasks();
        view.remove(event);
    },
    saveTasks : function()
    {
        // id might be used for the back-end, but for now it's left out.
        const array = [...this.tasks].map(([id, task]) => (task));
        setCookie(this.cookieKey, JSON.stringify(array), 1);
    },
    loadTasks : function()
    {
        const data = JSON.parse(getCookie(this.cookieKey));
        for (let i = 0; i < data.length; i++)
        {
            const task = data[i];
            const id = this.createTask(task.name, task.checked);
            view.display(id);
        }
    },
    cookieKey : "savedTasks",
    tasks : new Map()
}

const view = {
    todoList : document.getElementById('todo-list'),
    displayList : document.querySelector("#todo-list [name=display]"),    
    display : function(taskID) 
    {
        const task = model.tasks.get(taskID);

        let newItem = document.createElement('li');
        newItem.classList.add('task-container');
        newItem.taskID = taskID;

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.checked;
        checkbox.addEventListener('change', model.updateChecked.bind(model), false);

        let taskP = document.createElement('p');
        taskP.innerText = task.name;

        let delBtn = document.createElement('button');
        delBtn.addEventListener('click', model.deleteTask.bind(model), false);
        delBtn.innerText = "Delete";

        this.displayList.appendChild(newItem);
        newItem.appendChild(checkbox);
        newItem.appendChild(taskP);
        newItem.appendChild(delBtn);
    },
    remove : function(event)
    {
        this.displayList.removeChild(event.target.parentElement);
    }
}

const form = document.forms[0];
form.addEventListener('submit', submitCallback, false);
document.addEventListener('DOMContentLoaded', model.loadTasks.bind(model));

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
            if (regexCase.test(words[i]) || words[i] == '')
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

function resetForm()
{
    form["task"].value = '';
}

function submitCallback(event)
{
    event.preventDefault();
    if (!isInputValid())
    {
        return;
    }

    const id = model.createTask(form["task"].value);
    view.display(id);
    model.saveTasks();
    resetForm();
}