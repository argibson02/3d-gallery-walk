






















































































































































var query = "";
var artistOrCulture = "";
var dateBegin = "";
var dateEnd = "";

var searchAPIRoot = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&";
var collectionAPIRoot = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

var urlSearchEx1 = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Jackson%20Pollock";
var urlSearchEx = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste%20Renoir";
var urlSearch = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true";
var url = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=van_gogh";
var urlSearchOnNumEx = "https://collectionapi.metmuseum.org/public/collection/v1/objects/437984";

var objectNumArray = [];
var searchUrlArray = [];



//////////////////////////////////////////////////////////////////  Get Object ID urls on search
function getObjectNum() {

    fetch(urlSearchEx) // need to swap this out for a variable that pulls and cleans a search inputs from a search field
        .then(function (response) { // fetches objects from search API
            return response.json();
        })
        .then(function (data) {
            objectNumIds = data.objectIDs; // puts returned object id numbers in an array
            for (i = 0; i < objectNumIds.length; i++) {
                var tempObjectNumIds = collectionAPIRoot + objectNumIds[i]; // for each, append the object id number to the end of a collection API root
                //console.log(tempObjectNumIds);
                searchUrlArray.push(tempObjectNumIds); // pushes each to an array to hold the urls
            }
            if (searchUrlArray.length > 100){ // trims off search results yielding more than 100 results to reduce process time
                searchUrlArray = searchUrlArray.slice(0, 100);
            }
            console.log(searchUrlArray);
        })
}
getObjectNum();
////////////////////////////////////////////////////////////////











$(".cityBtn").on("click", function () { 
    for (i = 0; i < objectNumArray.length; i++) {
        tempSearchOnNum = collectionAPIRoot + objectNumArray[i];
        console.log(tempSearchOnNum);
        searchUrlArray.push(tempSearchOnNum);
    }
    console.log(searchUrlArray);
});





/*
function getObjectNum() {
    // replace `octocat` with anyone else's GitHub username
    //We save the full endpoint we would like to make a request to in a variable called requestUrl, replacing octocat with the username we want to search, as shown in the following example:
    //var requestUrl = 'https://api.github.com/users/octocat/repos';
    //We then pass the requestUrl variable as an argument to the fetch() method, like in the following code:
    fetch(urlSearchEx)
        //We convert the response into JSON. Lastly, we return the JSON-formatted response, as follows:
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            objectNumArray = data;
            console.log(objectNumArray);
            for (i = 0; i < objectNumArray.length; i++) {
                tempSearchOnNum = urlSearchOnNum + objectNumArray[i];
                console.log(tempSearchOnNum);
                return fetch(tempSearchOnNum);
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (artObj) {
            for (i = 0; i < objectNumArray.length; i++) {
                artObj[i] =
                {
                    "title": artObj.title,  // i.e. "La Berceuse (Woman Rocking a Cradle; Augustine-Alix Pellicot Roulin, 1851–1930)"
                    "artistDisplayName": artObj.artistDisplayName,  // i.e. "Vincent van Gogh"
                    "artistNationality": artObj.artistNationality, // i.e. "Dutch"
                    "artistDisplayBio": artObj.artistDisplayBio, // i.e. "Dutch, Zundert 1853–1890 Auvers-sur-Oise"
                    "department": artObj.department,  // i.e. "European Paintings"
                    "primaryImage": artObj.primaryImage,  // i.e. "https://images.metmuseum.org/CRDImages/ep/original/DP-19279-001.jpg"
                    "primaryImageSmall": artObj.primaryImageSmall,  // i.e. "https://images.metmuseum.org/CRDImages/ep/web-large/DP-19279-001.jpg"
                    "classification": artObj.classification, // i.e. "Paintings"
                    "objectDate": artObj.objectDate,  // i.e. "1889" ~string
                    "objectBeginDate": artObj.objectBeginDate, // i.e. 1889 ~num
                    "objectEndDate": artObj.objectEndDate, // i.e. 1889 ~num
                    "medium": artObj.medium, // i.e. "Oil on canvas"
                    "objectURL": artObj.objectURL, // i.e. "https://www.metmuseum.org/art/collection/search/437984"
                    "culture": artObj.culture, // i.e. "" (occasionally null)
                };
                console.log(artObj[i]);
            }

            //writeCards();
        });
}
getObjectNum();
*/























/*
function getApi(url1) {
    fetch(url1)
      .then(function (response) {
        console.log(response);
        //  Conditional for the the response.status.
        //We check whether the response.status does not equal 200
        //if (response.status !== 200) {
          // Place the response.status on the page.
          //We assign the textContent to be equal to the response.status
          //responseText.textContent = response.status;
        //}
        //We still return response.json() as fetch() will try to resolve the response most of the time
        return response.json();
      })
      .then(function (data) {
        // Make sure to look at the response in the console and read how 404 response is structured.
        console.log(data);
      });
  }
getApi();
*/






/*
fetch(url)
.then(function (response) {
    return response.json();
})
.then(function (dataSearch) {
    console.log(dataSearch);
    //var dataGeo = "";
    return fetch();
})
*/

/*
.then(function (response) {
    return response.json();
})
.then(function (dataWeather) {
    for (i = 0; i < dataWeather.length; i++) {
        searchResultsObj[i] =
        {
            "date": moment.unix(dataWeather.daily[i].dt).format("dddd, MMM Do, YYYY"),
            "weather": dataWeather.daily[i].weather[0].main,
            "icon": dataWeather.daily[i].weather[0].icon,
            "temp": dataWeather.daily[i].temp.day,
            "humidity": dataWeather.daily[i].humidity,
            "wind": dataWeather.daily[i].wind_speed,
            "uvi": dataWeather.daily[i].uvi,
        };
    }
    writeCards();
});




console.log();
console.log();
console.log();
console.log();
console.log();
*/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//