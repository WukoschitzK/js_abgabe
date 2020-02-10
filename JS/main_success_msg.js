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