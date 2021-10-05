

var queryMarker = "&q="; // painting title or key word search term 
var artistOrCultureMarker = "artistOrCulture=true"; // artist name or culture search term
var dateBeginMarker = "dateBegin="; //
var dateEndMarker = "&dateEnd="; //
var departmentNum = ""; //need to hook this up the dept # list 
var departmentMarker = "departmentId=" + departmentNum + queryMarker;
var hasImagesMarker = "hasImages=true";
var userInputText = " van gogh "; //tester
var userInputBeginDt = "1850"; //tester
var userInputEndDt = "1920"; //tester




// API root URLs. Hard coding has images for our purposes
var searchAPIRoot = "https://collectionapi.metmuseum.org/public/collection/v1/search?";
var collectionAPIRoot = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

var urlSearchEx1 = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Jackson%20Pollock";
var urlSearchEx = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=van%20gogh";
//var urlSearch = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true";
var url = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=van_gogh";
var urlSearchOnNumEx = "https://collectionapi.metmuseum.org/public/collection/v1/objects/437984";

// initialized arrays used search fetch functions
var searchUrlArray = [];
var artSearchObj = [];




///////////////////////////////////////////////////////////////// function for appending user input on TITLE OR GENERAL QUERY search 
function urlAppendTitle() {
    urlSearch = searchAPIRoot + hasImagesMarker + queryMarker + userInputText;
    //console.log(urlSearch);
}
urlAppendTitle();

///////////////////////////////////////////////////////////////// function for appending user input on ARTIST search 
function urlAppendArtist() {
    urlSearch = searchAPIRoot + artistOrCultureMarker + "&" + hasImagesMarker + queryMarker + userInputText;
    //console.log(urlSearch);
}
urlAppendArtist();

///////////////////////////////////////////////////////////////// function for appending user input on DATE RANGE +  TITLE OR GENERAL QUERY search 
function urlDateRange() {
    urlSearch = searchAPIRoot + dateBeginMarker + userInputBeginDt + dateEndMarker + userInputEndDt + "&" + hasImagesMarker + queryMarker + userInputText;
    //console.log(urlSearch);
}
urlDateRange();

////////////////////////////////////////////////////////////////// Cleanse user input and covert to proper url  
function userInputCleanse() {
    console.log(userInputText);
    //userInputText = $("#user-input-search").val(); // get field value
    userInputText = userInputText.trim();  //remove trailing white spaces
    userInputText = userInputText.replace(" ", "%20")  // replaces inner white spaces with %20
    //console.log(userInputText);

    $('#Crd option:selected').text();

    var tempCategoryCheck = $('select>option:eq(1)').prop('selected', true);
    console.log(tempCategoryCheck);
    //if ()

}  
userInputCleanse();




