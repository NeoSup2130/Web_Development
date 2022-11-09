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
    }
    ,
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
            let p = creator.createText('p', value);
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
        for(const module of data)
        {
            parseModuleHTML(module);
        }
    })

