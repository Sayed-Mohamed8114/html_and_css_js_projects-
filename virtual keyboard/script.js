let textContainer=document.querySelector(".text-container");
let allkeys=document.querySelectorAll(".key")
let iscaps=false;

// adding the enter functionallity 
let enterkey=document.querySelector(".enter");

enterkey.addEventListener('click',function(){
    let content=textContainer.innerText;
    let newcontent=content+"\n";
    textContainer.innerText=newcontent;
})

//adding the space functionallity 
let spacekey=document.querySelector(".space");
spacekey.addEventListener('click',function(){
    let content = textContainer.innerText;
    let newcontent = content +" ";
    textContainer.innerText=newcontent;
})

//adding the delete functionallity
let deletekey=document.querySelector(".delete");
deletekey.addEventListener('click',function(){
    let content= textContainer.innerText;
    let newcontent = content.slice(0,content.length-1);
    textContainer.innerText=newcontent;
})

//caps lock functionallity 
let capsLock = document.querySelector(".capslock");
capsLock.addEventListener('click',function(){
 if(iscaps){
    capsLock.classList.remove("active");
    for (let key of allkeys){
        if( key.classList.length>1){
            continue;
        }
        else{
            key.innerText = key.innerText.toLowerCase();
        }
    }
    

 }else{
    capsLock.classList.add("active");
    for (let key of allkeys){
        if( key.classList.length>1){
            continue;
        }
        else{
            key.innerText = key.innerText.toUpperCase();
        }
    }
 } 
 iscaps=!iscaps;
})

// now the key inputs 
for (let key of allkeys){
    if (key.classList.length>1){
        continue;
    }
    else{
        key.addEventListener('click' ,function(){
            let content=textContainer.innerText;
            let newcontent = content+key.innerText;
            textContainer.innerText = newcontent;
        })
    }
}