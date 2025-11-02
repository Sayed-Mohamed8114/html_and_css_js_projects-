let isOpen=false;
let btn = document.querySelector(".theButton");
let bulbTop=document.querySelector(".bulb-top");
let bulbBottom=document.querySelector(".bulb-bottom");

btn.addEventListener("click",function(){
    if(isOpen){
        btn.classList.remove("on");
        bulbTop.classList.remove("bulb-on");
        bulbBottom.classList.remove("bulb-on")

    }else{
        btn.classList.add("on");
        bulbTop.classList.add("bulb-on");
        bulbBottom.classList.add("bulb-on")
    }
    isOpen=!isOpen
})