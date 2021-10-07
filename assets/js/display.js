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
    var txt = (miniArtResultsObj[index].longTitle).split(",");
    year = txt[txt.length-1];
    $("#artwork-card-title").text(miniArtResultsObj[index].title);
    $("#artwork-card-artist").text("artist: " + miniArtResultsObj[index].principalOrFirstMaker);
    $("#artwork-card-year").text("year: " + year);
    $("#artwork-card-link").attr("href", "https://www.rijksmuseum.nl/en/collection/"+ miniArtResultsObj[index].objectNumber);

    storeLongTitle = miniArtResultsObj[index].longTitle; //  variable needed for storage function 
    storeTitle = miniArtResultsObj[index].title;  //  variable needed for storage function 
    storeArtist = miniArtResultsObj[index].principalOrFirstMaker;  //  variable needed for storage function 
    storeFetchUrl = miniArtResultsObj[index].objectNumber;  //  variable needed for storage function 

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
    renderCard(index);
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
    if(parameters.query) {
        getResults(urlAppendQuery(parameters.query), setImageAndCards);
    }

    else if( parameters.title ) {
        getResults(urlAppendQuery(parameters.title), setImageAndCards);
    }

    else if( parameters.artistName ) {
        console.log(parameters.artistName);
        getResults( urlAppendArtist( swapLastNameFirstName( parameters.artistName ) ), setImageAndCards );
    } 

    function swapLastNameFirstName( name ) {
        let names = name.split(",");
        let lastName = names[0];
        let firstName = names[1].substring(1); // getting rid of the initial space

        return firstName + " " + lastName;
    }
}

//--- runs immediately upon loading the page.
if(window.location.search) loadPageContentFromURL();
else getResults( urlDefault(), setImageAndCards ); 
