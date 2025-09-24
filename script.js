'use strict';

//Variabler
let rgbKode = document.getElementById("rgb-koden");
let ulRGB = document.getElementById("rgb-grid"); //grid til liRGB
let besked = document.getElementById('besked'); 
//Scoretavle
let score = document.getElementById("score");
let antalGæt = document.getElementById("taeller"); 
//Nulstil button
let nulstil = document.getElementById("nulstil");

//Placeres globalt, så de ikke nulstilles ved generering af ny kode i nytSpil()
let countScore = 0;
let countGæt = 0;

//Funktioner til nytSpil()
function genererRGB() {
    let rød = Math.floor(Math.random()*255+1);
    let grøn = Math.floor(Math.random()*255+1);
    let blå = Math.floor(Math.random()*255+1);   
    return `rgb(${rød}, ${grøn}, ${blå})`;
}

function resetBesked(){
    besked.textContent = "";
    besked.style.backgroundColor = 'transparent';
    besked.style.cursor = 'default';
}

function deaktiverRestFarver(aktivfarve) {
    document.querySelectorAll('#rgb-grid li').forEach(element => {
        if (element !== aktivfarve) {
            element.style.pointerEvents = 'none';
            element.style.backgroundColor = '#999';
        }
    });
}

function nytSpil() {
    resetBesked();

    //Genererer koden der skal gættes
    let rigtigeFarve = genererRGB(); 
    rgbKode.textContent = rigtigeFarve;

    //Danner det array af farver, der skal vises
    let farveArray = [];
    farveArray.push(rigtigeFarve); //Tilføjer koden der skal gættes

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
   
    //Opretter farve-li
    blandetArray.forEach(function(farve) {
        let liRGB = document.createElement("li");
        liRGB.style.backgroundColor = farve;
        liRGB.style.cursor = "pointer";
        ulRGB.appendChild(liRGB);

        //når bruger klikker på en farve
        liRGB.addEventListener("click", function(){
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

                deaktiverRestFarver(liRGB);     

            } else {
                liRGB.style.backgroundColor = '#999';
                besked.textContent = 'Desværre. Prøv en anden farve.';
                besked.style.backgroundColor = 'yellow';
                besked.style.color = 'black';
            };
        }, { once: true}); //eventlisteneren fjernes aut. efter første klik

    });
};
    
//Tilføjer "knap", hvis rigtigt valg
besked.addEventListener("click", function(){
    if (besked.style.backgroundColor === 'green'){
    nytSpil();}
});

nulstil.addEventListener("click", function() { 
     //Nulstilling af scoreboard
    countScore = 0;
    countGæt = 0;
    score.textContent = 0;
    antalGæt.textContent = `${countGæt} gæt`;
    nytSpil()
});

nytSpil()