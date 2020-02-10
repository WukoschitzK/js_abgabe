// --------------------------------------------------NAVIGATION--------------------------------------------------

// burger menu nav

document.querySelector('.burger').addEventListener('click', function(_e){
    //verhindern dass der link aufgerufen wird
    _e.preventDefault();
    
    //mainnav ul selektieren
    var mainnav = document.querySelector('.nav_points');
  
    //open classe toggeln
    mainnav.classList.toggle('nav_points--open');
  
    //svg icons selektieren und in variablen speichern
    var burger_icon = document.querySelector('.burger_icon');
    var close_icon = document.querySelector('.close_icon');
  
    //wenn das menü gerade offen ist 
    if(mainnav.classList.contains('nav_points--open')) {
      //burger ausblenden und x einblenden
      burger_icon.style.display = "none";
      close_icon.style.display = "block";
    } else {
      //burger einblenden und x ausblenden
      burger_icon.style.display = "block";
      close_icon.style.display = "none";
    }
  
  });

// sticky nav

// Wenn der User scrollt, Funktion ausführen

window.addEventListener('scroll', function() {
    //navigation in eine variable speichern
    var navbar = document.querySelector('.header-sticky');
    // in eine variable den abstand zum oberen Rand speichern
    var sticky = navbar.offsetTop;

    // wenn abstand größer als der gespeicherte,  sticky-klasse hinzufügen
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
        navbar.style.zIndex = "1000";
      } else {
        navbar.classList.remove("sticky");
      }
});


//back to top 

// bei click auf den back-to-top button soll wieder am zum anfang des dokuments gesprungen werden

var back_to_top_btn = document.querySelector('.top_top_btn');

console.log(back_to_top_btn);

back_to_top_btn.addEventListener('click', function(){
    document.documentElement.scrollTop = 0;
});


// --------------------------------------------------GALLERY--------------------------------------------------


//eine NodeList aller img thumbnails
var lis = document.querySelectorAll('.tn_list > li img');

//overlay container in eine variable speichern
var overlay = document.querySelector('.overlay__cnt');
//container div in dem das große bild landet in eine variable speichern
var stage = document.querySelector('.overlay__stage');
//var für close btn 
var close = document.querySelector('.overlay__close');
//var für overlaycontainer der unterhalb allen anderen elementen liegt, bei klick auf die schwarze fläche soll das overlay geschlossen werden
var close_on_black = document.querySelector('.overlay__close_on_black');

//eventhandler zum schließen des overlays
close.addEventListener('click', function(){
    overlay.style.display = "none";
});
close_on_black.addEventListener('click', function(){
    overlay.style.display = "none";
});


//eventhandler für thumbnails 
//mit einer schleife alle thumbnails  durchgehen und den eventlistener hinzufügen
for(var i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', function(_e){
        //verhinden das der Link aufgerufen wird
        _e.preventDefault();
        //overlay einblenden
        overlay.style.display = "flex";
        //ein neues img tag erzeugen für das große bild
        var img = document.createElement('img');
        //src für das große bild aus dem a tag auslesen
        img.setAttribute('src', _e.target.parentNode.getAttribute('href'));
        //stage ausleeren damit kein bild drin ist
        stage.innerHTML = "";
        //das neue bild reinhängen
        stage.appendChild(img);  
        //thumbnail list für overlay
        var ul = _e.target.parentNode.parentNode.parentNode;     
        //wir geben dem angeklicken li temporär die klasse selected
        _e.target.parentNode.parentNode.classList.add('selected');
        //erzeugen ein neues ul für das overlay
        var tns = document.createElement('ul');
        //geben ihm die tn_list klasse für das styling
        tns.classList.add('tn_list');
        //kopieren das markup aus dem ul das im content steht
        //und setzen es als HTML in das neue ul
        //jetzt haben wir eine kopie von dem ul und das angeklickte li hat die klasse selected
        tns.innerHTML = ul.innerHTML;
        //dem li mit dem angeklicken thumbnail im content bereich die klasse selected wieder entfernen
        _e.target.parentNode.parentNode.classList.remove('selected');
        //jetzt leeren wir den container im overlay in den die thumnailliste hineinkommt aus
        document.querySelector('.overlay__tns').innerHTML = "";
        //und fügen unsere neue thumbnailliste hinzu
        document.querySelector('.overlay__tns').appendChild(tns);
        //wir selektieren alle thumbnail images im overlay
        var overlay_tns = document.querySelectorAll('.overlay__cnt .tn_list > li img');
        //gehen alle mit einer schleife durch
        for(var i = 0; i < overlay_tns.length; i++) { 
            overlay_tns[i].addEventListener('click', function(_e){
                //vehinden dass das a tag den link aufruft
                _e.preventDefault();
                //bei anklicken neues img mit großem bild erzeugen
                var img = document.createElement('img');
                img.setAttribute('src', _e.target.parentNode.getAttribute('href'));
                stage.innerHTML = "";
                stage.appendChild(img);
                //dem aktuell als selected markierten li die klasse selected entfernen
                document.querySelector('.overlay__cnt .tn_list > li.selected').classList.remove('selected');
                //dem li von dem angeklickten img die klasse geben
                _e.target.parentNode.parentNode.classList.add('selected');

            });
        }
    });
}

//next button im overlay click-handler
document.querySelector('.overlay__next').addEventListener('click', function(){
    //das akutell selektierete li
    var cur = document.querySelector('.overlay__cnt .tn_list > li.selected');
    //alle lis der thumbnailliste im overlay
    var overlay_lis = cur.parentNode.children;
    //den index von dem aktuell ausgewählen li finden
    //alle durchgehen
    for(var i = 0; i < overlay_lis.length; i++) {
        //wenn es das selektierte und nicht das letzte ist
        if(i <  overlay_lis.length - 1 && overlay_lis[i].classList.contains('selected') ) {
            //dispatch click-event
            overlay_lis[i+1].querySelector('img').dispatchEvent(new Event('click'));
            break;
        }
    }
});

//prev button im overlay click-handler
document.querySelector('.overlay__prev').addEventListener('click', function(){
    var cur = document.querySelector('.overlay__cnt .tn_list > li.selected');
    var overlay_lis = cur.parentNode.children;
    for(var i = 0; i < overlay_lis.length; i++) {
        //wenn es das li mit der Klasse selected ist und nicht das erste
        if(i > 0 && overlay_lis[i].classList.contains('selected') ) {
            overlay_lis[i-1].querySelector('img').dispatchEvent(new Event('click'));
            break;
        }
    }
});

