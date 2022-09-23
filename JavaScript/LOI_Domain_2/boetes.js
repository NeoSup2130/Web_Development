// Slider variables
const inputSlider = document.getElementById('mySlider');
const sliderDisplay = document.getElementById('output');
inputSlider.addEventListener('input', handleSliderInput);

// Feed variables
const feedback = document.getElementById('feedback');
const boeteKop = document.getElementById('boetekop');
const boeteBalk = document.getElementById('boetebalk');
const boeteBedrag = document.getElementById('boetebedrag');

// Table variables
const table = document.getElementById('staffeltabel');

const boeteWaardes = [
    28, 35, 43, 49, 56, 64, 72, 98, 107, 118, 127, 137, 147,
    158, 170, 181, 194, 207, 221, 235, 247, 263, 277, 295, 309, 325
];

createTicketTable();

function handleSliderInput() {
    const value = inputSlider.value;
    sliderDisplay.innerHTML = value;
    
    const corrSpeed = value - 50;
    const isSpeeding = giveSpeedFeedback(corrSpeed);

    showBoetes(isSpeeding, corrSpeed);
    
}

function giveSpeedFeedback(corrSpeed)
{
    feedback.style.visibility = 'visible';
    if (corrSpeed < 1)
    {
        feedback.innerHTML = "Keurig, houden zo!";
        feedback.style.background = 'green';
        return false;
    } 
    else if (corrSpeed > 1 && corrSpeed < 30) 
    {
        feedback.innerHTML = "Dat is te hard binnen de bebouwde kom, u riskeert een boete!";
        feedback.style.background = 'orange';
    }
    else if (corrSpeed > 29)
    {
        feedback.innerHTML = "U riskeert een strafzaak én het in beslag nemen van uw voertuig en ontzegging van uw rijbevoegdheid!";
        feedback.style.background = 'red';
    }
    return true;
}


function toggleBoeteVis(flag)
{
    const states = ['hidden', 'visible'];
    const index = Number(flag);
    function doFunc() {
        boeteKop.style.visibility = states[index]; 
        boeteBalk.style.visibility = states[index];  
        boeteBedrag.style.visibility = states[index]; 
    }
    doFunc();
}

function showBoetes(doShow, corrSpeed)
{
    if (corrSpeed < 50) corrSpeed -= 3;
    if (corrSpeed <= 0) doShow = false;

    toggleBoeteVis(doShow);

    if (doShow)
    {
        let index = corrSpeed - 1;
        if (index >= boeteWaardes.length) index = boeteWaardes.length - 1;

        let ticketValue = 9 + boeteWaardes[index];
        boeteBedrag.innerHTML = '&euro; ' + ticketValue.toString();

        boeteBalk.style.width = (++index / boeteWaardes.length * 100) + '%';
    } 
}

function createTicketTable()
{
    const tableHeaders = ['Km/u', 'Euro'];
    let startSpeeding = 4, halfLenBoetes = boeteWaardes.length / 2;
    
    for (let k = 0; k < 2; k++)
    {
        for (let i = 0; i < 2; i++) 
        {
            let _tr = document.createElement("tr");
            let _th = document.createElement("th");
            _th.innerHTML = tableHeaders[(i % 2)];
    
            table.appendChild(_tr);
            _tr.appendChild(_th);
    
            for (let j = 0; j < halfLenBoetes; j++) 
            {
                let _td = document.createElement("td");
                _tr.appendChild(_td);
    
                if ((i % 2) == false)
                {
                    _td.innerHTML = startSpeeding + j + halfLenBoetes * k;
                } 
                else 
                { 
                    _td.innerHTML = boeteWaardes[j + halfLenBoetes * k]; 
                }
            }
        }
    }
}