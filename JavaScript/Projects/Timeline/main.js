
function getViewportSize()
{
    return {
        width : (window.innerWidth || document.documentElement.clientWidth),
        height : (window.innerHeight || document.documentElement.clientHeight)
    };
}

function isElementInViewport(el) 
{
    const rect = el.getBoundingClientRect();
    const viewportSize = getViewportSize();
    return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= viewportSize.height &&
            rect.right <= viewportSize.width);
}

const items = document.querySelectorAll(".timeline li");

function callbackFunc() 
{
    for (var i = 0; i < items.length; i++) 
    {
        if (isElementInViewport(items[i])) 
            items[i].classList.add("in-view");
    }
}

callbackFunc();
setInterval(callbackFunc, 333); // 30 frames per second

// window.addEventListener("load", callbackFunc);
// window.addEventListener("resize", callbackFunc);
// window.addEventListener("scroll", callbackFunc);