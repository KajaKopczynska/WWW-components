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

// 7 expandable slides

const body = document.querySelector('.section-container')
const cards = document.querySelectorAll('.card')

function showCard() {
    cards.forEach(card => {
        card.classList.remove('act')
        this.classList.add('act')
    })

    handleBgColor(this)
}

const handleBgColor = card => {
    const season = card.getAttribute('data-season')
    body.setAttribute('data-bg', season)
}

cards.forEach(card => card.addEventListener('click', showCard))

// 8 animated text

const modal8 = document.querySelector('.modal8')
const input8 = document.querySelector('.modal-input8')
const modalBtn8 = document.querySelector('.modal-btn8')
const saveBtn8 = document.querySelector('.save-btn8')
const text8 = document.querySelector('.text8')
const errorMsg8 = document.querySelector('.error-msg8')

let inputValue8 = 'To jest testowa wiadomość'
let timeout8
let index8 = 1
let speed8 = 80

const writingAnimation8 = () => {
    text8.innerHTML = inputValue8.slice(0, index8)

    index8++

    if (index8 > inputValue8.length) return

    timeout8 = setTimeout(writingAnimation8, speed8)
}

const showModal8 = () => {
    modal8.classList.add('active8')
}

const closeModal8 = () => {
    if (input8.value == '') {
        errorMsg8.textContent = 'Wprowadź tekst'
        return
    }

    inputValue8 = input8.value
    modal8.classList.remove('active8')
    clearStuff8()
    writingAnimation8()
}

const clearStuff8 = () => {
    index8 = 1
    clearTimeout(timeout8)
    input8.value = ''
    errorMsg8.textContent = ''
}

modalBtn8.addEventListener('click', showModal8)
saveBtn8.addEventListener('click', closeModal8)

writingAnimation8()

// 9 gift list

const presents9 = document.querySelectorAll('.present9')
const boxes9 = document.querySelectorAll('.box9')
const presentsBox9 = document.querySelector('.presents-box9')
const chosenBox9 = document.querySelector('.chosen-box9')
const sendBtn9 = document.querySelector('.send-btn9')

presents9.forEach(present9 => {
    present9.addEventListener('dragstart', () => {
        present9.classList.add('is-dragged9')
    })

    present9.addEventListener('dragend', () => {
        present9.classList.remove('is-dragged9')
    })
})

boxes9.forEach(box9 => {
    box9.addEventListener('dragover', e => {
        e.preventDefault()

        const isDragged9 = document.querySelector('.is-dragged9')
        box9.appendChild(isDragged9)

        handlePresents9()
    })
})

const handlePresents9 = () => {
    const unchosenPresents9 = presentsBox9.querySelectorAll('.present9')

    if (chosenBox9.childElementCount > 2) {
        unchosenPresents9.forEach(present9 => {
            present9.setAttribute('draggable', 'false')
            present9.classList.add('present-disabled9')
        })

        sendBtn9.disabled = false
    } else {
        unchosenPresents9.forEach(present9 => {
            present9.setAttribute('draggable', 'true')
            present9.classList.remove('present-disabled9')
        })

        sendBtn9.disabled = true
    }
}

// 10 counter

const counterItems10 = document.querySelectorAll('.counter10')
const counterBox10 = document.querySelector('.counter-box10')

const options10 = {
    rootMargin: '-250px'
}

const startCounter10 = entry => {
    console.log(entry[0].isIntersecting);

    if (entry[0].isIntersecting) {
        counterItems10.forEach(counter10 => {

            const updateCounter10 = () => {
                const finalNumber10 = counter10.getAttribute('data-number')
                const value10 = parseInt(counter10.textContent)

                const speed10 = finalNumber10 / 300

                if (value10 < finalNumber10) {
                    counter10.textContent = `${Math.floor(value10 + speed10)}`
                    setTimeout(updateCounter10, 1)
                } else {
                    counter10.textContent = finalNumber10
                }
            }

            updateCounter10()

        })
    }
}

const observer10 = new IntersectionObserver(startCounter10, options10)
observer10.observe(counterBox10)

// 12 cookie alert

const cookieBox12 = document.querySelector('.cookie-box12')
const cookieBtn12 = document.querySelector('.cookie-btn12')

const showCookie12 = () => {
    const cookieEaten12 = localStorage.getItem('cookie')

    if (cookieEaten12) {
        cookieBox12.classList.add('hide12')
    }
}

const handleCookieBox12 = () => {
    localStorage.setItem('cookie', 'true')
    cookieBox12.classList.add('hide12')
}

cookieBtn12.addEventListener('click', handleCookieBox12)
showCookie12()