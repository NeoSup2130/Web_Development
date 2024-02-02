/* 
    Use case example:

    <script type="text/javascript" src="js/typeWrite.js"></script>
    <script>
        window.onload = function() {typeWriteEffect("title","Projects I worked on", 150); };
    </script>
*/

function typeWriteEffect(elementID="", message="", speed=150, temp="", i=0)
{
    if (!document.getElementById(elementID)) return;
    
    document.getElementById(elementID).textContent = temp + message.charAt(i);
    temp = temp + message.charAt(i++);

    if(i === message.length)			    
    {
        i= 0; temp= "";			
        return;

    } else {

        setTimeout(typeWriteEffect, speed, elementID, message, speed, temp, i);
    }		
}