$(document).ready(function() {

    $(".restart").hide();
    
        $("#add-band, .start").on("click", function(event) {
            event.preventDefault();


            $(".quiz").hide();
            $(".time-remaining").text("Time Remaining:");
            $("#display").text("00:30");
            timer.start;
            $("p.wrong, p.unanswered, p.right").hide();

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
  
            //  YEAR BAND WAS FORMED
            $.get(artistGetInfo + music[0] + apiKey).then(function(data){
                console.log("band info!");
                var formed = /formed in /;

                // console.log("last.fm artist:", data.artist.bio.summary);
                console.log(data);
                var bio = JSON.stringify(data.artist.bio.content);
                console.log(JSON.stringify(data.artist.bio.content));

                
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
                // END OF: else {
                }

            // END OF: $.get(urlPrefix + bands[i] + urlSuffix).then(function(data){
            });

            // ALBUM
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

            // END OF: $.get(trackGetInfo + apiKey + artistQuery + music[0] + trackQuery + music[2]).then(function(data){
            });

        // END OF: $("#add-band").on("click", function(event) {   
        });  
      
  // END OF: $(document).ready(function() { line 1
  });
  
window.onload = function() {
    $(".start").on("click", timer.start);
};

var intervalId = 0;

var clockRunning = false;

var timer = {

    time: 0,

    start: function() {

        if (!clockRunning) {
            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
            timer.time = 15;
        }
    },

    count: function() {

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
    
        var converted = timer.timeConverter(timer.time);
        console.log(converted);        

    
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
