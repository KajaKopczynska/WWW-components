// 1 pulsating buttons

const btns = document.querySelectorAll('.btn')

const btnAnimation = e => {
    const top = e.clientY
    const left = e.clientX
    //click coordinates

    const btnTopPosition = e.target.offsetTop
    const btnLeftPosition = e.target.offsetLeft
    //button coordinates

    const insideBtnTop = top - btnTopPosition
    const insideBtnLeft = left - btnLeftPosition
    //click coordinates on button

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = insideBtnTop + 'px'
    circle.style.left = insideBtnLeft + 'px'

    e.target.appendChild(circle)

    setTimeout(() => {
        circle.remove()
    }, 300)
}

btns.forEach(btn => btn.addEventListener('click', btnAnimation))

//2 search bar animation
const searchBtn = document.querySelector('.search-btn')
const input = document.querySelector('.search-input')

const showSearchBar = () => {
    input.classList.toggle('active')
}

searchBtn.addEventListener('click', showSearchBar)

// 3 colorful board

const box = document.querySelector('.box')
const speedBtns = document.querySelectorAll('[data-setting="speed"]')
const colorBtns = document.querySelectorAll('[data-setting="color"]')
const slider = document.querySelector('#slider')
const sliderInfo = document.querySelector('.slider-info')

const squares = 546
let sliderValue = 70
let range = 360

const createSquare = speed => {
    box.innerHTML = ''

    for (let i = 0; i < squares; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        square.style.transitionDuration = speed

        square.addEventListener('mouseover', () => setColor(square))
        square.addEventListener('mouseout', () => removeColor(square))

        box.appendChild(square)
    }
}

const setColor = square => {
    let h

    if (range === 360) {
        h = Math.floor(Math.random() * 360)
    } else {
        h = Math.floor(Math.random() * 60) + range
    }

    const s = slider.value + '%'
    const l = '50%'

    square.style.backgroundColor = `hsl(${h}, ${s}, ${l})`
}

const removeColor = square => {
    square.style.backgroundColor = `transparent`
}

function handleSpeed() {
    const newSpeed = this.dataset.speed + 's'
    createSquare(newSpeed)
}

function handleColorRange() {
    range = parseInt(this.dataset.colorRange)
}

const showSliderInfo = () => {
    sliderInfo.textContent = slider.value
}

speedBtns.forEach(btn => btn.addEventListener('click', handleSpeed))
colorBtns.forEach(btn => btn.addEventListener('click', handleColorRange))
slider.addEventListener('mousemove', showSliderInfo)
createSquare()