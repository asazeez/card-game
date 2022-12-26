const cardObjectDefinitions =[
    {id:1, imagePath:'/images/100.png', type:'Number'},
    {id:2, imagePath:'/images/4023.png', type:'Number'},
    {id:3, imagePath:'/images/arrow.png', type:'Symbol'},
    {id:4, imagePath:'/images/bolt.png', type:'Symbol'},
    {id:5, imagePath:'/images/penguin.png', type:'Penguin'},
    {id:6, imagePath:'/images/star.png', type:'Symbol'},
    {id:7, imagePath:'/images/diamond.png', type:'Symbol'},
    {id:8, imagePath:'/images/world.png', type:'Word'},
    {id:9, imagePath:'/images/pentagon.png', type:'Symbol'},
    {id:10, imagePath:'/images/speechcloud.png', type:'Symbol'},
    {id:11, imagePath:'/images/penguin.png', type:'Penguin'},
    {id:12, imagePath:'/images/card.png', type:'Word'},
    {id:13, imagePath:'/images/20.png', type:'Number'},
    {id:14, imagePath:'/images/703.png', type:'Number'},
    {id:15, imagePath:'/images/computer.png', type:'Word'},
    {id:16, imagePath:'/images/clip.png', type:'Word'},
    {id:17, imagePath:'/images/key.png', type:'Word'},
    {id:18, imagePath:'/images/donotenter.png', type:'Symbol'},
    {id:19, imagePath:'/images/heart.png', type:'Symbol'},
    {id:20, imagePath:'/images/penguin.png', type:'Penguin'},
    {id:21, imagePath:'/images/phone.png', type:'Word'},
    {id:22, imagePath:'/images/smileyface.png', type:'Symbol'},
    {id:23, imagePath:'/images/257.png', type:'Number'},
    {id:24, imagePath:'/images/1.png', type:'Number'},
    {id:25, imagePath:'/images/90.png', type:'Number'},
    {id:26, imagePath:'/images/sun.png', type:'Symbol'},
    {id:27, imagePath:'/images/turn.png', type:'Symbol'},
    {id:28, imagePath:'/images/45.png', type:'Number'},
    {id:29, imagePath:'/images/tree.png', type:'Word'},
    {id:30, imagePath:'/images/501.png', type:'Number'},
    {id:31, imagePath:'/images/penguin.png', type:'Penguin'},
    {id:32, imagePath:'/images/hexagon.png', type:'Symbol'},
    {id:33, imagePath:'/images/hello.png', type:'Word'},   
    {id:34, imagePath:'/images/penguin.png', type:'Penguin'},
    {id:35, imagePath:'/images/word.png', type:'Word'},
    {id:36, imagePath:'/images/cat.png', type:'Word'},
]

const cardBackImgPath = '/images/blue.png'
const cardContainerElem = document.querySelector('.card-container')
const selectedCardType= document.querySelector("#cardType")
const playGameButtonElem= document.getElementById('playGame')
const gridSize4ButtonElem= document.getElementById('size4')
const gridSize5ButtonElem= document.getElementById('size5')
const gridSize6ButtonElem= document.getElementById('size6')
const scoreStatus = document.getElementById('score')
let cards = []
let cardGridPos =[]
let cardGridPosChosen =[]
let cardPositions=[]
let cardTypes = ["Symbol", "Number","Word"]
let  cardTypeNum =[]
let userSelected=[]
let gridSizes = [grid4, grid5, grid6]
const numCards = cardObjectDefinitions.length
const cardTypeChosen =selectCardType()
let gameInProgress = false
let shufflingInProgress = false
let cardsRevealed = false
const numID=1
const currentGameStatusElem = document.querySelector('.current-status')
const winColor = 'green'
const loseColor= 'red'
const primarycolor = 'black'

let timer;
let time = 5;
const countDownEl = document.getElementById('countdown');
const grid = {rows:2, cols:2}

initializeGrid ()

