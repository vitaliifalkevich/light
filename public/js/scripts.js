function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    if (id_token) {
        document.cookie = "isLogin=true";
        document.cookie = "userName=" + profile.getName();
        document.cookie = "userImage=" + profile.getImageUrl();
        document.cookie = "userEmail=" + profile.getEmail();
        document.cookie = "userToken=" + id_token;
        if (document.cookie.indexOf('isLogin=true') && !getCookie('isReaload')) {
            location.reload();
            document.cookie = "isReaload=oneTime";

        }
    }
}
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        document.cookie = "isLogin=; expires: -1";
        document.cookie = "userName=; expires: -1";
        document.cookie = "userImage=; expires: -1";
        document.cookie = "userEmail=; expires: -1";
        document.cookie = "userToken=; expires: -1";
        document.cookie = "isReaload=; expires: -1";
        location.reload();
    });
}

$('#see_all').on('click', function (e) {
    e.preventDefault();
    $('.card-body,.comments').show();
    $('.fa-chevron-circle-right').addClass('fa-chevron-circle-down').removeClass('fa-chevron-circle-right');
});
/*Добавление комментариев*/
$('.doComment').on('click', function (e) {
    var card = $(this).parents('.card');
    if(card.find('.addComment')[0] === undefined) {
        /*ниже идет проверка на наличие формы редактирования поста*/
        if(card.children('.editComment')) {
            card.children('.editComment').remove();
        }
        card.append('<form class="addComment formComment" action="/main" style="margin:0 20px">\n' +
            '                    <div class="form-group" style="margin-bottom: 30px;">\n' +
            '                        <label for="addMess">Добавить комментарий</label>\n' +
            '                        <textarea placeholder="Новое сообщение..." class="form-control" id="addMess" rows="3"></textarea>\n' +
            '                        <p></p>\n' +
            '                        <button type="button" style="float: right;" class="btn btn-danger cancel_btn">Отмена</button>\n' +
            '                        <button type="submit" style="float: right;" class="btn btn-primary"><i class="fas fa-location-arrow"></i> Добавить</button>\n' +
            '                        <div class="clearfix"></div>\n' +
            '                    </div>\n' +
            '                </form>');
    }
});
/*Скрытие комментариев и сообщений*/
$('body').on('click', '.cancel_btn', function (e) {
    $(this).parents('.formComment').remove();
});
/*Редактирование сообщений и комментариев*/
$('.edit').on('click', function (e) {
    var card = $(this).parents('.card');
    /*Проверка на наличие добавленной формы редактирования записи*/
    if(card.find('.editComment')[0] === undefined) {
        /*ниже идет проверка на наличие формы добавления комментария*/
        if(card.children('.addComment')) {
            card.children('.addComment').remove();
        }
        card.append('<form class="editComment formComment" action="/main" style="margin:0 20px">\n' +
            '                    <div class="form-group" style="margin-bottom: 30px;">\n' +
            '                        <label for="addMess">Редактировать свой пост</label>\n' +
            '                        <textarea placeholder="Новое сообщение..." class="form-control" id="editMess" rows="3"></textarea>\n' +
            '                        <p></p>\n' +
            '                        <button type="button" style="float: right;" class="btn btn-danger cancel_btn">Отмена</button>\n' +
            '                        <button type="submit" style="float: right;" class="btn btn-primary"><i class="fas fa-location-arrow"></i> Отправить</button>\n' +
            '                        <div class="clearfix"></div>\n' +
            '                    </div>\n' +
            '                </form>'
        );
        card.children('.editComment').find('textarea#editMess').val($(this).siblings('.card-text').text().replace(/\s{2,}/g, ' '));
    }
});
/*Раскрытие и закрытие сообщений и комментариев*/
$('.card-header').on('click', function (e) {
    if(!$(this).hasClass('active')) {
        $(this).find('.fa-chevron-circle-right').addClass('fas fa-chevron-circle-down').removeClass('.fas fa-chevron-circle-right');
        $(this).addClass('active');
        $(this).parents('.card').children('.card-body').slideDown();
        $(this).parents('.card').siblings().slideDown();
    }
    else {
        $(this).find('.fa-chevron-circle-down').addClass('fas fa-chevron-circle-right').removeClass('.fas fa-chevron-circle-down');
        $(this).removeClass('active');
        $(this).parents('.card').children('.card-body').slideUp();
        $(this).parents('.card').siblings().slideUp();
    }
});