// ================================ Variables
var curEl = 0; //the image that is initially displayed on the carousel, keeps track of which index in imagearr
var imageArr = [];
var miniArtResultsObj = [];
// ==================================== Search
//=======================================================================================// Search results fetches for both Mini and Detailed Results //====

//===================================================================== Cleanse and ready user input
function userInputCleanse(event) {
    event.preventDefault(); 
    userInputText = userInputText.trim();  //remove trailing white spaces
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
    let queryUrl = urlAppendTitle();
    getResults(queryUrl, )
    //urlAppendArtist();
}

//------ search button event listener
$("#submit").on("click", function(){
    userInputCleanse();
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
    console.log("setting variables");
    setImageArr( rijksResponse );
    setArtObjectList( rijksResponse );

    renderCarouselSlide(curEl);
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
    console.log(miniArtResultsObj);
    
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

setTimeout(getResults, 250, urlDefault(), setImageAndCards); //--- runs immediately upon loading the page. (added slight delay to allow time for three.js assest to load.)
