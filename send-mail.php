<?php 
//echo "error";
//define the recipient email address as a constant
define('RECIPIENT','darthshana@gmail.com');

//catch the $_POST vars
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
//set the subject
$subject = "Website Enquiry";
	
//set email body and headers
$body = $message."\n\n";
$body.= $name."<$email>";
$headers = "From: $name<$email>";

//send email
if(mail(RECIPIENT, $subject, $body, $headers)){
		
	echo "success";
	
} else {
	
	echo "error";
	
}//end if else	
?>