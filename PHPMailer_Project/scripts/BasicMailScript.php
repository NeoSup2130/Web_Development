<?php
//if (!defined("CAN_RUN")) die ("This file can't be called directly.");

require $_SERVER['DOCUMENT_ROOT'].'/home/PHPMailer_Project/external/PHPMailer/src/Exception.php';
require $_SERVER['DOCUMENT_ROOT'].'/home/PHPMailer_Project/external/PHPMailer/src/PHPMailer.php';
require $_SERVER['DOCUMENT_ROOT'].'/home/PHPMailer_Project/external/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

#Start main entry
$emailPostLoc = 'imObjectForm_11_5';
$configLocation = $_SERVER['DOCUMENT_ROOT'].'/home/PHPMailer_Project/config/';
$emailConfigLoc = $configLocation.'emailConfig.csv';
$bodyConfigLoc = $configLocation.'bodyConfig.csv';
$redirectPage = '/home/PHPMailer_Project/RedirectPage.php';

SendMail($_POST[$emailPostLoc], $emailConfigLoc, $bodyConfigLoc);
header("Location: ".$redirectPage);
#end main

/**
 * Sets the SMTP for a PHPMailer instance.
 *
 * @param PHPMailer $mail mail instance
 * @param string $configDirectory directory to config file for SMTP
 * @author Slava Takrovskij <slavaxbox@hotmail.nl>
 * @return void
 */ 
function SetMailSMTP($mail, $configDirectory)
{
    /*
    Expected execution:
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'laikaphpmailer@gmail.com'; 
    $mail->Password = PASSWORD; 
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->setFrom('no-reply@laika.com', 'no-reply@laika.com');
    */
    
    $mail->isSMTP();
    if (($handle = fopen($configDirectory, "r")) !== FALSE) 
    {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) 
        {
            $num = count($data);
            switch($data[0])
            {
                case "SMPT_HOST":
                    $mail->Host = $data[1];
                    $mail->SMTPAuth = true;
                    break;
                case "FromUser":
                    $mail->setFrom($data[1], $data[1]);
                    break;
                case "Reply_To":
                    $mail->AddReplyTo($data[1]);
                    break;
                case "User":
                    $mail->Username = $data[1];
                    break;
                case "Pass":
                    $mail->Password = $data[1];
                    break;
                case "Secure":
                    $mail->SMTPSecure = $data[1];
                    break;
                case "Port":
                    $mail->Port = $data[1];
                    break;
            }
        }
        fclose($handle);
    }
}

function CreateMail($receiver, $configDirectory)
{
    $mail = new PHPMailer();

    SetMailSMTP($mail, $configDirectory);

    $mail->addAddress($receiver);
    $mail->addAddress($mail->Username);

    $mail->isHTML(true);

    return $mail;
}

function PostKeyToReadable($input, $doCapital = true)
{
    $size = strlen($input);
    $output = '';
    for ($i = 0; $i < $size; $i++)
    {
        $char = $input[$i];
        switch($char)
        {
            case '_':
                $output .= ' ';
                break;
            default:
                $output .= $char;
                break;
        }
    }
    if ($doCapital) $output = ucfirst($output);

    return $output;
}

function CreateMailBody($mail, $bodyConfigLoc)
{
    #constants
    $patternPost = 'imObjectForm*';

    $mail->Subject = 'Subject test!';

    $body=
    '<h1> Test kopje: </h1>
    <p>Beste dame / heer;<br><br>

    Uw antwoord voor onderstaande stage / training / seminar is in goede orde ontvangen.<br>
    Dank u.<br><br>
    
    Met sportieve groet,<br>
    Peter Smid<br><br></p>';
    
    $keyNames = array();
    if (($handle = fopen($bodyConfigLoc, "r")) !== FALSE) 
    {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) 
        {
            $keyNames[] = $data;
        }
    }

    $body .= '<p>';
    $keyNamesIterator = 0;
    foreach($_POST as $key => $value)
    {
        if (!fnmatch($patternPost, $key)) break;

        $body .= '<b>'.implode($keyNames[$keyNamesIterator]).'</b>: ';
        if(!is_array($value))
        {
            $body .= $value.'<br>';
        }
        else
        {
            foreach($value as $item)
            {
                $body .= $item.', ';
            }
            $body = substr($body, 0, -2);
            $body .= '<br>';
        }
        $keyNamesIterator++;
    }
    $body .= '</p>';

    $mail->Body = $body;
}

function SendMail($receiver, $configSMTPDirectory, $bodyConfigDirectory)
{
    $mail = CreateMail($receiver, $configSMTPDirectory);
    CreateMailBody($mail, $bodyConfigDirectory);
    $result = $mail->send();
    if(defined("DEBUG"))
        if ($result == false) 
            echo 'Mailor error: ' . $mail->ErrorInfo;
}
?>