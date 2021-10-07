// List of all artists on Rijks
var artistList = ["Aertsen, Pieter", "Alma Tadema, Lawrence","Appel, Karel", "Avercamp, Hendrick", "Baburen, Dirck van", "Bakhuysen, Ludolf"
, "Berchem, Nicolaes Pietersz.", "Berckheyde, Gerrit Adriaensz.", "Beuckelaer, Joachim","Bilders, Albert Gerard", "Bloemaert, Abraham", "Bol, Ferdinand",
 "Borch, Gerard ter", "Both, Jan", "Breitner, George Hendrik", "Brugghen, Hendrick ter", "Buytewech, Willem Pietersz.", "Claesz., Pieter", "Coorte, Adriaen",
  "Cornelisz van Haarlem, Cornelis","Cornelisz. van Oostsanen, Jacob", "Cuyp, Aelbert", "Dou, Gerard", "Dujardin, Karel", "Dyck, Anthony van","Dürer, Albrecht",
   "Eeckhout, Gerbrand van den", "Everdingen, Caesar Boëtius van", "Flinck, Govert", "Gabriël, Paul Joseph Constantin", "Gao Qipei", "Geertgen tot Sint Jans", 
   "Gheyn, Jacob de", "Giambologna", "Gogh, Vincent van", "Goltzius, Hendrick", "Goya y Lucientes, Francisco José de", "Goyen, Jan van", "Hals, Dirck", "Hals, Frans",
    "Heda, Willem Claesz.", "Heem, Jan Davidsz. de", "Heemskerck, Maarten van", "Helst, Bartholomeus van der", "Hiroshige", "Hokusai, Katsushika", "Hondecoeter, Melchior d'",
     "Honthorst, Gerard van", "Hooch, Pieter de", "Israels, Isaac", "Israëls, Jozef", "Jordaens, Jacob", "Key, Adriaen Thomasz.", "Koninck, Philips", "Kooi, Willem Bartel van der",
      "Kruseman, Jan Adam", "Lairesse, Gerard de","Lastman, Pieter", "Lelie, Adriaan de", "Leyden, Lucas van", "Lievens, Jan", "Liotard, Jean Etienne", "Maes, Nicolaes",
       "Mander, Karel van", "Mauve, Anton", "Meester van Alkmaar", "Mesdag, Hendrik Willem", "Metsu, Gabriël", "Mierevelt, Michiel Jansz. van", "Mignon, Abraham", "Ostade, Adriaen van",
        "Pieneman, Jan Willem", "Pieneman, Nicolaas", "Post, Frans Jansz.", "Potter, Paulus", "Rembrandt Harmensz. van Rijn", "Rubens, Peter Paul", "Ruisdael, Jacob Isaacksz. van", 
        "Ruysdael, Salomon van", "Saenredam, Pieter Jansz.", "Savery, Roelant", "Schouten, Gerrit", "Scorel, Jan van", "Segers, Hercules","Steen, Jan Havicksz.", "Sweerts, Michael", "Troost, Cornelis",
         "Vanmour, Jean Baptiste","Velde, Willem van de", "Velde, Willem van de (II)", "Venne, Adriaen Pietersz. van de", "Vermeer, Johannes", "Verspronck, Johannes Cornelisz.", 
         "Vianen, Paulus Willemsz. van", "Visscher, Claes Jansz.", "Voogd, Hendrik"];



function populateFeatured( data ) {
    for(let i=0; i<data.artObjects.length; i++) {
        let li = $("<li>");
        li.addClass(); // TODO: add css classes
        let link = $("<a>");
        link.attr("href", data.artObjects[i].links.web);
        link.text(data.artObjects[i].title);
        li.append(link);
        $("#featured-tab").children(".collapsible").append(li);
    }
    progressBarEl.css("visibility", "hidden");
}

// Curated event listener
$(".curated").on("click", function () {
    tempCuratedArtist = $(this).attr("id");
    urlAppendArtist();
});

// Populates the artists tab
function populateArtists() {
    // TODO
}

getResults(top20Url(), populateFeatured);