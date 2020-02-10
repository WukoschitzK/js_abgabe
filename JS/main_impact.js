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



// --------------------------------------------------SLIDER--------------------------------------------------

// Funktion die überprüft ob die Breite 1140px erreicht wurde 
function myFunction(max_width) {
    if (!max_width.matches) { 
        window.addEventListener('load', function(){
            //anzahl der slides in variable n speichern um die width der ul setzen zu können
            var n = document.querySelectorAll('.j-slide_list > li').length;          
            //die ul in eine variable speichern 
            var slide_list = document.querySelector('.j-slide_list');
            //die breite der ul auf n * 100% setzen, damit ein slide die komplette breite einnimmt
            slide_list.style.width = (n * 100)+"%";
    
    
            //funktion um zum nächsten slide zu wechseln
            var next_slide = function(){
                //dem ul die klasse hinzufügen in der das transition left css atribut gesetzte wird
                //wenn wir den left wert von dem ul jetzt ändern wird dies animiert
                slide_list.classList.add('slide_list--transition-on');
    
                //funktion die aufgerufen werden woll wenn die animation vorbei ist
                var after_transition = function(){
                    //wenn die animation abgeflaufen ist wollen soll es wieder zur anfangssituation gehen
                    slide_list.classList.remove('slide_list--transition-on');
                    slide_list.style.left ="0";
                    //das 1. slide nach hinten umhängen
                    var cur_first_slide = slide_list.removeChild(slide_list.children[0]);
                    slide_list.appendChild(cur_first_slide);
                    //transitionend eventhandler wieder entfernen damit die funktion nicht mehrfach aufgerufen wird
                    slide_list.removeEventListener('transitionend', after_transition);
                };
                //eventlistener hinzufügen der aufgerufen wird wenn die animation vorbei ist
                slide_list.addEventListener('transitionend', after_transition);
                //ul um ein slide nach links schieben so dass da nächste slide sichtbar wird
                slide_list.style.left = "-100%";
                
            };
            //wenn der next pfeil geklickt wird die next_slide() funktion aufrufen
            document.querySelector('.j-next').addEventListener('click', next_slide);		

            var prev_slide = function(){
                //das letzte slide aus dem ul entfernen und in eine variable speichern 
                var cur_last_slide = slide_list.removeChild( slide_list.children[slide_list.children.length - 1] );
                //das slide vor dem ersten ins ul einhängen
                slide_list.prepend(cur_last_slide);
                slide_list.classList.remove('slide_list--transition-on');
                //den ul container um ein slide nach links positionieren 
                slide_list.style.left = "-100%";
    
                //warten bis mindestens ein frame gerendert wird in dem das left attribut den wert -100% hat
                setTimeout(function(){
                    
                    //transitionklasse hinzufügen damit die nächste left änderung animiert wird
                    slide_list.classList.add('slide_list--transition-on');
                    //left auf 0 setzen damit das slide herein animiert wird
                    slide_list.style.left = "0";
                }, 100);
    
            };
            //prev Pfeil mit der funktion bei click verknüpfen
            document.querySelector('.j-prev').addEventListener('click', prev_slide);
    
        });
    } 
    }

    var max_width = window.matchMedia("(max-width: 1139px)");
    myFunction(max_width) ;
    max_width.addListener(myFunction) ;
    
    
    
    
		
