$(document).ready(function() {

  $(".restart").hide();
  

    $("#add-band, .start").on("click", function(event) {
        event.preventDefault();
        $(".quiz").hide();
        // $(".start").on("click", function() {
          $(".time-remaining").text("Time Remaining:");
          $("#display").text("00:30");
          timer.start;
          // $(".q1, .q2, .q3, .question, .answer-choices").show();
          $("p.wrong, p.unanswered, p.right").hide();
          // $(".q1, .q2, .q3, .question, .answer-choices").text(" ");




        // });

        var wrongAnswer = 0;
        var rightAnswer = 0;
        var unAnswered = 0;


        // MUSIC OBJECT HOLDS BAND, ALBUM, & TRACK
        var music = [];

        // GRAB INPUT FROM FORM AND PUSH TO MUSIC OBJECT
        var band = $("#band-input-1").val().trim();
        music.push(band)
        var album = $("#band-input-2").val().trim();
        music.push(album)
        var song = $("#band-input-3").val().trim();
        music.push(song)

        // LAST.FM API
        // ARTIST.GETINFO
        var artistGetInfo = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&format=json&artist=";
        var apiKey = "&api_key=44d5637b853c0365609a74cf51ba468f";
        // ALBUM.GETINFO
        var albumGetInfo = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&format=json";
        var artistQuery = "&artist=";
        var albumQuery = "&album=";
        // TRACK.GETIFO
        var trackGetInfo = "https://ws.audioscrobbler.com/2.0/?method=track.getInfo&format=json";
        var trackQuery = "&track=";
      
        // SEARCH CITY BAND IS FROM
        // var from = /from/;
        // var fromComma = /,/;
        
        console.log(music);


       
            // for (let i = 0; i < music.length; i++) {     

                    //  YEAR BAND WAS FORMED
                    // if (i === 0) {
                        $.get(artistGetInfo + music[0] + apiKey).then(function(data){
                            console.log("band info!");
                            var formed = /formed in /;

                            // console.log("last.fm artist:", data.artist.bio.summary);
                            console.log(data);
                            var bio = JSON.stringify(data.artist.bio.content);
                            console.log(JSON.stringify(data.artist.bio.content));
                    
                            // // adds entire bio to page
                            // $(".bio").text(bio);
                            
                            // SEARCH YEAR BAND WAS FORMED
                            // tests if the str "formed in" is present in the bio
                            console.log( formed.test(bio) )
                            // finds the starting index for the str "formed in" 
                            console.log( bio.search(formed) )
                            // starting index for the str "formed in" placed into variable
                            var startFormed =  bio.search(formed);
                            // takes starting index, adds 10 to get to the end of the str "formed in", searches from there to four characters later, ie the year
                            console.log( bio.substring(startFormed+10, startFormed+10+4) )
                    
                            // // SEARCH CITY BAND IS FROM
                            // // tests if the str "from" is in the bio
                            // console.log( from.test(bio) )
                            // // finds the starting index for the str "from"
                            // console.log( bio.search(from) )
                            // //adds to variable
                            // var startFrom =  bio.search(from);
                            // // searches from the end of str "from" to 20 characters out; 20 because that is how long the name of longest city in existence is
                            // console.log( bio.substring(startFrom+5, startFrom+5+20) )
                            // // starting index from above added to variable
                            // var fromCommaStr = bio.substring(startFrom+5, startFrom+5+20)
                            // // searches for the starting index of str "," in variable from above
                            // console.log( fromCommaStr.search(fromComma) )
                            // // starting index added to variable
                            // var endFromComma = fromCommaStr.search(fromComma)
                            // // searches from the end of the str "from" to the end of the comma, ie city!
                            // console.log( fromCommaStr.substring(0, endFromComma) )

                    
                            // year and city into variables
                            // var cityFrom = fromCommaStr.substring(0, endFromComma);
                            var yearFormed = bio.substring(startFormed+10, startFormed+10+4);
                            // var bandInfo = music[0] + " was formed in " + yearFormed + " in " + cityFrom
                    
                            // logs str telling us when and where band was formed
                            console.log("year " + music[0] + " formed?", yearFormed);
                            console.log( parseInt(yearFormed) );
                            console.log( isNaN( parseInt(yearFormed) ) );
                            // $(".bio").text(bio);
                            if ( isNaN( parseInt(yearFormed) ) ) {
                              // $(".first.question").text(" ");
                              // $(".first.answer-choice-1").text(" ");
                              // $(".first.answer-choice-2").text(" ");
                              // $(".first.answer-choice-3").text(" ");
                              // $(".first.answer-choice-4").text(" ");

                            } else {
                            $(".first.question").text("When was " + music[0] + " formed?")
                            $(".first.answer-choice-1").text(parseInt(yearFormed)+1);
                            $(".first.answer-choice-2").text(parseInt(yearFormed)-1);
                            $(".first.answer-choice-3").text(yearFormed);
                            $(".first.answer-choice-4").text(parseInt(yearFormed)+3);

                            // $(".q1").hide();

                            $(".first.answer-choice-1").on("click", function(){
                              $(".first.question, .first.answer-choices").hide();
                              $(".first.result-title").text("Wrong!")
                              $(".first.result-choice").text(music[0] + " was formed in " + yearFormed + ", not " + (parseInt(yearFormed)+1) + "." );
                              wrongAnswer++;
                              $("p.wrong").text("Wrong Answers: " + wrongAnswer);


                            });
                            $(".first.answer-choice-2").on("click", function(){
                              $(".first.question, .first.answer-choices").hide();
                              $(".first.result-title").text("Wrong!")
                              $(".first.result-choice").text(music[0] + " was formed in " + yearFormed + ", not " + (parseInt(yearFormed)-1) + ".");
                              wrongAnswer++;
                              $("p.wrong").text("Wrong Answers: " + wrongAnswer);

                            });
                            $(".first.answer-choice-3").on("click", function(){
                              $(".first.question, .first.answer-choices").hide();
                              $(".first.result-title").text("Correct!")
                              $(".first.result-choice").text(music[0] + " was formed in " + yearFormed + "!")
                              rightAnswer++;
                              $("p.right").text("Right Answers: " + rightAnswer);


                            });
                            $(".first.answer-choice-4").on("click", function(){
                              $(".first.question, .first.answer-choices").hide();
                              $(".first.result-title").text("Wrong!")
                              $(".first.result-choice").text(music[0] + " was formed in " + yearFormed + ", not " + (parseInt(yearFormed)+3) + ".");
                              wrongAnswer++;
                              $("p.wrong").text("Wrong Answers: " + wrongAnswer);

                            });

                          }



           
                            

                        // END OF: $.get(urlPrefix + bands[i] + urlSuffix).then(function(data){
                        });

                    // ALBUM
                    // } else if (i === 1) {
                        $.get(albumGetInfo + apiKey + artistQuery + music[0] + albumQuery + music[1]).then(function(data){
                            console.log("album info!");
                            console.log(data);
                            console.log("how many tracks in " + music[1] + "?", data.album.tracks.track.length);
                            var albumLength = data.album.tracks.track.length;

                            // // SEARCH YEAR ALBUM WAS RELEASED
                            // var released = /released on /;
                            // var releasedYear19 = /19/;
                            // var releasedYear20 = /20/;

                            // // console.log("last.fm artist:", data.artist.bio.summary);
                            // // console.log(data);
                            // var albumSummary = JSON.stringify(data.album.wiki.summary);

                            
                          
                            // // tests if the str "released on " is present in the album summary
                            // console.log( released.test(albumSummary) )
                            // // finds the starting index for the str "released on "
                            // console.log( albumSummary.search(released) )
                            // // starting index for the str "released on " placed into variable
                            // var startReleased =  albumSummary.search(released);
                            // // takes starting index, adds to the rough end of the full date 
                            // console.log( "rough date album released:", albumSummary.substring(startReleased+12, startReleased+12+3+10+4));

                            // var albumSummarySubstring = albumSummary.substring(startReleased+12, startReleased+12+3+10+4);
                            // if (releasedYear19.test(albumSummarySubstring)) {

                            // } else if (releasedYear20.test(albumSummarySubstring)) {

                            // }
                   
                            // var yearReleased = albumSummary.substring(startReleased+12, startReleased+12+3+10+4);

                            $(".second.question").text("How many tracks are on  " + music[1] + "?")
                            $(".second.answer-choice-1").text(albumLength+3);
                            $(".second.answer-choice-2").text(albumLength-1);
                            $(".second.answer-choice-3").text(albumLength+1);
                            $(".second.answer-choice-4").text(albumLength);

                            // $(".q2").hide();

                            $(".second.answer-choice-1").on("click", function(){
                              $(".second.question, .second.answer-choices").hide();
                              $(".second.result-title").text("Wrong!")
                              $(".second.result-choice").text(music[1] + " has " + albumLength + " tracks.")
                              wrongAnswer++;
                              $("p.wrong").text("Wrong Answers: " + wrongAnswer);

                            })
                            $(".second.answer-choice-2").on("click", function(){
                              $(".second.question, .second.answer-choices").hide();
                              $(".second.result-title").text("Wrong!")
                              $(".second.result-choice").text(music[1] + " has " + albumLength + " tracks.")
                              wrongAnswer++;
                              $("p.wrong").text("Wrong Answers: " + wrongAnswer);
                              
                            })
                            $(".second.answer-choice-3").on("click", function(){
                              $(".second.question, .second.answer-choices").hide();
                              $(".second.result-title").text("Wrong!")
                              $(".second.result-choice").text(music[1] + " has " + albumLength + " tracks.")
                              wrongAnswer++;
                              $("p.wrong").text("Wrong Answers: " + wrongAnswer);
                              
                            })
                            $(".second.answer-choice-4").on("click", function(){
                              $(".second.question, .second.answer-choices").hide();
                              $(".second.result-title").text("Correct!");
                              $(".second.result-choice").text(music[1] + " has " + albumLength + " tracks!")
                              rightAnswer++;
                              $("p.right").text("Right Answers: " + rightAnswer);

                              
                            })


                            
    
                    
                        // END OF: $.get(albumGetInfo + apiKey + artistQuery + music[0] + albumQuery + music[1]).then(function(data){
                        });

                    // TRACK
                    // } else if (i === 2) {
                        $.get(trackGetInfo + apiKey + artistQuery + music[0] + trackQuery + music[2]).then(function(data){
                            console.log("track info!");
                            console.log(data)
                            console.log(music[2] + " is " + msToTime(data.track.duration) + " long.");

                            function msToTime(s) {
                                var ms = s % 1000;
                                s = (s - ms) / 1000;
                                var secs = s % 60;
                                s = (s - secs) / 60;
                                var mins = s % 60;
                                
                              
                                return mins + ':' + secs;
                              }

                              msToTime(data.track.duration);

                              var trackLengthAnswer = msToTime(data.track.duration);
                            //   console.log("test: trackLength:",data.track.duration);
                            //   console.log("test2: trackLength:", parseInt(data.track.duration) + 5000);
                            var trackLengthWrong1 = msToTime( parseInt(data.track.duration) + 5000);
                            var trackLengthWrong2 = msToTime( parseInt(data.track.duration) - 5000);
                            var trackLengthWrong3 = msToTime( parseInt(data.track.duration) + 10000);

                              

                              $(".third.question").text("How long is the song  " + music[2] + "?")
                              $(".third.answer-choice-1").text(trackLengthAnswer);
                              $(".third.answer-choice-2").text(trackLengthWrong1);
                              $(".third.answer-choice-3").text(trackLengthWrong2);
                              $(".third.answer-choice-4").text(trackLengthWrong3);

                              $(".third.answer-choice-1").on("click", function(){
                                $(".third.question, .third.answer-choices").hide();
                                $(".third.result-title").text("Correct!");
                                $(".third.result-choice").text( music[2] + " is " + trackLengthAnswer + " long." );
                                rightAnswer++;
                                $("p.right").text("Right Answers: " + rightAnswer);

                              });
                              $(".third.answer-choice-2").on("click", function(){
                                $(".third.question, .third.answer-choices").hide();
                                $(".third.result-title").text("Wrong!");
                                $(".third.result-choice").text( music[2] + " is " + trackLengthAnswer + " long." );
                                wrongAnswer++;
                                $("p.wrong").text("Wrong Answers: " + wrongAnswer);

                              });
                              $(".third.answer-choice-3").on("click", function(){
                                $(".third.question, .third.answer-choices").hide();
                                $(".third.result-title").text("Wrong!");
                                $(".third.result-choice").text( music[2] + " is " + trackLengthAnswer + " long." );
                                wrongAnswer++;
                                $("p.wrong").text("Wrong Answers: " + wrongAnswer);

                              });
                              $(".third.answer-choice-4").on("click", function(){
                                $(".third.question, .third.answer-choices").hide();
                                $(".third.result-title").text("Wrong!");
                                $(".third.result-choice").text( music[2] + " is " + trackLengthAnswer + " long." );
                                wrongAnswer++;
                                $("p.wrong").text("Wrong Answers: " + wrongAnswer);

                              });
                              

                              // $(".q3").hide();
                        
                        });

                    // }





            // END OF: for (let i = 0; i < bands.length; i++) {
            // }

           
            


    // END OF: $("#add-band").on("click", function(event) {   
    });


// BEGIN: REPLIT CODE



  

  // $(document).ready(function() {
  
//   var qa = {
//       one: {
//           q:"How do you pronounce gif?",
//           a:"Gif"
  
//       },
//       two: "Which of the following is not a language of the web?"
//   }




  // function questionBuilder () {

  //   //   $(".start").remove();
  
  //   //   $(".question").text(qa.one.q);
  //   //   $(".answer-choice-1").text("A. " + qa.one.a)
  //   //   $(".answer-choice-2").text("B. Jif")
  //   //   $(".answer-choice-3").text("C. What's a gif?")
  //   //   $(".answer-choice-4").text("D. Yes.")
  
  //   //   $(".answer-choice-1").on("click", function (){
  //   //       $(".answer-choice-2, .answer-choice-3, .answer-choice-4").hide();
  //   //       $(".result-title").text("Correct!")
  //   //   });
  
  //   //   $(".answer-choice-2, .answer-choice-3, .answer-choice-4").on("click", function(){
  //   //     console.log( $(this).attr("class") );
  //   //     $(".answer-choice-1, .answer-choice-2, .answer-choice-3, .answer-choice-4").css("visibility", "hidden")
  //   //     $(this).css("visibility", "visible");
  //   //     $(".result-title").text("Wrong!");
        
  //   //     window.setTimeout(function(){
  //   //       $(".answer-choices").hide();
  //   //       $(".result-title").text("Correct Answer: ")
  //   //       $(".answer-choice-1").css("visibility", "visible").appendTo(".result-choice");
  //   //     }, 1000*2)
  
  
  //   //   });
  // }
  

  
  // END OF: $(document).ready(function() {
  // });


// END: REPLIT CODE

    
 

    
// END OF: $(document).ready(function() { line 1
});

