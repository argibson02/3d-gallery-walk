const bastCleavelandURL = "https://openaccess-api.clevelandart.org/api/artworks/?";
const queryMarkerC = "&q=";
const typeMarkerC = "&type=Painting";
const hasImageMarkerC = "&hasImage=1";
const limitMarkerC = "limit=10";

function getUrlByQuery( queryText ) {
    return bastCleavelandURL + limitMarkerC + hasImageMarkerC + typeMarkerC + queryMarkerC + queryText;
}

// Convert the cleaveland response object into a smaller custom object used in page population
function cleavelandToCustom( cleavelandResponse ) {
    let out = [];
    for(let i=0; i<cleavelandResponse.data.length; i++) {
        let artObject = {
            title: cleavelandResponse.data[i].title,
            imageURL: cleavelandResponse.data[i].images.web.url,
            artist: cleavelandResponse.data[i].creators[0].description,
            year: cleavelandResponse.data[i].creation_date,
            originAPI: "cleaveland"
        }
        out.push(artObject);
    }

    return out;
}