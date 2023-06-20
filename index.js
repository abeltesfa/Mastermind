//selectors to grab html elements
const numSelector = document.querySelectorAll('.opt');
const addSelection = document.querySelector('.current');
const feedbackSection = document.querySelector('.feedback');
const guessSection = document.querySelector('.guesses');
const timerEl = document.querySelector('.timer')

//starting time of timer
const startMinutes = 5;
let time = startMinutes * 60;

//run function every second
setInterval(updateTimer, 1000);

function updateTimer() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;

    if(time === 0){
        alert(`YOU LOSE! TIME RAN OUT!! Correct answer was ${[...randomAnswer]}. Game will reload...`);
        location.reload();
    }

    if(seconds < 10){
        seconds = '0' + seconds
    }

    timerEl.innerHTML = `${minutes}:${seconds}`
    time--;
}


//array that will populate random numbers
let randomAnswer = [];
//array that will hold user's guesses
let selectedNums = [];

//set initial guess count
let guesses = 10;

guessSection.setHTML(guesses)

//api call to generate random numbers
// async function generateRandom() {
//     let response = await fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new');
//     let data = await response.text()
//     return data;
// }
// //push randomly generated numbers into array
// generateRandom().then(data=> {
//     randomAnswer = data.split('\n').slice(0,4);
// }
//     );

    randomAnswer = ['1','2','3','4']

    console.log(randomAnswer)

//event listener to add clicked on number divs to selected array
numSelector.forEach(num => {
    const selNum = num.classList[1];
    num.addEventListener('click', () => selectNumber(selNum))
})

document.addEventListener('keypress', (e)=> {
    selectNumber(e.key)
})

//function to display selected numbers onto selected section
function selectNumber(selNum) {
    const pickedNum = document.createElement("div");
    pickedNum.classList.add('sel')
    pickedNum.setHTML(selNum)

    addSelection.appendChild(pickedNum);

    selectedNums.push(selNum)

    //every 4 selections is a guess, also need to run hints on each guess
    if(selectedNums.length === 4){
        guesses--;
        guessSection.setHTML(guesses)
        const hintHolder = document.createElement('div');
        hintHolder.classList.add('hintholder')
        for(const selSelNum of selectedNums){
            const hintDiv = document.createElement('div');
            hintDiv.classList.add('selHint')
            hintDiv.setHTML(selSelNum);
            hintHolder.appendChild(hintDiv)
        }
        //once guesses runs out, user fails and loses game. game will reload
        if(guesses === 0){
            alert(`YOU LOSE!!!!! RAN OUT OF GUESSES!! Correct answer was ${[...randomAnswer]}. Game will reload....`);
            location.reload()
        }

        //generate hints array to parse
        const hintsArr = generateHints(selectedNums);
        let hintsObj = {};
        const completeHintDiv = document.createElement('div');

        //transfer hintarray into object to count values
        for(let k = 0; k < hintsArr.length; k++){
            if(hintsObj[hintsArr[k]] === undefined){
                hintsObj[hintsArr[k]] = 1;
            } else hintsObj[hintsArr[k]] += 1;
        }

        //if hintObj returns 4 correct user wins game and game reloads
        if(hintsObj['right'] === 4){
            alert('CORRECT!!! You WIN!!! Game will reload....')
            location.reload()
        }

        //hint messages
        if(hintsObj['right'] && hintsObj['almost']){
            completeHintDiv.setHTML(`There is/are ${hintsObj['right']} correct number(s) in the correct position and ${hintsObj['almost']} correct number(s) that is/are not in the correct location`);
            hintHolder.appendChild(completeHintDiv)
        } else if (hintsObj['right']) {
            completeHintDiv.setHTML(`There is/are ${hintsObj['right']} correct number(s) in the correct position`);
            hintHolder.appendChild(completeHintDiv)
        } else if (hintsObj['almost']){
            completeHintDiv.setHTML(`There is/are ${hintsObj['almost']} correct number(s) that are not in the correct location`);
            hintHolder.appendChild(completeHintDiv)
        } else {
            completeHintDiv.setHTML(`There are no correct numbers`);
            hintHolder.appendChild(completeHintDiv)
        }

        //append hint message to feedback section
        feedbackSection.appendChild(hintHolder)

        //clear user selection array and section
        selectedNums.length = 0;
        addSelection.innerHTML = "";
    }
}


function generateHints(pickedNums) {
    const hints = [];
    const dups = [];

    let randomAnswerCopy = [...randomAnswer];

    console.log(randomAnswerCopy)
    //check for correct selections
    pickedNums.forEach((num, i) => {
        if(randomAnswer[i] === num) {
            hints.push('right');
            randomAnswerCopy.splice(i,1)
        }
    });

    //check for out of order correct selections
    pickedNums.forEach((num, i) => {
        if(randomAnswerCopy.includes(num)){
            hints.push('almost')
            randomAnswerCopy.splice(randomAnswerCopy.indexOf(num),1)
        }
    })
    console.log(hints)
    return hints
}
