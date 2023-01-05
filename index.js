const numSelector = document.querySelectorAll('.opt');
const addSelection = document.querySelector('.current');
const feedbackSection = document.querySelector('.feedback')

let randomAnswer = [];
let selectedNums = [];

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
        for(const selSelNum of selectedNums){
            const hintDiv = document.createElement('div');
            hintDiv.setHTML(selSelNum);
            feedbackSection.appendChild(hintDiv)
        }

        const hintsArr = generateHints(selectedNums);
        let hintsObj = {};
        const completeHintDiv = document.createElement('div');

        for(let k = 0; k < hintsArr.length; k++){
            if(hintsObj[hintsArr[k]] === undefined){
                hintsObj[hintsArr[k]] = 1;
            } else hintsObj[hintsArr[k]] += 1;
        }

        if(hintsObj['right'] && hintsObj['almost']){
            completeHintDiv.setHTML(`There are ${hintsObj['right']} numbers in the correct position and ${hintsObj['almost']} numbers that are not in the correct location`);
            feedbackSection.appendChild(completeHintDiv)
        } else if (hintsObj['right']) {
            completeHintDiv.setHTML(`There are ${hintsObj['right']} numbers in the correct position`);
            feedbackSection.appendChild(completeHintDiv)
        } else if (hintsObj['almost']){
            completeHintDiv.setHTML(`There are ${hintsObj['almost']} numbers that are not in the correct location`);
            feedbackSection.appendChild(completeHintDiv)
        } else {
            completeHintDiv.setHTML(`There are no correct numbers`);
            feedbackSection.appendChild(completeHintDiv)
        }

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
        }
    })

    return hints
}
