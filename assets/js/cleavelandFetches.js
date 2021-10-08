const bastCleavelandURL = "https://risdmuseum.org/api/v1/collection?";
const queryMarkerC = "&search_api_fulltext=";
const typeMarkerC = "&type=Painting";
const hasImageMarkerC = "&has_image=1";
const limitMarkerC = "page=1&items_per_page=10&field_public_domain=1";

function cleavelandGetUrlWithQuery( queryText ) {
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
            originAPI: "cleaveland",
            objectNumber: cleavelandResponse.data[i].accession_number
        }
        out.push(artObject);
    }

    return out;
}