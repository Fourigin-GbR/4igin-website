<?php
/**
 * Created by IntelliJ IDEA.
 * User: kschaefer
 * Date: 17.12.15
 * Time: 14:16
 */


if($_POST["submit"]) {
    $recipient="info@fourigin.de";
    $subject="Kontakt-Formular Anfrage von der Webseite";
    $senderName=$_POST["name"];
    $senderEmail=$_POST["email"];
    $message=$_POST["idea"];

    $mailBody="Name: $senderName\nEmail: $senderEmail\n\n$message";

    mail($recipient, $subject, $mailBody, "From: $senderName <$senderEmail>");
}


?>