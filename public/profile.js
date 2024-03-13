import { response } from "express";

$(document).ready(function () {

    fetch('/public/profile')
        .then(response => response.json())
        .then(alert(userData));

    $("#profileName").text("Javascript loaded");

    alert("Javascript loaded");


});