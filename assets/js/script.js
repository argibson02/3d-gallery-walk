var imageArr = [];
var curEl = 1;

var carouselContainerEl = $("#carousel-container");
var nextButton = $("#next-button");
var prevButton = $("#prev-button");

function clearCarousel(){
    $(".carousel-slide").remove();
}
function renderCarousel(index){
    
    if(index<0)
    {
        curEl = 0;
        return;
    }
    else if(index>=imageArr.length)
    {
        curEl = imageArr.length-1;
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
//we should call this method under the buttopn click method
renderCarousel(curEl);

prevButton.on("click", function(){
    
    console.log("hi" + curEl);
    renderCarousel(--curEl);
});
nextButton.on("click",  function(){
    console.log("byew" + curEl);
    renderCarousel(++curEl);
});



















































