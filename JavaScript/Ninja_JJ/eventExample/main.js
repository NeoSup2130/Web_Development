// function doMouseClick(event)
// {
//     // Shows which html element has been clicked
//     // console.log(event.target);

//     console.log(
//     `screen: (${event.screenX},${event.screenY}),
//     page: (${event.pageX},${event.pageY}), 
//     client: (${event.clientX},${event.clientY})`)
// }

// addEventListener('click', doMouseClick);

const clickParagraph = document.getElementById('click');
const dbClickParagraph = document.getElementById('dblclick');
const mouseParagraph = document.getElementById('mouse');

document.addEventListener('mouseover', highlight);
document.addEventListener('mouseout', highlight);
// mouseParagraph.addEventListener('mousemove', () => console.log('You Moved!') );

clickParagraph.addEventListener('click', () => console.log('click!'));
clickParagraph.addEventListener('mousedown', () => console.log('down!'));
clickParagraph.addEventListener('mouseup', () => console.log('up!'));

dbClickParagraph.addEventListener('dblclick', highlight);

// addEventListener('keyup', (event) => console.log(`You stopped pressing the key, ${event.key}, on ${new Date().getSeconds()}`));

addEventListener('keydown', (event) => {
    if (event.key === 'c' && event.ctrlKey) {
    console.log('Action canceled!');
    }
});

function highlight(event)
{
    event.target.classList.toggle('highlight');
    console.log(event.target);
}
