var imageArr = []; //array of images used to display in the carousel
var curEl = 0; //the image that is initially displayed on the carousel, keeps track of which index in imagearr

var carouselContainerEl = $("#carousel-container"); //container for the carousel, used to render carousel elements
var nextButton = $("#next-button"); //next button for carousel
var prevButton = $("#prev-button"); //prev button for carousel
var dropTriggerEl = $('.dropdown-trigger'); //dropdown on top search bar
var progressBarEl = $(".progress");

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
    let image = $("<img>");
    image.attr("src", imgUrl);
    slide.append(image);
    carouselContainerEl.append(slide);
}

imageArr.push("https://cdn.vox-cdn.com/thumbor/1gWEHM0eUX_3Nv9TJ-bPdpFNTnk=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19397812/1048232144.jpg.jpg");
imageArr.push("https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8eW9zZW1pdGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80");
imageArr.push("https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1600&h=800&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2019%2F11%2FAlaska-Northern-Lights-ALASKALTS1017.jpg");


prevButton.on("click", function () {

    console.log("hi" + curEl);
    renderCarousel(--curEl);
});
nextButton.on("click", function () {
    console.log("byew" + curEl);
    renderCarousel(++curEl);

});

//render dropdown menu
function styleDropdown(instance) {
    instance.constrainWidth = false;
}

function renderCollapsible() {
    //when new image is loaded call this method to generate new info

}

//render collapsible
$(document).ready(function () {
    $('.collapsible').collapsible();
    renderCollapsible();
});
$(function () {
    $('.collapsible').draggable();
});
//when loading the api, we can change the visibility of .progress to visible using progressBarEl.css("visibility", "visible");


dropTriggerEl.dropdown();
var dropdownmenu = M.Dropdown.getInstance(dropTriggerEl);
styleDropdown(dropdownmenu);
renderCarousel(curEl);





















































var userInputText = " Vincent van Gogh "; //tester

//========= Search API variables
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
var key = "?key=TnDINDEU";


// initialized arrays used search fetch functions
var searchUrlArray = [];
var artResultsObj = [];
var miniArtResultsObj = [];


///////////////////////////////////////////////////////////////// function for appending user input on TITLE OR GENERAL QUERY search 
function urlAppendTitle() {
    searchUrl = searchAPIRoot + defaultFilterMarkers + queryMarker + userInputText + defaultSortMarkers;
    //console.log(searchUrl);
}
//urlAppendTitle();

///////////////////////////////////////////////////////////////// function for appending user input on ARTIST search ~~~  WARNING, THIS IS CASE SENSITIVE AND REQUIRES FULL NAME. "Vincent van Gogh" is good; "Vincent Van Gogh", "vincent van gogh", and "van Gogh" are all bad.
function urlAppendArtist() {
    searchUrl = searchAPIRoot + artistMarker + userInputText + defaultSortMarkers;
    //console.log(searchUrl);
}
//urlAppendArtist();

/////////////////////////////////////////////////////////////////// function for appending user input on CENTURY +  TITLE OR GENERAL QUERY search 
//function urlAppendCentury() {
//    searchUrl = searchAPIRoot + defaultFilterMarkers + centuryMarker + queryMarker + userInputText + defaultSortMarkers;
//    console.log(searchUrl);
//}
////urlAppendCentury();

////////////////////////////////////////////////////////////////// Cleanse user input and covert to proper url  
function userInputCleanse() {
    //userInputText = $("#user-input-search").val(); // get field value

    // Cleaning inputs
    userInputText = userInputText.trim();  //remove trailing white spaces
    userInputText = userInputText.replace(" ", "+");  // replaces inner white spaces with +

    //urlAppendTitle();
    urlAppendArtist();
}
userInputCleanse();



//////////////////////////////////////////////////////////////////  Search results fetches for both Mini and Detailed Results
function getObjectNum() {

    fetch(searchUrl)
        .then(function (response) { // fetches objects from search API
            return response.json();
        })
        .then(function (miniData) { // AKA the "Mini-Results" Fetch. 
            objectNumTotal = miniData.count; // number of total search results
            objectCountOnPage = miniData.artObjects.length; // number of results returned to us on this page. This will match var resultsPerPageMarker. Currently set at 100.

            if (objectNumTotal > 0) { // checks to see if the query returned any results
                for (i = 0; i < objectCountOnPage; i++) {

                    // retrieving nested webImage URL
                    var tempWebImage = miniData.artObjects[i].webImage;
                    
                    var tempUrl = tempWebImage.url;
                    console.log(tempUrl);

                    // retrieving nested production place - Dutch only and often null - deprecated for now
                    //var tempProduction = miniData.artObjects[i].productionPlaces[0];

                    if (tempUrl) {  // doubles checks that we have a URL.
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
                        console.log(miniArtResultsObj);

                        //Retrieves IDs and pushes array on for further processing in Detailed fetch  
                        var tempArtObjectsNumber = miniData.artObjects[i].objectNumber; // This is the RijksMuseum collection ID number that we use to call on the Detailed-Results API. Also stored in the mini-object above.
                        var tempArtObjectsUrl = collectionAPIRoot + tempArtObjectsNumber + key; // For each, inject the collection ID number into the collection API root and key.
                        searchUrlArray.push(tempArtObjectsUrl); // pushes each to an array to hold the urls
                    }
                    else {
                        return;
                    }
                }


                //====================================== This area fetches a more detailed version of the call above.
                for (i = 0; i < searchUrlArray.length; i++) { // AKA the "Detailed-Results" Fetch. 
                    fetch(searchUrlArray[i])
                        .then(function (response) { // fetches objects from search API
                            return response.json();
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

            }
            else {
                //------ add 0 search results found function and actions here
                return;
            }

        });
}
getObjectNum();
