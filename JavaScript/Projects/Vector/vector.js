"use strict";
export class vector
{
    constructor()
    {
        this.data = [];
        Array.from(arguments).map((arg) => this.data.push(arg));
    }
    remove(index)
    {
        if (this.data.at(index) != undefined)
        {
            this.data.splice(index, 1);
        }
    }
}