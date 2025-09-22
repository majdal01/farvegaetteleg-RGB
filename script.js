'use strict';

let rgbKode = document.getElementById("rgb-koden");

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

    //Array af farver blandes (Fisher-Yates shuffle algoritmen) - ref: https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
    function bland(farveArray) {
        for (let i = farveArray.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [farveArray[i], farveArray[j]] = [farveArray[j], farveArray[i]]; 
            } 
        return farveArray; 
        }; 
    
    let blandetArray = bland(farveArray);
    let ulRGB = document.getElementById("rgb-grid");

    blandetArray.forEach(function(farve) {
        let liRGB = document.createElement("li");
        liRGB.textContent = "";
        liRGB.style.backgroundColor = farve;
        ulRGB.appendChild(liRGB)
    });

};

nytSpil()