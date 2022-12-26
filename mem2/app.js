const cardObjectDefinitions =[
    {id:1, imagePath:'/images/100.png', type:'Number'},
    {id:2, imagePath:'/images/4023.png', type:'Number'},
    {id:3, imagePath:'/images/arrow.png', type:'Symbol'},
    {id:4, imagePath:'/images/bolt.png', type:'Symbol'},    
]

const cardBackImgPath = '/images/blue.png'
const cardContainerElem = document.querySelector('.card-container')
const selectedCardType= document.querySelector("#cardType")
const playGameButtonElem= document.getElementById('playGame')
const scoreStatus = document.getElementById('score')
const collapseGridAreaTemplate = '"a a" "a a"'
const cardCollectionCellClass = ".card-pos-a"
let cards = []
let cardGridPos = [".card-pos-a", ".card-pos-b",".card-pos-c",".card-pos-d"]
let cardGridPosChosen =[]
let cardPositions=[]
let cardTypes = ["Symbol", "Number","Word"]
let  cardTypeNum =[]
let userSelected=[]
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
loadGame()


function selectCardType(){
    let randInt = Math.floor((Math.random() * (cardTypes.length))) ;
    var cardType = cardTypes[randInt];
    selectedCardType.textContent= cardType
    return cardType
   
}
function countCardType(){
    var wordCount=0;
    var numberCount=0;
    var symbolCount=0;
    for (let i=0; i<cardObjectDefinitions.length;i++){
         
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
    {
         evaluateCardChoice(card.getAttribute('type'))
         userSelected.push(card.getAttribute('type'))
         console.log(userSelected)
         flipCard(card,false)
         /**setTimeout(() =>{
            flipCards(false)
            updateStatusElement(currentGameStatusElem, 'block',primarycolor,"Card Positions revealed")
        }, 3000)
        cardsRevealed = false**/
         
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
            //updateScore()
             
            console.log(card.type)
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
    console.log(cardsTotal)
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


function loadGame(){
    countCardType()
    createCards()
    cardTypeChosen
    cards= document.querySelectorAll('.card')
    playGameButtonElem.addEventListener('click',() => startGame())
    
}

function startGame(){
    
    flipCards(true)
    alert('start')
    playGameButtonElem.disabled = true
    gameInProgress = true
    shufflingInProgress = false
    cardsRevealed = false
    updateStatusElement (currentGameStatusElem, "block", primarycolor, "Shuffling...")
    setTimeout (gameDone,5000)
}

function gameDone (){
    flipCards(false)
    updateStatusElement(currentGameStatusElem, 'block',primarycolor,"Card Positions revealed")
    cardsRevealed = false
    score(cardTypeChosen)
    alert('Time Up')
    
}

function shuffleCards(){
    
    const id=setInterval(shuffle, 12)
    let shuffleCount =0;

    function shuffle(){
        randomizeCardPositions()

        if (shuffleCount ==500){
            clearInterval(id)
        }
        else{
            shuffleCount++;
        }
    }
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
    /**add timeout function */
    cards.forEach((card,index)=>{
           
        flipCard(card,flipToBack)  
    })
}

/**function collectCards(){
    transformGridArea(collapseGridAreaTemplate)
    addCardsToGridAreaCell(cardCollectionCellClass)
}

function transformGridArea(areas)
{
    cardContainerElem.style.grid.TemplateAreas=areas

}

function addCardsToGridAreaCell(cellPositionClassName){
    const cellPositionElem = document.querySelector(cellPositionClassName)
    cards.forEach((card,index) =>{
        addChildElement(cellPositionElem,card)
    })
}**/
function createCards(){
    cardObjectDefinitions.forEach((cardItem) =>{
        createCard(cardItem)
    })
}

function createCard(cardItem){
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



/**end of game shift cardGridPosChoen to cardGridPos array */

  

