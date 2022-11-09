"use strict";
import * as creator from './utility/creator.js'

const bodyC = document.getElementById('bodyContainer');

function doTest()
{
    let con = creator.createContainer('demo2');
    let p = creator.createParagraph('I am modular');
    con.appendChild(creator.createButton(() => alert('Button!'), 'test!'));
    con.appendChild(p);
    bodyC.appendChild(con);
}

for (let i = 0; i < 5; i++)
{
    doTest()
}

