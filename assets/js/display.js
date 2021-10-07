function clearCarousel() {
    $(".carousel-slide").remove();
}

function renderCarousel(index) {

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
    renderCarousel(--curEl);
    $("#favorite").attr('disabled', false); // reactives favorite button if disabled
});
nextButton.on("click", function () {
    renderCarousel(++curEl);
    $("#favorite").attr('disabled', false); // reactives favorite button if disabled
});