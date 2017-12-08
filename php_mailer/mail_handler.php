<?php
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');//installs it
$message = [];
$output = [
    'success'=>null,
    'messages'=>[]
];

$message['name'] = filter_var($_POST['contactName'],FILTER_SANITIZE_STRING);

if(empty($message['name'])){
    $output['success'] = false;
    $output['message'][] = 'missing name key';
}

$message['email'] = filter_var($_POST['email'],FILTER_VALIDATE_EMAIL);
if(empty($message['email'])){
    $output['success'] = false;
    $output['message'][] = 'invalid email key';
}
$message['comments'] = filter_var($_POST['comments'],FILTER_SANITIZE_STRING);
if(empty($message['comments'])){
    $output['success'] = false;
    $output['message'][] = 'missing comment key';
}

if($output['success'] !==null){
    http_response_code(400);
    echo json_encode($output);
    exit();
}
$message['comments'] = nl2br($message['comments']);

$mail = new PHPMailer;

$mail->isSMTP();               
$mail->Host = 'smtp.gmail.com'; 
$mail->SMTPAuth = true;         

$mail->Username = EMAIL_USER;   
$mail->Password = EMAIL_PASS; 
$mail->SMTPSecure = 'tls';     
$mail->Port = 587;             
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

$mail->smtpConnect($options);
$mail->From = $message['email'];
$mail->FromName = $message['name'];
$mail->addAddress(EMAIL_USER);
$mail->addReplyTo($message['email'],$message['name']);
$mail->isHTML(true);
$mail->Subject = 'Here is the subject';
$mail->Body = $message['comments'];
$mail->AltBody = $message['comments'];

if(!$mail->send()) {
    $output['success'] = false;
    $output['messages'][] = $mail->ErrorInfo;
} else {
    $output['success'] = true;
}
echo json_encode($output);
?>
