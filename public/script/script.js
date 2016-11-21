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
    })
});

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
    $("div[wtd-id=" + json[0]._id + "]").remove();
}

function showUsers(html) {
    window.location.href = '/find-friends';
}

function goToProfile(json) {
    if (json) {
        window.location.href = "/profile/" + json._id;
    }
}
