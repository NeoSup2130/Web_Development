import { vector } from './vector.js'

const output = document.getElementById('demo');
const outputNext = document.getElementById('out');

const foo = new vector("a", "b", "c", "d");

function fillArray(arr, value, count)
{
    arr[0] = 'd';
    for(let i = 0; i < count; i++)
    arr.push(value);
    arr.reverse();
    return arr;
}

const newData = fillArray([...foo.data], 'c', 3);
foo.remove(1);

output.innerText = JSON.stringify(foo.data);
outputNext.innerText = JSON.stringify(newData);