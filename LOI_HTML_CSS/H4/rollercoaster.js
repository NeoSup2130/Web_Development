
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
rollertext("test one two one two");