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