//////////////////////////////////////////////////////////////////  Get Art Objects on search
function getObjectNum() {

    fetch(urlSearchEx) //----- need to swap this out for a variable that pulls and cleans a search inputs from a search field // fetch for object IDs that yield upon search
        .then(function (response) { // fetches objects from search API
            return response.json();
        })
        .then(function (data) {
            objectNumIds = data.objectIDs; // puts returned object id numbers in an array
            objectNumTotal = data.total; // number of total search results 
            if (objectNumTotal > 0) { // checks to see if the query returned any results
                for (i = 0; i < objectNumIds.length; i++) {
                    var tempObjectNumIds = collectionAPIRoot + objectNumIds[i]; // for each, append the object id number to the end of a collection API root
                    //console.log(tempObjectNumIds);
                    searchUrlArray.push(tempObjectNumIds); // pushes each to an array to hold the urls
                }
                if (searchUrlArray.length > 60) { // trims off search results yielding more than 60 results to reduce process time. The API limits the number of requests to 80 per second, however, I have noticed severe latency hitting around the 60 mark.
                    searchUrlArray = searchUrlArray.slice(0, 60);
                }
                //console.log(searchUrlArray);

                for (i = 0; i < searchUrlArray.length; i++) {
                    fetch(searchUrlArray[i]) // fetches data for each object 
                        .then(function (response) {
                            //console.log(response);
                            return response.json();
                        })
                        .then(function (artData) {
                            //console.log(artData); // console log for all data on object
                            var tempArtObj =
                            {
                                "title": artData.title,  // i.e. "La Berceuse (Woman Rocking a Cradle; Augustine-Alix Pellicot Roulin, 1851–1930)"
                                "artistDisplayName": artData.artistDisplayName,  // i.e. "Vincent van Gogh"
                                //"artistNationality": artData.artistNationality, // i.e. "Dutch"
                                "artistDisplayBio": artData.artistDisplayBio, // i.e. "Dutch, Zundert 1853–1890 Auvers-sur-Oise"
                                "department": artData.department,  // i.e. "European Paintings"
                                "primaryImage": artData.primaryImage,  // i.e. "https://images.metmuseum.org/CRDImages/ep/original/DP-19279-001.jpg"
                                "primaryImageSmall": artData.primaryImageSmall,  // i.e. "https://images.metmuseum.org/CRDImages/ep/web-large/DP-19279-001.jpg"
                                "classification": artData.classification, // i.e. "Paintings"
                                "objectDate": artData.objectDate,  // i.e. "1889" ~string
                                "objectBeginDate": artData.objectBeginDate, // i.e. 1889 ~num
                                "objectEndDate": artData.objectEndDate, // i.e. 1889 ~num
                                "medium": artData.medium, // i.e. "Oil on canvas"
                                "objectURL": artData.objectURL, // i.e. "https://www.metmuseum.org/art/collection/search/437984"
                                //"culture": artData.culture, // i.e. "" (often null for paintings, perhaps use artist nationality instead of for our "culture")
                            };
                            //console.log(tempArtObj);  // console log the data we are interested in
                            artSearchObj.push(tempArtObj); // pushes the temporary object to our main search results object.
                            //console.log(artSearchObj); // console log our completed object
                            //------- likely will need a push() to populate the page with the search results
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
////////////////////////////////////////////////////////////////

//$("user-input-search").on("click", function ()
//
//)


////////////////////////////////////////////////////////////////////  Get Object ID urls on search - stand alone
//function getObjectNum() {
//
//    fetch(urlSearchEx) //----- need to swap this out for a variable that pulls and cleans a search inputs from a search field
//        .then(function (response) { // fetches objects from search API
//            return response.json();
//        })
//        .then(function (data) {
//            objectNumIds = data.objectIDs; // puts returned object id numbers in an array
//            objectNumTotal = data.total; // number of total search results 
//            if (objectNumTotal > 0) { // checks to see if the query returned any results
//                for (i = 0; i < objectNumIds.length; i++) {
//                    var tempObjectNumIds = collectionAPIRoot + objectNumIds[i]; // for each, append the object id number to the end of a collection API root
//                    //console.log(tempObjectNumIds);
//                    searchUrlArray.push(tempObjectNumIds); // pushes each to an array to hold the urls
//                }
//                if (searchUrlArray.length > 80) { // trims off search results yielding more than 100 results to reduce process time. The API limits requests to 80 per second
//                    searchUrlArray = searchUrlArray.slice(0, 80);
//                }
//                //console.log(searchUrlArray);
//            }
//            else {
//                //------ add no search results found function and actions here
//                return;
//            }
//        })
//}
//getObjectNum();
//////////////////////////////////////////////////////////////////



//API for calling name (or general query)
//example of good query
//https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=6&q=cat


//API for calling artist
// things to note: 1)  this query is shared with culture (RIP if you last name is French). 2) spaces appear be denoted with an underscore.

//example of good query 
//https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=van_gogh
//
//
// has images query 
//https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste%20Renoir
//
//
// date range query
// https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=1700&dateEnd=1800&q=African
//
//
//Department ID Request
//https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=6&q=cat
//
//
// Medium request
// https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Quilts|Silk|Bedcovers&q=quilt
//
//
//Geolocation Request
// https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=France&q=flowers
//  
