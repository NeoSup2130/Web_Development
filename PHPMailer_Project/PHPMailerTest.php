<?php 
define("CAN_RUN", true);
define("DEBUG", true); 
?>
<head>
    <li> Root directory: <?=$_SERVER['DOCUMENT_ROOT']?> </li>
    <li> CWD directory: <?=getcwd()?> </li>

    <form id="imObjectForm_11_form" action=<?="scripts/BasicMailScript.php"?> method="post" enctype="multipart/form-data">
        <fieldset class="first" pagecount="1">
        <div>
            <div id="imObjectForm_11_1_container" class="imObjectFormFieldContainer"><label id="imObjectForm_11_1_label" for="imObjectForm_11_1"><span>Voor en Achternaam*</span></label><br><div id="imObjectForm_11_1_field">
        <input type="text" class="mandatory " id="imObjectForm_11_1" name="imObjectForm_11_1"></div>
        </div>
                    <div id="imObjectForm_11_2_container" class="imObjectFormFieldContainer"><label id="imObjectForm_11_2_label" for="imObjectForm_11_2"><span>Woonplaats*</span></label><br><div id="imObjectForm_11_2_field">
        <input type="text" class="mandatory " id="imObjectForm_11_2" name="imObjectForm_11_2"></div>
        </div>
                    <div id="imObjectForm_11_3_container" class="imObjectFormFieldContainer"><label id="imObjectForm_11_3_label"><span>Mijn interesse gaat uit naar:</span></label><br><div id="imObjectForm_11_3_field">
        <span id="imObjectForm_11_3_wrapper"><span class="imObjectForm_11_3_checkbox checkbox firstrow firstcolumn"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_3_0" name="imObjectForm_11_3[]" value="Duo-System"><span class="checkbox-label">&nbsp;Duo-System</span></span><span class="imObjectForm_11_3_checkbox checkbox firstrow"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_3_1" name="imObjectForm_11_3[]" value="Fighting-System"><span class="checkbox-label">&nbsp;Fighting-System</span></span><span class="imObjectForm_11_3_checkbox checkbox firstrow"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_3_2" name="imObjectForm_11_3[]" value="Newaza-System"><span class="checkbox-label">&nbsp;Newaza-System</span></span><br></span></div>
        </div>
                    <div id="imObjectForm_11_4_container" class="imObjectFormFieldContainer"><label id="imObjectForm_11_4_label" for="imObjectForm_11_4"><span>telefoon*</span></label><br><div id="imObjectForm_11_4_field">
        <input type="text" class="mandatory " id="imObjectForm_11_4" name="imObjectForm_11_4"></div>
        </div>
                    <div id="imObjectForm_11_5_container" class="imObjectFormFieldContainer"><label id="imObjectForm_11_5_label" for="imObjectForm_11_5">Your E-Mail adress*</label><br><div id="imObjectForm_11_5_field">
        <input type="email" class="mandatory valEmail" id="imObjectForm_11_5" name="imObjectForm_11_5"></div>
        </div>
                    <div id="imObjectForm_11_6_container" class="imObjectFormFieldContainer"><label id="imObjectForm_11_6_label"><span>Ik kan absoluut NIET op: (geef a.u.b. ALLE dagen door die u NIET kan)</span></label><br><div id="imObjectForm_11_6_field">
        <span id="imObjectForm_11_6_wrapper"><span class="imObjectForm_11_6_checkbox checkbox firstrow firstcolumn"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_6_0" name="imObjectForm_11_6[]" value="Zaterdagmorgen 29/01 om 10:00u."><span class="checkbox-label">&nbsp;Zaterdagmorgen 29/01 om 10:00u.</span></span><span class="imObjectForm_11_6_checkbox checkbox firstrow"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_6_3" name="imObjectForm_11_6[]" value="Zondagmorgen 30/01 om 10:00u."><span class="checkbox-label">&nbsp;Zondagmorgen 30/01 om 10:00u.</span></span><span class="imObjectForm_11_6_checkbox checkbox firstrow"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_6_6" name="imObjectForm_11_6[]" value="Maandagavond 31/01 om 19:00u."><span class="checkbox-label">&nbsp;Maandagavond 31/01 om 19:00u.</span></span><br><span class="imObjectForm_11_6_checkbox checkbox firstcolumn"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_6_1" name="imObjectForm_11_6[]" value="Dinsdagavond 01/02 om 19:00u."><span class="checkbox-label">&nbsp;Dinsdagavond 01/02 om 19:00u.</span></span><span class="imObjectForm_11_6_checkbox checkbox"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_6_4" name="imObjectForm_11_6[]" value="Woensdagavond 02/02 om 19:00u."><span class="checkbox-label">&nbsp;Woensdagavond 02/02 om 19:00u.</span></span><span class="imObjectForm_11_6_checkbox checkbox"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_6_7" name="imObjectForm_11_6[]" value="Donderdagavond 03/02 om 19:00u."><span class="checkbox-label">&nbsp;Donderdagavond 03/02 om 19:00u.</span></span><br><span class="imObjectForm_11_6_checkbox checkbox firstcolumn"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_6_2" name="imObjectForm_11_6[]" value="Vrijdagavond 04/02 om 19:00u."><span class="checkbox-label">&nbsp;Vrijdagavond 04/02 om 19:00u.</span></span><span class="imObjectForm_11_6_checkbox checkbox"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_6_5" name="imObjectForm_11_6[]" value="Zaterdagmorgen 05/02 om 10:00u."><span class="checkbox-label">&nbsp;Zaterdagmorgen 05/02 om 10:00u.</span></span><span class="imObjectForm_11_6_checkbox checkbox"><input type="checkbox" class=" checkbox-input" id="imObjectForm_11_6_8" name="imObjectForm_11_6[]" value="Zondagmorgen   06/02 om 10:00u."><span class="checkbox-label">&nbsp;Zondagmorgen   06/02 om 10:00u.</span></span><br></span></div>
        </div>
                    <div id="imObjectForm_11_7_container" class="imObjectFormFieldContainer"><label id="imObjectForm_11_7_label" for="imObjectForm_11_7"><span>Reden of andere toevoeging  (niet verplicht, wel gewenst)</span></label><br><div id="imObjectForm_11_7_field">
        <textarea class="" id="imObjectForm_11_7" name="imObjectForm_11_7"></textarea></div>
        </div>
            </div>
        </fieldset>
        <div id="imObjectForm_11_buttonswrap">
            <input type="submit" id="imObjectForm_11_form_submit" value="Send">
        </div>
    </form>
    
    <!-- <form method="post">
    <br>    
    Your email:      <input type="text" name="form_1" value=""/><br>
    Your first and last name: <input type="text" name="form_2" value=""/><br>
    Your age:        <input type="number" name="form_3" value=""/><br>
        <br><br>
        <input type="submit" name="button1" value="Send email"/>
    </form> -->
</head>

<?php
    if (isset($_POST['form_1']))
    {
        define("CAN_RUN", true);
        define("DEBUG", true);
        include 'scripts/BasicMailScript.php';
        $redirectPage = $_SERVER['DOCUMENT_ROOT'].'/home/testcode/'.'RedirectPage.php';
        header("Location: ".$redirectPage);
    }
?>