let slides = document.querySelectorAll('.slide');
let prevBTN = document.querySelector('.prev');
let nextBTN = document.querySelector('.next');
let currentslide=0;

nextBTN.addEventListener('click' , nextfun);
prevBTN.addEventListener('click' , prevfun);

function nextfun(){
    let nextslide=(currentslide+1)%slides.length;
    slides[currentslide].style.display='none';
    slides[nextslide].style.display='block';
    currentslide=nextslide;
}

function prevfun(){
    let prevslide = (currentslide-1+slides.length)%slides.length;
    slides[currentslide].style.display='none';
    slides[prevslide].style.display='block';
    currentslide=prevslide;
}