
export function createElement(type, id='')
{
    let el = document.createElement(type);
    el.id = id;
    return el;
}

export function createParagraph(text, id='')
{
    let p = createElement('p', id);
    p.innerText = text;
    return p;
}

export function createContainer(id='')
{
    let d = createElement('div', id);
    d.classList.add('container');
    return d;
}

export function createButton(callback, text='', id='')
{
    let b = createElement('button', id);
    b.addEventListener('click', callback);
    b.innerText = text;
    return b;
}