const numSelector = document.querySelectorAll('.opt');
const addSelection = document.querySelector('.current');

async function generateRandom() {
    let response = await fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new');
    let data = await response.text()
    return data;
}

generateRandom().then(data=> console.log(data))

// fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new/')
//     .then(response => {
//         return response.text();
//     })
//     .then(randomNums => {
//         console.log(randomNums)
//     })

numSelector.forEach(num => {
    const selNum = num.classList[1];
    num.addEventListener('click', () => selectNumber(selNum))
})

function selectNumber(selNum) {
    console.log(selNum)

    const pickedNum = document.createElement("div");
    pickedNum.setHTML(selNum)

    addSelection.appendChild(pickedNum);
}
