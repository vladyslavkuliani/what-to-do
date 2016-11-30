$(document).ready(function(){
  $('#signup-form').submit(function(event){
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      method: 'POST',
      url: '/newAccount',
      data: $(this).serialize(),
      dataType: 'json',
      success: show
    });
  });
});

function show(json){
  alert("User " + json.firstName + " " + json.lastName + " was successfully created!\nGo ahead and Log In!");
  window.location.href = "/";
}
