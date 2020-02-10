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



window.onscroll = function() {
    if(document.body.scrollTop > 500) {
        back_to_top_btn.style.display="inherit";
    }
}

back_to_top_btn.addEventListener('click', function(){
    document.documentElement.scrollTop = 0;
});

// --------------------------------------------------SLIDER--------------------------------------------------

function myFunction(max_width) {
    if (!max_width.matches) {

        window.addEventListener('load', function(){
            //anzahl der slides in variable n speichern um die width der ul setzen zu können
            var n = document.querySelectorAll('.j-slide_list > li').length;
            //die ul in eine variable speichern 
            var slide_list = document.querySelector('.j-slide_list');
            //die breite der ul auf n * 100% setzen, damit ein slide die komplette breite einnimmtn
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
                    slide_list.style.left = "0";
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


            //Autoplay 

            var slide_interval;
            //wenn sich der zustand des radiobuttons right ändert
            document.querySelector('.j-autoplay-right').addEventListener('change', function(_e){
                //das interval das gerade läuft wird beendet
                clearInterval(slide_interval);
                //next funktion aufrufen
                next_slide();
                //alle 3 sekunden neues interval
                //und speichern das handle in die Variable slide_interval
                slide_interval = setInterval(next_slide, 7000);
            });

            //wenn sich der zustand des radiobuttons left ändert
            document.querySelector('.j-autoplay-left').addEventListener('change', function(_e){
                //das interval das gerade läuft wird beendet
                clearInterval(slide_interval);
                //next funktion aufrufen
                prev_slide();
                //alle 3 sekunden neues interval
                //und speichern das handle in die Variable slide_interval
                slide_interval = setInterval(prev_slide, 7000);
            });
            
            //wenn sich der zustand des radiobuttons off ändert
            document.querySelector('.j-autoplay-off').addEventListener('change', function(_e){
                //stoppen wir das interval das gerade läuft
                clearInterval(slide_interval);
            });

        });
    }; 
}

var max_width = window.matchMedia("(max-width: 769px)");
myFunction(max_width) ;
max_width.addListener(myFunction) ;







// --------------------------------------------------FORMULAR VALIDIERUNG--------------------------------------------------

var form = document.querySelector(".jForm");

// Funktionen definieren die beim Senden ausgeführt werden:

form.addEventListener('submit', function(event) {

    var isValid = true; //Steuervariable, nur wenn true soll abgeschickt werden können

    //Funktion die überprüft ob feld befüllt ist, mit mehr als nur leerzeichen
    var isEmpty = function(empty) {
        if(empty > 0) {
            return false;
        }
        else if(empty.trim().length > 0) {
            return false;
        }
        else {
            return true;
        }
    };

    
    //Funktion zur Emailvalidation
        //mindestens ein @
        //maximal ein @
        // @ darf nicht an erster oder letzer stelle sein

    var isValidEmail = function (val) {
        //mindestens ein @
        if (val.indexOf('@') === -1) {
            return false;
        }

        // @ an erster Stelle
        if (val.charAt(0) === '@') {
            return false;
        }

        //@ an letzer Stelle
        if (val.charAt(val.length - 1) === '@') {
            return false;
        }
        
        //mehr als 1x @
        var firstIndex = val.indexOf('@'); //die Stelle wo @ vorkommt

        if (val.indexOf('@', firstIndex + 1) !== -1) {
            return false;
        }

        else {
            return true;
        }
    };



    //Funktion zur Telefonnr-Validation


    var isValidTel = function(tel) {
        var erlaubt = "+0123456789";

        for(i = 0; i < tel.length; i++) {
            var currentNr = tel.charAt(i);

            if(erlaubt.indexOf(currentNr) === -1) {
                return false;
            }
        }
    //wenn + nicht an erster stelle, dann false
        if(tel.indexOf('+', 1) !== -1) {
            return false;
        }

        else {
            return true;
        }
    };



    //Radiobutton Male / Female

    var title_div = document.querySelector('.title_div');

    if(!document.querySelector('input[name="title"]:checked')) {
        event.preventDefault();
        document.querySelector('input[name="title"]').parentNode.classList.add('error');
        title_div.textContent = "Please choose a title";
        isValid = false;
    }

    else {
        document.querySelector('input[name="title"]').parentNode.classList.remove('error');
        title_div.textContent ="";
    }

    //Firstname ist leer

    var firstname_input = document.querySelector('#first_name'); 
    var firstname_value = firstname_input.value; 
    var firstname_div = document.querySelector('.firstname_div');

    if(isEmpty(firstname_value) === true) {
        event.preventDefault();
        firstname_input.parentNode.classList.add('error');
        firstname_div.textContent = "This field is required";
        isValid = false;
    }
    else {
        firstname_input.parentNode.classList.remove('error');
        firstname_div.textContent = "";
    }


    //Lastname ist leer

    var lastname_div = document.querySelector('.lastname_div');

    var lastname_input = document.querySelector('#last_name');
    var lastname_value = lastname_input.value;


    if(isEmpty(lastname_value) === true) {
        event.preventDefault();
        lastname_input.parentNode.classList.add('error');
        lastname_div.textContent = "This field is required";
        isValid = false;
    }

    else {
        lastname_input.parentNode.classList.remove('error');
        lastname_div.textContent = "";
    }


    //Email validieren
    
    var email_empty_div = document.querySelector('.email_empty_div');
    var email_valid_div = document.querySelector('.email_valid_div');
    var email_input = document.querySelector('#email');
    var email_value = email_input.value;

    if(isEmpty(email_value)) {
        event.preventDefault();
        email_input.classList.add('email-input');
       
        email_empty_div.textContent = "This field is required";
        isValid = false;
    }

    else {
        email_input.classList.remove('email-input');
        email_empty_div.textContent = "";
    }

    if((!isValidEmail(email_value)) && (!isEmpty(email_value))) { 
        event.preventDefault();
        email_input.parentNode.classList.add('error');
        email_input.value = ''; 
        email_valid_div.textContent = "Sorry, this doesn't look like a valid email";
        isValid = false;
    }

    else {
        email_input.parentNode.classList.remove('error');
        email_valid_div.textContent = "";
    }


    // Tel validieren

    var tel_empty_div = document.querySelector('.tel_empty_div');
    var tel_valid_div = document.querySelector('.tel_valid_div');
    var tel_input = document.querySelector('#tel');
    var tel_value = tel_input.value;


    if(isEmpty(tel_value)) {
        event.preventDefault();
       
        tel_input.classList.add('tel-input');
        tel_empty_div.textContent ="This field is required";
        isValid = false; 
    }

    else {
        tel_input.classList.remove('tel-input');
        tel_empty_div.textContent ="";
    }

    if(!isValidTel(tel_value)) {
        event.preventDefault();
        tel_input.parentNode.classList.add('error');
        tel_valid_div.textContent = "Please enter a valid phone number like + 01 234 567 8";
        isValid = false;
    } else {
        tel_input.parentNode.classList.remove('error');
        tel_valid_div.textContent = "";
    }


    // Formular ist nicht valide -> wird nicht abgeschickt

    if(isValid === false) { //wenn eine Überprüfung isValid auf false gesetzt hat
        event.preventDefault(); //ist was noch nicht in Ordnung also Formular NICHT abschicken
    }

})