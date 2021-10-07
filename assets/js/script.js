var imageArr = []; //array of images used to display in the carousel
var curEl = 0; //the image that is initially displayed on the carousel, keeps track of which index in imagearr

var carouselContainerEl = $("#carousel-container"); //container for the carousel, used to render carousel elements
var nextButton = $("#next-button"); //next button for carousel
var prevButton = $("#prev-button"); //prev button for carousel
var dropTriggerEl = $('.dropdown-trigger'); //dropdown on top search bar
var progressBarEl = $(".progress"); //the loading bar


//list of artists https://www.rijksmuseum.nl/en/rijksstudio/artists
var artistList = ["Aertsen, Pieter", "Alma Tadema, Lawrence","Appel, Karel", "Avercamp, Hendrick", "Baburen, Dirck van", "Bakhuysen, Ludolf"
, "Berchem, Nicolaes Pietersz.", "Berckheyde, Gerrit Adriaensz.", "Beuckelaer, Joachim","Bilders, Albert Gerard", "Bloemaert, Abraham", "Bol, Ferdinand",
 "Borch, Gerard ter", "Both, Jan", "Breitner, George Hendrik", "Brugghen, Hendrick ter", "Buytewech, Willem Pietersz.", "Claesz., Pieter", "Coorte, Adriaen",
  "Cornelisz van Haarlem, Cornelis","Cornelisz. van Oostsanen, Jacob", "Cuyp, Aelbert", "Dou, Gerard", "Dujardin, Karel", "Dyck, Anthony van","Dürer, Albrecht",
   "Eeckhout, Gerbrand van den", "Everdingen, Caesar Boëtius van", "Flinck, Govert", "Gabriël, Paul Joseph Constantin", "Gao Qipei", "Geertgen tot Sint Jans", 
   "Gheyn, Jacob de", "Giambologna", "Gogh, Vincent van", "Goltzius, Hendrick", "Goya y Lucientes, Francisco José de", "Goyen, Jan van", "Hals, Dirck", "Hals, Frans",
    "Heda, Willem Claesz.", "Heem, Jan Davidsz. de", "Heemskerck, Maarten van", "Helst, Bartholomeus van der", "Hiroshige", "Hokusai, Katsushika", "Hondecoeter, Melchior d'",
     "Honthorst, Gerard van", "Hooch, Pieter de", "Israels, Isaac", "Israëls, Jozef", "Jordaens, Jacob", "Key, Adriaen Thomasz.", "Koninck, Philips", "Kooi, Willem Bartel van der",
      "Kruseman, Jan Adam", "Lairesse, Gerard de","Lastman, Pieter", "Lelie, Adriaan de", "Leyden, Lucas van", "Lievens, Jan", "Liotard, Jean Etienne", "Maes, Nicolaes",
       "Mander, Karel van", "Mauve, Anton", "Meester van Alkmaar", "Mesdag, Hendrik Willem", "Metsu, Gabriël", "Mierevelt, Michiel Jansz. van", "Mignon, Abraham", "Ostade, Adriaen van",
        "Pieneman, Jan Willem", "Pieneman, Nicolaas", "Post, Frans Jansz.", "Potter, Paulus", "Rembrandt Harmensz. van Rijn", "Rubens, Peter Paul", "Ruisdael, Jacob Isaacksz. van", 
        "Ruysdael, Salomon van", "Saenredam, Pieter Jansz.", "Savery, Roelant", "Schouten, Gerrit", "Scorel, Jan van", "Segers, Hercules","Steen, Jan Havicksz.", "Sweerts, Michael", "Troost, Cornelis",
         "Vanmour, Jean Baptiste","Velde, Willem van de", "Velde, Willem van de (II)", "Venne, Adriaen Pietersz. van de", "Vermeer, Johannes", "Verspronck, Johannes Cornelisz.", 
         "Vianen, Paulus Willemsz. van", "Visscher, Claes Jansz.", "Voogd, Hendrik"];

/**
 * 
 */
