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
    wait : (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

    doAlert()
    {
        alert('Button!');
    },
    doPrompt()
    {
        prompt('Hello');
    },
    historyModule(event)
    {
        const eParent = event.target.parentElement;
        const eTarget = eParent.querySelector('#hisField'); 
        eTarget.innerText = `Number of entries in history = ${history.length}`;
        eParent.appendChild(creator.createButton(() => history.go(), 'go()'));
        eParent.appendChild(creator.createButton(() => history.go(-1), 'go(-1)'));
        eParent.appendChild(creator.createButton(() => history.go(1), 'go(1)'));
        eParent.appendChild(creator.createButton(() => history.back(), 'back()'));
        
        eParent.removeChild(event.target);
    },
    imageModule(p)
    {
        let idCounter = Math.floor(Math.random() * new Date().getTime());

        const getRandomImgURL = (w = 200, h = w) => {
            return `https://picsum.photos/seed/${idCounter++}/${w}/${h}`;
        }

        const getRandomImg = (w = 200, h = w) => {
            let img = new Image(w, h);
            img.src = getRandomImgURL(w, h);
            return img;
        }

        this.wait(1 * 100).then(() =>
        { 
            p.innerText = `Hover over an image to see another random image! \n\n`;
            // JavaScript and its function scopes is a sight to behold
            p.appendChild(creator.createButton(() => 
            {
                const img = getRandomImg(200);
                p.parentElement.appendChild(img);
                
                // This works, because the anonymous functions keep this scope. 
                // Therefore, they have their own variable oldSrc
                const oldSrc = img.src;

                img.addEventListener('mouseenter', (e) => e.target.src = getRandomImgURL(200));
                img.addEventListener('mouseleave', (e) => e.target.src = oldSrc)
            }, 'Add random image'));
        });
    },
    windowFunc(p)
    {
        this.wait(1 * 100).then(() =>
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
        if((value.callback != undefined && value.callback != '') && testFunctions[value.callback] === undefined)
        {
            alert(`Couldn't find function ${value.callback} in module ${input.name} \n Read value: \n${JSON.stringify(value)}`);
        }
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
                    p = creator.createText('p', value.text, value.id);
                    if(value.callback != '') testFunctions[value.callback](p);
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

