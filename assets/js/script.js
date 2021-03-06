
var searchUrlArray = [];
var artResultsObj = [];
var miniArtResultsObj = [];
var imageArr = []; //array of images used to display in the carousel


var carouselContainerEl = $("#carousel-container"); //container for the carousel, used to render carousel elements
var nextButton = $("#next-button"); //next button for carousel
var prevButton = $("#prev-button"); //prev button for carousel
var dropTriggerEl = $('.dropdown-trigger'); //dropdown on top search bar
var progressBarEl = $(".progress"); //the loading bar
var artwordCardEl = $("#artwork-card");


//render dropdown menu
// function styleDropdown(instance) {
//     instance.constrainWidth = false;
// }

//for browse

$(document).ready(function () {
    $('.tabs').tabs();
});

$(document).ready(function () {
    $('.collapsible').collapsible();
});

$(document).ready(function(){
$('.tap-target').tapTarget();
});

// Used for mobile responsive

   $(document).ready(function(){
     $('.sidenav').sidenav();
   });

var userInputText = $("#user-input-search").val();

//var curatedText = " Berchem, Nicolaes Pietersz. "; //tester

/////=======================================================================================// Cleansing inputs and send to URL creation //============

//===================================================================== Cleanse and ready user input
function userInputValidation( userInputText ) { 
    userInputText.trim();  //remove trailing white spaces
    userInputText = userInputText.replace(" ", "+");  // replaces inner white spaces with +
    userInputText = userInputText.replace("/", "+");  // replaces with +
    //console.log(userInputText);

    // need if statement here to check if we have title or artist selected.
    //if (searchFilter = "Artist") {
    //    urlAppendArtist();
    //}
    // else {    
    //  urlAppendTitle();
    //}
    // let queryUrl = urlAppendTitle();
    // getResults(queryUrl, )
    //urlAppendArtist();
    return userInputText;
}


//================================================================== Clean up curated artist links
function curatedCleanse() {
    
    // need to pass curate text value here.
    curatedText = curatedText.trim();   //remove trailing white spaces
    curatedText = curatedText.replace(", ", ",+");  // replaces , white space with ,+
    curatedText = curatedText.replace(" ", "+");  // replaces inner white spaces with +

    var tempCuratedArray = curatedText.split(""); // split into array.
    firstNameArray = [];
    lastNameArray = [];

    function swapLastName() {
        for (i = 0; i < tempCuratedArray.length; i++) { // increment up.
            if (tempCuratedArray[i] === ",") { // grabs all characters until a comma, send to last name array.
                return;
            }
            lastNameArray.push(tempCuratedArray[i]);
        }
    }
    swapLastName();

    function swapFirstName() {
        for (i = tempCuratedArray.length-1; i < tempCuratedArray.length; i--) { // increment down.
            if (tempCuratedArray[i] === ",") { // grabs all characters until a first plus, send to first name array.
                firstNameArray.pop();
                firstNameArray.reverse();
                firstNameArray.push("+");
                return;
            }
            firstNameArray.push(tempCuratedArray[i]);
        }
    }
    swapFirstName();
    fullName = firstNameArray.concat(lastNameArray); // append first ot last.
    curatedText = fullName.join(""); // join into string.

    urlAppendCurated(); // pass into normal artist search.
}
//curatedCleanse();











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

var sessionLongTitleArray = [];
var localLongTitleArray = [];

var emptyArray = [];