function clearCarousel() {
    $(".carousel-slide").remove();
}

function renderCarousel(index) {

    if (index < 0) {
        curEl = 0;
        return;
    }
    else if (index >= imageArr.length) {
        curEl = imageArr.length - 1;
        return;
    }

    clearCarousel();
    let imgUrl = imageArr[index];
    let slide = $("<div>");
    slide.attr("class", "carousel-slide");
    // let image = $("<img>");
    // image.attr("src", imgUrl);

    let renderedImage = $("<div>");
    renderedImage.attr("id", "rendered-image");
    // add div, 
    //
    slide.append(renderedImage);

    
    carouselContainerEl.append(slide);
    setPreview("#rendered-image", imgUrl);
}


imageArr.push("https://media.sanctuarymentalhealth.org/wp-content/uploads/2021/03/04151535/The-Starry-Night.jpg");
// imageArr.push("https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8eW9zZW1pdGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80");
// imageArr.push("https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1600&h=800&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2019%2F11%2FAlaska-Northern-Lights-ALASKALTS1017.jpg");


prevButton.on("click", function () {
    renderCarousel(--curEl);
});
nextButton.on("click", function () {
    renderCarousel(++curEl);

});

//render dropdown menu
function styleDropdown(instance) {
    instance.constrainWidth = false;
}




function renderCard(){

    //when new image is loaded call this method to generate new info

}

//render collapsible
$(document).ready(function () {
    $('.collapsible').collapsible();

});

$( function() {
    $('.card' ).draggable();
} );






dropTriggerEl.dropdown();
var dropdownmenu = M.Dropdown.getInstance(dropTriggerEl);
styleDropdown(dropdownmenu);
renderCarousel(curEl);



//for browse

$(document).ready(function(){
    $('.tabs').tabs();
  });

$(document).ready(function(){
    $('.collapsible').collapsible();
});




















































var userInputText = $("#user-input-search").val();

var userInputText2 = " Portret van een vrouw, mogelijk Maria Trip"; //tester

//========= Search API variables
// Complete documentation of API can be found here: https://data.rijksmuseum.nl/object-metadata/api/
// Filter variables
var cultureMarker = "&culture=en"; // The language to search in (and of the results) (en or nl). I haven't a difference with or with out this, but keeping on.
var resultsPerPageMarker = "&ps=50"; // 1-100, defaults 10. Good performance with 50.
var queryMarker = "&q="; // "The search terms that need to occur in one of the fields of the object data." Painting Title or anything other search parameter.
var artistMarker = "&involvedMaker="; // "Object needs to be made by this agent." AKA, the artist for our purposes.
var hasImageMarker = "&imgonly=true"; // "Only give results for which an image is available or not." Forcing to true.
var centuryMarker = "&f.dating.period="; // "The century in which the object is made." 0-21 are valid options.
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
var collectionDutchAPIRoot = "https://www.rijksmuseum.nl/api/nl/collection/";
var key = "?key=TnDINDEU";


// initialized arrays used search fetch functions
var searchUrlArray = [];
var artResultsObj = [];
var miniArtResultsObj = [];



//================================================================================ Function for appending user input on TITLE OR GENERAL QUERY search 
function urlAppendTitle(event) {
    event.preventDefault();
    searchUrl = searchAPIRoot + defaultFilterMarkers + queryMarker + userInputText + defaultSortMarkers;
    //console.log(searchUrl);
    getResults();
}
//urlAppendTitle();

//================================================================================ Function for appending user input on ARTIST search 
// WARNING, THIS IS CASE SENSITIVE AND REQUIRES FULL NAME. "Vincent van Gogh" is good; "Vincent Van Gogh", "vincent van gogh", and "van Gogh" are all bad.
function urlAppendArtist(event) {
    event.preventDefault();
    searchUrl = searchAPIRoot + defaultFilterMarkers + artistMarker + userInputText + defaultSortMarkers;
    //console.log(searchUrl);
    getResults();
}
//urlAppendArtist();

