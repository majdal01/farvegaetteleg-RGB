'use strict';

let rgbKode = document.getElementById("rgb-koden");
let ulRGB = document.getElementById("rgb-grid"); //grid til farverne
let besked = document.getElementById('besked'); 
//Scoretavle
let score = document.getElementById("score");
let antalGæt = document.getElementById("taeller"); 
//Nulstil
let nulstil = document.getElementById("nulstil");

//Placeres globalt, så den ikke nulstilles ved generering af ny kode
let countScore = 0;
let countGæt = 0;

// Generer RGB koder
function genererRGB() {
    let rød = Math.floor(Math.random()*255+1);
    let grøn = Math.floor(Math.random()*255+1);
    let blå = Math.floor(Math.random()*255+1);   
    return `rgb(${rød}, ${grøn}, ${blå})`;
}

function nytSpil() {
    let rigtigeFarve = genererRGB(); 
    rgbKode.textContent = rigtigeFarve;

    //Danner nu det array af farver, der skal vises
    let farveArray = [];
    farveArray.push(rigtigeFarve);

    for( let i = 0; i < 9; i++){
        let nyeFarver = genererRGB();
        while (nyeFarver === rigtigeFarve){ //Kører indtil betingelsen er falsk
            nyeFarver = genererRGB();
        }
        farveArray.push(nyeFarver); //Hvis falsk, så push
    }
    
    //Farver blandes
    let blandetArray = farveArray.sort(() => Math.random() - 0.5);
    ulRGB.innerHTML = "";

    //Beskeder
    besked.textContent = "";
    besked.style.backgroundColor = 'transparent';
   
    blandetArray.forEach(function(farve) {
        let liRGB = document.createElement("li");
        liRGB.textContent = "";
        liRGB.style.backgroundColor = farve;
        liRGB.style.cursor = "pointer";
        ulRGB.appendChild(liRGB)

        //når bruger klikker på en farve
        liRGB.addEventListener("click", function(){
                liRGB.setAttribute('disabled', 'disabled');
                //Tæller alle klik
                countGæt++;
                antalGæt.textContent = `${countGæt} gæt`;

            if (liRGB.style.backgroundColor === rigtigeFarve){
                countScore++;
                score.textContent = countScore;
                
                besked.textContent = 'Flot! Det er den rigtige farve. Klik her og generer ny kode.';
                besked.style.backgroundColor = 'green';
                besked.style.color = 'white';
                besked.style.cursor = "pointer";

                    let restFarver = document.querySelectorAll('#rgb-grid li');
                    restFarver.forEach(function(element) {
                    if (element !== liRGB) { 
                    element.style.pointerEvents = 'none';
                    element.style.backgroundColor = '#999';
                    }
                    });
                    
                    
                besked.addEventListener("click", function(){
                    if (besked.style.backgroundColor === 'green'){
                    nytSpil();}
                })
            } else {
                liRGB.style.backgroundColor = '#999';
                besked.textContent = 'Desværre. Prøv en anden farve.';
                besked.style.backgroundColor = 'yellow';
                besked.style.color = 'black';
            };
        }, { once: true});

    });
};

nulstil.addEventListener("click", function() { 
     //Nulstilling af scoreboard
    countScore = 0;
    countGæt = 0;
    score.textContent = 0;
    antalGæt.textContent = `${countGæt} gæt`;
    nytSpil()
});

nytSpil()