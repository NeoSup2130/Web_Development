<<<<<<< HEAD

var fs=1
var direction="right"
function rollertext(whichone)
{
    var thetext=whichone
    for (i=0;i<thetext.length;i++)
    {
    console.log("fs is "+fs);
    
    document.write(thetext.charAt(i).fontsize(fs))
    switch(fs)
    {
        case 7:
        direction="left";
        fs--;
        break;
        case 1:
        direction="right";
        fs++;   
    }
    if (direction=="right") fs++; else fs--;
    
    }
}
=======

var fs=1
var direction="right"
function rollertext(whichone)
{
    var thetext=whichone
    for (i=0;i<thetext.length;i++)
    {
    console.log("fs is "+fs);
    
    document.write(thetext.charAt(i).fontsize(fs))
    switch(fs)
    {
        case 7:
        direction="left";
        fs--;
        break;
        case 1:
        direction="right";
        fs++;   
    }
    if (direction=="right") fs++; else fs--;
    
    }
}
>>>>>>> 8ffe889af0d0f575efc34d1b3828b3e4b96081ca
rollertext("test one two one two");