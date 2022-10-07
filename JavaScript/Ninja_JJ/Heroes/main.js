const view = {
    formObj : document.forms[0],
    heroName : document.forms[0].heroName,
    realName : document.forms[0].realName,
    heroType : document.forms[0].category,
    powers : document.forms[0].powers,
    city : document.forms[0].category
}

view.formObj.addEventListener('submit', makeHero, false);
view.formObj.city.addEventListener('change', cityChosen, false);

// Removes placeholder option
function cityChosen(event) 
{
   if(event.target[0].value == "")
   {
    event.target.removeChild(event.target[0]);
   }
}

function makeHero(event)
{
    event.preventDefault();
    if (view.city.value == "")
    {
        alert("Choose a city!");
        return;
    }
    const hero = {};
    hero.name = view.heroName.value;
    hero.realName = view.realName.value;
    hero.type = view.heroType.value;
    // Similar to C 
    // hero.powers = [];
    // for(let i = 0; i < view.powers.length; i++)
    // {
    //     if(view.powers[i].checked)
    //     {
    //         hero.powers.push(view.powers[i].value);
    //     }
    // }

    //Js style, whyyyy smaller and easier to understand.
    hero.powers = [...view.powers].filter(check => check.checked).map(check => check.value);



    alert(JSON.stringify(hero));
    return hero;
}