function initializeGrid (){
    gridSize4ButtonElem.addEventListener('click',() => start(4,16,0))
    gridSize4ButtonElem.addEventListener('click',()=>{
        const width = document.querySelector('.card-pos-1').offsetWidth;
        document.querySelector('.card-container').style.setProperty('grid-auto-rows', `${width}px`);
    })
    gridSize5ButtonElem.addEventListener('click',() => start(5,25,1))
    gridSize5ButtonElem.addEventListener('click',()=>{
        const width = document.querySelector('.card-pos-1').offsetWidth;
        document.querySelector('.card-container').style.setProperty('grid-auto-rows', `${width}px`);
    })
    gridSize6ButtonElem.addEventListener('click',() => start(6,36,2))
    gridSize6ButtonElem.addEventListener('click',()=>{
        const width = document.querySelector('.card-pos-1').offsetWidth;
        document.querySelector('.card-container').style.setProperty('grid-auto-rows', `${width}px`);
       
    })
}
function start(gridSize,cardLength,i){
   window.addEventListener('resize',()=>{
        const width = document.querySelector('.card-pos-1').offsetWidth;
        document.querySelector('.card-container').style.setProperty('grid-auto-rows', `${width}px`);
       
    })
    const gridSelected = gridSizes[i]
    gridSize4ButtonElem.disabled = true;
    gridSize5ButtonElem.disabled = true;
    gridSize6ButtonElem.disabled = true;
    let total = gridSize*gridSize
    grid.rows = gridSize;
    grid.cols=  gridSize;
    gridSelected()     
    createGrid(total, cardContainerElem)
    loadGame(cardLength)   
}


function selectCardType(){
    let randInt = Math.floor((Math.random() * (cardTypes.length))) ;
    var cardType = cardTypes[randInt];
    selectedCardType.textContent= cardType
    return cardType
   
}

function countCardType(length){
    var wordCount=0;
    var numberCount=0;
    var symbolCount=0;
    for (let i=0; i<length;i++){
         
        if (cardObjectDefinitions[i].type === 'Number'){
            numberCount++;    
        }
        if (cardObjectDefinitions[i].type === 'Word'){
            wordCount++;
            }
        if (cardObjectDefinitions[i].type === 'Symbol'){
            symbolCount++;
        }   
        }
    cardTypeNum.push(numberCount,wordCount,symbolCount);
     
}
function chooseCard(card){
    if (canChooseCard())
    {   flipCard(card,false)
        if (card.getAttribute('type') === 'Penguin'){
            alert('Chose a penguin')
            gameDone(true)
        }
        else{
         evaluateCardChoice(card.getAttribute('type'))
         userSelected.push(card.getAttribute('type'))
         console.log(userSelected)
         
        } 
    }
 }
function updateStatusElement(elem, display, color, innerHTML)
{
    elem.style.display = display

    if (arguments.length>2){
        elem.style.color=color
        elem.innerHTML = innerHTML
    }
}

function outputChoiceFeedback(hit)
{
    if (hit)
    {
        updateStatusElement(currentGameStatusElem, 'block', winColor, 'Yay')
    }
    else
    {
        updateStatusElement(currentGameStatusElem, 'block', loseColor, 'Nay')
    }
}

function evaluateCardChoice(card){
    if (canChooseCard()){
        if (card===cardTypeChosen){
            outputChoiceFeedback(true)
        }
        else {
            outputChoiceFeedback(false)
        }
    }
}
function numberOfSelectedCards (){
    let cardAmount=0;
    let i;
    console.log('length of userselected is', userSelected.length)
    for (let i=0; i<userSelected.length;i++){
        console.log (userSelected[i], cardTypeChosen)
        if (userSelected[i] === cardTypeChosen){
            cardAmount++;
        }
    }
    return cardAmount
}
function score (type){
    const cardsTotal = numberOfSelectedCards()
    if (cardTypeChosen === 'Number'){
            scoreStatus.textContent= ""+ cardsTotal + '/' + cardTypeNum[0];
    }
    if (cardTypeChosen  === 'Word') {
            scoreStatus.textContent= ""+ cardsTotal + '/' + cardTypeNum[1];
    }
    if (cardTypeChosen  === 'Symbol') {
            scoreStatus.textContent = "" + cardsTotal + '/' + cardTypeNum[2];
    }
}

function canChooseCard(){
    return gameInProgress == true && !shufflingInProgress && !cardsRevealed
}


function loadGame(cardLen){
    createCards(cardLen)
    cardTypeChosen
    cards= document.querySelectorAll('.card')
    playGameButtonElem.addEventListener('click',() => startGame())
    
}

function startGame(){
    timer = setInterval(updateCountDown,1000);
    flipCards(true)
    alert('start')
    playGameButtonElem.disabled = true
    gameInProgress = true
    shufflingInProgress = false
    cardsRevealed = false
    updateStatusElement (currentGameStatusElem, "block", primarycolor, "Select Cards")
    setTimeout (gameDone,5000)
}
function updateCountDown(){
    const minutes = Math.floor(time/60);
    let seconds = time%60;
    seconds = seconds<10 ? '0'+seconds :seconds;
    countDownEl.innerHTML = `${minutes}:${seconds}`
    if (seconds<0){
        clearInterval()
    }
    time--;
}
function stopCountDown() {
    clearInterval(timer);
}

