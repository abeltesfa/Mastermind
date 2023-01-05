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

generateRandom().then(data=> data.split('\n').slice(0,4).map((ranNum)=> randomAnswer.push(+ranNum)));

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
        selectedNums.length = 0;
        addSelection.innerHTML = "";
    }
}
