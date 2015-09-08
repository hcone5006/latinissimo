$(document).ready(function() {

	var navHeight = $('nav').height();

	$('nav a, #home a, footer a, a.get-dancing, a.topbttn').click(function(e){
	
		e.preventDefault();
		var id = $(this).attr('href');
		$(id).velocity("scroll",{duration: 1500, easing: "easeOutQuint", offset:-navHeight});

	}); 

	$('nav').waypoint('sticky');

	// waypoints selected

	$('main section').waypoint(function(direction){
		// alert('hit waypoint');
		var id = $(this).attr('id');
		// alert(id);
		if(direction==='down'){
			id = $(this).attr('id');
		}
		else{
			id = $(this).prev().attr('id');
		}
		$('nav a.selected').removeClass('selected')
		$('nav a[href=#'+id+']').addClass('selected');

	}, {offset:'50%'});

	// var $panels = $('.panel'),
	// $tabs = $('.tabs'),
	// currentIndex = 0,
	// dissolveSpeed = 500;

	$('.fancybox').fancybox({	
        padding : 0,
        openEffect  : 'fade'
    });
});
	var $status = $('.status'),
		$name = $('#name'),
		$email = $('#email'),
		$message = $('#message'),
		$fields = $('input[type=text], textarea');

	$status.hide();

	$('.contact-form').submit(function(e){
		e.preventDefault();
		//reset errors
		//$status.hide();
		$fields.removeClass("error").focus();

		if(!$name.val()){

			$name.setError("Please Enter Your Name");

		}else if(!$email.val()){

			$email.setError("Please Enter Your Email");

		}else if(!isValidEmail($email.val())){

			$email.setError("Please Enter a Valid Email");

		}else if(!$message.val()){

			$message.setError("Please Enter Your Message");

		}else if($('#spam').val()){

			$message.setError("Spammed");

		}else{
			//alert("Your Form is Valid!");
			$status.html("Email being sent... Please wait").slideDown();

			var formData = $(this).serialize();

			//alert(formData);
			$.post('send-mail.php',formData, function(sent){

				if(sent==="success"){

					$status.html("Thank you "+$name.val()+" your email has been sent");
					$fields.val("");

				}else if(sent==="error"){ 

					$status.html("Oops... there was an error sending your email");

				}

			},'html');
		}
	});

	$.fn.setError = function(message){
		$status.html(message).slideDown();
		$(this).addClass("error").focus();
	};

function isValidEmail(email) {
	var emailRx = /^[\w\.-]+@[\w\.-]+\.\w+$/;
	return  emailRx.test(email);
}

