var minutes = 0;
var seconds = 0;
var playTime = setInterval(counter, 1000);


function counter() {
    seconds++;
    if(seconds == 60){
        minutes++;
        seconds = 0;
    }
    
}

var parts = document.getElementsByClassName("mobile");


for (var i=0;i<parts.length;i++) {
    parts[i].setAttribute("x", Math.floor((Math.random()*10) + 1));
    parts[i].setAttribute("y", Math.floor((Math.random()*409) + 1));
    parts[i].setAttribute("onmousedown", "selectElement(evt)");
}

var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0 ;
var currentPosY = 0;

function selectElement(evt) {
    elementSelect = reorder(evt);
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentPosX = parseFloat(elementSelect.getAttribute("x"));
    currentPosY = parseFloat(elementSelect.getAttribute("y"));
    elementSelect.setAttribute("onmousemove", "moveElement(evt)");

    //Brendo adptacao mobile
    elementSelect.setAttribute("ontouchmove", "moveElementMobile(evt)");

}
//Brendo function p mobile
function moveElementMobile(evt){
    const clientX = evt.touches[0].clientX;
    const clientY = evt.touches[0].clientY;

    var dx = clientX - currentX;
    var dy = clientY - currentY;
    currentPosX = currentPosX + dx;
    currentPosY = currentPosY + dy;
    elementSelect.setAttribute("x", currentPosX);
    elementSelect.setAttribute("y", currentPosY);
    currentX = clientX;
    currentY = clientY;
    magn();
}
function moveElement(evt) {
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentPosX = currentPosX + dx;
    currentPosY = currentPosY + dy;
    elementSelect.setAttribute("x", currentPosX);
    elementSelect.setAttribute("y", currentPosY);
    currentX = evt.clientX;
    currentY = evt.clientY;
    elementSelect.setAttribute("onmouseout", "deselectElement(evt)");
    elementSelect.setAttribute("onmouseup", "deselectElement(evt)");
    magn();
}

function deselectElement(evt) {
    testing();
    if(elementSelect != 0){
        elementSelect.removeAttribute("onmousemove");
        elementSelect.removeAttribute("onmouseout");
        elementSelect.removeAttribute("onmouseup");
        elementSelect = 0;
    }
}

var puzzleContainer = document.getElementById('container');

function reorder(evt) {
    var hero = evt.target.parentNode;
    var clone = hero.cloneNode(true);
    var id = hero.getAttribute("id");
    puzzleContainer.removeChild(document.getElementById(id));
    puzzleContainer.appendChild(clone);
    return puzzleContainer.lastChild.firstChild;
    
}

var origX = [200, 294, 425, 540, 654, 752, 866, 198, 295, 410, 522, 639, 768, 864, 199, 295, 410, 537, 653, 768, 882, 199, 308, 423, 539, 640, 752, 867, 199, 294, 409, 538, 652, 752, 866];
var origY = [100, 100, 100, 100, 100, 100, 100, 184, 183, 183, 185, 171, 184, 167, 259, 273, 258, 260, 273, 274, 273, 364, 349, 349, 363, 348, 364, 362, 438, 438, 451, 440, 439, 439, 453];

function magn(){
    for(var i=0;i<parts.length;i++){
        if(Math.abs(currentPosX-origX[i])<15 && Math.abs(currentPosY-origY[i])<15) {
            elementSelect.setAttribute("x", origX[i]);
            elementSelect.setAttribute("y", origY[i]);
        }
    }
}

function testing() {
    var sucessPart = 0;
    var heros = document.getElementsByClassName("hero");
    for(var i=0; i<parts.length;i++){
        var posx = parseFloat(heros[i].firstChild.getAttribute("x"));
        var posy = parseFloat(heros[i].firstChild.getAttribute("y"));
        var ind = heros[i].getAttribute("id");
        if(origX[ind] == posx && origY[ind] == posy){
            sucessPart = sucessPart+1;
        }
    }
    if(sucessPart == 35) {
        alert("Fim de jogo! Conclusão em "+minutes+" minutos e "+seconds+" segundos.");
        }
}