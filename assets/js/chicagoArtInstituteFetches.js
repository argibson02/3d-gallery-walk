const caiBaseURL = "https://api.artic.edu/api/v1/artworks?"
// URL Encoded JSON... copy pasted from https://api.artic.edu/docs/#quick-start
const caiQueryMarker = "q=";
const caiLimitMarker = "&limit=5";

const imagePath = "/full/1686,/0/default.jpg"

function caiGetUrl( query ) {
    return caiBaseURL + caiQueryMarker+ query + caiLimitMarker;
}

function caiToCustom( caiResponse ) {
    let out = [];
    for(let i=0; i<caiResponse.data.length; i++) {
        let artObject = {
            title: caiResponse.data[i].title,
            imageURL: caiResponse.config.iiif_url + "/" + caiResponse.data[i].image_id + imagePath,
            artist: caiResponse.data[i].artist_display,
            year: caiResponse.data[i].date_start,
            originAPI: "cai",
            objectNumber: caiResponse.data[i].id
        }

        out.push(artObject);
    }

    return out;
}