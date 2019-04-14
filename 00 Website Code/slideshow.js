//This just gets the slide width (which might vary 
//when I add responsiveness to 
//the site using @media width in css)
const getSlideWidth = $('.slides div').css('width')
//this turns the slide width into a negative number
const slideWidth = parseInt(getSlideWidth, 10)
// This is a counter for adding & subtracting our pixels (.slides left:px)
let pxSlide = 0
// Number of Clicks Count
let scrollN = 0
// Total Slide Count divided by 2 - EASY UPDATE 
const totalSlides = 6 / 2

//ADD AN IF STATEMENT THAT RESETS SCROLL RIGHT IF
//CLICKING ON SCROLL LEFT AND VICE VERSA

/* 4/14/19 - I've learned more about best practices when using variables within 
the global scope. If were to re-write/update this bit of functionality, I'd probably
try to use less global variables. */

// We are doing this because when we load the page the slideshow should start at the beginning
$('a.arrow-back').addClass('displayOff')

const nextSlideR = function() { 
    $('a.arrow-back').removeClass('displayOff')
    scrollN = scrollN + 1
    if (scrollN >= totalSlides){ 
        $('a.arrow-forward').addClass('displayOff')
        pxSlide = pxSlide + slideWidth * -1 -5
        $('.slides').css('left', pxSlide + "px")
    } else { 
        pxSlide = pxSlide + slideWidth * -1 -5
        $('.slides').css('left', pxSlide + "px")
    }
}

const nextSlideL = function() {   
    $('a.arrow-forward').removeClass('displayOff')
    scrollN = scrollN - 1
    
    if (scrollN === 0) {
        $('a.arrow-back').addClass('displayOff')
       console.log('clicked left too far')
       pxSlide = pxSlide + slideWidth + 5
       $('.slides').css('left', pxSlide + "px")
   } else {
       pxSlide = pxSlide + slideWidth + 5
       $('.slides').css('left', pxSlide + "px")
   }
}

$('.arrow-forward').on('click', function(e) {
    nextSlideR()
    e.preventDefault() 
})

$('.arrow-back').on('click', function(e) {
    nextSlideL()
    e.preventDefault()
})




const arraPics = [$('.slide1'), $('.slide2'), $('.slide3'), $('.slide4'), $('.slide5'), $('.slide6')]
let slideIndex = 0


const hideArrowNav = () => {
    $('.arrow-forward-lightbox').show()
    $('.arrow-back-lightbox').show()
    $('.inner-arrows-lightbox').css('justify-content', 'space-between')

    if(slideIndex === $('.slides div').length) {
        $('.arrow-forward-lightbox').hide()
        console.log('Far end of slide...')
    } else {
        $('.arrow-forward-lightbox').show()
    }
    if(slideIndex === 1) {
        $('.arrow-back-lightbox').hide()
        $('.inner-arrows-lightbox').css('justify-content', 'flex-end')
        console.log('Beginning of slide...')
    } else {
        $('.arrow-back-lightbox').show()
    }
}


// opens lightbox and assigns content based on the div clicked
$('.slides div').on('click', function(currentImage) {
    // Picks up index from (.slides div) based on which one was clicked
    slideIndex = $(this).index() + 1
    // Fade In Lightbox
    $('.lightbox').fadeIn(500)
    // Getting the background css information based on the .slide div clicked
    let content = $(this).css('background-image')
    $('.lightbox-content').css('background-image', content)
    hideArrowNav()
    currentImage.preventDefault()
})

// Exit out of lightbox
const exitLight = () => {
    $('.lightbox').fadeOut(500)
    slideIndex = 0
}

$('.x').on('click', function(){
    exitLight()
})

// Exit out of lightbox with esc key
$('body').on('keydown', function (e) {
    const keyC = e.keyCode
    if (keyC == 27) {
        exitLight()  
        slideIndex = 0
    }
})

// Create new slide right
const createSlideR = function() {
    let innerSlideIndex = slideIndex + 1
    let insertBackground = $('.slide' + innerSlideIndex).css('background-image')
    if (slideIndex < $('.slides div').length) {
        $('.lightbox-content').css('background-image', insertBackground)
        slideIndex = slideIndex + 1
        hideArrowNav()
    }
}

// Create new slide left
const createSlideL = function() { 
    let innerSlideIndex = slideIndex - 1
    let insertBackground = $('.slide' + innerSlideIndex).css('background-image')
    if (slideIndex > 1) {
        $('.lightbox-content').css('background-image', insertBackground)   
        slideIndex = slideIndex - 1
        hideArrowNav()
    }
   
}

// Move Slide Show Right
$('a.arrow-forward-lightbox').on('click', function(e) {
    if (slideIndex + 1 > totalSlides * 2) {
        console.log('End of Slideshow')
    // here I'm trying to check if we are on the last slide. 
    } else {
        createSlideR()
    }
    e.preventDefault()
    
})

// Move Slide Show Left
$('a.arrow-back-lightbox').on('click', function(e) {
    if (slideIndex <= 0) {
        console.log('End of Slideshow')
    } else {
        createSlideL()
    } 
    e.preventDefault()
})





