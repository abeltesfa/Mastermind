const numSelector = document.querySelectorAll('.opt');
const addSelection = document.querySelector('.current');
const feedbackSection = document.querySelector('.feedback')
const guessSection = document.querySelector('.guesses')

let randomAnswer = [];
let selectedNums = [];
let guesses = 10;

guessSection.setHTML(guesses)

async function generateRandom() {
    let response = await fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new');
    let data = await response.text()
    return data;
}

generateRandom().then(data=> data.split('\n').slice(0,4).map((ranNum)=> randomAnswer.push(ranNum)));

console.log(randomAnswer)


numSelector.forEach(num => {
    const selNum = num.classList[1];
    num.addEventListener('click', () => selectNumber(selNum))
})

function selectNumber(selNum) {
    console.log(selNum)

    const pickedNum = document.createElement("div");
    pickedNum.setHTML(selNum)

    addSelection.appendChild(pickedNum);

    selectedNums.push(selNum)

    if(selectedNums.length === 4){
        guesses--;
        guessSection.setHTML(guesses)
        const hintHolder = document.createElement('div');
        hintHolder.classList.add('hintholder')
        for(const selSelNum of selectedNums){
            const hintDiv = document.createElement('div');
            hintDiv.setHTML(selSelNum);
            hintHolder.appendChild(hintDiv)
        }

        if(guesses === 0){
            alert('YOU LOSE!!!!! Game will reload....');
            location.reload()
        }

        const hintsArr = generateHints(selectedNums);
        let hintsObj = {};
        const completeHintDiv = document.createElement('div');

        for(let k = 0; k < hintsArr.length; k++){
            if(hintsObj[hintsArr[k]] === undefined){
                hintsObj[hintsArr[k]] = 1;
            } else hintsObj[hintsArr[k]] += 1;
        }

        if(hintsObj['right'] === 4){
            alert('CORRECT!!! You WIN!!! Game will reload....')
            location.reload()
        }

        if(hintsObj['right'] && hintsObj['almost']){
            completeHintDiv.setHTML(`There is/are ${hintsObj['right']} correct number(s) in the correct position and ${hintsObj['almost']} correct number(s) that is/are not in the correct location`);
            hintHolder.appendChild(completeHintDiv)
        } else if (hintsObj['right']) {
            completeHintDiv.setHTML(`There are ${hintsObj['right']} correct numbers in the correct position`);
            hintHolder.appendChild(completeHintDiv)
        } else if (hintsObj['almost']){
            completeHintDiv.setHTML(`There are ${hintsObj['almost']} correct numbers that are not in the correct location`);
            hintHolder.appendChild(completeHintDiv)
        } else {
            completeHintDiv.setHTML(`There are no correct numbers`);
            feedbackSection.appendChild(completeHintDiv)
        }

        feedbackSection.appendChild(hintHolder)

        console.log(hintsArr)
        console.log(hintsObj)


        selectedNums.length = 0;
        addSelection.innerHTML = "";
    }
}


function generateHints(pickedNums) {
    const hints = [];
    const dups = [];

    pickedNums.forEach((num, i) => {
        if(randomAnswer[i] === num) {
            hints.push('right');
            dups.push(num);
        }
    });

    pickedNums.forEach((num, i) => {
        if(!dups.includes(num) && randomAnswer.includes(num)){
            hints.push('almost')
            dups.push(num)
        }
    })

    return hints
}
