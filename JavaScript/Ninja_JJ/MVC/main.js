'use strict';

const form = document.getElementById('input');

class Item {
    constructor(name) 
    {
        this.name = name;
    }
}

const controller = {
    watch : function(form) 
    {
        /*
        With bind we achieve the same result as with an arrow function.
        Since arrow functions stay to the lexical scope. This means (pun)
        that when watch() is called 'this' will refer to the controller otherwise
        'this' will refer to scope in which watch() was called.
        
        Arrow function alternative:
        form.addEventListener('submit', (event) => 
        {
            event.preventDefault();
            this.add(form.name.value);
            this.reset();
        }
        , false);

        */
        form.addEventListener('submit', this.onSubmit.bind(this), false);
    },
    onSubmit(event) 
    {
        event.preventDefault();
        this.add(form.name.value);
        this.reset();
    },

    add : function(name) 
    {
        const item = new Item(name);
        view.render(item);
    },
    
    reset : function() 
    {
        form.name.value = '';
    }
}

controller.watch(form);

const view = {
    render : function(item) 
    {
        const list = document.getElementById('list');
        const li = document.createElement('li');
        li.innerHTML = item.name;
        list.appendChild(li);
    }
}