//================================================================================ Function for appending user input on CENTURY +  TITLE OR GENERAL QUERY search 
//function urlAppendCentury() {
//    searchUrl = searchAPIRoot + defaultFilterMarkers + centuryMarker + queryMarker + userInputText + defaultSortMarkers;
//    console.log(searchUrl);
//}
////urlAppendCentury();

//================================================================================ Cleanse and ready user input
function userInputCleanse() {
    //userInputText = $("#user-input-search").val(); // get field value

    // Cleaning inputs
    userInputText = userInputText.trim();  //remove trailing white spaces
    userInputText = userInputText.replace(" ", "+");  // replaces inner white spaces with +
    userInputText = userInputText.replace("/", "+");  // replaces with +
    //userInputText = userInputText.replace("", "+");  // replaces with +

    // need if statement here to check if we have title or artist selected.
    //if (searchFilter = "Artist") {
    //    urlAppendArtist();
    //}
    //
    // else {    
    //  urlAppendTitle();
    //}
    urlAppendTitle();
    
}
//userInputCleanse();



//================================================================================ Search results fetches for both Mini and Detailed Results
function getResults() {
    progressBarEl.css("visibility", "visible");
    fetch(searchUrl)
        .then(function (response) { // fetches objects from search API
            if (!response.ok) {
                console.log("One search result could not be obtained");
                throw 'Error';
            }
            else{
            return response.json();
            }
        })
        .then(function (miniData) { // AKA the "Mini-Results" Fetch. 
            objectNumTotal = miniData.count; // number of total search results
            objectCountOnPage = miniData.artObjects.length; // number of results returned to us on this page. This will match var resultsPerPageMarker. Currently set at 100.

            //console.log(miniData);

            if (objectNumTotal > 0) { // checks to see if the query returned any results
                for (i = 0; i < objectCountOnPage; i++) {

                    // retrieving nested webImage URL
                    var tempWebImage = miniData.artObjects[i].webImage;
                    if (!tempWebImage) {
                        return; // prevents errors by doubling checking if the image is missing   
                    }

                    // retrieving nested production place - Dutch only and often null - deprecated for now
                    //var tempProduction = miniData.artObjects[i].productionPlaces[0];

                    else {
                        var tempUrl = tempWebImage.url;
                        console.log(tempUrl);

                        imageArr.push(tempUrl);

                        var tempMiniArtObj =
                        {
                            "objectNumber": miniData.artObjects[i].objectNumber, // "SK-A-1505" This is the collection reference ID number. Useful for backend data and used in detailed fetch below.
                            "title": miniData.artObjects[i].title,  // "Portret van een vrouw, mogelijk Maria Trip"
                            "longTitle": miniData.artObjects[i].longTitle, // Portret van een vrouw, mogelijk Maria Trip, Rembrandt van Rijn, 1639"
                            "principalOrFirstMaker": miniData.artObjects[i].principalOrFirstMaker, // "Rembrandt van Rijn", The main "maker" of the art, AKA, the artist for our purposes.
                            "webImageUrl": tempUrl, // Img url
                            //"productionPlaces": tempProduction, // Place where the art was produced
                        };
                        miniArtResultsObj.push(tempMiniArtObj); // Pushes the temporary object to our main Mini Search Results Object.
                        //console.log(miniArtResultsObj);

                        //Retrieves IDs and pushes array on for further processing in Detailed fetch  
                        var tempArtObjectsNumber = miniData.artObjects[i].objectNumber; // This is the RijksMuseum collection ID number that we use to call on the Detailed-Results API. Also stored in the mini-object above.
                        var tempArtObjectsUrl = collectionAPIRoot + tempArtObjectsNumber + key; // For each, inject the collection ID number into the collection API root and key.
                        searchUrlArray.push(tempArtObjectsUrl); // pushes each to an array to hold the urls
                        //console.log(tempArtObjectsUrl);

                    }

                }
                


             /*   // detailed currently off until 500 errors are solved.

                //====================================== This area fetches a more detailed version of the call above.
                for (i = 0; i < searchUrlArray.length; i++) { // AKA the "Detailed-Results" Fetch. 
                    fetch(searchUrlArray[i]) // <====================================================== failing here if this is a non-existent URL : var badUrlExample = "https://www.rijksmuseum.nl/api/nl/collection/SK-A-3467?key=TnDINDEU";
                        .then(function (response) { // fetches objects from search API
                            if (!response.ok) {
                                console.log("One search result could not be obtained");
                                throw 'Error';
                              }
                              else {
                                return response.json();
                              }
                        })
                        .then(function (artData) {
                            var tempArtObj =
                            {
                                "objectNumber": artData.artObject.objectNumber, // "SK-A-1505" This is the collection reference ID number
                                "language": artData.artObject.language, // main language of object
                                "title": artData.artObject.title,  // i.e. "Een molen aan een poldervaart, bekend als ‘In de maand juli’"
                                "longTitle": artData.artObject.longTitle, // "Een molen aan een poldervaart, bekend als ‘In de maand juli’, Paul Joseph Constantin Gabriël, ca. 1889"
                                "plaqueDescriptionEnglish": artData.artObject.plaqueDescriptionEnglish, //  "‘Our country is colourful, juicy, fat. (...) I repeat, our country is not dull"
                                "principalMaker": artData.artObject.principalMaker, // The main maker of the art, AKA, the artist for our purposes.
                                "period": artData.artObject.dating.period, // 19 ~ number
                                "sortingDate": artData.artObject.dating.sortingDate, // 1889  ~ number
                                "presentingDate": artData.artObject.dating.presentingDate, // "ca. 1889" ~ string
                                "webImageUrl": artData.artObject.webImage.url, // Img url
                                //"description": artData.artObject.description, // Description in Dutch
                            };
                            artResultsObj.push(tempArtObj);  // Pushes the temporary object to our main Detailed Search Results Object.
                            //------- likely will need a push() to populate the page with the search results
                            console.log(artResultsObj);
                        });
                }
*/

            }
            else {
                //------ add 0 search results found function and actions here
                console.log("No search results on query found. Please try again.")
                return;
            }
            progressBarEl.css("visibility", "hidden");
        });
}