window.onload = function() {
  //   // $("#lap").on("click", timer.recordLap);
  //   // $("#stop").on("click", timer.stop);
  //   // $("#reset").on("click", timer.reset);
    $(".start").on("click", timer.start);
  };
  
  //  Variable that will hold our setInterval that runs the timer
  var intervalId = 0;
  
  //prevents the clock from being sped up unnecessarily
  var clockRunning = false;
  
  // timer object
  var timer = {
  
    time: 0,
    // lap: 1,
  
    // reset: function() {
  
    //   timer.time = 0;
    //   // timer.lap = 1;
  
    //   // DONE: Change the "display" div to "00:00."
    //   $("#display").text("00:00");
  
    //   // DONE: Empty the "laps" div.
    //   $("#laps").text("");
    // },
    start: function() {
  
      // DONE: Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
          intervalId = setInterval(timer.count, 1000);
          clockRunning = true;
          timer.time = 15;
      }
    },
    // stop: function() {
  
    //   // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    //   clearInterval(intervalId);
    //   clockRunning = false;
    // },
    // recordLap: function() {
  
    //   // DONE: Get the current time, pass that into the timer.timeConverter function,
    //   //       and save the result in a variable.
    //   var converted = timer.timeConverter(timer.time);
  
    //   // DONE: Add the current lap and time to the "laps" div.
    //   $("#laps").append("<p>Lap " + timer.lap + " : " + converted + "</p>");
  
    //   // DONE: Increment lap by 1. Remember, we can't use "this" here.
    //   timer.lap++;
    // },
    count: function() {
  
      // DONE: increment time by 1, remember we cant use "this" here.
      timer.time--;

      if ( timer.time === 0) {
        clearInterval(intervalId);
        clockRunning = false;
        $(".q1, .q2, .q3").hide();
        $("h3.timeup").text("Time's up!");
        $("p.wrong, p.unanswered, p.right").show();
        // console.log(wrongAnswer);
        $(".restart").show();
        $(".restart").on("click", function(){
          location.reload();

        });



        
      }
  
      // DONE: Get the current time, pass that into the timer.timeConverter function,
      //       and save the result in a variable.
      var converted = timer.timeConverter(timer.time);
      console.log(converted);
      // console.log(intervalId);
      

  
      // DONE: Use the variable we just created to show the converted time in the "display" div.
      $("#display").text(converted);
    },
    timeConverter: function(t) {
  
      var minutes = Math.floor(t / 60);
      var seconds = t - (minutes * 60);
  
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
  
      if (minutes === 0) {
        minutes = "00";
      }
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }
  
      return minutes + ":" + seconds;
    }
   
  // END OF: var timer = { 
  };

//   $(".start").on("click", function(){
//     // questionBuilder();
//     $(".time-remaining").text("Time Remaining:");
//     $("#display").text("00:05");
//     timer.start;
    
// });