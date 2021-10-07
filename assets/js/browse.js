// Filter variables
var cultureMarker = "&culture=en"; // The language to search in (and of the results) (en or nl). I haven't a difference with or with out this, but keeping on.
var resultsPerPageMarker = "&ps=50"; // 1-100, defaults 10. Good performance with 50.
var queryMarker = "&q="; // "The search terms that need to occur in one of the fields of the object data." Painting Title or anything other search parameter.
var artistMarker = "&involvedMaker="; // "Object needs to be made by this agent." AKA, the artist for our purposes.
var hasImageMarker = "&imgonly=true"; // "Only give results for which an image is available or not." Forcing to true.
//var centuryMarker = "&f.dating.period="; // "The century in which the object is made." 0-21 are valid options.
var topPieceMarker = "&toppieces=true"; // "Only give works that are top pieces." This gives us some more famous and recognizable pieces in the collection.
var typeMarker = "&type=schilderij"; // "schilderij" means paintings. This narrows our results down to paints. Filters out pencil sketches, sculptures, pottery, etc.

// Sort variables
var sortRelevanceMarker = "&s=relevance"; // Sorts by relevance for results
//var sortArtistMarker = "s=artist"; // Sorts by artist for results. oof for now.


// Defaulted search filters to retrieve good search results for the purposes of our app
var defaultFilterMarkers = cultureMarker + hasImageMarker + typeMarker + topPieceMarker;
var defaultSortMarkers = resultsPerPageMarker + sortRelevanceMarker;


// API root URLs and key
var searchAPIRoot = "https://www.rijksmuseum.nl/api/nl/collection?key=TnDINDEU";
var collectionAPIRoot = "https://www.rijksmuseum.nl/api/nl/collection/";
//var collectionDutchAPIRoot = "https://www.rijksmuseum.nl/api/nl/collectie/";
var key = "?key=TnDINDEU";

function top20Url() {
    return searchAPIRoot + topPieceMarker + hasImageMarker + "&ps=20"
}

function populateFeatured() {
    fetch( top20Url() ).then( response => response.json() ).then( function(data) {
        console.log(data);

        for(let i=0; i<data.artObjects.length; i++) {
            let li = $("<li>");
            li.addClass(); // TODO: add css classes
            let link = $("<a>");
            link.attr("href", data.artObjects[i].links.web);
            link.text(data.artObjects[i].title);
            li.append(link);
            $("#featured-tab").children(".collapsible").append(li);
        }
    } );
}

populateFeatured();