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

//4 progress indicator on the form

const formPages = document.querySelectorAll('.page')
const steps = document.querySelectorAll('.step')
const progressBar = document.querySelector('.progress-bar')
const prevBtn = document.querySelector('.progress-btn-prev')
const nextBtn = document.querySelector('.progress-btn-next')

let currentStep = 1

const handleNextBtn = () => {
    currentStep++

    if (currentStep > steps.length) {
        currentStep = steps.length
    }

    handleProgressBar()
}

const handlePrevBtn = () => {
    currentStep--

    if (currentStep < 1) {
        currentStep = 1
    }

    handleProgressBar()
}

const handleProgressBar = () => {
    steps.forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('active-step')
        } else {
            step.classList.remove('active-step')
        }
    })

    const activeSteps = document.querySelectorAll('.active-step')
    progressBar.style.width = ((activeSteps.length - 1) / (steps.length - 1)) * 100 + '%'

    handleButtons()
    handleFormPage()
}

const handleButtons = () => {
    if (currentStep === 1) {
        prevBtn.disabled = true
    } else if (currentStep === steps.length) {
        nextBtn.disabled = true
    } else {
        prevBtn.disabled = false
        nextBtn.disabled = false
    }
}

const handleFormPage = () => {
    formPages.forEach(page => {
        if (currentStep == page.dataset.number) {
            page.classList.add('active-page')
        } else {
            page.classList.remove('active-page')
        }
    })
}

nextBtn.addEventListener('click', handleNextBtn)
prevBtn.addEventListener('click', handlePrevBtn)

//5 accordion 

const accordion = document.querySelector('.accordion')
const accordionBtns = document.querySelectorAll('.accordion-btn')

const openAccordionItems = (event) => {
    if (event.currentTarget.nextElementSibling.classList.contains('active')) {
        event.currentTarget.nextElementSibling.classList.remove('active')

    } else {
        closeAccordionItems()
        event.currentTarget.nextElementSibling.classList.toggle('active')
    }
}

const closeAccordionItems = () => {
    const allActiveItems = document.querySelectorAll('.accordion-info')
    allActiveItems.forEach(item => item.classList.remove('active'))
}

const clickOutsideAccordion = e => {
    if (
        e.target.classList.contains('accordion-btn') ||
        e.target.classList.contains('accordion-info') ||
        e.target.classList.contains('accordion-info-text')
    ) return
    closeAccordionItems()
}

accordionBtns.forEach(btn => btn.addEventListener('click', openAccordionItems))

window.addEventListener('click', clickOutsideAccordion)

// 6 slider

const sliderBox = document.querySelector('.sliderr-box')
const leftBtn = document.querySelector('.sliderr-btn-left')
const rightBtn = document.querySelector('.sliderr-btn-right')
const carouselImages = document.querySelectorAll('.sliderr-img')
const carouselWidth = 800
const carouselSpeed = 3000

let imageIndex = 0

const handleCarousel = () => {
    imageIndex++
    changeImage()
}

let startCarousel = setInterval(handleCarousel, carouselSpeed)

const changeImage = () => {
    if (imageIndex > carouselImages.length - 1) {
        imageIndex = 0
    } else if (imageIndex < 0) {
        imageIndex = carouselImages.length - 1
    }

    sliderBox.style.transform = `translateX(${-imageIndex * carouselWidth}px)`
}

const handleRightBtn = () => {
    imageIndex++
    resetInterval()
}

const handleLeftBtn = () => {
    imageIndex--
    resetInterval()
}

const resetInterval = () => {
    changeImage()
    clearInterval(startCarousel)
	startCarousel = setInterval(handleCarousel, carouselSpeed)
}

rightBtn.addEventListener('click', handleRightBtn)
leftBtn.addEventListener('click', handleLeftBtn)