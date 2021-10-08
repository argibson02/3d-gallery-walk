// ================================ Variables
var curEl = 0; //the image that is initially displayed on the carousel, keeps track of which index in imagearr
var imageArr = [];
var miniArtResultsObj = [];
var parametersGiven = false;
// ==================================== Search
//=======================================================================================// Search results fetches for both Mini and Detailed Results //====


//------ search button event listener
$("#submit").on("click", function(event){
    event.preventDefault();

    let userInput = $(this).parent().children("input").val()
    userInput = userInputValidation( userInput );
    getResults(urlAppendQuery(userInput), setImageAndCards);
});


// ===================================== Card
function renderCard(index) {
    console.log(miniArtResultsObj);
    $("#artwork-card-title").text(miniArtResultsObj[index].title);
    $("#artwork-card-artist").text("artist: " + miniArtResultsObj[index].artist);
    $("#artwork-card-year").text("year: " + miniArtResultsObj[index].year);
    $("#artwork-card-link").attr("href", "https://www.rijksmuseum.nl/en/collection/"+ miniArtResultsObj[index].objectNumber);

    storeLongTitle = miniArtResultsObj[index].longTitle; //  variable needed for storage function 
    storeTitle = miniArtResultsObj[index].title;  //  variable needed for storage function 
    storeArtist = miniArtResultsObj[index].principalOrFirstMaker;  //  variable needed for storage function 
    storeFetchUrl = miniArtResultsObj[index].objectNumber;  //  variable needed for storage function 

}

function renderCardAndCarouselSlide() {
    renderCard( curEl );
    renderCarouselSlide( curEl );
}

$(function () {
    $('.card').draggable();
});


// ========================================== Carousel
function clearCarousel() {
    $(".carousel-slide").remove();
}

function setImageArr( rijksResponse ) {
    imageArr = [];

    // Add each image URL to the image array
    for(let i=0; i<rijksResponse.artObjects.length; i++) {
        imageArr.push(rijksResponse.artObjects[i].webImage.url);
    }
}

function setArtObjectList( rijksResponse ) {
    miniArtResultsObj = rijksResponse.artObjects;
}

function addRijksResults( rijksResponse ) {
    console.log("addedRijksResults");
    let results = rijksToCustom( rijksResponse );
    addResults( results );
}

function addCaiResults( caiResponse ) {
    console.log("addedCleavelandResults")
    console.log( caiResponse );
    let results = caiToCustom( caiResponse );
    addResults( results );
}

function addResults( results ) {
    miniArtResultsObj = miniArtResultsObj.concat(results);
    for(let i=0; i<results.length; i++) {
        imageArr.push(results[i].imageURL);
    }
}

function clearResults() {
    miniArtResultsObj = [];
    imageArr = [];
}

function setImageAndCards( rijksResponse ) {
    //console.log("setting variables");
    setImageArr( rijksResponse );
    setArtObjectList( rijksResponse );

    renderCarouselSlide(curEl);
    progressBarEl.css("visibility", "hidden");
}

function renderCarouselSlide(index) {

    if (index < 0) {
        curEl = imageArr.length-1;
        return;
    }
    else if (index >= imageArr.length) {
        curEl = 0;
        return;
    }

    clearCarousel();
    let imgUrl = imageArr[index];
    storageImgUrl = imgUrl //  variable needed for storage function 

    let slide = $("<div>");
    slide.attr("class", "carousel-slide");
    // let image = $("<img>");
    // image.attr("src", imgUrl);

    let renderedImage = $("<div>");
    renderedImage.attr("id", "rendered-image");
    // add div, 
    //
    slide.append(renderedImage);
    //console.log(miniArtResultsObj);
    
    carouselContainerEl.append(slide);
    //renderCard(index);
    setPreview("#rendered-image", imgUrl);
}

prevButton.on("click", function () {
    renderCarouselSlide(--curEl);
    $("#favorite").attr('disabled', false); // reactives favorite button if disabled
});
nextButton.on("click", function () {
    renderCarouselSlide(++curEl);
    $("#favorite").attr('disabled', false); // reactives favorite button if disabled
});

// Gets initial search parameters through the URL. returns object containing parameters
function getSearchParameters() {
    let parameterString = window.location.search.substring(1); // Gets the query string and removes the starting "?"
    let out = { 
        title: parseParameter( parameterString, "title" ),
        artistName: parseParameter( parameterString, "artistName"),
        timePeriod: parseParameter( parameterString, "timePeriod"),
        query: parseParameter( parameterString, "q" )
     }

     return out;

    function parseParameter( parameterString, parameterName) {
        let allParameters = parameterString.split("&");
        for(i=0; i<allParameters.length; i++) {
            parameterValue = allParameters[i].split("=");
            if(parameterValue[0] === parameterName) {
                return parameterValue[1];
            }
        }

        return null;
    }
}

function loadPageContentFromURL() {
    let parameters = getSearchParameters();
    let promises = []
    if(parameters.query) {
        promises.push( getResults( urlAppendQuery( parameters.query ), addRijksResults ) );
        promises.push( getResults( caiGetUrl( parameters.query ), addCaiResults ) );
    }

    else if( parameters.title ) {
        promises.push( getResults( urlAppendQuery( parameters.title ), addRijksResults ) );
        promises.push( getResults( caiGetUrl( parameters.title ), addCaiResults ) );
    }

    else if( parameters.artistName ) {
        getResults( urlAppendArtist( swapLastNameFirstName( parameters.artistName ) ), addRijksResults );
        promises.push( getResults( caiGetUrl( parameters.artistName ), addCaiResults ) );
    } 

    function swapLastNameFirstName( name ) {
        let names = name.split(",");
        let lastName = names[0];
        let firstName = names[1].substring(1); // getting rid of the initial space

        return firstName + " " + lastName;
    }

    Promise.all(promises).then( renderCardAndCarouselSlide );
}

function loadPageContentFromCleaveland( query ) {
    console.log(getUrlByQuery( query ));
    getResults( getUrlByQuery( query ), setImageAndCardsCleaveland);
}

function setImageAndCardsCleaveland( cleavelandData ) {
    // convert cleaveland data to rijk's format
    console.log(cleavelandData);
    let rijksFormatObject = {};
    rijksFormatObject.artObjects = cleavelandData.data;
    for(let i=0; i<rijksFormatObject.artObjects.length; i++) {
        rijksFormatObject.artObjects[i].webImage = {};
        rijksFormatObject.artObjects[i].webImage.url = cleavelandData.data[i].images.web.url;
    }
    setImageAndCards( rijksFormatObject );
    renderCarouselSlide(curEl);
    progressBarEl.css("visibility", "hidden");
}

//--- runs immediately upon loading the page.
if(window.location.search) loadPageContentFromURL();
else getResults( urlDefault(), setImageAndCards ); 
