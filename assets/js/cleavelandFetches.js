const bastCleavelandURL = "https://openaccess-api.clevelandart.org/api/artworks/?";
const queryMarkerC = "&q=";
const typeMarkerC = "&type=Painting";
const hasImageMarkerC = "&hasImage=1";
const limitMarkerC = "limit=10";

function getUrlByQuery( queryText ) {
    return bastCleavelandURL + limitMarkerC + hasImageMarkerC + typeMarkerC + queryMarkerC + queryText;
}