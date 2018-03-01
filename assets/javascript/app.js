$(document).ready(function() {

var qa = {
    one: {
        q:"How do you pronounce gif?",
        a:"Gif"

    },
    two: "Which of the following is not a language of the web?"
}

function questionOne () {
    $(".start").remove();

    $(".question").text(qa.one.q);
    $(".answer-choice-1").text("A." + qa.one.a)
    $(".answer-choice-2").text("B. Jif")
    $(".answer-choice-3").text("C. What's a gif?")
    $(".answer-choice-4").text("D. Yes.")

    $(".answer-choice-1").on("click", function (){
        $(".question, .answer-choice-2, .answer-choice-3, .answer-choice-4").remove();
        $(".yup").text("Correct!")
    });

    $(".answer-choice-2, .answer-choice-3, .answer-choice-4").on("click", function(){
        $(".nope").text("Wrong!")

    });
}

$(".start").on("click", function(){
    questionOne();
});



});