//========================================================= Add favorite to storage function
function addFavorite() {
    M.toast({html: 'Success!', classes: 'toasts'});
    $("#favorite").attr('disabled', true); // prevents double clicks by disabling the favorite button.

    //====================================== Adding Fetch URL
    // Get the var currentIdNum, set equal to  
    var tempFavRefId = storeFetchUrl; // get reference ID. or currentIdNum
    //var tempFavUrl = searchAPIRoot + cultureMarker + queryMarker + tempFavRefId; // creates a mini-request URL from which we can send though our mini-fetch again if they click on the favorite.
    //sessionUrlArray.push(tempFavUrl); // pushes that URL to local storage array.

    sessionUrlArray.push(tempFavRefId); // pushes that URL to local storage array
    localStorage.setItem("favoritesUrlArray", JSON.stringify(sessionUrlArray)); // syncing javascript array and local storage, add to local storage.
    sessionUrlArray = JSON.parse(localStorage.getItem("favoritesUrlArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local.

    //====================================== Adding Title
    var tempFavTitle = storeTitle; // get reference ID. or currentIdNum 
    sessionTitleArray.push(tempFavTitle);
    localStorage.setItem("favoritesTitleArray", JSON.stringify(sessionTitleArray));
    sessionTitleArray = JSON.parse(localStorage.getItem("favoritesTitleArray"));

    //====================================== Adding Artist
    var tempFavArtist = storeArtist; // get reference ID. or currentIdNum 
    sessionArtistArray.push(tempFavArtist);
    localStorage.setItem("favoritesArtistArray", JSON.stringify(sessionArtistArray));
    sessionArtistArray = JSON.parse(localStorage.getItem("favoritesArtistArray"));

    //====================================== Adding Image URL
    var tempFavImage = storageImgUrl; // get reference ID. or currentIdNum 
    sessionImageArray.push(tempFavImage);
    localStorage.setItem("favoritesImageArray", JSON.stringify(sessionImageArray));
    sessionImageArray = JSON.parse(localStorage.getItem("favoritesImageArray"));

    //====================================== Adding Long Title
    var tempFavTitle = storeLongTitle; // get reference ID. or currentIdNum 
    sessionLongTitleArray.push(tempFavTitle);
    localStorage.setItem("favoritesLongTitleArray", JSON.stringify(sessionLongTitleArray));
    sessionLongTitleArray = JSON.parse(localStorage.getItem("favoritesLongTitleArray"));


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

    //====================================== Clearing Long Title
    sessionLongTitleArray = emptyArray;
    localStorage.setItem("favoritesLongTitleArray", JSON.stringify(sessionLongTitleArray));

    // may need to clear out other things, reload the page, make the favorites tab active
    $("#featured-tab-el").attr("class", "");
    $("#artist-tab-el").attr("class", "");
    $("#favorites-tab-el").attr("class", "active");
    window.location.reload();
    


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

    //====================================== Syncing Long Title
    if (localStorage.getItem("favoritesLongTitleArray") === null) {
        return;
    }
    else {
        localLongTitleArray = JSON.parse(localStorage.getItem("favoritesLongTitleArray"));
    }
    if (localLongTitleArray.length > sessionLongTitleArray.length) {
        sessionLongTitleArray = localLongTitleArray;
    }

    // Adding history list here
    for (i = 0; i < sessionLongTitleArray.length; i++) {
        /*$("#collectionA").append("<a>" + sessionLongTitleArray[i] + "</a>");
        $("#collectionA").children().attr("class", "collection-item a favorite-item");
        $("#collectionA").children().last().attr("id", sessionLongTitleArray[i]);
        $("#collectionA").children().last().attr("fetch-value", sessionUrlArray[i]);
        $("#collectionA").children().last().attr("img-value", sessionImageArray[i]);
        $("#collectionA").children().last().attr("title-value", sessionTitleArray[i]);*/
        $("#fav-collection").append("<a>" + sessionLongTitleArray[i] + "</a>");
        $("#fav-collection").children().attr("class", "collection-item a favorite-itme");
        $("#fav-collection").children().last().attr("id", sessionLongTitleArray[i]);
        $("#fav-collection").children().last().attr("fetch-value", sessionUrlArray[i]);
        $("#fav-collection").children().last().attr("img-value", sessionImageArray[i]);
        $("#fav-collection").children().last().attr("title-value", sessionTitleArray[i]);
        $("#fav-collection").children().last().attr( "href", "./index.html?title=" + userInputValidation( sessionTitleArray[i] ) );
    }



    //console.log(sessionUrlArray);



}
checkFavorite(); //--- Syncing runs immediately upon loading the page


//-------------------------------------------------------------- STORE FAVORITES BUTTON EVENT LISTENERS
$("#favorite").on('click', addFavorite);
$("#clear-fav-button").on('click', clearFavorite);






/*

var imgThumbnail = document.getElementById('imgThumbnail');
var titleThumbnail = document.getElementById('titleThumbnail');
var favoriteLink = document.getElementsByClassName("favorite-item");
favoriteLink.addEventListener("mouseenter", function () {
    var imgThumbnailValue = document.
}*/

//-------------------------------------------------------------- FAVORITES BUTTON EVENT LISTENERS
$(".favorite-item").on("mouseenter", function () {  // set thumbnail preview and title
    var imgThumbnail = $(this).attr("img-value");
    var titleThumbnail = $(this).attr("title-value");
    $('#imgThumbnail').attr('src', imgThumbnail);
    $('#titleThumbnail').text(titleThumbnail);
});

$(".favorite-item").dblclick(function() { // Jumps to 3d viewer page
    var passFavRefNum = $(this).attr("fetch-value");

    let parameters = passFavRefNum
    getResults(urlAppendQuery(parameters.query), setImageAndCards);

});

//========================================= Helper function for loading carousel data
function loadCarousel (miniData) { // AKA the "Mini-Results" Fetch. 
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
                //console.log(tempUrl);

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
                //var tempArtObjectsNumber = miniData.artObjects[i].objectNumber; // This is the RijksMuseum collection ID number that we use to call on the Detailed-Results API. Also stored in the mini-object above.
                //var tempArtObjectsUrl = collectionAPIRoot + tempArtObjectsNumber + key; // For each, inject the collection ID number into the collection API root and key.
                //searchUrlArray.push(tempArtObjectsUrl); // pushes each to an array to hold the urls
                //console.log(tempArtObjectsUrl);

            }

        }

        // detailed currently off until 500 errors are solved. May not end up needing, but retaining code for future.
        /*
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
                                        "title": artData.artObject.title,  // i.e. "Een molen aan een poldervaart, bekend als ???In de maand juli???"
                                        "longTitle": artData.artObject.longTitle, // "Een molen aan een poldervaart, bekend als ???In de maand juli???, Paul Joseph Constantin Gabri??l, ca. 1889"
                                        "plaqueDescriptionEnglish": artData.artObject.plaqueDescriptionEnglish, //  "???Our country is colourful, juicy, fat. (...) I repeat, our country is not dull"
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
        M.toast({html: 'No search results on query found. Please try again.', classes: 'rounded'});
        console.log("No search results on query found. Please try again.")
        return;
    }
    progressBarEl.css("visibility", "hidden");
    renderCarousel(0);
}








//===========================================//// SERVER-SIDE IBM WATSON TRANSLATE API //====
//  This is the work done to call the IBM Watson translate service. Was intended to translate painting titles into English. Deprecated due to CORS issues

/*
curl -X POST --user "" \
--header "Content-Type: application/json" \
--data '{"text": ["De opwekking van Lazarus"], "model_id":"nl-en"}' \
"https://api.au-syd.language-translator.watson.cloud.ibm.com/instances//v3/translate?version=2018-05-01"

*/

/*
$.ajax({
    type: "POST",
    user: "apikey:",
    header: {
        'Content-Type': 'application/json',
    },
    data: {
        "text": "De opwekking van Lazarus",
        "model_id": "nl-en",
    },
    url: "https://api.au-syd.language-translator.watson.cloud.ibm.com/instances//v3/translate?version=2018-05-01",
  }).then(function (response) {
    console.log('Ajax Reponse \n-------------');
    console.log(response);
  });
  */
/*
console.log(window.location.hostname);


var translateTitle = {
    origin: window.location.hostname,
    type: "POST",
    user: {"apikey": ",
    },
    header: {
        "Content-Type": "application/json"
    },
    data: {
        "text": "[De opwekking van Lazarus]",
        "model_id": "nl-en"
    }
}
*/
/*
fetch('https://api.au-syd.language-translator.watson.cloud.ibm.com/instances//v3/translate?version=2018-05-01', translateTitle)  
  .then(function(res) {
    return res.json();
   })
  .then(function(resJson) {
      console.log(resJson)
    return resJson;
   })

*/