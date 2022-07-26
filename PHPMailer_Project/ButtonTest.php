<?php

$computer_parts = array("Tower", "Garbage", "Code");
?>
<head>
<h1> Computer parts </h1>
<ul>
    <? foreach($computer_parts as $part): ?>
    <li><?=$part?></li>
    <? endforeach; ?>
</ul>
<?php
      
        if(isset($_POST['button1'])) {
            echo "This is Button1 that is selected";
        }
        if(isset($_POST['button2'])) {
            echo "This is Button2 that is selected";
        }
    ?>
      
    <form method="post">
        <input type="submit" name="button1"
                value="Button1"/>
          
        <input type="submit" name="button2"
                value="Button2"/>
    </form>
</head>