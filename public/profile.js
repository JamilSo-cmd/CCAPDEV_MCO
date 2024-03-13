$(document).ready(function () {

    $("#profileRole").text("Javascript loaded");

    fetch('/userData')
        .then(response => response.json())
        .then(userData => console.log(userData));

});