
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
      dataType: 'json'
    });
  });

  $('.logInForm').submit(function(event){
      event.preventDefault();
      $.ajax({
        method: 'GET',
        url: '/logIn',
        data: $('.logInForm').serialize(),
        dataType: 'json',
        success: goToProfile,
        error: cantLogin
      });
  });
});

function cantLogin(xhr, ajaxOptions, thrownError){
  alert("Incorrect email or password! Please try again!");
}

function goToProfile(json){
  if(json){
    window.location.href = "/profile/"+json._id;
  }
}
