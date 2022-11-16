
export function createElement(type, id='')
{
    let el = document.createElement(type);
    if (id != '') el.id = id;
    return el;
}

export function createText(type, text, id='')
{
    let p = createElement(type, id);
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

export function createHyperlink(href='', id='')
{
    let a = createElement('a', id);
    a.href = href;
    return a;
}

export function embedYT(link, startAt)
{
    const keywords = ['watch?v=', 'embed'];
    
    if (link.includes(keywords[0]))
    {
        link = link.replace(keywords[0], 'embed/');

    } else if (!link.includes(keywords[1]))
    {
        alert('Link is invalid!');
        return;
    } 

    //Converts start time into seconds and attach it to embedded link
    const getSecFromStart = () => 
    {
        if (startAt === undefined || startAt == '')
        {
            return '';
        }

        const times = startAt.split(':').reverse();
        let sec = Number(times.shift());
        times.map((string, index) => 
        {
            sec += Number(string) * (60 * (index + 1));
        })
        return `?start=${sec}`;
    }; 
    
    link += getSecFromStart();
    const result = `<iframe width="100%" height="100%" 
    src="${link}" title="YouTube video player"
    frameborder="0" clipboard-write; encrypted-media; picture-in-picture" 
    allowfullscreen></iframe>`;
    const frame = createElement('p');
    frame.insertAdjacentHTML("afterbegin", result);
    return frame;
}