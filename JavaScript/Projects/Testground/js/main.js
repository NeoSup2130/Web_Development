"use strict";
import * as creator from './utility/creator.js'

const bodyC = document.getElementById('bodyContainer');
const navList = document.getElementById('navTests');

function createNavItem(target, text, id='')
{
    let a = creator.createHyperlink(target, id);
    let li = creator.createElement('li');
    li.innerText = text;
    a.appendChild(li);
    navList.appendChild(a);
}

function createSection(name)
{
    createNavItem('#' + name, name);
    let sect = creator.createContainer(name);
    bodyC.appendChild(sect);
    return sect;
}

const testFunctions =
{
    doAlert()
    {
        alert('Button!');
    },
    doPrompt()
    {
        prompt('Hello');
    },
    windowFunc(p)
    {
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        wait(1 * 100).then(() =>
            {
                p.innerHTML=`
                Window width = ${window.innerWidth}px <br>
                Window height = ${window.innerHeight}px <br>
                Window location = ${window.location} <br>
                Window locationbar visibility = ${window.locationbar.visible} <br>
                Window name = ${window.name}; <br>
                Window opener = ${window.opener}; <br><br>
                Session storage example: <br>
                Fill in the text box below then refresh the page <br>
                <input id='sessionText' type='text'></input>
                `;
                const autoSave = document.getElementById('sessionText');
                const savedValue = sessionStorage.getItem('autosave');
               
                if (savedValue) autoSave.value = savedValue;
                
                autoSave.addEventListener('change', () => {
                    window.sessionStorage.setItem('autosave', autoSave.value);
                });

            }
        )   
    }
}

function parseModuleHTML(input)
{
    let sect = undefined;
    for (const key in input)
    {
        const value = input[key];
        switch(key)
        {
            case 'name':
            sect = createSection(value);
            break;
            case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
            let heading = creator.createText(key, value);
            sect.appendChild(heading);
            break;
            case 'hr':
            sect.appendChild(creator.createElement('hr'));
            break;
            case 'p':
            const pValue = value;
            let p;
            switch(typeof pValue)
            {
                case "object":
                    p = creator.createText('p', value.text);
                    testFunctions[value.callback](p);
                break;
                case "string":
                    p = creator.createText('p', value);
                break;
                default:
                    alert('p contains invalid data!');
                    break;
            }
            sect.appendChild(p);
            break;
            case 'button':
            const button = creator.createButton(testFunctions[value.callback], value.text);
            sect.appendChild(button);
            break;
        }
        if (sect === undefined)
        {
            alert('section name is missing from input!');
            break;
        }
    }
}

fetch("./data/HTMLModules.json")
    .then((response) => response.json())
    .then((data) => 
    {
        data.map(module => parseModuleHTML(module));
        /* For loop equivalent
        for(const module of data)
        {
            parseModuleHTML(module);
        }
        */ 
    })

