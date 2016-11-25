var currentUserId;

$(document).ready(function() {
    currentUserId = $('.headerBar').attr('data-userId');

    $('.postNew').on('click', function() {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/createWTD',
            data: $(".newWTD").serialize() + "&userId=" + currentUserId,
            dataType: 'html',
            success: show
        });
    });

    $(document).on('click', '.delete', function() {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/delete-post',
            data: "wtdId=" + $(this).parent().parent().attr('wtd-id') + "&userId=" + currentUserId,
            dataType: 'json',
            success: deletePost
        });
    });

    $('.myProfile').on('click', function() {
        $.ajax({
            method: 'GET',
            url: '/user',
            dataType: 'json',
            success: goToProfile
        });
    });

    $('.userSearchPicture').on('click', function() {
        window.location.href = "/profile/" + $(this).attr('user-id');
    });
    $('.userNameLink').on('click', function() {
        window.location.href = "/profile/" + $(this).attr('user-id');
    });

    $('#follow').on('click', function() {
        if ($(this).text() === "Follow") {
            $.ajax({
                method: 'POST',
                url: '/follow',
                data: "userId=" + currentUserId,
                dataType: 'json',
                success: following
            });
        }
        else{
          $.ajax({
              method: 'POST',
              url: '/unfollow',
              data: "userId=" + currentUserId,
              dataType: 'json',
              success: unfollow
          });
        }
    });

    $('.logOut').on('click', function(){
      $.ajax({
        method: 'POST',
        url: '/logout',
        dataType: 'json',
        success: logOut
      });
    });

    $(document).on('keypress','.recommendation-input', function() {
      var key = window.event.keyCode;
      var textarea = $(this);
      //when pressed Enter
      if(key === 13 && textarea.val().trim().length != 0){
        $.ajax({
          method:'POST',
          url: '/newcomment',
          data: 'wtdId=' + $(this).parent().parent().attr('wtd-id') + "&comment=" + textarea.val().trim(),
          dataType: 'html',
          success: function(html){
            textarea.prev().prev().append(html);
            textarea.val("");
          }
        });
      }
    });

    $('#edit').on('click', function(){
      $('#editProfile').modal();
      $('input[name="profilePicture"]').val($('#profilePicture').css('background-image').replace('url("', '').replace('")', ""));
      $('input[name="fullName"]').val($('#fullName').text());
      $('input[name="dob"]').val($('#dob').text());
      $('input[name="email"]').val($('#email').text());
      $('input[name="phoneNumber"]').val($('#phoneNumber').text());
      $('input[name="languages"]').val($('#languages').text());
    });

    $('#updateProfile').on('click', function(){
      $.ajax({
        method: 'POST',
        url: '/update',
        data: $('#formToUpdate').serialize(),
        dataType:'json',
        success: updateInfo
      });
    });
});

function updateInfo(json){
  if(json.profilePicture != ""){
  $('#profilePicture').css('background-image', "url("+json.profilePicture+")");
}
if(json.fullName != ""){
  $('#fullName').text(json.fullName);
}
  $('#dob').text(json.dob);
  $('#email').text(json.email);
  $('#phoneNumber').text(json.phoneNumber);
  $('#languages').text(json.languages);
}

function logOut(json){
  window.location.href = "/";
}

function following() {
    $('#follow').text("Unfollow");
    $('#follow').toggleClass("btn-info");
}

function unfollow(){
  $('#follow').text("Follow");
  $('#follow').removeClass("btn-info");
}

function show(newWTD) {
    $('#newWTD').prepend(newWTD);
}

function deletePost(json) {
    $("div[wtd-id=" + json._id + "]").remove();
}

function showUsers(html) {
    window.location.href = '/find-friends';
}

function goToProfile(json) {
    if (json) {
        window.location.href = "/profile/" + json._id;
    }
}
