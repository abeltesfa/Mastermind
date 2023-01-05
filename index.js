const numSelector = document.querySelectorAll('.opt');
const addSelection = document.querySelector('.current');

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
