'use strict';

let rgbKode = document.getElementById("rgb-koden");


function genererRGB() {
    let rød = Math.floor(Math.random()*255+1);
    let blå = Math.floor(Math.random()*255+1);
    let grøn = Math.floor(Math.random()*255+1);

    rgbKode.textContent = `RGB (${rød}, ${blå}, ${grøn})`;
}

console.log(genererRGB())