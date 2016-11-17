
$(document).ready(function() {
  $(".signUn").on('click', function(){
    event.preventDefault();
    // $(".singInForm").css('height', '100px');
  });

  $(".createNew").on('click', function(){
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/newAccount',
      data: $('.singUpForm').serialize(),
      dataType: 'json',
      success: show
    });
  });

  $('.logIn').on('click', function() {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: '/logIn',
      data: $('.logInForm').serialize(),
      dataType: 'json',
      success: show
    });
  });
});

function show(json){
  if(json){
    window.location.href = "/profile";
  }
}