//------ search button event listener
$("#submit").on("click", urlAppendTitle);

















//==============================================================================================================//  STORAGE //================//
//========== Storage variables

// Viewing current variables
var currentIdNum = ""; // This is a holder for the current collection ID number 
var currentTitle = "";
var currentArtist = "";
var currentImage = "";  //image URL

// Arrays for syncing, creating, clearing storage
var sessionUrlArray = [];
var localUrlArray = [];

var sessionTitleArray = [];
var localTitleArray = [];

var sessionArtistArray = [];
var localArtistArray = [];

var sessionImageArray = [];
var localImageArray = [];

var emptyArray = [];



//========================================================= Add favorite to storage function
function addFavorite() {
    
    //====================================== Adding Fetch URL
    // Get the var currentIdNum, set equal to  
    var tempFavRefId = $("#collectionRefId").val(); // get reference ID. or currentIdNum
    var tempFavUrl = searchAPIRoot + cultureMarker + queryMarker + tempFavRefId; // creates a mini-request URL from which we can send though our mini-fetch again if they click on the favorite.

    sessionUrlArray.push(tempFavUrl); // pushes that URL to local storage array.
    localStorage.setItem("favoritesUrlArray", JSON.stringify(sessionUrlArray)); // syncing javascript array and local storage, add to local storage.
    sessionUrlArray = JSON.parse(localStorage.getItem("favoritesUrlArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local.

    // will need to add or manipulate the page in this function based off the need favorite

    
    //====================================== Adding Title
    var tempFavTitle = $("#collectionRefId").val(); // get reference ID. or currentIdNum 
    sessionTitleArray.push(tempFavTitle); 
    localStorage.setItem("favoritesTitleArray", JSON.stringify(sessionTitleArray)); 
    sessionTitleArray = JSON.parse(localStorage.getItem("favoritesTitleArray")); 

    //====================================== Adding Artist
    var tempFavArtist = $("#collectionRefId").val(); // get reference ID. or currentIdNum 
    sessionArtistArray.push(tempFavArtist); 
    localStorage.setItem("favoritesArtistArray", JSON.stringify(sessionArtistArray)); 
    sessionArtistArray = JSON.parse(localStorage.getItem("favoritesArtistArray")); 
    
    //====================================== Adding Image URL
    var tempFavImage = $("#collectionRefId").val(); // get reference ID. or currentIdNum 
    sessionImageArray.push(tempFavImage); 
    localStorage.setItem("favoritesImageArray", JSON.stringify(sessionImageArray)); 
    sessionImageArray = JSON.parse(localStorage.getItem("favoritesImageArray")); 




    //location.reload(); // option if we need to reload the page....
}

//========================================================= Add favorite to storage function
function clearFavorite() {
    //====================================== Clearing Fetch URL
    sessionUrlArray = emptyArray; // sets javascript session array to blank
    localStorage.setItem("favoritesUrlArray", JSON.stringify(sessionUrlArray)); // syncing javascript array and local storage
    

    //====================================== Clearing Title
    sessionTitleArray = emptyArray; 
    localStorage.setItem("favoritesTitleArray", JSON.stringify(sessionTitleArray)); 

    //====================================== Clearing Artist
    sessionArtistArray = emptyArray; 
    localStorage.setItem("favoritesArtistArray", JSON.stringify(sessionArtistArray)); 

    //====================================== Clearing Image URL
    sessionImageArray = emptyArray; 
    localStorage.setItem("favoritesImageArray", JSON.stringify(sessionImageArray)); 


    // may need to clear out other things

}


//============================================================= Sync Favorites function
function checkFavorite() {
    
    //====================================== Syncing Fetch URL 
    if (localStorage.getItem("favoritesUrlArray") === null) { // if the local storage array is null, we skip syncing.
        return;
    }
    else {
        localUrlArray = JSON.parse(localStorage.getItem("favoritesUrlArray")); // if not null, make it var local check.
    }
    if (localUrlArray.length > sessionUrlArray.length) { // if local storage is not empty, we sync our javascript session array to local one.
        sessionUrlArray = localUrlArray;

        //do stuff here

        //for (i = 0; i < cityArray.length; i++) {
        //    $("#newCityBtn").append("<button>" + cityArray[i] + "</button>");
        //    $("#newCityBtn").children().attr("class", "row btn btn-light m-1 mb-2 w-100 cityBtn");
        //    $("#newCityBtn").children().last().attr("id", cityArray[i]);
        //}
    }

    //====================================== Syncing Title
    if (localStorage.getItem("favoritesTitleArray") === null) {
        return;
    }
    else {
        localTitleArray = JSON.parse(localStorage.getItem("favoritesTitleArray")); 
    }
    if (localTitleArray.length > sessionTitleArray.length) { 
        sessionTitleArray = localTitleArray;
    }

    //====================================== Syncing Artist
    if (localStorage.getItem("favoritesArtistArray") === null) { 
        return;
    }
    else {
        localArtistArray = JSON.parse(localStorage.getItem("favoritesArtistArray")); 
    }
    if (localArtistArray.length > sessionArtistArray.length) { 
        sessionArtistArray = localArtistArray;
    }

    //====================================== Syncing Image URL
    if (localStorage.getItem("favoritesImageArray") === null) { 
        return;
    }
    else {
        localImageArray = JSON.parse(localStorage.getItem("favoritesImageArray")); 
    }
    if (localImageArray.length > sessionImageArray.length) { 
        sessionImageArray = localImageArray;
    }





}
checkFavorite(); //--- Syncing runs immediately upon loading the page




//-------------------------------------------------------------- BUTTON EVENT LISTENERS
$("#favoriteButton").on('click', addFavorite);
$("#clearButton").on('click', clearFavorite);
