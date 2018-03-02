$(document).ready(function() {

    $("#add-band").on("click", function(event) {
        event.preventDefault();

        var bands = [];

        // grabs the input from the textbox
        var band1 = $("#band-input-1").val().trim();
        bands.push(band1)
        var band2 = $("#band-input-2").val().trim();
        bands.push(band2)
        var band3 = $("#band-input-3").val().trim();
        bands.push(band3)

        var urlPrefix = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="
        // var band = "my chemical romance";
        // var album = "pablo honey";
        var urlSuffix = "&api_key=44d5637b853c0365609a74cf51ba468f&format=json";
        var formed = /formed in /;
        var from = /from/;
        var fromComma = /,/;
        
        console.log(bands);

       
            for (let i = 0; i < bands.length; i++) {

                $.get(urlPrefix + bands[i] + urlSuffix).then(function(data){
                    // console.log("last.fm artist:", data.artist.bio.summary);
                    // console.log(data);
                    var bio = JSON.stringify(data.artist.bio.content);
                    // console.log(JSON.stringify(data.artist.bio.content));
            
                    // // adds entire bio to page
                    // $(".bio").text(bio);
                    
                    // tests if the str "formed in" is present in the bio
                    console.log( formed.test(bio) )
                    // finds the starting index for the str "formed in" 
                    console.log( bio.search(formed) )
                    // starting index for the str "formed in" placed into variable
                    var startFormed =  bio.search(formed);
                    // takes starting index, adds 10 to get to the end of the str "formed in", searches from there to four characters later, ie the year
                    console.log( bio.substring(startFormed+10, startFormed+10+4) )
            
                    // tests if the str "from" is in the bio
                    console.log( from.test(bio) )
                    // finds the starting index for the str "from"
                    console.log( bio.search(from) )
                    //adds to variable
                    var startFrom =  bio.search(from);
                    // searches from the end of str "from" to 20 characters out; 20 because that is how long the name of longest city in existence is
                    console.log( bio.substring(startFrom+5, startFrom+5+20) )
                    // starting index from above added to variable
                    var fromCommaStr = bio.substring(startFrom+5, startFrom+5+20)
                    // searches for the starting index of str "," in variable from above
                    console.log( fromCommaStr.search(fromComma) )
                    // starting index added to variable
                    var endFromComma = fromCommaStr.search(fromComma)
                    // searches from the end of the str "from" to the end of the comma, ie city!
                    console.log( fromCommaStr.substring(0, endFromComma) )

            
                    // year and city into variables
                    var cityFrom = fromCommaStr.substring(0, endFromComma);
                    var yearFormed = bio.substring(startFormed+10, startFormed+10+4);
                    var bandInfo = bands[i] + " was formed in " + yearFormed + " in " + cityFrom

                    if (cityFrom === bands[i] ) {
                        console.log("test!")

                    }
            
                    // logs str telling us when and where band was formed
                    console.log(bandInfo);
                    // $(".bio").text(bio);

                // END OF: $.get(urlPrefix + bands[i] + urlSuffix).then(function(data){
                });

                        // $.get("https://ws.audioscrobbler.com/2.0/?method=album.search&album=" + album + suffix).then(function(data){
                        //  console.log("last.fm album:", data.results.albummatches.album);
                        // });

            // END OF: for (let i = 0; i < bands.length; i++) {
            }

    // END OF: $("#add-band").on("click", function(event) {   
    });
 

    
// END OF: $(document).ready(function() {
});