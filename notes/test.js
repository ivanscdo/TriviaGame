$(document).ready(function() {

    var prefix = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="
    var band = "metallica";
    var album = "pablo honey";
    var suffix = "&api_key=44d5637b853c0365609a74cf51ba468f&format=json";
    var formed = /formed in /;
    var from = /from/;
    var fromComma = /,/;
    
    $.get(prefix + band + suffix).then(function(data){
        // console.log("last.fm artist:", data.artist.bio.summary);
        // console.log(data);
        var bio = JSON.stringify(data.artist.bio.content);
        // console.log(JSON.stringify(data.artist.bio.content));
        $(".bio").text(bio);
        console.log( formed.test(bio) )
        console.log( bio.search(formed) )
        var startFormed =  bio.search(formed);
        console.log( bio.substring(startFormed+10, startFormed+10+4) )

        console.log( from.test(bio) )
        console.log( bio.search(from) )
        var startFrom =  bio.search(from);
        console.log( bio.substring(startFrom+5, startFrom+5+20) )
        var fromCommaStr = bio.substring(startFrom+5, startFrom+5+20)
        console.log( fromCommaStr.search(fromComma) )
        var endFromComma = fromCommaStr.search(fromComma)
        console.log( fromCommaStr.substring(0, endFromComma) )

    });

    
    
    // $.get("https://ws.audioscrobbler.com/2.0/?method=album.search&album=" + album + suffix).then(function(data){
    //     console.log("last.fm album:", data.results.albummatches.album);
    
    // });
    
    
    
    });