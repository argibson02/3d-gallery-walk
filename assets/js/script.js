






















































































































































var query = ""; // painting title or key word search term 
var artistOrCulture = ""; // artist name or culture search term 
var dateBegin = ""; //
var dateEnd = ""; //

// API root URLs. Hard coding has images for our purposes
var searchAPIRoot = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&";
var collectionAPIRoot = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

var urlSearchEx1 = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Jackson%20Pollock";
var urlSearchEx = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste%20Renoir";
var urlSearch = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true";
var url = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=van_gogh";
var urlSearchOnNumEx = "https://collectionapi.metmuseum.org/public/collection/v1/objects/437984";

// initialized arrays used search fetch functions
var searchUrlArray = [];
var artSearchObj = [];

//////////////////////////////////////////////////////////////////  Get Object ID urls on search
function getObjectNum() {

    fetch(urlSearchEx) //----- need to swap this out for a variable that pulls and cleans a search inputs from a search field
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
                if (searchUrlArray.length > 80) { // trims off search results yielding more than 80 results to reduce process time. The API limits requests to 80 per second
                    searchUrlArray = searchUrlArray.slice(0, 80);
                }
                console.log(searchUrlArray);

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
                                //"culture": artData.culture, // i.e. "" (often null for paintings)
                            };
                            //console.log(tempArtObj);  // console log the data we are interested in
                            artSearchObj.push(tempArtObj); // pushes the temporary object to our main search results object.
                            console.log(artSearchObj); // console log our completed object
                            // likely will need a push() to populate the page with the search results
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
//
//
//
