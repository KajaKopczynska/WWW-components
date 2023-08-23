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