// INITIALIZE WITH FETCH ON PAGE LOAD
window.addEventListener("DOMContentLoaded", () => {
    fetchMonsters()
})
// fetch all monsters data from server
function fetchMonsters(){
    // console.log('i am in fetchMonsters')
    fetch('http://localhost:3000/monsters')
        .then(res => res.json())
        .then(monsters => {
            monstersArray = monsters
        })
}

// build a global variable to point to monster ID that can be incremented
let monstersIncrementer = 0
// container for fetch request response
let monstersArray = []
// container for favorited monsters to be added to
let newMonstersFamilyArray = []


// CREATE GLOBAL GRABBERS
const keepers = document.getElementById('keepers_list')
const discovery = document.getElementById('discovery_list')
const discoveryButton = document.getElementById('discovery_button')

// CREATE ACTIONS / EVENT LISTENERS
// create event listener for discovery button
const buttonAction = discoveryButton.addEventListener('click', monstersIndexChecker)
// create function to delete monster li (this is an event listener callback function)
function deleteMonsterElement(e){
    // console.log("i am trying to delete something")
    e.target.parentNode.parentNode.remove()
    monstersIncrementer++
}
// create function to keep a monster, append the li to keeper list
function keepMonsterElement(e){
    newMonstersFamilyArray.push(monstersArray[monstersIncrementer])
    // console.log("i am trying to keep something")
    // console.log(monstersContainer[monstersIncrementer])
    keepers.appendChild(e.target.parentNode.parentNode)
    // console.log(newMonstersFamilyArray)
    // remove keep button from this monster card
    e.target.parentNode.remove()
    createSecretButton()
    monstersIncrementer++
}
// now create a callback to create a div to put the monster in => ADD FETCH REQUEST LATER
// this callback will create an li, assign a class to 'keeper_monster', create a div to contain the monster, assign 'container' class to div, append div onto li, append li to discovery list
function makeAMonster(monster){
    // console.log(`${monster.imageURL}`)
    // console.log('i am inside makeAMonster')
    const li = document.createElement('li')
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const delBtn = document.createElement('btn')
    const keepBtn = document.createElement('btn')
    const br = document.createElement('br')
    const br2 = document.createElement('br')
    const br3 = document.createElement('br')
    const image = document.createElement('img')
    
    image.src = monster.imageURL
    li.className = 'keeper_monster'
    div1.className = 'monster_container'
    div2.className = 'btn_container'
    delBtn.className = 'button'
    delBtn.id = 'delBtn'
    delBtn.addEventListener('click', deleteMonsterElement)
    keepBtn.className = 'button'
    keepBtn.id = 'keepBtn'
    keepBtn.addEventListener('click', keepMonsterElement)
    // li.innerText = 'this is a keeper monster li'
    div1.innerText = `You found a ${monster.name}!`
    // div2.innerText = "this will hold a keep button"
    div2.innerText = `${monster.name} is adoptable!`
    delBtn.innerText = `Release your ${monster.name}?`
    keepBtn.innerText = `Keep your ${monster.name}?`

    li.appendChild(div1)
    li.appendChild(div2)
    div1.appendChild(br)
    div1.appendChild(image)
    div1.appendChild(br3)
    div2.appendChild(br2)
    div2.appendChild(keepBtn)
    discovery.appendChild(li)
    div1.appendChild(delBtn)

    // console.log('i am at the end of makeAMonster')
}


// create a function that will check the monsterArray index position, do some work with that database entry, and increment the array position
function monstersIndexChecker(){
    // console.log('i am inside monstersIncrementer')
    makeAMonster(monstersArray[monstersIncrementer])
    // console.log(monstersContainer[monstersIncrementer])
    // monstersIncrementer++
}


function createSecretButton(){
    let element = document.getElementById("secretButton");
    //If it isn't "undefined" and it isn't "null", then it exists.
    if(typeof(element) != 'undefined' && element != null){
        // checkForCompleteFamily()
        // console.log('already existing secret button')
    } else {
        const keepersDiv = document.querySelector(".keepers")
        const secretBtn = document.createElement('btn')
        secretBtn.className = 'button'
        secretBtn.id = "secretButton"
        secretBtn.innerText = "Have I found them all?"
        secretBtn.addEventListener("click", checkForCompleteFamily)
        keepersDiv.appendChild(secretBtn)
    }
}

// create a callback function for secretButton click:
// this will check if the fetch request response array is equal to newMonsterFamilyArray

function equals(){
    console.log(newMonstersFamilyArray)
    console.log(monstersArray.length)
    console.log(newMonstersFamilyArray.length)
    console.log('are they the same length?')
    return monstersArray.length === newMonstersFamilyArray.length
}

// const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b)
// if newMonsterFamilyArray is complete this will fire yourCompleteFamily function

function checkForCompleteFamily(){
    console.log('i am inside checkForCompleteFamily')
    if(equals()){
        yourCompleteFamily()
    }
}


function yourCompleteFamily(){
    newMonstersFamilyArray.forEach(monster => alert(`Great news! You have found all the monsters! ${monster.name} is now part of your adopted family!`))
}