function gameDone (penguin){
    stopCountDown()
    flipCards(false)
    updateStatusElement(currentGameStatusElem, 'block',primarycolor,"Card Positions revealed")
    cardsRevealed = false
    if (penguin){
        scoreStatus.textContent= ""+ 0 ;
    }
    else {
    score(cardTypeChosen)
    }
    alert('Game Over')
    playGameButtonElem.disabled=false;
    cardGridPosChosen = []
    setTimeout(function(){
        window.location.reload();
     }, 3000);
}

function randomizeCardPositions(){
    const random1=Math.floor(Math.random()*numCards)+1
    const random2=Math.floor(Math.random()*numCards)+1

    const temp=cardPositions[random1-1]
    cardPositions[random1-1]= cardPositions[random2-1]
    cardPositions[random2-1]= temp

}

function flipCard(card, flipToBack)
{
    const innerCardElem = card.firstChild

    if(flipToBack && !innerCardElem.classList.contains('flip-it'))
    {
        innerCardElem.classList.add('flip-it')
    }
    else if(innerCardElem.classList.contains('flip-it'))
    {
        innerCardElem.classList.remove('flip-it')
    }

}

function flipCards(flipToBack){
    cards.forEach((card,index)=>{
           
        flipCard(card,flipToBack)  
    })
}

function colour(){
    return '#'+(Math.random().toString(16).substr(-6))
}
function createGrid(tot, parent){
    for (let i=0;i<tot;i++){
        const ele = document.createElement('div')
        cardContainerElem.appendChild(ele);
        ele.classList.add('card-pos-'+ i);
        cardGridPos.push('.card-pos-'+ i);
        ele.style.background = colour();
    }
    cardContainerElem.style.setProperty(`grid-template-columns`, `repeat(${grid.cols}, 1fr)`)
}

function createCards(cardLen){
   shuffleArray(cardObjectDefinitions)
   countCardType(cardLen)
    //cardObjectDefinitions.forEach((cardItem) =>{
       // createCard(cardItem)
    //})
    for (let i=0; i<cardLen;i++){
        createCard(cardObjectDefinitions[i]);
    }
}

function createCard(cardItem){
    console.log('create cardds')
    //creates div elements that make up a card
    const cardElem = document.createElement('div');  
    cardElem.setAttribute ('type',cardItem.type)
    const cardInnerElem= document.createElement ('div');
    const cardFrontElem= document.createElement ('div');
    const cardBackElem= document.createElement ('div');

    const cardFrontImg= createElement ('img');
    const cardBackImg= createElement ('img');
    

    addClassToElement (cardElem,'card')
    addIdToElement (cardElem, cardItem.id)
   

    addClassToElement (cardInnerElem, 'card-inner');
    addClassToElement (cardFrontElem, 'card-front');
    addClassToElement (cardBackElem, 'card-back');

    addSrcToImgElement (cardBackImg, cardBackImgPath);
    addSrcToImgElement (cardFrontImg, cardItem.imagePath);

    addClassToElement (cardFrontImg, 'card-img')
    addClassToElement (cardBackImg, 'card-img')

    addChildElement (cardFrontElem, cardFrontImg)
    addChildElement (cardBackElem, cardBackImg)

    addChildElement (cardInnerElem, cardFrontElem)
    addChildElement (cardInnerElem, cardBackElem)
    
    addChildElement (cardElem, cardInnerElem)
     
    addCardToGridCell(cardElem)
     
    attachClickEventHandlerToCard(cardElem)

}
function attachClickEventHandlerToCard(card){
    card.addEventListener('click',()=>chooseCard(card))
}

function initializeCardPositions(card){
    cardPositions.push(card.id)
}

function createElement (elemType){
    return document.createElement(elemType)
}
function addClassToElement (elem, className){
    elem.classList.add(className)
}
function addIdToElement (elem, id){
    elem.id=id;
}
function addSrcToImgElement (imgElem, src ){
    imgElem.src=src
}

function addChildElement (parentElem, childElem){
    parentElem.append(childElem)
}

function addCardToGridCell(card){
    const cardPosition=mapCardIdToGrid(card)
    const cardPosElem = document.querySelector(cardPosition)
    addChildElement (cardPosElem, card)

}
function mapCardIdToGrid(card){
    index = Math.floor((Math.random() * (cardGridPos.length)));
    choice = cardGridPos.splice(index,1);
    cardGridPosChosen.push(choice);
    return choice
}


function grid4(){
    document.documentElement.style
    .setProperty('--card-width', '90px');
    document.documentElement.style
    .setProperty('--card-height', '90px');
}
function grid5(){
    document.documentElement.style
    .setProperty('--card-width', '70px');
    document.documentElement.style
    .setProperty('--card-height', '70px');
}
function grid6(){
    document.documentElement.style
    .setProperty('--card-width', '55px');
    document.documentElement.style
    .setProperty('--card-height', '55px');
}
 
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

