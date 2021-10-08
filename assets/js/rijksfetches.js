//========= Search API variables
// Complete documentation of API can be found here: https://data.rijksmuseum.nl/object-metadata/api/
// Filter variables
const cultureMarker = "&culture=en"; // The language to search in (and of the results) (en or nl). I haven't a difference with or with out this, but keeping on.
const resultsPerPageMarker = "&ps=50"; // 1-100, defaults 10. Good performance with 50.
const queryMarker = "&q="; // "The search terms that need to occur in one of the fields of the object data." Painting Title or anything other search parameter.
const artistMarker = "&involvedMaker="; // "Object needs to be made by this agent." AKA, the artist for our purposes.
const hasImageMarker = "&imgonly=true"; // "Only give results for which an image is available or not." Forcing to true.
//var centuryMarker = "&f.dating.period="; // "The century in which the object is made." 0-21 are valid options.
const topPieceMarker = "&toppieces=true"; // "Only give works that are top pieces." This gives us some more famous and recognizable pieces in the collection.
const typeMarker = "&type=schilderij"; // "schilderij" means paintings. This narrows our results down to paints. Filters out pencil sketches, sculptures, pottery, etc.

// Sort variables
const sortRelevanceMarker = "&s=relevance"; // Sorts by relevance for results
//var sortArtistMarker = "s=artist"; // Sorts by artist for results. oof for now.


// Defaulted search filters to retrieve good search results for the purposes of our app
const defaultFilterMarkers = cultureMarker + hasImageMarker + typeMarker + topPieceMarker;
const defaultSortMarkers = resultsPerPageMarker + sortRelevanceMarker;


// API root URLs and key
const searchAPIRoot = "https://www.rijksmuseum.nl/api/nl/collection?key=TnDINDEU";
const collectionAPIRoot = "https://www.rijksmuseum.nl/api/nl/collection/";
//var collectionDutchAPIRoot = "https://www.rijksmuseum.nl/api/nl/collectie/";
const key = "?key=TnDINDEU";


// initialized arrays used search fetch functions


//================================================================================== Function for 
function urlTop20() {
    return searchAPIRoot + topPieceMarker + hasImageMarker + typeMarker + "&ps=20";
}


//================================================================================ Function for appending user input on TITLE OR GENERAL QUERY search 
function urlAppendQuery( userInputText ) {
    return searchAPIRoot + defaultFilterMarkers + queryMarker + userInputText + defaultSortMarkers;
}

//================================================================================ Function for appending user input on ARTIST search 
// WARNING, THIS IS CASE SENSITIVE AND REQUIRES FULL NAME. "Vincent van Gogh" is good; "Vincent Van Gogh", "vincent van gogh", and "van Gogh" are all bad.
function urlAppendArtist( userInputText ) {
    return searchAPIRoot + defaultFilterMarkers + artistMarker + userInputText + defaultSortMarkers;
}

//================================================================================ Function for appending user input on ARTIST search 
// Cleansed 
function urlAppendCurated( curatedText ) {
    return searchAPIRoot + defaultFilterMarkers + artistMarker + curatedText + defaultSortMarkers;
}


//================================================================================ Function for appending user input on CENTURY +  TITLE OR GENERAL QUERY search 
//function urlAppendCentury() {
//    searchUrl = searchAPIRoot + defaultFilterMarkers + centuryMarker + queryMarker + userInputText + defaultSortMarkers;
//    console.log(searchUrl);
//}
////urlAppendCentury();

//============================================================================= Default URL load
function urlDefault() {
    return searchAPIRoot + defaultFilterMarkers + artistMarker + "Rembrandt+van+Rijn" + defaultSortMarkers;  // Defaults our landing art to Rembrandt
}


//==================================== 
function getResults( searchUrl, helper ) {
    //console.log( searchUrl );
    //console.log( helper );
    progressBarEl.css("visibility", "visible");
    fetch( searchUrl )
        .then(function (response) { // fetches objects from search API
            if (!response.ok) {
                console.log("One search result could not be obtained");
                throw 'Error';
            }
            else {
                return response.json();
            }
        })
        .then( helper );
}