$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        console.log(data);
        console.log(data.omicron.length);
        for (var i = 0; i < data.omicron.length; i++) {
          $("#carouselbox").append('<div class="person" data-name="' + data.omicron[i].name + '" data-gitname="' + data.omicron[i].git_username + '" data-shoutout="' + data.omicron[i].shoutout + '" data-index="' + i +'"></div>')
        }
        omicron = data.omicron.length - 1
        console.log(omicron);
        onloadPerson();
        timer;
      }
    });
    console.log(".person");
    $("#carouselbox").on("click", ".person", newPerson);
    $(".previous").on("click", previous);
    $(".next").on("click", next)
});
var omicron = 0
var timer = setInterval(carousel, 10000);

//
function carousel() {
  if ($(".active").data("index") < omicron) {
    var person = ($(".active").next());
    append(person);
  } else {
    var person = ($(".person").first());
    append(person);
  }
}

//person set to active on page load
function onloadPerson() {
  var person = ($(".person").first());
  append(person);
}

//what happens when you click on a div in the person bar
function newPerson() {
  clearInterval(timer);
  var person = ($(this));
  append(person);
  timer = setInterval(carousel, 10000);
}

//what happens when you press the previous button
function previous() {
  clearInterval(timer);
  if ($(".active").data("index") > 0) {
    var person = ($(this).parent().parent().children(".active").prev());
    append(person);
  } else {
    var person = ($(".person").last());
    append(person);
  }
  timer = setInterval(carousel, 10000);
}

//what happens when you press the next button
function next() {
  clearInterval(timer);
  if ($(".active").data("index") < omicron) {
    var person = ($(this).parent().parent().children(".active").next());
    append(person);
  } else {
    var person = ($(".person").first());
    append(person);
  }
  timer = setInterval(carousel, 10000);
}

//append the DOM with the new person
function append(person) {
  person.siblings().removeClass("active");
  person.addClass("active");
  $("#currenttext").fadeOut("slow", function() {
    $("#currenttext").text("");
  });
  $("#currenttext").fadeIn("slow", function() {
    var name = person.data("name");
    var gitname = person.data("gitname");
    var shoutout = person.data("shoutout");
    $("#currenttext").append("<p>Name: " + name + "</p>");
    $("#currenttext").append("<p>Git name: " + gitname + "</p>");
    $("#currenttext").append("<p>Shoutout: " + shoutout + "</p>");
  });
}
